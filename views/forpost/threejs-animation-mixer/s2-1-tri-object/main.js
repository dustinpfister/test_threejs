// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// CAMERA, RENDERER
// ---------- ----------
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SCENE
// ---------- ----------
const str_json = `{
    "metadata": {
        "version": 4.3,
        "type": "Object",
        "generator": "Hand Coded"
    },
    "textures": [],
    "images": [],
    "geometries": [
        {
            "uuid": "bce89f32-4cab-41c8-b3f6-15e04b1dd68e",
            "type": "BufferGeometry",
            "data": {
                "attributes": {
                    "position": {
                        "itemSize": 3,
                        "type": "Float32Array",
                        "array": [0,0,0, 4,0,0, 0,0,4 ],
                        "normalized": false
                    }
                }
            }
        }
    ],
    "materials": [
        {
            "uuid": "0246dafa-bf34-4460-a7eb-f5098b2120af",
            "type": "PointsMaterial",
            "size": 1,
            "color": 65280
        }
    ],
    "object": {
        "uuid": "ad1ecebd-b665-4e10-9ead-6d0205bec011",
        "type": "Scene",
        "matrix": [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
        "children": [
            {
                "uuid": "6b95325d-5bcc-4f85-a330-fbca8f271287",
                "name": "tri_one",
                "type": "Points",
                "geometry": "bce89f32-4cab-41c8-b3f6-15e04b1dd68e",
                "material": "0246dafa-bf34-4460-a7eb-f5098b2120af",
                "matrix": [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ]
            }
        ]
    }
}`;
const scene = new THREE.ObjectLoader().parse( JSON.parse( str_json ) );
 
// this can be used to get numbers for colors
//  console.log( new THREE.Color(0,1,0).toJSON() );

// This can be used to generate UUIDs for geometry, objects, materials, ect
//console.log(  THREE.MathUtils.generateUUID() );

scene.add(   new THREE.GridHelper(10, 10) );

// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
// constant values and state for main app loop
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30,     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 90,
CLOCK = new THREE.Clock(true); // USING THREE.Clock in place of new Date() or Date.now()
let secs = 0,
frame = 0,
lt = CLOCK.getElapsedTime();
// update
const update = (frame, frameMax) => {
    const a1 = frame / frameMax;
};
// loop
const loop = () => {
    const now = CLOCK.getElapsedTime(),
    secs = (now - lt);
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();