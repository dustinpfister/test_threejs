
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
// SVG STRING
//-------- ----------
const str_svg = `
<svg xmlns="http://www.w3.org/2000/svg"
     width="0.333333in" height="0.333333in"
     viewBox="0 0 100 100">
  <path id="Unnamed"
        fill="none" stroke="black" stroke-width="1"
        d="M 0,0
           Q -5,2.5   0,5
           Q  2.5,5   5,0
        "
   />
</svg>`
//-------- ----------
// SVG LOADER PARSE, CREATE SHAPE, SHAPE GEOMETRY, MESH
//-------- ----------
const data = new THREE.SVGLoader().parse( str_svg );
const shape = THREE.SVGLoader.createShapes( data.paths[0] );
const geometry = new THREE.ShapeGeometry(shape);
const material = new THREE.MeshNormalMaterial( { side: THREE.DoubleSide });
const mesh = new THREE.Mesh(geometry, material);
scene.add( mesh );
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(10, 5, 10);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
