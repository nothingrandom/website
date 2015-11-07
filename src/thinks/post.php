<?php include('../perch/runtime.php'); ?>
<?php include('../inc/head-blog.php') ?>
<?php include('../inc/header.php') ?>

<main class="page-wrapper page-wrapper--blog-post">
	<?php perch_blog_post(perch_get('s')); ?>
	<?php perch_blog_post_tags(perch_get('s')); ?>
</main>

<?php include('../inc/footer.php') ?>