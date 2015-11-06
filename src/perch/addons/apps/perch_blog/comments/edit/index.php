<?php
    # include the API
    include('../../../../../core/inc/api.php');
    
    $API  = new PerchAPI(1.0, 'perch_blog');
    $Lang = $API->get('Lang');

    # include your class files
    include('../../PerchBlog_Posts.class.php');
    include('../../PerchBlog_Post.class.php');
	include('../../PerchBlog_Sections.class.php');
    include('../../PerchBlog_Section.class.php');
	include('../../PerchBlog_Comments.class.php');
    include('../../PerchBlog_Comment.class.php');
    include('../../PerchBlog_Authors.class.php');
    include('../../PerchBlog_Author.class.php');
    include('../../PerchBlog_Cache.class.php');
    
    # Set the page title
    $Perch->page_title = $Lang->get('Blog Comments');

    $Perch->add_css($API->app_path().'/assets/css/blog.css');

    # Do anything you want to do before output is started
    include('../../modes/comment.edit.pre.php');
    
    
    # Top layout
    include(PERCH_CORE . '/inc/top.php');

    
    # Display your page
    include('../../modes/comment.edit.post.php');
    
    
    # Bottom layout
    include(PERCH_CORE . '/inc/btm.php');
?>