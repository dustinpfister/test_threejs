// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { VertexNormalsHelper } from 'VertexNormalsHelper';
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
//-------- ----------
// ORBIT CONTROLS
//-------- ----------
new OrbitControls(camera, renderer.domElement);
//-------- ----------
// CANVAS TEXTURE
//-------- ----------
const canvas = document.createElement('canvas');
canvas.width = 32;
canvas.height = 32;
const ctx = canvas.getContext('2d');
const gSize = 8;
const len = gSize * gSize;
const color = new THREE.Color(0,0,0);
const s = canvas.width / gSize;
let i = 0;
while(i < len){
    const x = i % gSize;
    const y = Math.floor( i / gSize );
    const r = 0.25 + 0.75 * Math.random();
    const g = Math.random() * 0.05;
    const b = Math.random() * 0.05;
    color.setRGB(r, g, b);
    ctx.fillStyle = color.getStyle();
    ctx.fillRect(x * s, y * s, s, s);
    i += 1;
}
// texture from canvas
const texture = new THREE.CanvasTexture(canvas);
//-------- ----------
// Loader
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 1, 0);
const loader = new THREE.BufferGeometryLoader();
// load a resource
loader.load(
    // resource URL
    '/json/tri12-bufferfly/set1/0.json',
    // onLoad callback
    (geometry) => {



        // add mesh
        const mesh = new THREE.Mesh(
            geometry,

//            new THREE.MeshNormalMaterial({
//                side: THREE.DoubleSide
//            })

            new THREE.MeshBasicMaterial({
                vertexColors: false, 
                side: THREE.DoubleSide,
                map: texture
            })

        );
        scene.add(mesh);


        const pos_att = geometry.getAttribute('position');
        const pos_att_home = pos_att.clone();


        const updateByMorph = (geometry, pos_att_home, alpha = 1, index = 0) => {
            const att_morph = geometry.morphAttributes.position[index];
            pos_att.array = pos_att_home.array.map( (n, i) => {
                return n + (att_morph.array[i] * alpha);
            });
            pos_att.needsUpdate = true;
        };

        updateByMorph(geometry, pos_att_home, 1, 0);


        // vertex helper
        const helper = new VertexNormalsHelper(mesh, 1, 0x00ff00);
        scene.add(helper);
        // loop
        let frame = 0;
        const frame_max = 120;
        const loop = () => {
            requestAnimationFrame(loop);
            const a1 = frame / frame_max;
            const a_wings = 1 - Math.abs( 0.5 - (a1 * 8 % 1) ) / 0.5;

            const a_bounce = a1;


            //mesh.morphTargetInfluences[ 0 ] = a_wings;
            updateByMorph(geometry, pos_att_home, a_wings, 0);
            geometry.computeVertexNormals();

            helper.update();

            // object3d position
            mesh.position.y = Math.sin( Math.PI * 2 * a_bounce ) * 0.5;


            frame += 1;
            frame %= frame_max;
            renderer.render(scene, camera);
        };
        loop();
    }
);
