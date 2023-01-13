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
// SHADER OBJECT - Using GLSL code from THREE.ShaderChunk
// ---------- ----------
const shdaer_basic =  {
    // just a default diffuse color of cyan for uniforms
    uniforms: { 
        uBaseColor: { value: new THREE.Color(1, 1, 1) },
        opacity: { value: 0.25 }
    },
    // just using the same code from 'MeshBasicMaterial' for
    // vertex and fragment shaders but now I am puling the actual shader code in
    vertexShader: [
        '#include <common>',
        '#include <color_pars_vertex>',
        'void main() {',
        '    #include <color_vertex>',
        '    #include <begin_vertex>',
        '    #include <project_vertex>',
        '}'
    ].join('\n'),
    fragmentShader: [
        'uniform vec3 uBaseColor;',
        'uniform vec3 diffuse;',
        'uniform float opacity;',
        '#include <common>',
        'varying vec3 vColor;',
        'void main() {',
        '    vec4 color = vec4(uBaseColor, 1.0);',
        '    color *= 0.25;',
        '    color += vec4(vColor, 1.0) * 0.75;',
        '    gl_FragColor = vec4( color.rgb, opacity );',
        '}'
    ].join('\n')
};
console.log(THREE.ShaderChunk[ 'project_vertex' ])
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const material_shader = new THREE.ShaderMaterial(shdaer_basic);
material_shader.vertexColors = true;
material_shader.transparent = true;
material_shader.uniforms.opacity.value = 0.5;
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
//const geo = new THREE.PlaneGeometry( 5, 5, 20, 20);
const geo = new THREE.SphereGeometry( 3, 60, 60 );
// adding a color attribute
const len = geo.getAttribute('position').count;
const color_array = [];
let i = 0;
while(i < len){
   const a1 = i / len;
   const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
   color_array.push(0, a2, 1 - a2)
   i += 1;
}

const color_attribute = new THREE.BufferAttribute(new Float32Array(color_array), 3);
geo.setAttribute('color', color_attribute)


const mesh = new THREE.Mesh(geo, material_shader);
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);

