
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
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(2, 1, 3)
scene.add(dl);
const al = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(al);
//-------- ----------
// UVGenerator
//-------- ----------
let i = 0;
const UVGenerator = {
    generateTopUV: function (geometry, vertices, indexA, indexB, indexC) {
        const n = 1;
        const a_x = vertices[indexA * n];
        const a_y = vertices[indexA * n + 1];
        const b_x = vertices[indexB * n];
        const b_y = vertices[indexB * n + 1];
        const c_x = vertices[indexC * n];
        const c_y = vertices[indexC * n + 1];
        return [
            new THREE.Vector2(a_x % 1, a_y % 1),
            new THREE.Vector2(b_x % 1, b_y % 1),
            new THREE.Vector2(c_x % 1, c_y % 1)
        ];
    },
    generateSideWallUV: function (geometry, vertices, indexA, indexB, indexC, indexD) {
        const n = 2;
        const a_x = vertices[indexA * n];
        const a_y = vertices[indexA * n + 1];
        const a_z = vertices[indexA * n + 2];
        const b_x = vertices[indexB * n];
        const b_y = vertices[indexB * n + 1];
        const b_z = vertices[indexB * n + 2];
        const c_x = vertices[indexC * n];
        const c_y = vertices[indexC * n + 1];
        const c_z = vertices[indexC * n + 2];
        const d_x = vertices[indexD * n];
        const d_y = vertices[indexD * n + 1];
        const d_z = vertices[indexD * n + 2];
        if (Math.abs(a_y - b_y) < Math.abs(a_x - b_x)) {
            return [
                new THREE.Vector2(a_x % 1, (1 - a_z) % 1),
                new THREE.Vector2(b_x % 1, (1 - b_z) % 1),
                new THREE.Vector2(c_x % 1, (1 - c_z) % 1),
                new THREE.Vector2(d_x % 1, (1 - d_z) % 1)
            ];
        } else {
            return [
                new THREE.Vector2(a_y % 1, (1 - a_z) % 1),
                new THREE.Vector2(b_y % 1, (1 - b_z) % 1),
                new THREE.Vector2(c_y % 1, (1 - c_z) % 1),
                new THREE.Vector2(d_y % 1, (1 - d_z) % 1)
            ];
        }
    }
};
//-------- ----------
// HELPERS
//-------- ----------
// create an array of Extrude geometry from SVG data loaded with the SVGLoader
const createExtrudeGeosFromSVG = (data) => {
    const paths = data.paths;
    const geoArray = [];
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        // create a shape
        const shapes = THREE.SVGLoader.createShapes(path);
        // for each shape create a mesh and add it to the group
        for (let j = 0; j < shapes.length; j++) {
            const shape = shapes[j];
            geoArray.push(new THREE.ExtrudeGeometry(shape, {
                    curveSegments: 20,
                    steps: 20,
                    depth: 10,
                    bevelEnabled: false,
                    UVGenerator: UVGenerator
                }));
        }
    }
    return geoArray;
};
// create mesh group from SVG
const createMeshGroupFromSVG = (data) => {
    const geoArray = createExtrudeGeosFromSVG(data);
    const group = new THREE.Group();
    geoArray.forEach((geo, i) => {
        // each mesh gets its own materials
        const materials = [
            new THREE.MeshPhongMaterial({ // face material
                color: data.paths[i].color,
                map: datatex.seededRandom(512, 512, 1, 1, 1, [128, 255]),
                wireframe: false
            }),
            new THREE.MeshPhongMaterial({ // sides material
                color: new THREE.Color(1, 0, 0.2),
                map: datatex.fromPXDATA([
                        2, 1, 0, 1, 2, 1, 0, 0,
                        0, 1, 2, 0, 0, 1, 2, 0,
                        2, 1, 0, 1, 2, 1, 0, 0,
                        0, 1, 2, 0, 0, 1, 2, 0,
                        2, 1, 0, 1, 2, 1, 0, 0,
                        0, 1, 2, 0, 0, 1, 2, 0,
                        2, 1, 0, 1, 2, 1, 0, 0
                    ], 8, [[255, 255, 255, 255], [200, 200, 200, 255], [100, 100, 100, 255]]),
                wireframe: false
            })
        ];
        const mesh = new THREE.Mesh(geo, materials);
        group.add(mesh);
    });
    return group;
};
//-------- ----------
// OBJECTS
//-------- ----------
let group;
//-------- ----------
// LOOP
//-------- ----------
let fps = 30,
d1 = -20,
d2 = 0,
lt = new Date();
const loop = function () {
    let now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        group.rotation.x = Math.PI / 180 * d1;
        group.rotation.y = Math.PI / 180 * d2;
        d2 += 20 * secs;
        d2 %= 360;
        // render
        renderer.render(scene, camera);
        lt = now;
    }
};
//-------- ----------
// SVG LOADER
//-------- ----------
camera.position.set(0, 0, 3.5);
camera.lookAt(0, -0.1, 0);
// instantiate a loader
const loader = new THREE.SVGLoader();
// load a SVG resource
loader.load(
    // resource URL
    '/forpost/threejs-svg-loader/svg/fff.svg',
    // called when the resource is loaded
    function (data) {
    group = createMeshGroupFromSVG(data);
    // get min and max of children
    let xMin = Infinity,
    xMax = -Infinity;
    let yMin = Infinity,
    yMax = -Infinity;
    let zMin = Infinity,
    zMax = -Infinity;
    group.children.forEach((mesh) => {
        const geo = mesh.geometry;
        geo.computeBoundingBox();
        const b = geo.boundingBox;
        xMin = b.min.x < xMin ? b.min.x : xMin;
        xMax = b.max.x > xMax ? b.max.x : xMax;
        yMin = b.min.y < yMin ? b.min.y : yMin;
        yMax = b.max.y > yMax ? b.max.y : yMax;
        zMin = b.min.z < zMin ? b.min.z : zMin;
        zMax = b.max.z > zMax ? b.max.z : zMax;
    });
    const xRange = xMax - xMin;
    const yRange = yMax - yMin;
    const zRange = zMax - zMin;
    group.children.forEach((mesh) => {
        mesh.geometry.translate(xRange / 2 * -1, yRange / 2 * -1, zRange / 2 * -1);
        mesh.rotateX(Math.PI)
    });
    group.scale.normalize().multiplyScalar(0.025);
    scene.add(group);
    // start loop
    loop();
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
