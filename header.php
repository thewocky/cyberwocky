<?php 
global $hide_nav;

?>
<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
	<head>
		<meta charset="<?php bloginfo('charset'); ?>">
		<title><?php wp_title(''); ?><?php if(wp_title('', false)) { echo ' : '; } ?><?php bloginfo('name'); ?></title>

		<link href="//www.google-analytics.com" rel="dns-prefetch">

		<link rel="apple-touch-icon-precomposed" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicon/favicon-180x180.png">
		<meta name="msapplication-TileImage" content="<?php echo get_template_directory_uri(); ?>/assets/img/favicon/favicon-270x270.png">
		<link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicon/favicon-192x192.png" sizes="192x192">
		<link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicon/favicon-32x32.png" sizes="32x32">
		<link href="<?php echo get_template_directory_uri(); ?>/assets/img/favicon/favicon.ico" rel="shortcut icon">

		<link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?>" href="<?php bloginfo('rss2_url'); ?>" />
		<link href="https://fonts.googleapis.com/css?family=Michroma|Raleway:300,400,700" rel="stylesheet">

		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="<?php bloginfo('description'); ?>">

		<?php wp_head(); ?>
<script type="text/javascript">

function detectIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }
  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }
  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }
  return false;
}
var browserIsIE = detectIE();
var domHtml = document.getElementsByTagName("html"); 
if( browserIsIE ) {
	domHtml[0].classList.add('is-ie');
} else {
	domHtml[0].classList.add('not-ie');
}
</script>
	</head>
	<body <?php body_class(); ?>>
	<!-- wrapper -->
	<div id="wocky-page">
		<div id="wocky-wrap">
			<div class="bg-page canvas-wrapper bg-brand-dk">
			    <canvas id="particle-field" class="background"></canvas>

                <span class="wocky-logo-ie-only hero-logo"></span>

			    <svg version="1.1" baseProfile="tiny" id="wocky-svg" class="wocky-path hero-logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
			     x="0px" y="0px" width="100%" height="100%" viewBox="0 0 320 320" xml:space="preserve">

			      <path id="logo-outer-path" d="M221.17,48.349c28.701,21.507,8.941,102.05-52.143,102.05h-17.417c-4.741-7.322-7.668-15.209-6.613-24.875 c2.242-20.536,15.729-20.452,23.975-16.463l0.041,0.044c3.555,2.18-2.527,6.961,0,11.294c2.526,4.333,7.859,9,9.859,10.667 s5.666-2,7.333-6s2.854-14.406-2.478-21.406c-5.334-7-13.23-11.116-26.869-11.116c-18.612,0-30.372,21.852-32.194,36.003 c-0.731,5.684-1.085,10.807-1.001,15.658c-39.054-19.268-48.703-77.971-24.836-95.856C59.438,69.982,32.734,111.855,32.734,159.97 c0,48.022,26.602,89.827,65.871,111.495c-26.334-19.217-22.309-81.355,14.25-81.355c19.018,0,37.122,6.781,50.268,28.289 c7.221,12.898,10.346,26.037,8.5,39.25c-2.467,17.66-23.688,22.955-33.925,15.966c-9.538-6.513-10.624-17.267-5.995-23.447 c4.633-6.187,13.625-7.164,21.256,1.306c2.453-3.257-3.093-10.773-7.086-12.072c-8.78-2.861-15.844-0.369-22.018,8.5 c-5.391,7.742-5.008,23.877,9.65,33.563c15.104,9.979,54.218,6.937,59.806-25.435c2.629-15.227,1.28-37.223-7.939-58.332 c8.115-4.996,16.014-7.588,21.771-7.588c36.559,0,40.584,62.14,14.25,81.355c39.27-21.668,65.873-63.473,65.873-111.495 C287.266,111.855,260.562,69.982,221.17,48.349z"/>

			      <path class="logo-path-outer" id="logo-letter-c" d="M57.878,167.1v3.818c0,1.462,1.709,2.648,3.817,2.648h12.027v-1.502h-9.524c-0.913,0-1.654-0.516-1.654-1.146V167.1 c0-0.633,0.741-1.147,1.654-1.147h9.524v-1.501H61.695C59.587,164.45,57.878,165.635,57.878,167.1z"/>
			      <path class="logo-path-outer" id="logo-letter-y1" d="M89.583,172.064h-4.857c-0.913,0-1.654-0.516-1.654-1.147v-6.467h-4.667v6.467c0,1.464,1.709,2.649,3.817,2.649h7.361 v4.383h4.667V164.45h-4.667V172.064z"/>
			      <path class="logo-path-outer" id="logo-letter-b" d="M110.961,164.45H103.6v-4.381h-4.666v13.5h12.027c2.108,0,3.817-1.187,3.817-2.648v-3.82 C114.778,165.636,113.069,164.45,110.961,164.45z M110.112,170.919c0,0.631-0.741,1.147-1.654,1.147H103.6v-6.115h4.858 c0.913,0,1.654,0.516,1.654,1.15V170.919z"/>
			      <path class="logo-path-outer" id="logo-letter-e" d="M119.461,167.1v3.818c0,1.462,1.709,2.648,3.817,2.648h12.028v-1.502h-9.524c-0.913,0-1.654-0.516-1.654-1.146V167.1 c0-0.633,0.74-1.147,1.654-1.147h9.524v-1.501h-12.028C121.17,164.45,119.461,165.635,119.461,167.1z"/>
			      <rect class="logo-rect-outer" id="logo-letter-e-ctr" x="126.581" y="168.258" width="4.667" height="1.5"/>
			      <path class="logo-path-outer" id="logo-letter-r" d="M143.806,164.45c-2.108,0-3.817,1.184-3.817,2.647v6.469h4.667v-6.469c0-0.633,0.74-1.147,1.654-1.147h9.523v-1.5H143.806z"/>
			      <path class="logo-path-outer" id="logo-letter-w" d="M175.346,170.917c0,0.633-0.742,1.149-1.654,1.149h-6.853c-0.913,0-1.653-0.517-1.653-1.149v-6.467h-4.666v6.467 c0,1.464,1.709,2.649,3.815,2.649h11.856c2.108,0,3.817-1.186,3.817-2.649h0.002v-6.467h-4.666L175.346,170.917L175.346,170.917z"/>
			      <rect class="logo-rect-outer" id="logo-letter-w-ctr" x="169.087" y="165.093" width="2.353" height="4.666"/>
			      <path class="logo-path-outer" id="logo-letter-o" d="M196.721,164.451h-8.211c-2.107,0-3.816,1.184-3.816,2.648v3.816c0,1.462,1.709,2.648,3.816,2.648h8.211 c2.108,0,3.818-1.187,3.818-2.648V167.1C200.539,165.636,198.829,164.451,196.721,164.451z M195.872,170.916 c0,0.632-0.741,1.148-1.655,1.148h-3.203c-0.912,0-1.654-0.517-1.654-1.148V167.1c0-0.634,0.742-1.148,1.654-1.148h3.203c0.914,0,1.655,0.516,1.655,1.148V170.916z"/>
			      <path class="logo-path-outer" id="logo-letter-c2" d="M205.221,167.098v3.818c0,1.462,1.709,2.65,3.817,2.65h12.026v-1.502h-9.523c-0.912,0-1.654-0.517-1.654-1.148v-3.818 c0-0.632,0.742-1.146,1.654-1.146h9.523v-1.5h-12.026C206.93,164.45,205.221,165.634,205.221,167.098z"/>
			      <rect class="logo-rect-outer" id="logo-letter-k-lt" x="225.749" y="160.068" width="4.667" height="13.5"/>
			      <path class="logo-path-outer" id="logo-letter-k-rt" d="M236.928,167.109c0,0.631-0.736,1.145-1.647,1.146h-3.847v1.501h3.84c0.912,0,1.654,0.517,1.654,1.148v2.659h4.666v-2.659 c0-0.744-0.445-1.416-1.158-1.898c0.713-0.479,1.158-1.151,1.158-1.897v-2.659h-4.666V167.109z"/>
			      <path class="logo-path-outer" id="logo-letter-y" d="M257.455,164.45v7.614h-4.857c-0.914,0-1.652-0.516-1.652-1.147v-6.467h-4.668v6.467c0,1.464,1.709,2.649,3.816,2.649 h7.361v4.383h4.667V164.45H257.455z"/>
			    </svg>
		        <g id="outer">
		          <g id="inner"></g>
		        </g>
			</div>
			<!-- header -->
			<header id="hero" data-section="home" role="banner">
				<section id="home" data-section="home" class="sec-home canvas-wrapper page-ht">
					<div class="spacer s0 trigger-ctr" id="hero-trigger"></div>
				    <canvas id="wocky-shape" class="logo-lg foreground"></canvas>
				    <canvas id="wocky-bg" class="logo-bg foreground"></canvas>
					<div class="hero-content">
				        <h1 class="visuallyhidden"><?php the_title(); ?></h1>
				        <div>
				        <?php if (have_posts()): while (have_posts()) : the_post(); ?>
							<?php
							the_content();
							?>
						<?php endwhile; ?>
						<?php endif; ?>
						</div>
					</div>
				</section>
				<?php
				if( isset( $hide_nav ) && $hide_nav ):
					// do nothing!
				else:
				?>
				<div class="nav-wrapper">
					<div class="container nav-menu" id="wocky-menu">
				        <nav>
							<ul class="nav nav-justified" role="navigation">
								<li><a href="#about" data-nav-section="about"><span class="txt">about</span></a></span></li>
								<li><a href="#work" data-nav-section="work"><span class="txt">work</span></a></li>
								<li><a href="#services" data-nav-section="services"><span class="txt">services</span></a></li>
								<li><a href="#contact" data-nav-section="contact"><span class="txt">contact</span></a></li>
							</ul>
						</nav>
		                <div class="menu-logo">
			                <a class="wocky-brand" href="#home" data-nav-section="home">
			                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			                        <image x="0" y="0" width="158" height="40" xlink:href="<?= get_template_directory_uri() ?>/assets/img/cyberwocky-logo-nav.svg"></image>
			                    </svg>
			                </a>
						</div>
						<div class="menu-toggle">
							<a href="#" class="js-wocky-nav-toggle wocky-nav-toggle" data-toggle="collapse" data-target="#wocky-navbar" aria-expanded="false" aria-controls="navbar"><i></i></a>
						</div>
					</div>
				</div>
				<?php
				endif;
				?>
			</header>
			<!-- /header -->
