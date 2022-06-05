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
    api.createSphereCirclePoints = function(opt, maxRadius, circleCount, circleIndex, pointsPerCircle){
        opt = opt || {};
        opt.r1 = opt.r1 === undefined ? 1 : opt.r1;
        opt.r2 = opt.r2 === undefined ? 1 : opt.r2;
        var points = [];
        var sPer = circleIndex / circleCount;
        var radius = Math.sin( Math.PI * opt.r1 * sPer ) * maxRadius;
        var y = Math.cos( Math.PI * opt.r2 * sPer ) * maxRadius;
        var i = 0;
        // buch points for the current circle
        while(i < pointsPerCircle){
            // might want to subtract 1 or 0 for this cPer expression
            var cPer =  i / ( pointsPerCircle - 1 );
            var radian = Math.PI * 2 * cPer;
            var v = new THREE.Vector3();
            v.x = Math.cos(radian) * radius;
            v.y = y;
            v.z = Math.sin(radian) * radius;
            points.push( v.clone().normalize().multiplyScalar(maxRadius) );
            i += 1;
        }
        return points;
    };
    //******** **********
    // CREATE GROUP
    //******** **********
    // create sphere Lines THREE.GROUP
    api.createSphereLines = function(opt, maxRadius, circleCount, pointsPerCircle, colors){
        colors = colors || [0xff0000,0x00ff00,0x0000ff];
        var lines = new THREE.Group();
        var i = 1;
        while(i < circleCount + 1){
            var p = api.createSphereCirclePoints(opt, maxRadius, circleCount + 1, i, pointsPerCircle);
            var geometry = new THREE.BufferGeometry().setFromPoints( p);
            var line = scene.userData.line = new THREE.Line(
                geometry,
                new THREE.LineBasicMaterial({
                    color: colors[i % colors.length],
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