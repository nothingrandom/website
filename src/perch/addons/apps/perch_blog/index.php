<?php
    # include the API
    include('../../../core/inc/api.php');
    
    $API  = new PerchAPI(1.0, 'perch_blog');
    $Lang = $API->get('Lang');

    # include your class files
    include('PerchBlog_Posts.class.php');
    include('PerchBlog_Post.class.php');
    include('PerchBlog_Sections.class.php');
    include('PerchBlog_Section.class.php');
	include('PerchBlog_Comments.class.php');
	include('PerchBlog_Comment.class.php');
    include('PerchBlog_Authors.class.php');
    include('PerchBlog_Author.class.php');
    require('PerchBlog_Cache.class.php');

    # Set the page title
    $Perch->page_title = $Lang->get('Manage Blog Posts');


    # Do anything you want to do before output is started
    include('modes/list.pre.php');
    
    
    # Top layout
    include(PERCH_CORE . '/inc/top.php');

    
    # Display your page
    include('modes/list.post.php');
    
    
    # Bottom layout
    include(PERCH_CORE . '/inc/btm.php');
?>