
//-------- ----------
// SCENE, CAMERA, RENDERER, LIGHT
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create an array of shape geometry from SVG data loaded with the SVGLoader
const createShapeGeosFromSVG = (data, si, ei) => {
    si = si === undefined ? 0 : si;
    ei = ei === undefined ? data.paths.length : ei;
    const paths = data.paths.slice(si, data.paths.length);
    const geoArray = [];
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        // create a shape
        const shapes = THREE.SVGLoader.createShapes(path);
        // for each shape create a shape geometry and push it to the array
        for (let j = 0; j < shapes.length; j++) {
            const shape = shapes[j];
            // when calling the THREE.ShapeGeometry constructor I pass the shape
            // and then if I want the curveSegments to be higher or lower than the
            // default ( 12 ) I can pass that as the second argument.
            geoArray.push(new THREE.ShapeGeometry(shape, 8));
        }
    }
    return geoArray;
};
// create mesh group from SVG
const createMeshGroupFromSVG = (data, si, ei) => {
    si = si === undefined ? 0 : si;
    ei = ei === undefined ? data.paths.length : ei;
    const geoArray = createShapeGeosFromSVG(data, si, ei);
    const group = new THREE.Group();
    geoArray.forEach((geo, i) => {
        // each mesh gets its own material
        const material = new THREE.MeshBasicMaterial({
                color: data.paths[si + i].color, // using paths data for color
                side: THREE.DoubleSide,
                depthWrite: false,
                wireframe: false
            });
        const mesh = new THREE.Mesh(geo, material);
        group.add(mesh);
    });
    return group;
};
//-------- ----------
// SVG LOADER
//-------- ----------
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);
// instantiate a loader
const loader = new THREE.SVGLoader();
// load a SVG resource
loader.load(
    // resource URL
    '/forpost/threejs-svg-loader/svg/fff2.svg',
    // called when the resource is loaded
    function (data) {
    var group = createMeshGroupFromSVG(data, 1);
    scene.add(group);
    // render
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
