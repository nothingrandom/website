<header class="header main-header">
	<div class="row">
		<div class="column small-12 medium-6">
			<div class="logo">
				<p><a href="http://nothingrandom.com">bh.</a></p>
			</div>
		</div>
		<div class="column small-12 medium-6">
			<nav class="main-nav">
				<?php perch_pages_navigation(array(
						'add-trailing-slash' => true,
						'hide-extensions' => true,
						'hide-default-doc' => true,
						'levels' => 1,
						'navgroup' => 'main-navigation'
					));
				?>
			</nav>
		</div>
	</div>
</header>