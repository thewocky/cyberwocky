<?php
/* Template Name:  Homepage */ 

get_header();

?>
	<main role="main" aria-label="Content">
		<section id="about" data-section="about" class="page-ht sec-about">
			<div class="spacer s0 trigger-20" id="trigger-about"></div>

			<div class="area-fill area-bg">
				<div class="sm-golden-third sm-left sm-full-ht sm-off-white animate-bg-clr"></div>
			</div>

			<div class="area-fill-min flex content">
				<div class="flex-child area-1">
					<div class="sm-offset-golden-third sm-left"><h4>What is a Cyberwocky, and why do you need one?</h4></div>
				</div>
				<div class="flex-child tagline-container">
					<div class="sm-golden-third sm-left area-2"><h3 class="text-right">Creator</h3></div>
					<div class="sm-left area-3"><img class="offset-badge" src="<?= get_template_directory_uri() ?>/assets/img/yin-yang.svg" /><h3>Coder</h3></div>
				</div>
				<div class="flex flex-horiz flex-child area-4">
					<div class="sm-offset-golden-third sm-left">
						<p>Cyberwocky is the alter ego of Jeff Battema: web designer, Javascript nerd, wearer of many hats. I strive to bring elegance to form as well as function.</p>
						<p>Popular culture suggests that creative types are right-brain dominant, while scientists and logic-minded folks are left-brainers. I contend that both halves of the brain work better when they work together.</p>
						<p>This site is inspired by mathematician, author, and artist Lewis Carroll, whose multi-pronged genius ranks alongside da&nbsp;Vinci and Ben Franklin.</p></div>
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
				<div class="owl-carousel">
<?php
	while ( $work_query->have_posts() ) :

		$work_query->the_post();
		global $post;
		setup_postdata( $post );
		
?>
					<div class="item row">
						<div class="col-sm-6 item-thumb">
			    			<?php echo get_the_post_thumbnail( $post->ID, 'large', array( 'class' => 'project-thumb' ) ); ?>
			    		</div>
			    		<div class="col-sm-6 flex item-content">
			    			<h3><?php the_title();?></h3>
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
					<div class="client-leadin">Cyberwocky is honored to have worked with extraordinarily talented teams representing some of the world's leading brands.</div>
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
					<div class="col-md-8 col-md-offset-2 col-lg-6 col-md-offset-3">
					<p><strong>My mission is to help my clients succeed.</strong> Web design is my game, but a business is about so much more. Whether you're a fledgling startup looking to establish a brand or a multinational behemoth launching a new product, I can support your business needs across the board.</p>
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
					<div class="col-md-8 col-md-offset-2 col-lg-6 col-md-offset-3">
					<p>Drop me a line! If you have a project you'd like to discuss, please provide as many details as possible.</p>
 				<?php
 				// gravity_form( $id_or_title, $display_title = true, $display_description = true, $display_inactive = false, $field_values = null, $ajax = false, $tabindex, $echo = true );
 				gravity_form( 1, true, true, false, null, true );
 				?>	
					</div>
				</div>
			</div>

		</section>
	</main>

<?php get_footer(); ?>
