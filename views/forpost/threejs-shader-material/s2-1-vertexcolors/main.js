// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SHADER OBJECT - 
// ---------- ----------
const shader_basevert =  {
    // just uBaseColor and opacity
    uniforms: { 
        uBaseColor: { value: new THREE.Color(0,0,0) },
        opacity: { value: 1.0 }
    },
    vertexShader: [
        '#include <common>',
        'varying vec3 vColor;',
        'void main() {',
        '    vColor = vec3( 1.0 );',
        '    vColor *= color;',
        '    vec3 transformed = vec3( position );',
        '    vec4 mvPosition = vec4( transformed, 1.0 );',
        '    mvPosition = modelViewMatrix * mvPosition;',
        '    gl_Position = projectionMatrix * mvPosition;',
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
//console.log(THREE.ShaderChunk[ 'common' ])
// ---------- ----------
// HELPER
// ---------- ----------
const MeshBaseAndVertexMaterial = (opt) => {
    opt = opt || {};
    const mat = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(shader_basevert.uniforms),
        vertexShader: shader_basevert.vertexShader,
        fragmentShader: shader_basevert.fragmentShader
    });
    mat.vertexColors = true;
    mat.transparent = true;
    if(opt.uBaseColor){
        mat.uniforms.uBaseColor.value = new THREE.Color(opt.uBaseColor);
    }
    mat.uniforms.opacity.value = opt.opacity === undefined ? 1 : opt.opacity;
    return mat;
};
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const material1 = MeshBaseAndVertexMaterial({ uBaseColor: 0xff0000, opacity: 0.5 });
const material2 = MeshBaseAndVertexMaterial({ uBaseColor: 0xff00ff, opacity: 0.8 });
// ---------- ----------
// GEOMETRY
// ---------- ----------
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
// ---------- ----------
// MESH
// ---------- ----------
const mesh1 = new THREE.Mesh(geo, material1);
mesh1.position.x = 3.2;
scene.add(mesh1);
const mesh2 = new THREE.Mesh(geo, material2);
mesh2.position.x = -3.2;
scene.add(mesh2);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);

