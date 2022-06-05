//******** **********
// Lines sphere circles module - from THREEJS-EXAMPLES-LINES-SPHERE-CIRCLES ( r1 )
// By Dustin Pfister : https://dustinpfister.github.io/
//******** **********
var LinesSphereCircles = (function(){
    // public api
    var api = {};
    // just create one circle for a set of circles that form a sphere like shape
    // createSphereCirclePoints(maxRadius, circleCount, circleIndex, pointsPerCircle)
    api.createSphereCirclePoints = function(maxRadius, circleCount, circleIndex, pointsPerCircle){
        var points = [];
        var sPer = circleIndex / circleCount;
        var radius = Math.sin( Math.PI * 1.0 * sPer ) * maxRadius;
        var y = Math.cos( Math.PI * 1.0 * sPer ) * maxRadius;
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
    // create sphere Lines THREE.GROUP
    api.createSphereLines = function(maxRadius, circleCount, pointsPerCircle, colors){
        colors = colors || [0xff0000,0x00ff00,0x0000ff]
        var lines = new THREE.Group();
        var i = 1;
        while(i < circleCount + 1){
            var p = api.createSphereCirclePoints(maxRadius, circleCount + 1, i, pointsPerCircle);
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