;(function () {
	'use strict';

	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	var projectCarousel;
		
	// OffCanvas
	var offCanvas = function() {
		$('body').on('click', '.js-wocky-nav-toggle', function(event){
			var $this = $(this);
			$('#wocky-menu').toggleClass('nav-awake');
			if ( $('#wocky-menu').hasClass('nav-awake') ) {
				$this.addClass('active');
				$( '#wocky-menu nav' ).slideDown({
					duration: 400,
					'easing': "easeOutExpo"
				});
			} else {
				$this.removeClass('active');
				$( '#wocky-menu nav' ).slideUp({
					duration: 500,
					'easing': "easeInOutExpo"
				});
			}
			event.preventDefault();
			
		});
	};

	// Click outside of offcanvas
	var closeMobileMenu = function() {
    	// log( 'closeMobileMenu: ' + $('#wocky-menu').hasClass('nav-awake') );
    	if ( $('#wocky-menu').hasClass('nav-awake') ) {
    		$('#wocky-menu').removeClass('nav-awake');
    		$('.js-wocky-nav-toggle').removeClass('active');
			$( '#wocky-menu nav' ).slideUp({
				duration: 500,
				'easing': "easeInOutExpo"
			});
    	}
	}
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
		    var container = $("#wocky-menu");
		    if (!container.is(e.target) && container.has(e.target).length === 0) {
		    	closeMobileMenu();
		    }
		});
	};


	// Single Page Nav
	var clickMenu = function() {
		$('#wocky-menu a:not(.wocky-nav-toggle)').click(function(){
			var section = $(this).data('nav-section'),
				scrollTarg = $('[data-section="' + section + '"]').offset().top;
		   //  log( 'Tweenlite: ' + TweenLite );

		    TweenLite.to(window, 0.5, {
		    	scrollTo:{
			    	y:scrollTarg,
			    	ease:Expo.easeInOut
		    	}
		    });

		    closeMobileMenu();
		    return false;
		});
	};

	// Owl Carousel
	var carouselProjects = function() {

		projectCarousel = $(".owl-carousel");
		
		projectCarousel.owlCarousel({
			items: 1,
		    margin: 0,
		    responsiveClass: true,
		    loop: true,
		    nav: true,
		    dots: true,
		    autoplay: false,
		    smartSpeed: 500,
			responsive:{
				0:{
					nav:false
				},
				480: {
					nav:false
				},
				768:{
					nav:false
				},
				1000:{
					nav:true,
				}
			},
		    navText: [
		      "<span class='line-arrow square left'></span>",
		      "<span class='line-arrow square right'></span>"
	     	]
		});
	};


	// Scroll Animations

	var headerToggle = function() {
		var $this = $( 'header' );
		$this.waypoint(function(direction) {
			
			if( direction === 'down' ) {
				$('body').addClass('scrolled hide-mobile-nav');
				setTimeout(function(){
					$('body').removeClass('hide-mobile-nav');
				}, 500);
			
			} else if( direction === 'up' ){
				$('body').removeClass('scrolled');
			}			
		}, { offset: '-90%' } );
		
	};

	// About Animate
	var aboutAnimate = function() {
		if ( $('#about').length > 0 ) {	
			$('#about .to-animate').each(function( k ) {
				var el = $(this);				
				setTimeout ( function () {
					el.addClass('fadeInUp animated');
				},  k * 200, 'easeInOutExpo' );
				
			});
		}
	};
	var aboutWayPoint = function() {
		if ( $('#about').length > 0 ) {
			$('#about').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this).hasClass('animated') ) {
					
					setTimeout(aboutAnimate, 100);
					
					$(this.element).addClass('animated');


					TweenMax.to('.sm-golden-third', 0.8, {
						x: 0,
						ease: Expo.easeOut
					});
					TweenLite.to('.area-1', 0.8, {
						x: 0,
						delay:0.2,
						ease: Expo.easeOut
					});
					TweenLite.to('.area-2 h3', 0.8, {
						x: 0,
						delay:0.4,
						ease: Expo.easeOut
					});
					TweenLite.to('.area-3 h3', 0.8, {
						x: 0,
						delay:0.4,
						ease: Expo.easeOut
					});
					// fromTo(photo, 1.5, {width:0, height:0}, {width:100, height:200});
					TweenLite.fromTo('.area-3 .offset-badge', 0.8, {
						rotation:90,
						scale:1,
						opacity:0
					}, {
						rotation:0,
						scale:1,
						opacity:1,
						delay:1,
						ease: Expo.easeOut
					});
					TweenLite.to('.area-4', 0.8, {
						x: 0,
						delay:0.6,
						ease: Expo.easeOut
					});
					}
			} , { offset: '60%' } );
		}
	};


	// Contact Animate
	var contactAnimate = function() {
		if ( $('#contact').length > 0 ) {	
			$('#contact .to-animate').each(function( k ) {
				
				var el = $(this);
				
				setTimeout ( function () {
					el.addClass('fadeInUp animated');
				},  k * 200, 'easeInOutExpo' );
				
			});
		}
	};
	var contactWayPoint = function() {
		if ( $('#contact').length > 0 ) {
			$('#contact').waypoint( function( direction ) {
				if( direction === 'down' && !$(this).hasClass('animated') ) {
					setTimeout(contactAnimate, 100);
					$(this.element).addClass('animated');
				}
			} , { offset: '75%' } );
		}
	};



	// Projects Animate
	var projectsAnimate = function() {
		if ( $('#wocky-projects').length > 0 ) {	
			$('#wocky-projects .to-animate').each(function( k ) {
				
				var el = $(this);
				
				setTimeout ( function () {
					el.addClass('fadeInUp animated');
				},  k * 200, 'easeInOutExpo' );
				
			});
		}
	};
	var projectsWayPoint = function() {
		if ( $('#wocky-projects').length > 0 ) {
			$('#wocky-projects').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this).hasClass('animated') ) {
					
					setTimeout(function(){
						$('.product-animate-1').addClass('fadeIn animated');
					}, 200);

					setTimeout(function(){
						$('.product-animate-2').addClass('fadeIn animated');
					}, 400);

					setTimeout(projectsAnimate, 800);

					$(this.element).addClass('animated');
						
				}
			} , { offset: '75%' } );
		}
	};


	// animate-box
	var contentWayPoint = function() {
		$('.animate-box').waypoint( function( direction ) {
			// log( '.animate-box waypoint');
			if( direction === 'down' && !$(this).hasClass('animated') ) {
				$(this.element).addClass('fadeInUp animated');
			}

		} , { offset: '75%' } );

	};


	// Reflect scrolling in navigation
	var navActive = function(section) {
		var el = $('#wocky-menu > nav > ul');
		el.find('li').each( function(){
			var $section = $(this).find('a').attr( 'data-nav-section' );
			// console.log( '$section: ' + $section );
			if( $section == section ) {
				$(this).addClass('active');
			} else {
				$(this).removeClass('active');
			}
		});
	};
	var navigationSection = function() {

		var $section = $('section[data-section]');
			// console.log( '$section: ' + $section );
		$section.waypoint(function(direction) {
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		    	// console.log( 'waypoint nav: ' + $(this.element).data('section') );
		  	}
		}, {
		  	offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};

	
/*
    var e = function() {
        var e = jQuery(this);
        "hidden" != e.attr("type") && e.toggleClass("not-empty", "" != e.val());
    };
    $('input[type="email"]').each(e).on("input", e);
*/

    var addFocusClass = function() {
        var el = $( this ),
        	$parent = el.parent().parent();
        if( "hidden" != el.attr("type")  ) {
        	$parent.addClass( "not-empty" );
        }
    };
    var checkIfEmpty = function() {
        var el = $( this ),
        	$parent = el.parent().parent();
        // console.log( el.val() );
        if( "hidden" != el.attr("type")  ) {
        	if( "" != el.val() && ! $parent.hasClass( "not-empty" ) ) {
        		$parent.addClass( "not-empty" );
        	} else if( "" == el.val() && $parent.hasClass( "not-empty" ) ) {
        		$parent.removeClass( "not-empty" );
        	}
        }
    };
	// Document on load.
	$(function(){

		offCanvas();
		mobileMenuOutsideClick();
		// servicesAccordion();
		carouselProjects();
		clickMenu();
		headerToggle();

		// Animations
		aboutWayPoint();
		contentWayPoint();
		navigationSection();
		// init smController
		var smController = new ScrollMagic.Controller();
	    // $("#gform_fields_1 input").each(e).on("input", e);

	    $("#gform_fields_1 textarea").each( function(){
	    	// $( this ).on("input", checkIfEmpty);
	    	$( this ).on("focus", addFocusClass);
	    	$( this ).on("blur", checkIfEmpty);
	    });
	    $("#gform_fields_1 input").each( function(){
	    	// $( this ).on("input", checkIfEmpty);
	    	$( this ).on("focus", addFocusClass);
	    	$( this ).on("blur", checkIfEmpty);
	    });

/*
		var heroTween = TweenMax.to("#home", 0.5, {
			alpha: 0.1,
			yoyo: true
		});
		var heroScene = new ScrollMagic.Scene({triggerElement: "#trigger-hero", duration: "100%"})
			.setTween( heroTween )
			// .addIndicators() // add indicators (requires plugin)
			.addTo( smController );
*/			
	});


}());