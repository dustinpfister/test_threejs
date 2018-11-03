
//(function () {

// create encoder
var seconds = 20,
fps = 12,
frame = 0,
maxFrame = fps * seconds,
encoder = new Whammy.Video(fps);

// loop
var animate = function () {

    // find current percent
    // and set values based on that
    var per = frame / maxFrame,
    r = Math.PI * 2 * per;

    // make changes to for new frame
    camera.position.set(Math.cos(r) * 200, Math.sin(r) * 200, 250);
    camera.lookAt(0, 0, 0);

    // render frame
    renderer.render(scene, camera);

    // add frame to encoder
    //encoder.add(renderer.domElement.toDataURL('image/webp'));

    // if the animation is not over
    //if (frame < maxFrame) {

    // request the next frame
    requestAnimationFrame(animate);

    //} else {

    // else comple, and export
    //encoder.compile(false, function (output) {
    //    exportVid(output);
    //});

    //}

    frame += 1;
    frame %= maxFrame;

};

// export video helper
var exportVid = function (blob) {
    var vid = document.createElement('video');
    vid.src = URL.createObjectURL(blob);
    vid.loop = true;
    vid.controls = true;
    document.body.appendChild(vid);
};

// SCENE
var scene = new THREE.Scene();

// CAMERA
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);

// MESH
var mesh = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), new THREE.MeshStandardMaterial({
            color: 0xff0000
        }));
scene.add(mesh);

var light = new THREE.AmbientLight( 0xffffff );
light.intensity = 5;
scene.add(light);

// RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
renderer.physicallyCorrectLights = true;

document.getElementById('demo').appendChild(renderer.domElement);

animate();

//}
//    ());
