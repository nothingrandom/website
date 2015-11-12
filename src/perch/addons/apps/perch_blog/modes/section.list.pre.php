<?php
    
    $Sections = new PerchBlog_Sections($API);

    $HTML = $API->get('HTML');

    if (!$CurrentUser->has_priv('perch_blog.sections.manage')) {
        PerchUtil::redirect($API->app_path());
    }

    $Blogs = new PerchBlog_Blogs($API);
    $blogs = $Blogs->all();

    $Blog = false;

    if (PERCH_RUNWAY) {
        if (PerchUtil::get('blog')) {
            $Blog = $Blogs->get_one_by('blogSlug', PerchUtil::get('blog'));
        }
    }
    if (!$Blog) {
        $Blog = $Blogs->find(1);
    }

    $sections = $Sections->get_by('blogID', (int)$Blog->id());
