//-------- ----------
// SCENE, CAMERA, RENDERER, LIGHT
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// SVG LOADER
//-------- ----------
// instantiate a loader
const loader = new THREE.SVGLoader();
// load a SVG resource
loader.load(
    // resource URL
    '/forpost/threejs-svg-loader/svg/fff2.svg',
    // called when the resource is loaded
    function (data) {
    const paths = data.paths.slice(1, data.paths.length);
    // create points for each path
    paths.forEach((path) => {
        const geo = new THREE.BufferGeometry().setFromPoints(path.subPaths[0].getPoints());
        const material = new THREE.PointsMaterial({
                size: 3,
                color: 0x00ff00
            });
        const points = new THREE.Points(geo, material);
        scene.add(points);
    });
    renderer.render(scene, camera);
},
    // called when loading is in progresses
    function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
},
    // called when loading has errors
    function (error) {
    console.log('An error happened');
    console.log(error)
});
