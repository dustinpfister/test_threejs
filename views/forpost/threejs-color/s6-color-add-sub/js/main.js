var randomColor = function () {
    var r = Math.random(),
    g = Math.random(),
    b = Math.random();
    return new THREE.Color(r, g, b);
};
var randomPosition = function () {
    var x = -3 + 4 * Math.random(),
    y = -1 + 2 * Math.random(),
    z = 2 + Math.random() * 5 * -1;
    return new THREE.Vector3(x, y, z);
};

var createBoxGroup = function(){
    // creating a group of mesh object with random colors
    var group = new THREE.Group();
    var i = 0,
    len = 15;
    while (i < len) {
        var box = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshStandardMaterial({
                color: randomColor()
                //emissiveIntensity: 0.8,
                //emissive: randomColor()
            }));
        // random position
		
		
		
		console.log( box.material.color );
		
        box.position.copy(randomPosition());
        group.add(box);
        i += 1;
    }
    return group;
};

// creating a scene
var scene = new THREE.Scene();

var group = createBoxGroup();

scene.add(group);

// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL
var light = new THREE.PointLight(new THREE.Color(1, 1, 1));
light.position.set(1, 3, 2);
scene.add(light);

// camera
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var lt = new Date(),
frame = 0,
maxFrame = 200,
fps = 30;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        group.children.forEach(function (box) {

            var r = 0.1 * per,
            g = r, b = r,
			color = box.material.color;
            color.add( new THREE.Color(r, g, b) );
			color.r = color.r > 1 ? 1 : color.r;
			color.g = color.g > 1 ? 1 : color.g;
			color.b = color.b > 1 ? 1 : color.b;
			//color.g = color.g % 1;
			//color.b = color.b % 1;
			console.log(color.r)

        });
        group.rotation.y = Math.PI * 2 * per;
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }

};
loop();
