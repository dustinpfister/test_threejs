//******** **********
// Lines sphere circles module - from THREEJS-EXAMPLES-LINES-SPHERE-CIRCLES ( r1 )
// By Dustin Pfister : https://dustinpfister.github.io/
//******** **********
var LinesSphereCircles = (function(){
    //******** **********
    // BUILT IN "forPoint" METHODS
    //******** **********
    var forPoint = {};
    // seeded random for point method example
    forPoint.seededRandom = function(v, s, opt){
        // min and max radius used
        opt.minRadius = opt.minRadius === undefined ? 0.5: opt.minRadius;
        var scalar = opt.minRadius + (opt.maxRadius - opt.minRadius) * THREE.MathUtils.seededRandom();
        return v.clone().normalize().multiplyScalar(scalar);
    };
    // seaShell method
    forPoint.seaShell = function(v, s, opt){
        opt.minRadius = opt.minRadius === undefined ? 1.5: opt.minRadius;
        var scalar =  opt.minRadius + (opt.maxRadius - opt.minRadius) * s.cPer;
        return v.clone().normalize().multiplyScalar(scalar);
    };
    //******** **********
    // HELPER FUNCTIONS
    //******** **********
    // createSphereCirclePoints - return an array of Vector3 instances that is
    // just one circle for an over all sphere
    //api.createSphereCirclePoints = function(opt, maxRadius, circleCount, circleIndex, pointsPerCircle){
    var createSphereCirclePoints = function(circleIndex, opt){
        // options object
        opt = opt || {};
        opt.r1 = opt.r1 === undefined ? 1 : opt.r1;
        opt.r2 = opt.r2 === undefined ? 1 : opt.r2;
        opt.maxRadius = opt.maxRadius === undefined ? 1: opt.maxRadius;
        opt.circleCount = opt.circleCount === undefined ? 4: opt.circleCount;
        opt.pointsPerCircle = opt.pointsPerCircle === undefined ? 10: opt.pointsPerCircle;
        opt.forPoint = opt.forPoint || null;
        // if opt.forPoint is a string use a built in for point method
        if(typeof opt.forPoint === 'string'){
            opt.forPoint = forPoint[opt.forPoint];
        }
        opt.forFrame = opt.forFrame || null;
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
    // create a single THREE.Line for a collection of circles
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
    // parseOpt
    var parseOpt = function(opt){
        opt = opt || {};
        opt.circleCount = opt.circleCount === undefined ? 10 : opt.circleCount;
        opt.colors = opt.colors || [0xff0000,0x00ff00,0x0000ff];
        opt.linewidth = opt.linewidth === undefined ? 1 : opt.linewidth;
        return opt;
    };
    //******** **********
    // CREATE GROUP
    //******** **********
    // public api
    var api = {};
    // create a group where each child is a THREE.Line for a circle in the sphere of circles
    api.create = function(opt){
        opt = parseOpt(opt);
        var lineGroup = new THREE.Group();
        lineGroup.userData.opt = opt;
        var i = 1;
        while(i < opt.circleCount + 1){
            // create points for this circle
            var points = createSphereCirclePoints(i, opt);
            // create Line and add to group
            lineGroup.add( createLine(points, opt.colors[i % opt.colors.length], opt.linewidth) );
            i += 1;
        };
        return lineGroup;
    };
    // set state of lineGroup by frame / maxFrame, and optional new opt object
    api.setByFrame = function(lineGroup, frame, frameMax, opt){
        frame = frame === undefined ? 0 : frame;
        frameMax = frameMax === undefined ? 30 : frameMax;
        opt = opt || lineGroup.userData.opt;
        opt = lineGroup.userData.opt = parseOpt(opt);
        var i = 0;
        while(i < opt.circleCount){
            // mutate options before calling createSphereCirclePoints
            if(opt.forFrame){
                opt.forFrame(opt);
            }
            // create points for this circle
            var points = createSphereCirclePoints(i + 1, opt),
            line = lineGroup.children[i];
            line.geometry.setFromPoints(points);
            //line.material.color = opt.colors[i % opt.colors.length];
            //line.material.linewidth = opt.linewidth;
            // create Line and add to group
            //lineGroup.add( createLine(points, opt.colors[i % opt.colors.length], opt.linewidth) );
            i += 1;
        };

    };

    // return public API
    return api;
}());