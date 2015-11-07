<?php include('perch/runtime.php');?>
<?php include('inc/head.php') ?>
<?php include('inc/header.php') ?>

<main class="page-wrapper page-wrapper--404">
	<div class="page-section page-section--header">
		<h1><?php perch_content('Header'); ?></h1>
		<div class="page-line page-line--grey page-line--medium">&nbsp;</div>
	</div>
	<div class="page-section">
		<div class="row">
			<div class="column">
				<?php perch_content('Text'); ?>
			</div>
		</div>
	</div>
</main>

<?php include('inc/footer.php') ?>