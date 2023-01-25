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
// OBJECTS - a group with mesh objects as children, a grid helper, also added the camera to the scene
//-------- ----------
const group = new THREE.Group();
scene.add(group);
[[0,0,1],[0,0,-1],[1,0,0],[-1,0,0]].forEach(function(meshData){
    const mesh = mkMesh();
    THREE.Vector3.prototype.set.apply(mesh.position, meshData)
    group.add(mesh);
});
scene.add(new THREE.GridHelper(10, 10));
scene.add(camera);
//-------- ----------
// LOOPING OVER OBJECTS AND CHECKING TYPE BY WAY OF THE children ARRAY
//-------- ----------
// LOOPING OVER ALL CHILDREN OF THE SCENE AND USING THE TYPE
// PROPERTY OF EACH OBJECT TO PREFORM AN ACTION FOR THAT TYPE
const depth = new THREE.MeshDepthMaterial();
scene.children.forEach(function(obj){
    if(obj.type === 'PerspectiveCamera'){
        obj.position.set(8, 8, 8);
        obj.lookAt(0,0,0)
    }
    if(obj.type === 'Group'){
        // looping the children of children
        obj.children.forEach(function(obj){
            if(obj.type === 'Mesh'){
                obj.material = depth;
            }
        });
    }
});
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
