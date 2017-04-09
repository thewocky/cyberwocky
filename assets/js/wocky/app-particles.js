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
  shapeCanvasElement = document.getElementById("wocky-shape"),
  fgCanvasElement = document.getElementById("wocky-bg"),
  bgCanvasElement = document.getElementById("particle-field"),
  wockySource = document.getElementById("wocky-svg"),
  bgCanvasElements = document.getElementsByClassName("background");
  fgCanvasElements = document.getElementsByClassName("foreground");
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
    maxParticles: 200,
    sizeVariations: 0,
    sizeMin: 0,
    speed: 0.5, // 1.8
    color:  '#3d455c', // '#4d5875',  // 6f7ea8
    minDistance: 120,
    connectParticles: true,
    responsive: null,
    offset: { x:0, y:0 },
    exclude: true, // don't draw overlap with outer shape
    responsive: [
    {
       breakpoint: 1000,
       options: {
         maxParticles: 160
       }
     }, {
       breakpoint: 768,
       options: {
         maxParticles: 100
       }
     }, {
       breakpoint: 425,
       options: {
         maxParticles: 80
       }
     }, {
       breakpoint: 320,
       options: {
         maxParticles: 50
       }
     }
   ]
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
var setCoords = function( x, y, len, svgSize ) {
// log( 'set Coords: ' + svgSize );
  targetSizeRatio = svgSize * len / boundDimensions ;
  bgParticleSettings.offset.x = -Math.round(innerPadding * targetSizeRatio);
  bgParticleSettings.offset.y = -Math.round(innerPadding * targetSizeRatio);
  ctrOffset = { x: x, y: y};

  targetCoordsLeft = x + (innerPadding * targetSizeRatio);
  targetCoordsTop = y + (innerPadding * targetSizeRatio);
  xMultiplier = window.innerWidth / winw;
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
  shapeCanvasElement.width = winw;
  shapeCanvasElement.height = winh;

  var devicePixelRatio, backingStoreRatio;

  var ctxFg = fgCanvasElement.getContext("2d"),
    ctxGlow = shapeCanvasElement.getContext("2d"),
    targetSize,
    devicePixelRatio = window.devicePixelRatio || 1;
    backingStoreRatio = ctxFg.webkitBackingStorePixelRatio || ctxFg.mozBackingStorePixelRatio || ctxFg.msBackingStorePixelRatio || 
                        ctxFg.oBackingStorePixelRatio || ctxFg.backingStorePixelRatio || 1;

  var canvasRatio = ( devicePixelRatio / backingStoreRatio ),
    svgSize = 0.01 * parseFloat( window.getComputedStyle(wockySource).width ) * canvasRatio,   // css w/h of svg
    svgSize = 0.01 * parseFloat( window.getComputedStyle(wockySource).width ),   // try w/o canvas ratio
    canvasWidth = Math.round(svgSize * winw),
    canvasHeight = Math.round(svgSize * winh);
  // must explicitly define element dimensions

//   console.log( 'svgSize: ' + svgSize + ', ' + canvasWidth + ', ' + canvasHeight );

  var targetSize = ( winw > winh ) ? ( winh - 2 ) : ( winw - 2 ),
    canvasSize = ( canvasWidth > canvasHeight ) ? ( canvasHeight - 2 ) : ( canvasWidth - 2 ),
    ptLeft = 0.5 * ( winw - canvasSize ),
    ptTop = 0.5 * ( winh - canvasSize );

  setCoords( ptLeft, ptTop, targetSize, svgSize );

// 1: trace & fill outer svg path follow 
  ctxFg.fillStyle = fgInnerColor;
  ctxGlow.fillStyle = fgInnerColor;
  var svgPath = document.getElementById( 'logo-outer-path' ).getAttribute( 'd' );
  shapePath = new Path2D( svgPath );

  ctxFg.translate( ctrOffset.x, ctrOffset.y  );
  ctxFg.scale( targetSizeRatio, targetSizeRatio );
  ctxFg.closePath();
  // add outer glow
  ctxFg.fill( shapePath );
  ctxFg.restore();

  ctxGlow.translate( ctrOffset.x, ctrOffset.y  );
  ctxGlow.scale( targetSizeRatio, targetSizeRatio );
  ctxGlow.closePath();
  ctxGlow.shadowBlur = 60;
  ctxGlow.shadowColor = fgShadowColor;
  ctxGlow.fill( shapePath );
  ctxGlow.restore();

  // 2: knock out next set of paths for inner text
  ctxFg.globalCompositeOperation = "destination-out";
  var svgLetters = document.getElementsByClassName("logo-path-outer"),
    svgRects = document.getElementsByClassName("logo-rect-outer");
  var i, svgLen = svgLetters.length;
  for (i = 0; i < svgLen; i++) {
      var ltrPath = svgLetters[i].getAttribute( 'd' );
      var ltrPath2d = new Path2D( ltrPath );
      ctxFg.fill( ltrPath2d );
  }
  svgLen = svgRects.length;

  for (i = 0; i < svgLen; i++) {
      ctxFg.fillRect( svgRects[i].getAttribute( 'x' ),
        svgRects[i].getAttribute( 'y' ),
        svgRects[i].getAttribute( 'width' ),
        svgRects[i].getAttribute( 'height' ) );
  }

  // 3: add clr & inner glow for logo text
  ctxGlow.globalCompositeOperation = ("source-over");
  ctxGlow.fillStyle = innerTextColor;
  ctxGlow.strokeStyle = innerTextShadowColor;

  // save, .beginPath, lots of path commands (no strokes/fills), .clip, stroke/fill, .restore
  ctxGlow.lineWidth = 1;
  ctxGlow.filter = 'blur(1px)';
  svgLen = svgLetters.length;
  for (i = 0; i < svgLen; i++) {
      var ltrPath = svgLetters[i].getAttribute( 'd' );
      var ltrPath2d = new Path2D( ltrPath );
      // ctxGlow.fill( ltrPath2d );
      ctxGlow.save();
      ctxGlow.clip( ltrPath2d );
      ctxGlow.fill( ltrPath2d );
      ctxGlow.stroke( ltrPath2d );
      ctxGlow.restore();
  }

  var svgRects = document.getElementsByClassName("logo-rect-outer");
  svgLen = svgRects.length;
  for (i = 0; i < svgLen; i++) {
      // var ltrPath = svgRects[i].getAttribute( 'd' );
      // var ltrPath2d = new Path2D( ltrPath );
      ctxGlow.save();
      ctxGlow.rect( svgRects[i].getAttribute( 'x' ),
        svgRects[i].getAttribute( 'y' ),
        svgRects[i].getAttribute( 'width' ),
        svgRects[i].getAttribute( 'height' ) );
      ctxGlow.clip();
      ctxGlow.fillRect( svgRects[i].getAttribute( 'x' ),
        svgRects[i].getAttribute( 'y' ),
        svgRects[i].getAttribute( 'width' ),
        svgRects[i].getAttribute( 'height' ) );
      ctxGlow.strokeRect( svgRects[i].getAttribute( 'x' ),
        svgRects[i].getAttribute( 'y' ),
        svgRects[i].getAttribute( 'width' ),
        svgRects[i].getAttribute( 'height' ) );
      ctxGlow.restore();
  }
/*
  ctxFg.strokeStyle = 'white';
  ctxFg.lineWidth = 1;
  ctxFg.filter = null;
  ctxFg.save();
  ctxFg.fillRect( ctrTextBounds.x,
    ctrTextBounds.y,
    ctrTextBounds.width,
    ctrTextBounds.height );
  ctxFg.restore();
*/
};

window.onload = function() {

  drawForeground( fgCanvasElement );
  initParticles();

  updateLogoContour(); 


}

window.addEventListener('resize', onWindowResize, false);
