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
        'diffuse': { value: new THREE.Color(1, 1, 1) }
    },
    // just using the same code from 'MeshBasicMaterial' for
    // vertex and fragment shaders but now I am puling the actual shader code in
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
    fragmentShader: [
        'uniform vec3 diffuse;',
        'uniform float opacity;',
        '#ifndef FLAT_SHADED',
        '    varying vec3 vNormal;',
        '#endif',
        '#include <common>',
        '#include <dithering_pars_fragment>',
        '#include <color_pars_fragment>',
        '#include <uv_pars_fragment>',
        '#include <uv2_pars_fragment>',
        '#include <map_pars_fragment>',
        '#include <alphamap_pars_fragment>',
        '#include <alphatest_pars_fragment>',
        '#include <aomap_pars_fragment>',
        '#include <lightmap_pars_fragment>',
        '#include <envmap_common_pars_fragment>',
        '#include <envmap_pars_fragment>',
        '#include <fog_pars_fragment>',
        '#include <specularmap_pars_fragment>',
        '#include <logdepthbuf_pars_fragment>',
        '#include <clipping_planes_pars_fragment>',
        'void main() {',
        '    #include <clipping_planes_fragment>',
        '    vec4 diffuseColor = vec4( diffuse, opacity );',
        '    #include <logdepthbuf_fragment>',
        '    #include <map_fragment>',
        '    #include <color_fragment>',
        '    #include <alphamap_fragment>',
        '    #include <alphatest_fragment>',
        '    #include <specularmap_fragment>',
        '    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );',
        '    #ifdef USE_LIGHTMAP',
        '        vec4 lightMapTexel = texture2D( lightMap, vUv2 );',
        '        reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;',
        '    #else',
        '        reflectedLight.indirectDiffuse += vec3( 1.0 );',
        '    #endif',
        '    #include <aomap_fragment>',
        '    reflectedLight.indirectDiffuse *= diffuseColor.rgb;',
        '    vec3 outgoingLight = reflectedLight.indirectDiffuse;',
        '    #include <envmap_fragment>',
        '    #include <output_fragment>',
        '    #include <tonemapping_fragment>',
        '    #include <encodings_fragment>',
        '    #include <fog_fragment>',
        '    #include <premultiplied_alpha_fragment>',
        '    #include <dithering_fragment>',
        '}'
    ].join('\n')
};
//console.log(THREE.ShaderChunk[ 'meshbasic_frag' ])
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const material = new THREE.ShaderMaterial(shdaer_basic);
console.log(material.vertexShader);
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

