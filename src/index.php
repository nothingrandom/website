<?php include('perch/runtime.php');?>
<?php include('inc/head.php') ?>
<?php include('inc/header.php') ?>

<main class="page-wrapper page-wrapper--index">
	<div class="page-section page-section--header page-section--header-index">
		<div class="row">
			<div class="column">
				<?php perch_content('Header'); ?>
			</div>
		</div>
	</div>
	<div class="page-secion page-section--portfolio">
		<div class="row">
			<?php perch_content('Portfolio Items'); ?>
		</div>
	</div>
</main>

<?php include('inc/footer.php') ?>