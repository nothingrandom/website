<?php

class PerchBlog_Post extends PerchAPI_Base
{
    protected $table        = 'blog_posts';
    protected $pk           = 'postID';
    
    protected $index_table  = 'blog_index';
    protected $event_prefix = 'blog.post';
    
    public $Template        = false;
    
    private $tmp_slug_vars  = array();
    private $tmp_url_vars   = array();
    
    private $Author         = false;
    private $Section        = false;

    public function __call($method, $arguments)
	{
		if (isset($this->details[$method])) {
			return $this->details[$method];
		}else{

            // check for Author details
            if (substr($method, 0, 6)=='author') {
                if (!$this->Author) {
                    $this->_load_author();
                }
                if (is_object($this->Author)) {
                    return $this->Author->$field();    
                }
            }

            // look in dynamic fields
            $dynamic_fields = PerchUtil::json_safe_decode($this->postDynamicFields(), true);
            if (isset($dynamic_fields[$method])) {
                return $dynamic_fields[$method];
            }

            // try database
		    PerchUtil::debug('Looking up missing property ' . $method, 'notice');
		    if (isset($this->details[$this->pk])){
		        $sql    = 'SELECT ' . $method . ' FROM ' . $this->table . ' WHERE ' . $this->pk . '='. $this->db->pdb($this->details[$this->pk]);
		        $this->details[$method] = $this->db->get_value($sql);
		        return $this->details[$method];
		    }
		}
		
		return false;
	}

    public function get_author()
    {
        $Authors = new PerchBlog_Authors;
        return $Authors->find($this->authorID());
    }

    public function update($data, $do_cats=true, $do_tags=true)
    {
        $PerchBlog_Posts = new PerchBlog_Posts();
    
        if (isset($data['cat_ids'])) {
            $catIDs = $data['cat_ids'];
            unset($data['cat_ids']);
        }else{
            $catIDs = false;
        }

        // Update the post itself
        parent::update($data);

        // slug
        if (isset($data['postTitle'])) {
            $API  = new PerchAPI(1.0, 'perch_blog');
            $Settings = $API->get('Settings');
            $format = $Settings->get('perch_blog_slug_format')->val();
            if (!$format) {
                $format = '%Y-%m-%d-{postTitle}';
            }
            $this->tmp_slug_vars = $this->details;
            $slug = preg_replace_callback('/{([A-Za-z0-9_\-]+)}/', array($this, "substitute_slug_vars"), $format);
            $this->tmp_slug_vars = array();
            $data['postSlug'] = strtolower(strftime($slug, strtotime($data['postDateTime'])));
            parent::update($data);
        }
       
        
        if ($do_tags) {
    		// Delete existing tags
    		$this->db->delete(PERCH_DB_PREFIX.'blog_posts_to_tags', $this->pk, $this->id());
		
    		// Split tag string into array
    		if(isset($data['postTags']) && $data['postTags'] != '') {
    			$a = explode(',',$data['postTags']);
    			if (is_array($a)) {
     				for($i=0; $i<sizeOf($a); $i++) {
    					$tmp = array();
    					$tmp['postID'] = $this->id();
    					$tag_str = trim($a[$i]);
    					//does this tag exist
    					$sql = 'SELECT tagID, tagTitle FROM '.PERCH_DB_PREFIX.'blog_tags WHERE tagTitle = '.$this->db->pdb($tag_str).' LIMIT 1';
					
    					$row = $this->db->get_row($sql);
					
					
    					if(is_array($row)) {
    						$tmp['tagID'] = $row['tagID'];
    					}else{
    						$tag = array();
    						$tag['tagTitle'] = $tag_str;
    						$tag['tagSlug'] = PerchUtil::urlify($tag_str);
    						$tmp['tagID'] = $this->db->insert(PERCH_DB_PREFIX.'blog_tags', $tag);
    					}
 			    	
     			    	$this->db->insert(PERCH_DB_PREFIX.'blog_posts_to_tags', $tmp);
     				}
     			}
    		}
    	}
    	
 		return true;
    }
    
    public function delete()
    {
        parent::delete();
        $this->db->delete(PERCH_DB_PREFIX.'blog_comments', $this->pk, $this->id());
    }
    
    public function date()
    {
        return date('Y-m-d', strtotime($this->postDateTime()));
    }

    public function to_array($template_ids=false)
    {
        $out = parent::to_array();

        if (PerchUtil::count($template_ids) && $this->array_prefix_match('author', $template_ids)) {
            if (!$this->Author) $this->_load_author();
            if (is_object($this->Author)) {
                $out = array_merge($out, $this->Author->to_array());
            }
        }      
        
        if (PerchUtil::count($template_ids) && $this->array_prefix_match('section', $template_ids)) {
            if (!$this->Section) $this->_load_section();
            if (is_object($this->Section)) {
                $out = array_merge($out, $this->Section->to_array());
            }
        } 
       
        if ($out['postDynamicFields'] != '') {
            $dynamic_fields = PerchUtil::json_safe_decode($out['postDynamicFields'], true);
            if (PerchUtil::count($dynamic_fields)) {
                foreach($dynamic_fields as $key=>$value) {
                    $out['perch_'.$key] = $value;
                }
            }
            $out = array_merge($dynamic_fields, $out);
        }

        $out['postURL'] = $this->postURL();

        return $out;
    }

    public function postURL()
    {
        $Settings = PerchSettings::fetch();
        $url_template = $Settings->get('perch_blog_post_url')->val();
        $this->tmp_url_vars = $this->details;

        if (!$this->Section) $this->_load_section();
        if (is_object($this->Section)) {
            $this->tmp_url_vars = array_merge($this->tmp_url_vars, $this->Section->to_array());
        }

        $out = preg_replace_callback('/{([A-Za-z0-9_\-]+)}/', array($this, "substitute_url_vars"), $url_template);
        $this->tmp_url_vars = false;

        return $out;
    }

    public function update_comment_count()
    {
        $sql = 'SELECT COUNT(*) FROM '.PERCH_DB_PREFIX.'blog_comments WHERE postID='.$this->id().' AND commentStatus='.$this->db->pdb('LIVE');
        $count = $this->db->get_count($sql);

        $data  = array();
        $data['postCommentCount'] = $count;
        $this->update($data, false, false);
    }


    public function index($Template=false)
    {
        if ($Template===false) {
            $Template = $this->api->get('Template');
            $Template->set('blog/'.$this->postTemplate(), 'blog');
        }

        return parent::index($Template);
    }

    public function import_legacy_categories()
    {
        $sql = 'SELECT c.categoryCoreID AS newID 
                FROM '.PERCH_DB_PREFIX.'blog_posts_to_categories p2c, '.PERCH_DB_PREFIX.'blog_categories c
                WHERE p2c.categoryID=c.categoryID AND p2c.postID='.$this->db->pdb((int)$this->id());
        $catIDs = $this->db->get_rows_flat($sql);

        if (PerchUtil::count($catIDs)) {
            $json = PerchUtil::json_safe_decode($this->postDynamicFields(), true);
            if ($json) {
                $json['categories'] = $catIDs;
            }else{
                $json = array('categories'=>$catIDs);
            }
            $this->update(array(
                'postDynamicFields' => PerchUtil::json_safe_encode($json),
                ), false, false);
        }
    }

    public function get_categories()
    {
        $cats = $this->get_field('categories', false);
        if (PerchUtil::count($cats)) {
            $Categories = new PerchCategories_Categories();
            $out = array();
            foreach($cats as $catID) {
                $out[] = $Categories->find((int)$catID);
            }
            return $out;
        }
        return false;
    }    

    public function get_field($field, $use_template=true)
    {
        $data = $this->to_array(array($field));
        if (isset($data[$field])) {

            if ($use_template) {
                $Template = $this->api->get('Template');
                $Template->set('blog/'.$this->postTemplate(), 'blog');
                $Tag = $Template->find_tag($field);
                if ($Tag) {
                    if ($Tag->is_set('suppress')) {
                        $Tag->set('suppress', false);
                    }
                    $Template->set_from_string(PerchXMLTag::create('perch:blog', 'single', $Tag->get_attributes()), 'blog');
                    return $Template->render($data);
                }
            }
            return $data[$field];
        }
        return false;
    }

    private function substitute_slug_vars($matches)
    {
        $url_vars = $this->tmp_slug_vars;
        if (isset($url_vars[$matches[1]])){
            return PerchUtil::urlify($url_vars[$matches[1]]);
        }
    }

    private function substitute_url_vars($matches)
    {
        $url_vars = $this->tmp_url_vars;
        if (isset($url_vars[$matches[1]])){
            return $url_vars[$matches[1]];
        }
    }
    
    private function _load_author()
    {
        $Cache = PerchBlog_Cache::fetch();

        $cached_authors = $Cache->get('authors');

        if (!$cached_authors) {
            $Authors = new PerchBlog_Authors;
            $authors = $Authors->all();
            if (PerchUtil::count($authors)) {
                $cached_authors = array();
                foreach($authors as $Author) {
                    $cached_authors[$Author->id()] = $Author;
                }
                $Cache->set('authors', $cached_authors);
            }
        }

        if ($cached_authors) {
            if (isset($cached_authors[$this->authorID()])) {
                $this->Author = $cached_authors[$this->authorID()];
                return true;
            }
        }

        return false;
    }


    private function _load_section()
    {
        $Cache = PerchBlog_Cache::fetch();

        $cached_sections = $Cache->get('sections');

        if (!$cached_sections) {
            $Sections = new PerchBlog_Sections;
            $sections = $Sections->all();
            if (PerchUtil::count($sections)) {
                $cached_sections = array();
                foreach($sections as $Section) {
                    $cached_sections[$Section->id()] = $Section;
                }
                $Cache->set('sections', $cached_sections);
            }
        }

        if ($cached_sections) {
            if (isset($cached_sections[$this->sectionID()])) {
                $this->Section = $cached_sections[$this->sectionID()];
                return true;
            }
        }

        return false;
    }

    private function array_prefix_match($prefix, $array) 
    {
        if (!is_array($array)) return false;

        foreach ($array as $v) {
            if (strpos($v, $prefix)===0) return true;
        }

        return false;
    }

}

