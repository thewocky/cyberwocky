/*!
 * config particles
 */
// $glow-blue: rgb(207,219,255);
var resizeThrottle,
  targetCoordsLeft = 0,
  targetCoordsTop = 0,
  targetSizeRatio = 1,
  targetPadding = 30,
  ctrOffset = { x: 0, y: 0 },
  boundDimensions = 320,  // outer square containing svg including glow
  shapeDimensions = 260,  // bounds of inner shpe
  innerPadding = 0.5 * ( boundDimensions - shapeDimensions ),      // padding between outer bounds and shape to accommodate glow
  textCanvasElement = document.getElementById("wocky-text"),
  fgCanvasElement = document.getElementById("wocky-shape"),
  bgCanvasElement = document.getElementById("particle-field"),
  scrollbarWidth = 15,
  winw = window.innerWidth - scrollbarWidth,
  winh = window.innerHeight,
  shapePath = null,   // Path2D object
  fgInnerColor = "rgba(19,23,34,1)",
  fgShadowColor = "rgba(207,219,255,0.3)",
  innerTextColor = "rgba(207,219,255,0.3)",
  innerTextShadowColor = "rgba(207,219,255,1)",
  bgParticles = null,
  fgParticles = null,

  ctrTextBounds = {x: 51,
    y:154,
    width:220,
    height:30 };


  var bgParticleSettings = {
    selector: '#particle-field',
    maxParticles: 240,
    sizeVariations: 0,
    sizeMin: 0,
    speed: 0, // 1.8
    color:  '#FFFFFF',
    minDistance: 120,
    connectParticles: true,
    responsive: null,
    offset: { x:0, y:0 },
    exclude: true, // don't draw overlap with outer shape
    responsive: [
    {
       breakpoint: 1000,
       options: {
         maxParticles: 200
       }
     }, {
       breakpoint: 768,
       options: {
         maxParticles: 160
       }
     }, {
       breakpoint: 425,
       options: {
         maxParticles: 120
       }
     }, {
       breakpoint: 320,
       options: {
         maxParticles: 80
       }
     }
   ]
  };

  var fgParticleSettings = {
    selector: '#particle-field',
    maxParticles: 30,
    sizeVariations: 0,
    sizeMin: 0,
    speed: 2,
    color:  '#FFFF00',
    minDistance: 80,
    connectParticles: true,
    responsive: null,
    offset: { x:0, y:0 },
    bounds: ctrTextBounds,
    exclude: false
  };

function getScrollWidth () {

  if ( "undefined" != typeof Modernizr && Modernizr.touch )  
  {
    return 0;
  } else {
    
    var inner = document.createElement('div');
    inner.id = "scrollInnerEl";
    var outer = document.createElement('div');
    outer.id = "scrollWidthEl";
    outer.appendChild(inner);
    outer.style.position = 'absolute';
    outer.style.top = '-1000px';
    outer.style.width = '100px';
    outer.style.height = '100px';
    outer.style.left = '-1000px';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);

    var outerScrollEl = document.getElementById("scrollWidthEl"),
      innerScrollEl = document.getElementById("scrollInnerEl"),
      scrollbarWidth = outerScrollEl.offsetWidth - innerScrollEl.offsetWidth;

    document.body.removeChild( outer );
    return scrollbarWidth;
  }
}

scrollbarWidth = getScrollWidth();

var getScreenDim = function() {
  winw = window.innerWidth - getScrollWidth();
  winh = window.innerHeight;
}
var setCoords = function( x, y, len ) {

  targetSizeRatio = len / boundDimensions ;
  bgParticleSettings.offset.x = -Math.round(innerPadding * targetSizeRatio);
  bgParticleSettings.offset.y = -Math.round(innerPadding * targetSizeRatio);
  fgParticleSettings.offset.x = -Math.round(innerPadding * targetSizeRatio);
  fgParticleSettings.offset.y = -Math.round(innerPadding * targetSizeRatio);
  ctrOffset = { x: x, y: y};

  // ctrOffset.x
  // console.log('targetSizeRatio: ' + targetSizeRatio );
  targetCoordsLeft = x + (innerPadding * targetSizeRatio);
  targetCoordsTop = y + (innerPadding * targetSizeRatio);
  // winw = window.innerWidth - scrollbarWidth;
  // winh = window.innerHeight;
  xMultiplier = window.innerWidth / winw;

  // fgCanvasElement.setAttribute( 'style', 'left:-' + 0.0033 * winw + 'px' );

  // log( 'setCoords: xMultiplier = ' + xMultiplier + '; len = ' + winw );
  
}

var traceMoveTo = function( ctx, x, y ) {
  // var targetPadding = 40;
  var svgPath = document.getElementById( 'logo-outer-path' ),
    svgWidth = svgPath.getBoundingClientRect().width,
    svgHeight = svgPath.getBoundingClientRect().height;

  ctx.moveTo( x * targetSizeRatio + targetCoordsLeft,
    y * targetSizeRatio + targetCoordsTop );   

}
var traceBezierCurveTo = function( ctx, x1, y1, x2, y2, x3, y3 ) {
  ctx.bezierCurveTo( x1 * targetSizeRatio + targetCoordsLeft, 
    y1 * targetSizeRatio + targetCoordsTop, 
    x2 * targetSizeRatio + targetCoordsLeft, 
    y2 * targetSizeRatio + targetCoordsTop, 
    x3 * targetSizeRatio + targetCoordsLeft, 
    y3 * targetSizeRatio + targetCoordsTop );
}
var traceLineTo = function( ctx, x1, y1 ) {
  ctx.lineTo( x1 * targetSizeRatio + targetCoordsLeft, 
    y1 * targetSizeRatio + targetCoordsTop );

}


var onWindowResize = function() {
    resizeThrottle && clearTimeout(resizeThrottle), resizeThrottle = setTimeout(function() {
      drawForeground( fgCanvasElement );
      updateLogoContour();
      // initParticles();
    }, 500);
  },


initParticles = function() {

  // fgParticles = Particles.init( fgParticleSettings );
  // set coords for ctr square
  // adjust padding responsively

  // drawForeground( fgCanvasElement );

  //random particle generator
/*  
  bgParticles = new Particles();
  bgParticles.init( bgParticleSettings );
*/
  // bgParticles = new Particles( window, document );
  // bgParticles.init( bgParticleSettings );
  bgParticles = Particles.init( bgParticleSettings );
  // fgParticles = Particles.init( fgParticleSettings );

  // fgParticles = new Particles( window, document );
  // fgParticles.init( fgParticleSettings );

}


var drawForeground = function( el ) {

  if(! el ) {
    console.warn('No selector specified!');
    return false;
  }

  getScreenDim();
  fgCanvasElement.width = winw;
  fgCanvasElement.height = winh;
  bgCanvasElement.width = winw;
  bgCanvasElement.height = winh;

  var devicePixelRatio, backingStoreRatio;

  var ctx = el.getContext("2d"),
    targetSize,
    devicePixelRatio = window.devicePixelRatio || 1;
    backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || 
                        ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;

  var canvasRatio = devicePixelRatio / backingStoreRatio;

  var canvasWidth = winw * canvasRatio,
    canvasHeight = winh * canvasRatio;
  // must explicitly define element dimensions

  var targetSize = ( winw > winh ) ? ( winh - 2 ) : ( winw - 2 ),
    ptLeft = 0.5 * ( winw - targetSize ),
    ptTop = 0.5 * ( winh - targetSize );

  setCoords( ptLeft, ptTop, targetSize );

// 1: trace & fill outer svg path follow 
  ctx.fillStyle = fgInnerColor;
  var svgPath = document.getElementById( 'logo-outer-path' ).getAttribute( 'd' );
  shapePath = new Path2D( svgPath );

  ctx.translate( ctrOffset.x, ctrOffset.y  );
  ctx.scale( targetSizeRatio, targetSizeRatio );
  ctx.closePath();
  // add outer glow
  ctx.shadowBlur = 60;
  ctx.shadowColor = fgShadowColor;
  ctx.fill( shapePath );
  ctx.restore();

  // 2: knock out next set of paths for inner text
  ctx.globalCompositeOperation = "destination-out";
  var svgLetters = document.getElementsByClassName("logo-path-outer"),
    svgRects = document.getElementsByClassName("logo-rect-outer");
  var i, svgLen = svgLetters.length;
  for (i = 0; i < svgLen; i++) {
      var ltrPath = svgLetters[i].getAttribute( 'd' );
      var ltrPath2d = new Path2D( ltrPath );
      ctx.fill( ltrPath2d );
  }
  svgLen = svgRects.length;

  for (i = 0; i < svgLen; i++) {
      ctx.fillRect( svgRects[i].getAttribute( 'x' ),
        svgRects[i].getAttribute( 'y' ),
        svgRects[i].getAttribute( 'width' ),
        svgRects[i].getAttribute( 'height' ) );
  }

  // 3: add clr & inner glow for logo text
  ctx.globalCompositeOperation = ("source-over");
  ctx.fillStyle = innerTextColor;
  ctx.strokeStyle = innerTextShadowColor;

  // save, .beginPath, lots of path commands (no strokes/fills), .clip, stroke/fill, .restore
  ctx.lineWidth = 1;
  ctx.filter = 'blur(1px)';
  svgLen = svgLetters.length;
  for (i = 0; i < svgLen; i++) {
      var ltrPath = svgLetters[i].getAttribute( 'd' );
      var ltrPath2d = new Path2D( ltrPath );
      // ctx.fill( ltrPath2d );
      ctx.save();
      ctx.clip( ltrPath2d );
      ctx.fill( ltrPath2d );
      ctx.stroke( ltrPath2d );
      ctx.restore();
  }

  var svgRects = document.getElementsByClassName("logo-rect-outer");
  svgLen = svgRects.length;
  for (i = 0; i < svgLen; i++) {
      // var ltrPath = svgRects[i].getAttribute( 'd' );
      // var ltrPath2d = new Path2D( ltrPath );
      ctx.save();
      ctx.rect( svgRects[i].getAttribute( 'x' ),
        svgRects[i].getAttribute( 'y' ),
        svgRects[i].getAttribute( 'width' ),
        svgRects[i].getAttribute( 'height' ) );
      ctx.clip();
      ctx.fillRect( svgRects[i].getAttribute( 'x' ),
        svgRects[i].getAttribute( 'y' ),
        svgRects[i].getAttribute( 'width' ),
        svgRects[i].getAttribute( 'height' ) );
      ctx.strokeRect( svgRects[i].getAttribute( 'x' ),
        svgRects[i].getAttribute( 'y' ),
        svgRects[i].getAttribute( 'width' ),
        svgRects[i].getAttribute( 'height' ) );
      ctx.restore();
  }
/*
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  ctx.filter = null;
  ctx.save();
  ctx.fillRect( ctrTextBounds.x,
    ctrTextBounds.y,
    ctrTextBounds.width,
    ctrTextBounds.height );
  ctx.restore();
*/
};

window.onload = function() {

  drawForeground( fgCanvasElement );
  initParticles();

  updateLogoContour();

}

window.addEventListener('resize', onWindowResize, false);
