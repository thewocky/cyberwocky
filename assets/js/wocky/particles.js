/*!
 * A lightweight, dependency-free and responsive javascript plugin for particle backgrounds.
 * 
 * @author Marc Bruederlin <hello@marcbruederlin.com>
 * @version 2.0.1
 * @license MIT
 * @see https://github.com/marcbruederlin/particles.js
 */
window.particleRenderer = null;
var animationSpeed = 50,
  midPtMinPx = 5
  midPtMinRatio = 0.15,
  scrollThrottle = null,
  scrollBuffer = 50,
  scrollPos = 0,
  lastScrollPos = 0,
  bodyElement = document.getElementsByTagName("BODY")[0];



var winScroll = function() {
  scrollThrottle = null;
  var nextScrollPos = bodyElement.scrollTop;
  // log('nextScrollPos: ' + nextScrollPos + '; scrollPos: ' + scrollPos + '; lastScrollPos: ' + lastScrollPos);
  if( nextScrollPos < lastScrollPos - scrollBuffer ) {
    $( 'body').addClass( 'scrolled-up' );
    lastScrollPos = nextScrollPos + scrollBuffer;
  } else if( nextScrollPos > scrollPos ) {
    // log('scrolling down');
    if( $( 'body').hasClass( 'scrolled-up' ) ) {
      $( 'body').addClass( 'scrolled-down' ).removeClass( 'scrolled-up' );
    }
    lastScrollPos = nextScrollPos;
  }
  scrollPos = nextScrollPos;
}

var onScrollThrottle = function() {
  // console.log( 'onScrollThrottle' );
  if( ! scrollThrottle) {
    scrollThrottle = setTimeout(function() {
        winScroll();
    }, 50);
  }
}
window.onscroll = function() {
  onScrollThrottle();
};

/* exported Particles */
var Particles = (function(window, document) {
  'use strict';
  
  var Plugin, Particle = {};
  var createPlugin;

  var fgShape = document.getElementById("wocky-shape").getContext('2d');
  var fgCanvasElement = document.getElementById("wocky-shape");

  /**
   * Represents the plugin.
   * 
   * @constructor
   */
  Plugin = (function() {
    function Plugin() {
      var _ = this;

      _.defaults = {
        responsive: null,
        selector: null,
        maxParticles: 100,
        density: 4000,  // inverse: i.e. 1 particle per 4000 pixels
        sizeVariations: 3,
        sizeMin: 0,
        sizeMax: 10,
        speed: 0.1,
        color: _._hex2rgb('#000000'),
        minDistance: 120,
        connectParticles: false,
        random: true,
        masker:null,
        bounds: { x:0, y:0, width: null, height: null },
        inShape: false,
        connectionFactor: 0.75   // pt along shape connector to attach extra pts
      };

      _.element = null;
      _.context = null;
      _.ratio = null;
      _.breakpoints = [];
      _.activeBreakpoint = null;
      _.breakpointSettings = [];
      _.originalSettings = null;
      _.storage = [];
      _.scrollPos = 0;
      _.scrollThrottle = null;
      _.bodyElement = document.getElementsByTagName("BODY")[0];
    }
    return Plugin;
  }());

  /**
   * Set bounds based on options
   * 
   * @public
   * @param {object} settings
   */
  Plugin.prototype.setBounds = function() {
    var _ = this;
    if( _.options.bounds.width ) {
      _.ctxWidth = Math.round(_.options.bounds.width * targetSizeRatio);
    } else {
      _.ctxWidth = window.innerWidth;
    }
    if( _.options.bounds.height ) {
      _.ctxHeight = Math.round(_.options.bounds.height * targetSizeRatio);
    } else {
      _.ctxHeight = window.innerHeight;
    }
    if( _.options.bounds.x ) {
      _.ctxX = Math.round(_.options.bounds.x * targetSizeRatio + targetCoordsLeft + _.options.offset.x);
    } else {
      _.ctxX = 0;
    }
    if( _.options.bounds.y ) {
      _.ctxY = Math.round(_.options.bounds.y * targetSizeRatio ) + targetCoordsTop + _.options.offset.y;
    } else {
      _.ctxY = 0;
    }
  }

  /**
   * Initializes the plugin with user settings.
   * 
   * @public
   * @param {object} settings
   */
  Plugin.prototype.init = function(settings) {
    var _ = this;

    settings.color = _._hex2rgb(settings.color);
    _.options = _._extend(_.defaults, settings);
    _.originalSettings = JSON.parse(JSON.stringify(_.options));

    _.setBounds();
    // console.log('_.ctxX: ' + _.ctxX + ', ' + _.ctxY );

    _._initializeCanvas();
    _._initializeEvents();
    _._registerBreakpoints();
    _._checkResponsive();
    _._initializeStorage();
    _._animate();

    return _;
  };

  /**
   * Resets the plugin (after resize)
   * 
   * @public
   * @param {object} settings
   */
  Plugin.prototype.reset = function(settings) {
    var _ = this;
    // window.cancelAnimFrame();

    //_.init();
  };

  /**
   * Setup the canvas element.
   * 
   * @private
   */
  Plugin.prototype._initializeCanvas = function() {
    var _ = this, devicePixelRatio, backingStoreRatio;
   //  _.ratio = 1;

    if(!_.options.selector) {
      console.warn('particles.js: No selector specified! Check https://github.com/marcbruederlin/particles.js#options');
      return false;
    }

    _.element = document.querySelector(_.options.selector);
    _.context = _.element.getContext('2d');
    
// don't know what this is doing but it's not helping.
    devicePixelRatio = window.devicePixelRatio || 1;
    backingStoreRatio = _.context.webkitBackingStorePixelRatio || _.context.mozBackingStorePixelRatio || _.context.msBackingStorePixelRatio || 
                        _.context.oBackingStorePixelRatio || _.context.backingStorePixelRatio || 1;

    _.ratio = devicePixelRatio / backingStoreRatio;

    // log( '_.ratio: ' + _.ratio);

    _.element.width = window.innerWidth * _.ratio;
    _.element.height = window.innerHeight * _.ratio;
    _.element.style.width = '100%';
    _.element.style.height = '100%';

    _.context.scale(_.ratio, _.ratio);
  };

  /**
   * Register event listeners.
   * 
   * @private
   */
  Plugin.prototype._initializeEvents = function() {
    var _ = this;

    window.addEventListener('resize', _._resize.bind(_), false);
  };

  /**
   * Initialize the particle storage.
   * 
   * @private
   */
  Plugin.prototype._initializeStorage = function() {
    var _ = this,
      numParticles = _.options.maxParticles;

    _.storage = [];

    for(var i = numParticles; i--;) {
      _.storage.push(new Particle(_.context, _.options));
    }
  };

  /**
   * Register responsive breakpoints if the user declared some.
   * 
   * @private
   */
  Plugin.prototype._registerBreakpoints = function() {
    var _ = this, breakpoint, currentBreakpoint, l, responsiveSettings = _.options.responsive || null;

    if(typeof responsiveSettings === 'object' && responsiveSettings !== null && responsiveSettings.length) {
      for(breakpoint in responsiveSettings) {
        l = _.breakpoints.length - 1;
        currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

        if(responsiveSettings.hasOwnProperty(breakpoint)) {
          if(responsiveSettings[breakpoint].options.color) {
            responsiveSettings[breakpoint].options.color = _._hex2rgb(responsiveSettings[breakpoint].options.color);
          }

          while(l >= 0) {
            if(_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
              _.breakpoints.splice(l, 1);
            }

            l--;
          }

          _.breakpoints.push(currentBreakpoint);
          _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].options;
        }
      }

      _.breakpoints.sort(function(a, b) {
        return b-a;
      });
    }
  };

  /**
   * Check if a breakpoint is active and load the breakpoints options.
   * 
   * @private
   */
  Plugin.prototype._checkResponsive = function() {
    var _ = this, breakpoint, targetBreakpoint = false, windowWidth = window.innerWidth;

    if(_.options.responsive && _.options.responsive.length && _.options.responsive !== null) {
      targetBreakpoint = null;

      for(breakpoint in _.breakpoints) {
        // console.log('breakpoint: ' + breakpoint);
        if(_.breakpoints.hasOwnProperty(breakpoint)) {
          // console.log('breakpoint.hasOwnProperty');
          if(windowWidth <= _.breakpoints[breakpoint]) {
            targetBreakpoint = _.breakpoints[breakpoint];
          }
        }
      }
    // console.log('targetBreakpoint: ' + targetBreakpoint);
      if(targetBreakpoint !== null) {
        _.activeBreakpoint = targetBreakpoint;
        _.options = _._extend(_.options, _.breakpointSettings[targetBreakpoint]);
      } else {
        if(_.activeBreakpoint !== null) {
          _.activeBreakpoint = null;
          targetBreakpoint = null;
          
          _.options = _._extend(_.options, _.originalSettings);
        }
      }
    }
  };

  /**
   * Rebuild the storage and update the canvas.
   * 
   * @private
   */
  Plugin.prototype._refresh = function() {
    var _ = this;

    _._initializeStorage();
    _._update();
  };

  /**
   * Kick off various things on window resize.
   * 
   * @private
   */
  Plugin.prototype._resize = function() {
    var _ = this;

    // console.log( 'particles resize' );
    _.element.width = window.innerWidth * _.ratio;
    _.element.height = window.innerHeight * _.ratio;

    _.context.scale(_.ratio, _.ratio);

    clearTimeout(_.windowDelay);

    _.windowDelay = window.setTimeout(function() {
      _.setBounds();
      _._checkResponsive();
      _._refresh();
    }, 50);

  };
  var n = 0;
  /**
   * Animates the plugin particles by calling the draw method.
   * 
   * @private
   */
  Plugin.prototype._animate = function() {
    var _ = this;
    // log( '_animate: ' + _.options.speed );
    if( !_.options.speed ){
      if( n < 3 ){
        n ++;
        _._draw();
        window.requestAnimFrame(_._animate.bind(_));
      } else {
        _._draw();
      }
    } else {
      _._draw();
      window.requestAnimFrame(_._animate.bind(_));
    }
  };

  /**
   * Draws the plugin particles.
   * 
   * @private
   */
  Plugin.prototype._draw = function() {
    var _ = this;
    // console.log( 'draw' );
    _.context.clearRect(0, 0, _.element.width, _.element.height);
    
    for(var i = _.storage.length; i--;) {
      var particle = _.storage[i];
      particle._draw();
    }
  // log( 'scrollTop: ' + _.bodyElement.scrollTop );
    _._update();
  };


  /**
   * Updates the particle movements.
   * 
   * @private
   */
  Plugin.prototype._update = function() {
    var _ = this;
      // console.log( '_.options.bounds.x: ' + _.options.bounds.x );
    // console.log( 'update: ' + _.options.masker );

    for(var i = _.storage.length; i--;) {
      var particle = _.storage[i],
        xNext = particle.x + particle.vx,
        yNext = particle.y + particle.vy;
      
      if(xNext > _.ctxX + _.ctxWidth || xNext < _.ctxX) {
        particle.vx *= -1;
      }          
      if(xNext > _.ctxY + _.ctxHeight || xNext < _.ctxY) {
        particle.vy *= -1;
      }

      particle.x += particle.vx;
      particle.y += particle.vy;

      if(particle.x > _.ctxX + _.ctxWidth) {
        particle.x = _.ctxX;
      } else if(particle.x < _.ctxX) {
        particle.x = _.ctxX + _.ctxWidth;
      }          
      if(particle.y > _.ctxY + _.ctxHeight) {
        particle.y = _.ctxY;
      } else if(particle.y < _.ctxY) {
        particle.y = _.ctxY + _.ctxHeight;
      }


      // connect particle to closest segment of shape
      // var svgHitPoint = _.exclude ? findClosestSegment( {x:particle.x, y:particle.y } ) : false;
      var svgHitPoint = false;
      // var svgHitPoint = findClosestSegment( {x:particle.x, y:particle.y } );

      // console.log( 'svgHitPoint' );
      // console.log( svgHitPoint);

      if( svgHitPoint && !particle.inShape) {
      // if( svgHitPoint) {
//         console.log( 'render ' + svgHitPoint.x + ', ' + svgHitPoint.y );

          var segmentPt1 = {
            x:svgHitPoint.targSegment.x1,
            y:svgHitPoint.targSegment.y1
          }, segmentPt2 = {
            x:svgHitPoint.targSegment.x2,
            y:svgHitPoint.targSegment.y2
          };

          // console.log( 'calculateDistance' );
          // console.log( svgHitPoint.targPt );
          // console.log( segmentPt1 );
          var connectDistance = _._connectParticles(particle, svgHitPoint.targPt, true, false);
          _.options.x = svgHitPoint.targPt.x;
          _.options.y = svgHitPoint.targPt.y;
          
          // connect ends of segment with point 3/4 toward shape
          if( connectDistance ) {
            // midPtMinRatio
            var connectAngle = Math.atan2(connectDistance.h, connectDistance.w),
              midPtDist = connectDistance.len > midPtMinPx ? midPtMinPx : connectDistance.len,
              connectionPtPercentage = {
                x: particle.x - connectDistance.w * _.options.connectionFactor,
                y: particle.y - connectDistance.h * _.options.connectionFactor
              },
              connectionPt1 = {
                x: svgHitPoint.targPt.x + Math.cos(connectAngle) * midPtDist,
                y: svgHitPoint.targPt.y + Math.sin(connectAngle) * midPtDist
              };
              // cancel b/c scrolling
              // clr = 'rgba(111,126,168, ' + connectDistance.opacity + ')';
              // offset segment points from path by just a bit (1px * angle)
              segmentPt1.x += Math.cos(connectAngle);
              segmentPt1.y += Math.sin(connectAngle);
              segmentPt2.x += Math.cos(connectAngle);
              segmentPt2.y += Math.sin(connectAngle);
/*
// scrolling screws this up
            var segmentConnect1 = _._connectParticles(connectionPt1, segmentPt1, true, clr, scrollPos ),
                segmentConnect2 = _._connectParticles(connectionPt1, segmentPt2, true, clr, scrollPos );
*/            
          }
      }
        
      if( _.options.connectParticles ) {
        for(var j = i + 1; j < _.storage.length; j++) {
          var particle2 = _.storage[j];
/*
          if( !particle.inShape || !particle2.inShape ) {
          }
          */

            _._connectParticles(particle, particle2, false, false);
        }
      }
    }
  };

  /**
   * Calculates the distance between two particles in pixels.
   * 
   * @private
   * @param {Particle} p1
   * @param {Particle} p2
   */
  // Plugin.prototype._connectParticles = function(p1, p2, distOverride, clr, addScroll) {
  Plugin.prototype._connectParticles = function(p1, p2, distOverride, clr) {
    var _ = this;

    var dx = p1.x - p2.x, dy = p1.y - p2.y,  
        // minDistance = distOverride ? 1.5 * _.options.minDistance : _.options.minDistance;
        minDistance = _.options.minDistance,
        n = Math.sqrt(dx * dx + dy * dy),
        opacity = (1.02 - n / minDistance);
        // opacity = _.exclude ? (1.02 - n / minDistance) : 1;
      
      if( n <= minDistance ) {
        
        // console.log( 'render distance: ' + n + ', ' + distOverride );

        _.context.beginPath();
        if( clr ) {
          _.context.strokeStyle = clr;
        } else {
          _.context.strokeStyle = 'rgba(' + _.options.color.r + ', ' + _.options.color.g + ', ' + _.options.color.b + ', ' + opacity + ')';
        }
        _.context.moveTo(p1.x, p1.y);
        _.context.lineTo(p2.x, p2.y);
//         _.context.lineTo(p2.x, p2.y - addScroll);
        _.context.stroke();
        _.context.closePath();

        var lineObj = {
          // distance:( minDistance - n ) / minDistance,
          len: n,
          w:dx,
          h:dy,
          opacity:opacity
        }

        return lineObj;
      }
  };

  /**
   * Merges the keys of two objects.
   * 
   * @private
   * @param {object} source
   * @param {object} obj
   */
  Plugin.prototype._extend = function(source, obj) {
    Object.keys(obj).forEach(function(key) {
      source[key] = obj[key];
    });
    
    return source;
  };

  /**
   * Converts a hex string to a rgb object.
   * 
   * @private
   * @param {string} hex
   * @return {object}
   */
  Plugin.prototype._hex2rgb = function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  /**
   * Represents a single particle.
   * 
   * @constructor
   * @param {object} context
   * @param {object} options
   * 
   */
  Particle = function(context, options) {
    var _ = this,
      pointInPath = false;

    _.context = context;
    _.options = options;

    // log( 'targetCoordsLeft: ' + targetCoordsLeft + '; ' +targetSizeRatio + '; ' + _.options.offset.y + '; ' + _.options.bounds.y );
/*    
    addPoint(p1.x * targetSizeRatio * xMultiplier + targetCoordsLeft + bgParticleSettings.offset.x,
      p1.y * targetSizeRatio + targetCoordsTop + bgParticleSettings.offset.y,
*/
    // log( options.bounds );
//     targetCoordsLeft = x + (innerPadding * targetSizeRatio);
    if( _.options.bounds.width ) {
      _.ctxWidth = Math.round(_.options.bounds.width * targetSizeRatio);
    } else {
      _.ctxWidth = window.innerWidth;
    }
    if( _.options.bounds.height ) {
      _.ctxHeight = Math.round(_.options.bounds.height * targetSizeRatio);
    } else {
      _.ctxHeight = window.innerHeight;
    }
    if( _.options.bounds.x ) {
      _.ctxX = Math.round(_.options.bounds.x * targetSizeRatio + targetCoordsLeft + _.options.offset.x);
    } else {
      _.ctxX = 0;
    }
    if( _.options.bounds.y ) {
      _.ctxY = Math.round(_.options.bounds.y * targetSizeRatio ) + targetCoordsTop + _.options.offset.y;
    } else {
      _.ctxY = 0;
    }

    if( _.options.random ) {
      // initial placement
      // avoid ctr circle
      _.x = _.ctxX + Math.random() * _.ctxWidth;
      _.y = _.ctxY + Math.random() * _.ctxHeight;
      _.vx = Math.random() * _.options.speed * 2 - _.options.speed;
      _.vy = Math.random() * _.options.speed * 2 - _.options.speed;
      _.radius = _.options.sizeMin + Math.random() * Math.random() * _.options.sizeVariations;
    } else {
      _.x = _.ctxX + _.options.x;
      _.y = _.ctxY + _.options.y + _.options.offset.y;
      _.radius = _.options.size;
    }
    _._draw( pointInPath );
  };

  /**
   * Detect Shape collision
   * 
   * @private
   */
  Plugin.prototype._inShape = function( coords ) {
    /* Source and target objects contain x, y and width, height */

    if( ! shapePath ) {
      return false;
    } else {
      return fgShape.isPointInPath(shapePath, coords.x, coords.y );
    }

  }


  /**
   * The particles draw function (renders the circle).
   * 
   * @private
   */
  Particle.prototype._draw = function() {
    var _ = this;

    if( !_.options.exclude ) {
      _.inShape = false;
    } else if( fgShape && shapePath ) {
      _.inShape = fgShape.isPointInPath(shapePath, _.x, _.y );
    }
    if( !_.inShape && _.radius ) {
      _.context.fillStyle = 'rgb(' + _.options.color.r + ', ' + _.options.color.g  + ', ' + _.options.color.b + ')';
      _.context.beginPath();
      _.context.arc(_.x, _.y, _.radius, 0, Math.PI * 2, false);
      _.context.fill();
    }
  };

  /**
   * A polyfill for requestAnimFrame.
   * 
   * @return {function}
   */
  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, animationSpeed);
      };
  })();

  window.cancelAnimFrame = (function() {
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame ||
      function(callback) {
        clearTimeout(callback); //fall back
      };
  })();


  return new Plugin();
})(window, document);

(function() {
  'use strict';

  if(typeof define === 'function' && define.amd) {
    define('Particles', function () { return Particles; });
  } else if(typeof module !== 'undefined' && module.exports) {
    module.exports = Particles;
  } else {
    window.Particles = Particles;
  }
})();
