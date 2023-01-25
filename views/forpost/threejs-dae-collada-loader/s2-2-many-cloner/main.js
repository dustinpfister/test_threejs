//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const DAE_loader = function( opt ){
    opt = opt || {};
    opt.urls_dae = opt.urls_dae || [];
    opt.urls_resource = opt.resource_urls || [];
    // use given cloner or defult to add everything
    opt.cloner = opt.cloner || function(obj, scene_source, scene_result, result){
        scene_source.add(obj.clone());
    };
    const manager = new THREE.LoadingManager();
    const scene_source = new THREE.Scene();
    return new Promise( (resolve, reject) => {
        manager.onError = function(url){
            reject(new Error( 'error when loading: ' + url ));
        };
        manager.onLoad = function(){
            resolve(scene_source);
        };
        opt.urls_dae.forEach((url, i) => {
            const loader = new THREE.ColladaLoader(manager);
            if(opt.urls_resource[i]){
                loader.setResourcePath(opt.urls_resource[i]);
            }
            loader.load(url, function(result){
                result.scene.traverse((obj) => {
                      opt.cloner(obj, scene_source, result.scene, result);
                });
            });
        });
    });
};
//-------- ----------
// LOADING
//-------- ----------
DAE_loader({
    // custom cloner
    cloner: (obj, scene_source ) => {
        if(obj.type === 'Mesh'){
            const mat = new THREE.MeshPhongMaterial({
                emissive: new THREE.Color(1,1,1),
                emissiveIntensity: 0.5,
                emissiveMap: obj.material.map 
            });
            const mesh = new THREE.Mesh(obj.geometry, mat);
            mesh.position.copy(obj.position);
            mesh.rotation.copy(obj.rotation);
            scene_source.add(mesh);
        }
    },
    urls_dae: [
        '/dae/count_down_basic/cd4-nums.dae',
         '/dae/rpi4/rpi4_start_box.dae'
    ],
    urls_resource: [
        '/dae/count_down_basic/',
        '/dae/rpi4/'
    ]
})
.then( (scene_source) => {
    console.log('Done loading.');
    scene.add( scene_source)
    camera.position.set(10, 10, 10);
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
})
.catch( (e) => {
    console.warn(e);
});