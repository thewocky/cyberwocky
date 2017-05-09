<?php
/* Template Name:  Homepage */ 

get_header();

?>
	<main role="main" aria-label="Content">
		<section id="about" data-section="about" class="page-ht sec-about">
			<div class="spacer s0 trigger-20" id="trigger-about"></div>

			<div class="flex content">
				<div class="flex-child area-1 header-container">
					<div class=""><h4>What is a Cyberwocky, and why do you need&nbsp;one?</h4></div>
				</div>
				<div class="flex-child content-container area-2 fluid-container">
					<div class="container">
						<div class="row content-header">
							<div class="area-coder col-xs-5 align-right"><h3 class="text-right">Coder</h3></div>
							<div class="area-yinyang col-xs-2 align-center"><img class="offset-badge" src="<?= get_template_directory_uri() ?>/assets/img/yin-yang.svg" /></div>
							<div class="area-creator col-xs-5 align-left"><h3>Creator</h3></div>
						</div>
						<div class="row content-body">
							<div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
								<p>Cyberwocky is the alter ego of Jeff Battema: web designer, Javascript nerd, wearer of many hats. I strive to bring elegance to form as well as function.</p>
								<p>Popular culture suggests that creative types are right-brain dominant, while scientists and logic-minded folks are left-brainers. I contend that both halves of the brain work better when they work together.</p>
								<p>This site is inspired by mathematician, author, and artist Lewis Carroll, whose multi-pronged genius ranks alongside Leonardo da&nbsp;Vinci, Ben Franklin, and Brian&nbsp;May.</p></div>
						</div>
					</div>
				</div>
			</div>

		</section>
		<section id="work" data-section="work" class="sec-work">
<?php
$work_args = array(
	'post_type'   => 'project',
	'posts_per_page' => -1
);
$work_query = new WP_Query( $work_args );
if ( $work_query->have_posts() ) :
?>
	    	<div class="animate-box">
	    		<h3>Selected Projects</h3>
				<div class="owl-carousel">
<?php
	while ( $work_query->have_posts() ) :

		$work_query->the_post();
		global $post;
		setup_postdata( $post );
		
?>
					<div class="item row">
						<div class="col-md-8 flex-md item-thumb">
			    			<h4 class="visible-xs-block"><?php the_title();?></h4>
							<?php if ( has_post_thumbnail() ) : 

								$id = get_post_thumbnail_id();
								$src_arr = wp_get_attachment_image_src( $id, 'full' );
								$src = $src_arr[0];
								$srcset = wp_get_attachment_image_srcset( $id, 'full' );
								$sizes = wp_get_attachment_image_sizes( $id, 'full' );
								$alt = get_post_meta( $id, '_wp_attachment_image_alt', true);
							?>

							  	<img src="<?php echo esc_attr( $src );?>"
							  		srcset="<?php echo esc_attr( $srcset ); ?>"
									sizes=""<?php echo esc_attr( $sizes );?>""
									alt="<?php echo esc_attr( $alt );?>" />

							<?php
							endif;

			    			// echo get_the_post_thumbnail( $post->ID, 'large', array( 'class' => 'project-thumb' ) );

			    			?>
			    		</div>
			    		<div class="col-md-4 flex-md item-content">
			    			<h4 class="hidden-xs"><?php the_title();?></h4>
			    			<?php the_content();?>
			    		</div>
			    	</div>

<?php


endwhile;
?>
				</div>
			</div>
<?php
endif;
?>
			<div id="clients" data-section="clients" class="subsection sec-clients">
				<div class="container">
					<div class="client-leadin">Cyberwocky is honored to have worked with some of the world's leading brands.</div>
					<div class="row client-logos">
						<div class="col-md-3 col-sm-4 col-xs-6 logo-wrapper animate-box"><div class="logo-container"><img class="logo" src="<?= get_template_directory_uri() ?>/assets/img/clients/disney-logo.svg" alt="Disney" /></div></div>
						<div class="col-md-3 col-sm-4 col-xs-6 logo-wrapper animate-box"><div class="logo-container"><img class="logo" src="<?= get_template_directory_uri() ?>/assets/img/clients/microsoft-logo.svg" alt="Microsoft" /></div></div>
						<div class="col-md-3 col-sm-4 col-xs-6 logo-wrapper animate-box"><div class="logo-container"><img class="logo" src="<?= get_template_directory_uri() ?>/assets/img/clients/opi-logo.svg" alt="OPI" /></div></div>
						<div class="col-md-3 col-sm-4 col-xs-6 logo-wrapper animate-box"><div class="logo-container"><img class="logo" src="<?= get_template_directory_uri() ?>/assets/img/clients/autel-logo.svg" alt="Autel Robotics" /></div></div>
						<div class="col-md-3 col-sm-4 col-xs-6 logo-wrapper animate-box"><div class="logo-container"><img class="logo" src="<?= get_template_directory_uri() ?>/assets/img/clients/swedish.png" alt="Swedish Medical Center" /></div></div>
						<div class="col-md-3 col-sm-4 col-xs-6 logo-wrapper animate-box"><div class="logo-container"><img class="logo" src="<?= get_template_directory_uri() ?>/assets/img/clients/abc_logo.png" alt="ABC" /></div></div>
						<div class="col-md-3 col-sm-4 col-xs-6 logo-wrapper animate-box"><div class="logo-container"><img class="logo" src="<?= get_template_directory_uri() ?>/assets/img/clients/nasa-logo.svg" alt="NASA" /></div></div>
						<div class="col-md-3 col-sm-4 col-xs-6 logo-wrapper animate-box"><div class="logo-container"><img class="logo" src="<?= get_template_directory_uri() ?>/assets/img/clients/touchstone-logo.svg" alt="Touchstone Pictures" /></div></div>
					</div>
				</div>
			</div>
		</section>
		<section id="services" data-section="services" class="sec-services">
			<div class="container">
				<div class="row">
					<div class="col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
		    		<h3>The wocky works for you.</h3>
					<p><strong>My mission is simple: to help my clients succeed.</strong> Web design is my game, but your business is so much more. Whether you're a fledgling startup looking to establish a brand or a multinational behemoth launching a new product, I can support your business needs across the board.</p>
					<ul>
						<li>Front-end Web Development</li>
						<li>Javascript Development</li>
						<li>WordPress Theming</li>
						<li>Shopify Theming</li>
						<li>Web App Development</li>
						<li>Interface Design</li>
						<li>UX Research &amp; Analysis</li>
						<li>SEO Strategy</li>
						<li>Information Architecture</li>
						<li>Branding</li>
						<li>Social Media Marketing</li>
						<li>Content Marketing</li>
						<li>Digital Illustration</li>
						<li>Animation</li>
						<li>Video Production</li>
					</div>
				</div>
			</div>
		</section>
		<section id="contact" data-section="contact" class="sec-contact">
			<div class="container">
				<div class="row">
					<div class="col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
	 				<?php
	 				if (have_posts()): while (have_posts()) : the_post();

		 				$contact_field = get_field( 'contact_field' );

		 				if( $contact_field ) {
		 					echo $contact_field;
		 				}
								
					endwhile;
					endif;

	 				// gravity_form( $id_or_title, $display_title = true, $display_description = true, $display_inactive = false, $field_values = null, $ajax = false, $tabindex, $echo = true );
	 				// gravity_form( 1, true, true, false, null, true );
	 				?>	
					</div>
				</div>
			</div>

		</section>
	</main>

<?php get_footer(); ?>
