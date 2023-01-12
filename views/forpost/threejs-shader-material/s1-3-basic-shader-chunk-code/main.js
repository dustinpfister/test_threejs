// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SHADER OBJECT - Using THREE.ShaderChunk for the vertex and fragment shaders
// ---------- ----------
const shdaer_basic =  {
    // just a default diffuse color of cyan for uniforms
    uniforms: { 
        'diffuse': { value: new THREE.Color(1, 1, 1) }
    },
    // just using the same code from 'MeshBasicMaterial' for
    // vertex and fragment shaders
    //vertexShader: THREE.ShaderChunk[ 'meshbasic_vert' ],
    vertexShader: [
        '#include <common>',
        '#include <uv_pars_vertex>', 
        '#include <uv2_pars_vertex>', 
        '#include <envmap_pars_vertex>', 
        '#include <color_pars_vertex>', 
        '#include <fog_pars_vertex>',
        '#include <morphtarget_pars_vertex>', 
        '#include <skinning_pars_vertex>',
        '#include <logdepthbuf_pars_vertex>', 
        '#include <clipping_planes_pars_vertex>', 
        'void main() {',
        '    #include <uv_vertex>', 
        '    #include <uv2_vertex>', 
        '    #include <color_vertex>', 
        '    #include <morphcolor_vertex>',
        '    #if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )', 
        '        #include <beginnormal_vertex>',
        '        #include <morphnormal_vertex>', 
        '        #include <skinbase_vertex>',
        '        #include <skinnormal_vertex>', 
        '        #include <defaultnormal_vertex>', 
        '    #endif',
        '    #include <begin_vertex>', 
        '    #include <morphtarget_vertex>', 
        '    #include <skinning_vertex>',
        '    #include <project_vertex>', 
        '    #include <logdepthbuf_vertex>', 
        '    #include <clipping_planes_vertex>', 
        '    #include <worldpos_vertex>',
        '    #include <envmap_vertex>',
        '    #include <fog_vertex>',
        '}'
    ].join('\n'),

    fragmentShader: THREE.ShaderChunk[ 'meshbasic_frag' ],
};

//console.log(THREE.ShaderChunk[ 'meshbasic_frag' ])

// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const material = new THREE.ShaderMaterial(shdaer_basic);
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geo = new THREE.BoxGeometry( 2, 2, 2);
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);

