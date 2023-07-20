// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// TRI12 bufferfly ( source of 1.json from set1-object )
// ---------- ----------
const mesh_json = `
{
    "metadata": {
        "version": 4.5,
        "type": "Object",
        "generator": "Object3D.toJSON"
    },
    "geometries": [{
            "uuid": "07d25b15-9d12-43f1-8322-5fc6794af50b",
            "type": "BufferGeometry",
            "data": {
                "attributes": {
                    "position": {
                        "itemSize": 3,
                        "type": "Float32Array",
                        "array": [0, 0, 0, -1, 2, 0, -1, 0.5, 0, 1, 2, 0, 1, 0.5, 0, -0.699999988079071, -1, 0, -0.699999988079071, -0.10000000149011612, 0, 0.699999988079071, -1, 0, 0.699999988079071, -0.10000000149011612, 0],
                        "normalized": false
                    },
                    "normal": {
                        "itemSize": 3,
                        "type": "Float32Array",
                        "array": [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
                        "normalized": false
                    },
                    "uv": {
                        "itemSize": 2,
                        "type": "Float32Array",
                        "array": [0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
                        "normalized": false
                    },
                    "color": {
                        "itemSize": 3,
                        "type": "Float32Array",
                        "array": [1, 0, 0, 0.699999988079071, 0.5, 0, 0.699999988079071, 0.5, 0, 0.699999988079071, 0.5, 0, 0.699999988079071, 0.5, 0, 0.8999999761581421, 0.5, 0, 0.8999999761581421, 0.5, 0, 0.8999999761581421, 0.5, 0, 0.8999999761581421, 0.5, 0],
                        "normalized": false
                    }
                },
                "index": {
                    "type": "Uint16Array",
                    "array": [0, 1, 2, 0, 4, 3, 0, 6, 5, 0, 7, 8]
                },
                "morphAttributes": {
                    "position": [{
                            "itemSize": 3,
                            "type": "Float32Array",
                            "array": [0, 0, 0, 0, 0, -0.800000011920929, 0, 0, -0.800000011920929, 0, 0, -0.800000011920929, 0, 0, -0.800000011920929, 0, 0, -0.4000000059604645, 0, 0, -0.4000000059604645, 0, 0, -0.4000000059604645, 0, 0, -0.4000000059604645],
                            "normalized": false
                        }
                    ]
                },
                "morphTargetsRelative": true
            }
        }
    ],
    "materials": [{
            "uuid": "fcac10b3-e11a-49c9-94b8-575042930338",
            "type": "MeshBasicMaterial",
            "color": 16777215,
            "reflectivity": 1,
            "refractionRatio": 0.98,
            "side": 2,
            "vertexColors": true,
            "depthFunc": 3,
            "depthTest": true,
            "depthWrite": true,
            "colorWrite": true,
            "stencilWrite": false,
            "stencilWriteMask": 255,
            "stencilFunc": 519,
            "stencilRef": 0,
            "stencilFuncMask": 255,
            "stencilFail": 7680,
            "stencilZFail": 7680,
            "stencilZPass": 7680
        }
    ],
    "animations": [{
            "name": "flap",
            "duration": 1,
            "tracks": [{
                    "name": ".morphTargetInfluences[0]",
                    "times": [0, 0.25, 0.5, 0.75, 1],
                    "values": [0, 0.30000001192092896, 0.5, 0.15000000596046448, 0],
                    "type": "number"
                }
            ],
            "uuid": "024eb45e-f782-443b-9fde-522a2897b585",
            "blendMode": 2500
        }
    ],
    "object": {
        "uuid": "ea2f929d-85b7-4167-b5fd-c841702e0d1e",
        "type": "Mesh",
        "layers": 1,
        "matrix": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        "up": [0, 1, 0],
        "geometry": "07d25b15-9d12-43f1-8322-5fc6794af50b",
        "material": "fcac10b3-e11a-49c9-94b8-575042930338",
        "animations": ["024eb45e-f782-443b-9fde-522a2897b585"]
    }
}
`
const mesh = new THREE.ObjectLoader().parse( JSON.parse( mesh_json ) );
scene.add(mesh);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0.5, 0);
const state = {
   mesh: mesh,
   mixer: new THREE.AnimationMixer(mesh)
};
state.action = state.mixer.clipAction( state.mesh.animations[0] );
state.action.play();
let frame = 0;
const frame_max = 30;
const loop = () => {
    requestAnimationFrame(loop);
    const a1 = frame / frame_max;
    state.mixer.setTime(1 * a1);
    renderer.render(scene, camera);
    frame += 1;
    frame %= frame_max;
};
loop();