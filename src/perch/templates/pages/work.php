<?php if (!defined('PERCH_RUNWAY')) include($_SERVER['DOCUMENT_ROOT'].'/perch/runtime.php'); ?>
<?php include('../inc/head.php') ?>
<?php include('../inc/header.php') ?>

<main class="page-wrapper page-wrapper--portfolio">
	<div class="page-section page-section--header page-section--header-portfolio">
		<?php perch_content('Header'); ?>
		<div class="page-line page-line--grey page-line--medium">&nbsp;</div>
	</div>
	<div class="page-section page-section--info-header">
		<div class="row">
			<div class="column medium-10 large-8 medium-centered">
				<?php perch_content('Info'); ?>
			</div>
		</div>
	</div>
	<?php perch_content('Content'); ?>
	<?php perch_content('Arrows'); ?>
</main>

<?php include('../inc/footer.php') ?>