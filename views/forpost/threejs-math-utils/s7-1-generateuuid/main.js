// ---------- ----------
//-------- ----------
// CAMERA, RENDERER
//-------- ----------
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// SCENE
//-------- ----------
const uuid_geometry = THREE.MathUtils.generateUUID();
const uuid_material = THREE.MathUtils.generateUUID();
const uuid_animation = THREE.MathUtils.generateUUID();
const uuid_scene = THREE.MathUtils.generateUUID();
const uuid_child = THREE.MathUtils.generateUUID();
// creating a json string with uuids for geometry, materials, animations, so forth...
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
            "uuid": "` + uuid_geometry + `",
            "type": "BufferGeometry",
            "data": {
                "attributes": {
                    "position": {
                        "itemSize": 3,
                        "type": "Float32Array",
                        "array": [0,0,0, 4,0,0, 0,0,4 ],
                        "normalized": false
                    }
                },
                "morphTargetsRelative": true,
                "morphAttributes": {
                    "position": [
                        {
                            "itemSize":3,
                            "type":"Float32Array",
                            "array":[
                                0.0, 3.0, 0.0,
                               -4.0, 3.0, 0.0,
                                0.0, 3.0,-4.0
                            ],
                            "normalized":false
                        }
                    ]
                }
            }
        }
    ],
    "materials": [
        {
            "uuid": "` + uuid_material + `",
            "type": "PointsMaterial",
            "size": 1,
            "color": 65280
        }
    ],
    "animations": [
        {
            "name": "converge",
            "duration": 1,
            "tracks": [
                {
                    "name": ".morphTargetInfluences[0]",
                    "times": [0, 0.5, 1],
                    "values": [0, 1, 0],
                    "type": "number"
                }
            ],
            "uuid": "` + uuid_animation + `",
            "blendMode": 2500
        }
    ],
    "object": {
        "uuid": "` + uuid_scene + `",
        "type": "Scene",
        "matrix": [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
        "children": [
            {
                "uuid": "` + uuid_child + `",
                "name": "tri_one",
                "type": "Points",
                "geometry": "` + uuid_geometry + `",
                "material": "` + uuid_material + `",
                "matrix": [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
                "animations": ["` + uuid_animation + `"]
            }
        ]
    }
}`;
const scene = new THREE.ObjectLoader().parse( JSON.parse( str_json ) );
const points = scene.getObjectByName('tri_one');
const mixer = new THREE.AnimationMixer( points );
const action = mixer.clipAction( points.animations[0] );
action.play();
//-------- ----------
// ANIMATION LOOP
//-------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 30,
FPS_MOVEMENT = 30,
FRAME_MAX = 90,
CLOCK = new THREE.Clock(true);
let secs = 0,
frame = 0,
lt = CLOCK.getElapsedTime();
const update = (frame, frameMax) => {
    const a1 = frame / frameMax;
    mixer.setTime(a1);
};
const loop = () => {
    const now = CLOCK.getElapsedTime(),
    secs = (now - lt);
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();