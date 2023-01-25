//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 5, 20);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const mkMesh = function(){
    return  new THREE.Mesh(
       new THREE.BoxGeometry(1, 1, 1),
       new THREE.MeshNormalMaterial());
};
//-------- ----------
// OBJECTS - adding children of children
//-------- ----------
const group = new THREE.Group();
scene.add(group);
[[0,0,2],[0,0,-2],[2,0,0],[-2,0,0]].forEach(function(meshData, i, arr){
    const mesh = mkMesh();
    THREE.Vector3.prototype.set.apply(mesh.position, meshData);
    group.add(mesh);
    // adding a child for the child
    mesh2 = mkMesh();
    const a1 = i  / arr.length;
    const e = new THREE.Euler(0,Math.PI * 2 * a1, 0);
    mesh2.position.set(1,0,0).applyEuler(e).multiplyScalar(1.25);
    mesh.add(mesh2);
});
scene.add(new THREE.GridHelper(10, 10));
scene.add(camera);
//-------- ----------
// LOOPING OVER OBJECTS USING traverse to do soehting for all objects of a type
//-------- ----------
const depth = new THREE.MeshDepthMaterial();
scene.traverse(function(obj){
    if(obj.type === 'PerspectiveCamera'){
        obj.position.set(8, 8, 8);
        obj.lookAt(0,0,0)
    }
    if(obj.type === 'Mesh'){
        obj.material = depth;
    }
});
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
