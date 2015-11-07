<?php include('perch/runtime.php');?>
<?php include('inc/head.php') ?>
<?php include('inc/header.php') ?>

<main class="page-wrapper page-wrapper--profile">
	<div class="page-section page-section--header">
		<?php perch_content('Header'); ?>
		<div class="page-line page-line--grey page-line--medium">&nbsp;</div>
	</div>
	<div class="page-section page-section--profile">
		<div class="row">
			<div class="column small-12 large-3">
				<div class="profile__picture">
					<?php perch_content('Image'); ?>
				</div>
			</div>
			<div class="column small-12 medium-6">
				<div class="profile__blurb">
					<?php perch_content('Blurb'); ?>
				</div>
			</div>
			<div class="column small-12 medium-6 large-3">
				<div class="profile__sidebar">
					<div class="profile__sidebar--availability">
						<h4><?php perch_content('Availability title'); ?></h4>
						<div class="availability">
							<?php perch_content('Availabilty months'); ?>
						</div>
					</div>
					<div class="profile__sidebar--connect">
						<h4><?php perch_content('Contact title'); ?></h4>
						<?php
							perch_content_custom('Contact', array(
 								'template' => 'contact_list.html',
								'multiple'	=> true,
								'edit-mode' => 'listdetail',
							));
						?>
					</div>
					<div class="profile__sidebar--music">
						<h4><?php perch_content('Music title'); ?></h4>
						<ul id="lastfm">
						</ul>
					</div>
				</div>
			</div>
			<div class="column small-12">
				<div class="profile__instagram">
					<div class="row">
						<div class="instagram" id="instafeed">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

<?php include('inc/footer.php') ?>