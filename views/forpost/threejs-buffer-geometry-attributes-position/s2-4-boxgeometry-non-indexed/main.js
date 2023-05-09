//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// set location of a vert given an index value in geometry.index
const setVert = function(geometry, vertIndex, pos){
    pos = pos || {};
    const position = geometry.getAttribute('position');
    let i = vertIndex * 3;
    // do we have an index?
    if(geometry.index){
        //then use that
        i = geometry.index.array[vertIndex] * 3;
    }
    position.array[i] = pos.x === undefined ? position.array[i]: pos.x;
    position.array[i + 1] = pos.y === undefined ? position.array[i + 1]: pos.y;
    position.array[i + 2] = pos.z === undefined ? position.array[i + 2]: pos.z;
};
// set triangle
const setTri = function(geometry, triIndex, pos){
    pos = pos || {};
    const vertIndex = triIndex * 3;
    setVert(geometry, vertIndex, pos);
    setVert(geometry, vertIndex + 1, pos);
    setVert(geometry, vertIndex + 2, pos);
};
// triangle movement helper
const triMoveOne = (geometry) => {
    setTri(geometry, 0, {x: 0.8});
    setTri(geometry, 1, {x: 1.1});
    setTri(geometry, 2, {x: -0.8});
    setTri(geometry, 3, {x: -1.1});
    setTri(geometry, 4, {y: 0.8});
    setTri(geometry, 5, {y: 1.1});
    setTri(geometry, 6, {y: -0.8});
    setTri(geometry, 7, {y: -1.1});
    setTri(geometry, 8, {z: 0.8});
    setTri(geometry, 9, {z: 1.1});
    setTri(geometry, 10, {z: -0.8});
setTri(geometry, 11, {z: -1.1});
};
//-------- ----------
// GEOMETRY
//-------- ----------
const geo_source = new THREE.BoxGeometry(1, 1, 1);
const geo_indexed = geo_source.clone();
const geo_nonindexed = geo_source.clone().toNonIndexed();
// example 2 on set tri helper
triMoveOne(geo_indexed);
triMoveOne(geo_nonindexed);
//-------- ----------
// MESH
//-------- ----------
const material = new THREE.MeshNormalMaterial({
    wireframe: true,
    wireframeLinewidth: 3
});
const mesh1 = new THREE.Mesh(geo_indexed, material);
mesh1.position.x = 1.5;
scene.add(mesh1);
const mesh2 = new THREE.Mesh(geo_nonindexed, material);
mesh2.position.x = -1.5;
scene.add(mesh2);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0.5, 0, 0);
renderer.render(scene, camera);

