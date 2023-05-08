//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const createGroup = (prefix) => {
   const group = new THREE.Group();
   group.name = prefix;
   const sphere = new THREE.Mesh(
       new THREE.SphereGeometry(1, 20, 20),
       new THREE.MeshPhongMaterial({color: 0xffffff})
   );
   sphere.name = prefix + '_sphere';
   group.add(sphere);
   const cone = new THREE.Mesh(
       new THREE.ConeGeometry(0.25, 1.5, 20, 20),
       new THREE.MeshPhongMaterial({color: 0xffffff})
   );
   cone.geometry.rotateX(Math.PI * 1.5);
   cone.position.set(0, 1.75, 0);
   cone.lookAt(group.position);
   cone.name = prefix + '_cone';
   group.add(cone);
   return group;
};
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10));
['foo', 'bar', 'baz'].forEach( (prefix, i, arr) => {
    const a1 = i / ( arr.length - 1);
    const group = createGroup(prefix);
    group.position.x = -5 + 10 * a1;
    scene.add(group);
});
//-------- ----------
// USING GET BY NAME
//-------- ----------
const cone = scene.getObjectByName('baz_cone');
cone.material.color = new THREE.Color(1, 0, 0);
cone.position.applyEuler( new THREE.Euler( Math.PI / 180 * 45, 0, 0) );
cone.lookAt(cone.parent.position)
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 2, 1);
scene.add(dl);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
