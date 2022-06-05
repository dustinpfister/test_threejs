//******** **********
// Lines sphere circles module - from THREEJS-EXAMPLES-LINES-SPHERE-CIRCLES ( r1 )
// By Dustin Pfister : https://dustinpfister.github.io/
//******** **********
var LinesSphereCircles = (function(){
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
        // the current index for this circle over all circles
        circleIndex = circleIndex || 0;
        // create points
        var points = [];
        var sPer = circleIndex / opt.circleCount;
        var radius = Math.sin( Math.PI * opt.r1 * sPer ) * opt.maxRadius;
        var y = Math.cos( Math.PI * opt.r2 * sPer ) * opt.maxRadius;
        var i = 0;
        // buch points for the current circle
        while(i < opt.pointsPerCircle){
            // might want to subtract 1 or 0 for this cPer expression
            var cPer =  i / ( opt.pointsPerCircle - 1 );
            var radian = Math.PI * 2 * cPer;
            var v = new THREE.Vector3();
            v.x = Math.cos(radian) * radius;
            v.y = y;
            v.z = Math.sin(radian) * radius;
            points.push( v.clone().normalize().multiplyScalar(opt.maxRadius) );
            i += 1;
        }
        return points;
    };
    //******** **********
    // CREATE GROUP
    //******** **********
    // create sphere Lines THREE.GROUP
    api.createSphereLines = function(opt){
        opt = opt || {};
        opt.circleCount = opt.circleCount === undefined ? 10 : opt.circleCount;
        opt.colors = opt.colors || [0xff0000,0x00ff00,0x0000ff];
        var lines = new THREE.Group();
        var i = 1;
        while(i < opt.circleCount + 1){
            // create points for this circle
            var p = api.createSphereCirclePoints(i, opt);
            var geometry = new THREE.BufferGeometry().setFromPoints( p);
            var line = scene.userData.line = new THREE.Line(
                geometry,
                new THREE.LineBasicMaterial({
                    color: opt.colors[i % opt.colors.length],
                    linewidth: 4
                })
            );
            lines.add(line);
            i += 1;
        };
        return lines;
    };
    // return public API
    return api;
}());