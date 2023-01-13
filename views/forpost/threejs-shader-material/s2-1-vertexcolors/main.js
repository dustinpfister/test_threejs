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
        diffuse: { value: new THREE.Color(1, 1, 1) },
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
        'uniform vec3 diffuse;',
        'uniform float opacity;',
        '#include <common>',
        '#include <color_pars_fragment>',
        'void main() {',
        '    vec4 diffuseColor = vec4( diffuse, opacity );',
        '    diffuseColor.rgb *= vColor;', // FROM #include <color_fragment>'
        '    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );',
        '        reflectedLight.indirectDiffuse += vec3( 1.0 );',
        '    reflectedLight.indirectDiffuse *= diffuseColor.rgb;',
        '    vec3 outgoingLight = reflectedLight.indirectDiffuse;',
        '    gl_FragColor = vec4( outgoingLight, diffuseColor.a );', // FROM: #include <output_fragment>',
        '}'
    ].join('\n')
};
console.log(THREE.ShaderChunk[ 'output_fragment' ])
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const material_shader = new THREE.ShaderMaterial(shdaer_basic);
material_shader.vertexColors = true;
material_shader.transparent = true;
material_shader.uniforms.opacity.value = 0.5;
//console.log(material_shader);
const material_basic = new THREE.MeshBasicMaterial();
//material_basic.vertexColors = true;
//material_basic.transparent = true;
//material_basic.opacity = 0.25;
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
   color_array.push(a1, a2, 1 - a1)
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

