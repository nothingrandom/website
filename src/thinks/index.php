<?php include('../perch/runtime.php');?>
<?php include('../inc/head.php') ?>
<?php include('../inc/header.php') ?>

<main class="page-wrapper page-wrapper--blog-index">
	<div class="page-section page-section--header">
		<?php perch_content('Header'); ?>
		<div class="page-line page-line--grey page-line--medium">&nbsp;</div>
	</div>
	<div class="page-section page-section--item-list">
		<div class="row">
			<div class="column">
				<?php
					perch_blog_recent_posts(10);
				?>
			</div>
		</div>
	</div>
</main>

<?php include('../inc/footer.php') ?>