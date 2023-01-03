// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
// based on what as found at: https://codepen.io/EvanBacon/pen/xgEBPX
// by EvanBacon ( https://codepen.io/EvanBacon , https://twitter.com/baconbrix )
const shader_hatch = {};
// unifrom values for hatching shader
shader_hatch.uniforms = {
        uDirLightPos: { type: 'v3', value: new THREE.Vector3() },
        uDirLightColor: { type: 'c', value: new THREE.Color(0xeeeeee) },
        uAmbientLightColor: { type: 'c', value: new THREE.Color(0x050505) },
        uBaseColor: { type: 'c', value: new THREE.Color(0xffffff) },
        uLineColor0: { type: 'c', value: new THREE.Color(0x000000) },
        uLineColor1: { type: 'c', value: new THREE.Color(0x000000) },
        uLineColor2: { type: 'c', value: new THREE.Color(0x000000) },
        uLineColor3: { type: 'c', value: new THREE.Color(0x000000) },
        uLineColor4: { type: 'c', value: new THREE.Color(0x000000) }
};
// vertex shader for hatching shader
shader_hatch.vertexShader = [
    'varying vec3 vNormal;',
    'void main() {',
    'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
    'vNormal = normalize( normalMatrix * normal );',
    '}'
].join('\n');
// fragment shader for hatching shader
shader_hatch.fragmentShader = [
    'uniform vec3 uBaseColor;',
    'uniform vec3 uLineColor0;',
    'uniform vec3 uLineColor1;',
    'uniform vec3 uLineColor2;',
    'uniform vec3 uLineColor3;',
    'uniform vec3 uLineColor4;',
    'uniform vec3 uDirLightPos;',
    'uniform vec3 uDirLightColor;',
    'uniform vec3 uAmbientLightColor;',
    'varying vec3 vNormal;',
    '',
    'void main() {',
    'float directionalLightWeighting = max( dot( vNormal, uDirLightPos ), 0.0);',
    'vec3 lightWeighting = uAmbientLightColor + uDirLightColor * directionalLightWeighting;',
    'gl_FragColor = vec4( uBaseColor, 1.0 );',
    'if ( length(lightWeighting) < 1.00 ) {',
    'if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0) {',
    'gl_FragColor = vec4( uLineColor1, 1.0 );',
    '}',
    '}',
    'if ( length(lightWeighting) < 0.75 ) {',
    'if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0) {',
    'gl_FragColor = vec4( uLineColor2, 1.0 );',
    '}',
    '}',
    'if ( length(lightWeighting) < 0.50 ) {',
    'if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0) {',
    'gl_FragColor = vec4( uLineColor3, 1.0 );',
    '}',
    '}',
    'if ( length(lightWeighting) < 0.3465 ) {',
    'if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0) {',
    'gl_FragColor = vec4( uLineColor4, 1.0 );',
    '}',
    '}',
    '}'
].join('\n');
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0.8, 1, 0.5);
scene.add(dl);
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const material1 = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.clone(shader_hatch.uniforms),
    vertexShader: shader_hatch.vertexShader,
    fragmentShader: shader_hatch.fragmentShader
});
const lineColor1 = 0x000000;
material1.uniforms.uDirLightColor.value = dl.color;
material1.uniforms.uDirLightPos.value = dl.position;
material1.uniforms.uBaseColor.value.setHex(0xffffff);
material1.uniforms.uLineColor0.value.setHex(lineColor1);
material1.uniforms.uLineColor1.value.setHex(lineColor1);
material1.uniforms.uLineColor2.value.setHex(lineColor1);
material1.uniforms.uLineColor3.value.setHex(lineColor1);
material1.uniforms.uLineColor4.value.setHex(0x000000);
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geo = new THREE.SphereGeometry( 2, 20, 20);
const mesh = new THREE.Mesh(geo, material1);
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
