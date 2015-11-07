<?php
    
    $Sections = new PerchBlog_Sections($API);

    $HTML = $API->get('HTML');
    $Form = $API->get('Form');

    $Form->set_name('delete');

    if (!$CurrentUser->has_priv('perch_blog.sections.manage')) {
        PerchUtil::redirect($API->app_path());
    }
	
	$message = false;
	
	if (isset($_GET['id']) && $_GET['id']!='') {
	    $Section = $Sections->find($_GET['id']);
	}else{
	    PerchUtil::redirect($API->app_path());
	}
	

    if ($Form->submitted()) {
	
    	if (is_object($Section)) {
    	    $Section->delete();
    
            // clear the caches
            PerchBlog_Cache::expire_all();


    	    if ($Form->submitted_via_ajax) {
    	        echo $API->app_path().'/sections/';
    	        exit;
    	    }else{
    	       PerchUtil::redirect($API->app_path().'/sections/'); 
    	    }

        }else{
            $message = $HTML->failure_message('Sorry, that section could not be deleted.');
        }
    }

    
    
    $details = $Section->to_array();



?>