"use strict";
/*
http://codepen.io/osublake/pen/jbVPqw
*/
console.clear();

var log = console.log.bind(console);
var $$ = document.querySelector.bind(document);

var svgns = "http://www.w3.org/2000/svg";
var create = document.createElementNS.bind(document, svgns);
var mouse = { x: 0, y: 0 };
var points = [];

var svg = $$("svg");
var range = $$("#range");
var value = $$("#value");
var rects = $$("#bounds");
var inner = $$("#inner");
var outer = $$("#outer");
var path = $$("#logo-outer-path");
var edge = $$("#edge");
var dist = $$("#dist");

var xMultiplier = 1;
var threshold = 15; //px
var tolerance = 25;

var values = MorphSVGPlugin.pathDataToBezier("#logo-outer-path");
var total = values.length;

var offsetX,
    offsetY,
    ratioX,
    ratioY;
/*
rects.addEventListener("change", toggleBounds);
range.addEventListener("input", updateLogoContour);
range.addEventListener("change", updateLogoContour);
*/
/*
document.body.addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  var mouseHit = mouseTest(mouse);
  console.log( 'mouseHit: ' + mouseHit );
  // console.log( mouseHit );
});
*/

//
// UPDATE
// ===========================================================================
function updateLogoContour() {

  clearInner();

//   tolerance = value.innerHTML = +range.value;
//  size of bonding rectangles
  tolerance = 2;

  points = getContour(values, tolerance);
  var total = points.length - 1;

  for (var i = 0; i < total; i++) {

    var p1 = points[i];
    var p2 = points[i + 1];
    addRect(p1, p2);
  }

}

//
// GET CONTOUR
// ===========================================================================
function getContour(bezier, tolerance) {

  var points = [bezier[0]];
  var total = bezier.length;

  for (var i = 1; i < total;) {
    var p1 = bezier[i - 1];
    var p2 = bezier[i++];
    var p3 = bezier[i++];
    var p4 = bezier[i++];

    addPoint(p1.x * targetSizeRatio * xMultiplier + targetCoordsLeft + bgParticleSettings.offset.x,
      p1.y * targetSizeRatio + targetCoordsTop + bgParticleSettings.offset.y,
      p2.x * targetSizeRatio * xMultiplier + targetCoordsLeft + bgParticleSettings.offset.x,
      p2.y * targetSizeRatio + targetCoordsTop + bgParticleSettings.offset.y,
      p3.x * targetSizeRatio * xMultiplier + targetCoordsLeft + bgParticleSettings.offset.x,
      p3.y * targetSizeRatio + targetCoordsTop + bgParticleSettings.offset.y,
      p4.x * targetSizeRatio * xMultiplier + targetCoordsLeft + bgParticleSettings.offset.x,
      p4.y * targetSizeRatio + targetCoordsTop + bgParticleSettings.offset.y);

  }

  points.push(bezier[total - 1]);

  // trim first and last: random point off left + top
  var last = points.pop();
  var first = points.shift();
  return points;

  function addPoint(x1, y1, x2, y2, x3, y3, x4, y4) {

    // Calculate all the mid-points of the line segments
    //----------------------
    var x12 = (x1 + x2) / 2;
    var y12 = (y1 + y2) / 2;
    var x23 = (x2 + x3) / 2;
    var y23 = (y2 + y3) / 2;
    var x34 = (x3 + x4) / 2;
    var y34 = (y3 + y4) / 2;

    var x123 = (x12 + x23) / 2;
    var y123 = (y12 + y23) / 2;
    var x234 = (x23 + x34) / 2;
    var y234 = (y23 + y34) / 2;
    var x1234 = (x123 + x234) / 2;
    var y1234 = (y123 + y234) / 2;

    // Try to approximate the full cubic curve by a single straight line
    //------------------
    var dx = x4 - x1;
    var dy = y4 - y1;

    var d2 = Math.abs((x2 - x4) * dy - (y2 - y4) * dx);
    var d3 = Math.abs((x3 - x4) * dy - (y3 - y4) * dx);

    if ((d2 + d3) * (d2 + d3) < tolerance * (dx * dx + dy * dy)) {
      points.push({ x: x1234, y: y1234 });
      return;
    }

    // Continue subdivision
    //----------------------
    addPoint(x1, y1, x12, y12, x123, y123, x1234, y1234);
    addPoint(x1234, y1234, x234, y234, x34, y34, x4, y4);
  }
}
/*
*/
//
// MOUSE HIT TEST
// ===========================================================================
function mouseTest(point) {

  var total = points.length - 1;

  var res = {
    edge: 0,
    point: {},
    dist: Infinity,
    distSq: Infinity
  };


  for (var i = 0; i < total; i++) {

    // var p1 = points[i];
    var p2 = points[i + 1] || points[0];

    var p1 = {
      x: points[i].x * targetSizeRatio + targetCoordsLeft,
      y: points[i].y * targetSizeRatio + targetCoordsTop
    };
    p2 = {
      x: p2.x * targetSizeRatio + targetCoordsLeft,
      y: p2.y * targetSizeRatio + targetCoordsTop
    };

    pointDist(point, p1, p2, i, res);
  }

}
/*
*/

//
// HIT TEST
// ===========================================================================
function findClosestSegment(point) {

  var total = points.length - 1;

  var res = {
    edge: 0,
    point: {},
    dist: Infinity,
    distSq: Infinity
  };

  for (var i = 0; i < total; i++) {

    // var p1 = points[i];
    var p2 = points[i + 1] || points[0];
/*
    var targetCoordsLeft = targetCoordsLeft - targetPadding,
     targetCoordsTop = targetCoordsTop - targetPadding;
*/
    var p1 = {
      x: points[i].x,
      y: points[i].y
    };
    p2 = {
      x: p2.x,
      y: p2.y
    };
    // console.log( 'findClosestSegment: point' );
    // console.log( p1 );
    // console.log( p2 );
    // console.log( targetSizeRatio + targetCoordsLeft + '; ' + targetCoordsTop);

    pointDist(point, p1, p2, i, res);
  }

  var e1 = points[res.edge];
  var e2 = points[res.edge + 1];
  var sourcePt = {
    x: point.x,
    y: point.y
  };
/*
  var sourcePt = {
    x: (point.x ) / targetSizeRatio,
    y: (point.y ) / targetSizeRatio
  };
*/  
/*
  var targPt = {
    x: (res.point.x - targetCoordsLeft ) / targetSizeRatio,
    y: (res.point.y - targetCoordsTop ) / targetSizeRatio
  };
*/  
  var targPt = {
    x: res.point.x,
    y: res.point.y
  };
  // distance from point to segment
  var dx = targPt.x - sourcePt.x,
      dy = targPt.y - sourcePt.y,  
      distToSegment = Math.sqrt(dx * dx + dy * dy);
  if( !e1 || distToSegment > 800 ) {
    // console.log( '!e1 : ' + e1 + '; ' + distToSegment);

    return false;
  } else {
    // console.log( 'render ' + targPt.x + ', ' + targPt.y );
   // return targPt;

  }
/*
  var x1 = point.x - targetCoordsLeft ) / targetSizeRatio,
      y1 = (point.y - targetCoordsTop ) / targetSizeRatio,
      x2 = (res.point.x - targetCoordsLeft ) / targetSizeRatio,
      y2 = (res.point.y - targetCoordsTop ) / targetSizeRatio;
*/

  // describes line segment on target path
/*
  TweenLite.set(edge, {
    stroke: res.dist < threshold ? "green" : "#ec0000",
    attr: {
      x1: e1.x,
      y1: e1.y,
      x2: e2.x,
      y2: e2.y
    } });

  // describes line from point to segment
  TweenLite.set(dist, { attr: {
      x1: sourcePt.x,
      y1: sourcePt.y,
      x2: targPt.x,
      y2: targPt.y
    } });
*/
// console.log( 'offset x: ' + bgParticleSettings.offset.x + ', y: ' + bgParticleSettings.offset.y );
  
  return {
/*    
    targSegment: {
      x1: e1.x * targetSizeRatio + targetCoordsLeft,
      y1: e1.y * targetSizeRatio + targetCoordsTop,
      x2: e2.x * targetSizeRatio + targetCoordsLeft,
      y2: e2.y * targetSizeRatio + targetCoordsTop
    },
*/
    targSegment: {
      x1: e1.x,
      y1: e1.y,
      x2: e2.x,
      y2: e2.y
    },
/*    

    targSegment: {
      x1: ( e1.x - targetCoordsLeft ) / targetSizeRatio,
      y1: ( e1.y - targetCoordsTop ) / targetSizeRatio,
      x2: ( e2.x - targetCoordsLeft ) / targetSizeRatio,
      y2: ( e2.y - targetCoordsTop ) / targetSizeRatio
    },



    targSegment: {
      x1: e1.x,
      y1: e1.y,
      x2: e2.x,
      y2: e2.y
    },
*/    


    targPt: targPt
  };


  // console.log( 'dist: ' + dist);
}

//
// POINT DIST
// ===========================================================================
function pointDist(point, p1, p2, edge, res) {

  var x = point.x;
  var y = point.y;
  var x1 = p1.x;
  var y1 = p1.y;
  var x2 = p2.x;
  var y2 = p2.y;

  var A = x - x1;
  var B = y - y1;
  var C = x2 - x1;
  var D = y2 - y1;

  var dotProd = A * C + B * D;
  var distSq = C * C + D * D;
  var determ = dotProd / distSq;

  var xx, yy;

  if (determ < 0 || x1 === x2 && y1 === y2) {
    xx = x1;
    yy = y1;
  } else if (determ > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + determ * C;
    yy = y1 + determ * D;
  }

  var dx = x - xx;
  var dy = y - yy;

  distSq = dx * dx + dy * dy;

  if (distSq < res.distSq) {

    res.edge = edge;
    res.dist = Math.sqrt(distSq);
    res.distSq = distSq;
    res.point.x = xx;
    res.point.y = yy;
  }
}

//
// ADD RECT
// ===========================================================================
function addRect(p1, p2) {

  var rect = create("rect");
  inner.appendChild(rect);

  var x1 = Math.min(p1.x, p2.x);
  var x2 = Math.max(p1.x, p2.x);
  var y1 = Math.min(p1.y, p2.y);
  var y2 = Math.max(p1.y, p2.y);

  rect.setAttribute("x", x1);
  rect.setAttribute("y", y1);
  rect.setAttribute("width", x2 - x1);
  rect.setAttribute("height", y2 - y1);

  return rect;
}

//
// CLEAR INNER
// ===========================================================================
function clearInner() {
  while (inner.lastChild) {
    inner.removeChild(inner.lastChild);
  }
}

//
// TOGGLE BOUNDS
// ===========================================================================
function toggleBounds(event) {
  var autoAlpha = event.target.checked ? 1 : 0;
  TweenLite.set(outer, { autoAlpha: autoAlpha });
}

//
// RENDER
// ===========================================================================
function render() {
   console.log( 'render' );
//   console.log( Particles.storage );
}