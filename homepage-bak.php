<?php

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
					<div class="sm-offset-golden-third sm-left"><p>Cyberwocky is the alter ego of Jeff Battema: web designer, Javascript nerd, marketing guru, drone enthusiast. I strive to bring elegance in form as well as function in my work. I find both halves of the brain work better when they work together.</p><p>This site is inspired by mathematician, author, and artist Lewis Carroll, whose multi-pronged genius ranks alongside da&nbsp;Vinci and Ben Franklin.</p></div>
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
	    	<div class="animate-box-xx">
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
				<div class="container animate-box-x">
					<div class="client-leadin">Cyberwocky is honored to have worked with extraordinarily talented teams representing some of the world's leading brands.</div>
					<div class="row client-logos">
						<div class="col-md-3 col-sm-4 logo-container"><img class="logo" src="<?= get_template_directory_uri() ?>/assets/img/clients/disney-logo.svg" alt="Disney" /></div>
						<div class="col-md-3 col-sm-4 logo-container"><img class="logo" src="<?= get_template_directory_uri() ?>/assets/img/clients/microsoft-logo.svg" alt="Microsoft" /></div>
						<div class="col-md-3 col-sm-4 logo-container"><img class="logo" src="<?= get_template_directory_uri() ?>/assets/img/clients/opi-logo.svg" alt="OPI" /></div>
						<div class="col-md-3 col-sm-4 logo-container"><img class="logo" src="<?= get_template_directory_uri() ?>/assets/img/clients/autel-logo.svg" alt="Autel Robotics" /></div>
						<div class="col-md-3 col-sm-4 logo-container"><img class="logo" src="<?= get_template_directory_uri() ?>/assets/img/clients/swedish.png" alt="Swedish Medical Center" /></div>
						<div class="col-md-3 col-sm-4 logo-container"><img class="logo" src="<?= get_template_directory_uri() ?>/assets/img/clients/abc_logo.png" alt="ABC" /></div>
						<div class="col-md-3 col-sm-4 logo-container"><img class="logo" src="<?= get_template_directory_uri() ?>/assets/img/clients/nasa-logo.svg" alt="NASA" /></div>
						<div class="col-md-3 col-sm-4 logo-container"><img class="logo" src="<?= get_template_directory_uri() ?>/assets/img/clients/touchstone-logo.svg" alt="Touchstone Pictures" /></div>
					</div>
				</div>
			</div>
		</section>
		<section id="services" data-section="services" class="sec-services">
			<div class="container">
				<div class="svcs-accordion to-animate-x">
					<span class="svcs-accordion-icon-toggle"><i class="icon-arrow-down"></i></span>
					<h3>Web Design</h3>
					<div class="svcs-body">
						<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
					</div>
				</div>
				<div class="svcs-accordion to-animate">
					<span class="svcs-accordion-icon-toggle"><i class="icon-arrow-down"></i></span>
					<h3>Web Development</h3>
					<div class="svcs-body">
						<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
					</div>
				</div>
				<div class="svcs-accordion to-animate">
					<span class="svcs-accordion-icon-toggle"><i class="icon-arrow-down"></i></span>
					<h3>Marketing</h3>
					<div class="svcs-body">
						<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
					</div>
				</div>
				<div class="svcs-accordion to-animate">
					<span class="svcs-accordion-icon-toggle"><i class="icon-arrow-down"></i></span>
					<h3>Branding</h3>
					<div class="svcs-body">
						<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
					</div>
				</div>
				<div class="svcs-accordion to-animate">
					<span class="svcs-accordion-icon-toggle"><i class="icon-arrow-down"></i></span>
					<h3>Interface Design</h3>
					<div class="svcs-body">
						<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
					</div>
				</div>
			</div>
		</section>
		<section id="contact" data-section="contact" class="sec-contact">
					<div class="container">
						<div class="row animate-box">
							<form action="#" method="post">
								<div class="col-md-3 col-sm-3">
									<div class="form-group">
										<input type="text" class="form-control" placeholder="First Name">
									</div>
								</div>
								<div class="col-md-3 col-sm-3">
									<div class="form-group">
										<input type="text" class="form-control" placeholder="Last Name">
									</div>
								</div>
								<div class="col-md-3 col-sm-3">
									<div class="form-group">
										<input type="email" class="form-control" placeholder="Email">
									</div>
								</div>
								<div class="col-md-3 col-sm-3">
									<div class="form-group">
										<input type="submit" class="btn btn-primary" value="Subscribe">
									</div>
								</div>
							</form>
						</div>
					</div>

		</section>
	</main>

<?php get_footer(); ?>
