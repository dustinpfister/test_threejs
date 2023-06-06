//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo')  || document.body ).appendChild(renderer.domElement);
//-------- ----------
// GRID
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );

const geometry = new THREE.BufferGeometry();
// position array of 4 points
const pos = new THREE.BufferAttribute(
    new Float32Array([
        0,-3, 0,  // 0
        0, 3, 0,  // 1
       -5, 0, 0,  // 2
        0, 0,-5   // 3
    ]),
    3    // 3 numbers for every item in the buffer attribute ( x, y, z)
);
geometry.setAttribute('position', pos);
// using computeVertexNormals to create normal attribute
geometry.computeVertexNormals();
//-------- ----------
//CREATING AN INDEX BY USING THE setIndex METHOD AND PASSING AN ARRAY
//-------- ----------
// drawing 2 trangles with just 4 points in the position attribute by giving an
// array of index values for points in the position attribute to the setIndex method
geometry.setIndex( [0,1,2,0,1,3] );


console.log(  JSON.stringify( geometry.toJSON() ) );

//-------- ----------
// Loader
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
const loader = new THREE.BufferGeometryLoader();
// load a resource
loader.load(
    // resource URL
    '/json/vertcolor-trees/6tri/one.json',
    // onLoad callback
    (geometry) => {
        const mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({
                vertexColors: true, 
                side: THREE.DoubleSide
            }));
        scene.add(mesh);
        renderer.render(scene, camera);
    }
);
