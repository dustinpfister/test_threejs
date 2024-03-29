const scene = new THREE.Scene();
const container = (document.getElementById('demo') || document.body);
camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
// A mesh with more than one material, by default the
// geometry of the sphere will use the Depth material as all the faces
// have a material index set of 1
var mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 30, 30),
        [
            new THREE.MeshDepthMaterial(),
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                emissive: 0x00001a
            })
        ]);
scene.add(mesh);
//-------- ----------
// IS WEBGL TEST
//-------- ----------
if (WebGL.isWebGL()) {
    // if we have webGl we can use the webGL renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    container.appendChild(renderer.domElement);
    // Light might still not work, depending on how well
    // supported webGL is, but assuming support is good we
    // can do things with light
    mesh.geometry.faces.forEach(function (face) {
        face.materialIndex = 1;
    });
    var light = new THREE.PointLight(0xffffff);
    light.position.set(0, 2, 2);
    scene.add(light);
    renderer.render(scene, camera);
} else {
    // Use the software renderer
    var renderer = new THREE.SoftwareRenderer();
    renderer.setSize(640, 480, false);
    container.appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
