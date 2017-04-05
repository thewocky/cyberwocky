<?php

get_header();

wocky_trace( 'archive' );

?>

	<main role="main" aria-label="Content">
		<!-- section -->
		<section>

			<h1>echo( 'archives: ' );<?php _e( 'Archives', 'cyberwockytheme' ); ?></h1>

			<?php get_template_part('partials/loop'); ?>

			<?php get_template_part('partials/pagination'); ?>

		</section>
		<!-- /section -->
	</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
