// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.01, 10000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// LOAD SVG, OBJECTS
// ---------- ----------
scene.add(new THREE.GridHelper(100, 10));
SVGTools.load({
   //scene: scene,
   urls: [ '/img/svg-logo/logo_base.svg' ]
})
.then( ( st ) => {

console.log( st.scene.children )

    camera.position.set( 100, 50, 100);
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
})