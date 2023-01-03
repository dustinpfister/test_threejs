(function () {
 
    // Scene
    var scene = new THREE.Scene();
     var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // create points helper
    var createPoints = function(len, rotationCount, height, maxRadius){
        rotationCount = rotationCount === undefined ? 8 : rotationCount;  // number of rotations
        height = height === undefined ? 5 : height;
        maxRadius = maxRadius === undefined ? 5 : maxRadius;
        var yDelta = height / len;
        var points = [];
        var i = 0, v, radian, radius, per;
        while(i < len){
            per = i / ( len - 1 );
            radian = Math.PI * 2 * rotationCount * per;
            radius = maxRadius  * per;
            v = new THREE.Vector3();
            v.x = Math.cos(radian) * radius;
            v.z = Math.sin(radian) * radius;
            v.y = i * yDelta;
            points.push(v);
            i += 1;
        };
        return points;
    };

    // update lines group
    var updateLinesGroup = function(lines, rs, rDelta, height, radius){
        lines.children.forEach(function(line, i, arr){
            var per = (i + 1) / arr.length;
            line.geometry.setFromPoints( createPoints(150, rs + rDelta * per, height, radius) );
        });
    };

    // create lines group
    var lines = new THREE.Group();
    var lineCount = 12;
    var colors = [0x00ff00, 0xff0000, 0x0000ff, 0xff00ff, 0x00ffff, 0xffff00];
    var i = 0;
    while(i < lineCount){
        var per = i / lineCount;
        var points = createPoints(100, 1 + 0.2 * per, 0, 5);
        var geometry = new THREE.BufferGeometry().setFromPoints( points );
        var line = scene.userData.line = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
                color: colors[i % colors.length],
                linewidth: 6
            }));
        lines.add(line);
        i += 1;
    }
    scene.add(lines);

    updateLinesGroup(lines, 0.5, 1.4, 10, 4);
    lines.position.y = -8;
 
    // Render
    renderer.render(scene, camera);
 
}
    ());