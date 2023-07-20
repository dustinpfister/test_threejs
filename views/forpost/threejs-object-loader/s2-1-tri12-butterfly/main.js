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
// TRI12 butterfly - /json/tri12-butterfly/set1-object/2.json as hard coded string with much that is not needed cut out
// ---------- ----------
const mesh_json = `
{
    "metadata": {
        "version": 4.5,
        "type": "Object",
        "generator": "Hand Coded"
    },
    "geometries": [{
            "uuid": "07d25b15-9d12-43f1-8322-5fc6794af50b",
            "type": "BufferGeometry",
            "data": {
                "attributes": {
                    "position": {
                        "itemSize": 3,
                        "type": "Float32Array",
                        "array": [0, 0, 0, -1, 2, 0, -1, 0.5, 0, 1, 2, 0, 1, 0.5, 0, -0.7, -1, 0, -0.7, -0.1, 0, 0.7, -1, 0, 0.7, -0.1, 0],
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
                            "array": [0, 0, 0, 0, 0, -0.8, 0, 0, -0.8, 0, 0, -0.8, 0, 0, -0.8, 0, 0, -0.4, 0, 0, -0.4, 0, 0, -0.4, 0, 0, -0.4],
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
            "map": "6e281008-fce7-4145-b7e5-afb64421ba51",
            "side": 2
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
    "textures": [{
            "uuid": "6e281008-fce7-4145-b7e5-afb64421ba51",
            "image": "336e0dfd-4b72-4589-91e6-5c7d26498267"
        }
    ],
    "images": [{
            "uuid": "336e0dfd-4b72-4589-91e6-5c7d26498267",
            "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAWpJREFUWEftl0tLAlEYhud4ydJJR7xMSmAjJkFJE7QookUtolXb/mV0+QFCqy4Y0aqblViipWmMqJSXtj7+gbM5s3v4ZuDlfd/5OEecpqyRNvZsTpvjqHXNGtj7zbl79h7zpscAd0ZzYLPfBAslQLoDrbV5dKD0+4OMLCcD/pp5AQfdWXDR1QIn6kmwZ4GdEkqAdAeOt8LowEF5EZlpbYy1h+gU5gOjAi77huA9kQIfNf64B5QA6Q6cW9sIORBsI6OLdy/YDvvAoXiBnRmyI/nOMub7+kQHlADpDjTEBjpwFSgis2osAd6Nv4EvNRu8XuL3ujeNueE8cg8oAdIdeM6Y6EA6GkRGNw7PeNXex8QZkLv/sBLFvG67wPmnATugBEh34DobQQdWEl1kdFLPgXeMHvizy/d1wQ4k3TwvvJZ4rxBKgHQHzpa4B2IR7v5ao89d7ufdLnfL9+9W+d9bft4Tqk6Ie0AJkO3APz5+fQwL8GRoAAAAAElFTkSuQmCC"
        }
    ],
    "object": {
        "uuid": "ea2f929d-85b7-4167-b5fd-c841702e0d1e",
        "type": "Mesh",
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