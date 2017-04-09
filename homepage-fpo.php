<?php
/* Template Name:  Homepage FPO */ 

global $hide_nav;
$hide_nav = true;

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
	</main>

<?php get_footer(); ?>
