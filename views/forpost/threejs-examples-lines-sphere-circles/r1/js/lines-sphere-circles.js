//******** **********
// Lines sphere circles module - from THREEJS-EXAMPLES-LINES-SPHERE-CIRCLES ( r1 )
// By Dustin Pfister : https://dustinpfister.github.io/
//******** **********
var LinesSphereCircles = (function(){
    // built in for point methods
    var forPoint = {};
    // seeded random for point method example
    forPoint.seededRandom = function(v, s, opt){
        
    };
    // public api
    var api = {};
    //******** **********
    // CREATE POINTS
    //******** **********
    // createSphereCirclePoints - return an array of Vector3 instances that is
    // just one circle for an over all sphere
    //api.createSphereCirclePoints = function(opt, maxRadius, circleCount, circleIndex, pointsPerCircle){
    api.createSphereCirclePoints = function(circleIndex, opt){
        // options object
        opt = opt || {};
        opt.r1 = opt.r1 === undefined ? 1 : opt.r1;
        opt.r2 = opt.r2 === undefined ? 1 : opt.r2;
        opt.maxRadius = opt.maxRadius === undefined ? 1: opt.maxRadius;
        opt.circleCount = opt.circleCount === undefined ? 4: opt.circleCount;
        opt.pointsPerCircle = opt.pointsPerCircle === undefined ? 10: opt.pointsPerCircle;
        opt.forPoint = opt.forPoint || null;
        // the current index for this circle over all circles
        circleIndex = circleIndex || 0;
        // create points
        var points = [];
        var s = {};
        s.sPer = circleIndex / opt.circleCount;
        s.radius = Math.sin( Math.PI * opt.r1 * s.sPer ) * opt.maxRadius;
        s.y = Math.cos( Math.PI * opt.r2 * s.sPer ) * opt.maxRadius;
        s.i = 0;
        // buch points for the current circle
        while(s.i < opt.pointsPerCircle){
            // might want to subtract 1 or 0 for this cPer expression
            s.cPer =  s.i / ( opt.pointsPerCircle - 1 );
            s.radian = Math.PI * 2 * s.cPer;
            s.v = new THREE.Vector3();
            s.v.x = Math.cos(s.radian) * s.radius;
            s.v.y = s.y;
            s.v.z = Math.sin(s.radian) * s.radius;
            // use a for point method if one is given
            if(opt.forPoint){
                points.push( opt.forPoint(s.v, s, opt) );
            }else{
                points.push(s.v);
            }
            s.i += 1;
        }
        return points;
    };
    //******** **********
    // CREATE GROUP
    //******** **********
    var createLine = function(points, color, linewidth){
        color =  color || 0xffffff;
        linewidth = linewidth || 0;
        var geometry = new THREE.BufferGeometry().setFromPoints(points);
        return new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
                color: color,
                linewidth: linewidth
            })
        );      
    };
    // OLD create create sphere Lines method
    api.create = function(opt){
        opt = opt || {};
        opt.circleCount = opt.circleCount === undefined ? 10 : opt.circleCount;
        opt.colors = opt.colors || [0xff0000,0x00ff00,0x0000ff];
        opt.linewidth = opt.linewidth === undefined ? 1 : opt.linewidth;
        var lines = new THREE.Group();
        var i = 1;
        while(i < opt.circleCount + 1){
            // create points for this circle
            var p = api.createSphereCirclePoints(i, opt);
            // create Line and add to group
            lines.add( createLine(p, opt.colors[i % opt.colors.length], opt.linewidth) );
            i += 1;
        };
        return lines;
    };
    // return public API
    return api;
}());