//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1, 3, 2);
scene.add(dl);
//-------- ----------
// HELPERS
//-------- ----------
const DAE_loader = function( dae_urls, resource_urls){
    resource_urls = resource_urls || [];
    const manager = new THREE.LoadingManager();
    const scene_source = new THREE.Scene();
    return new Promise( (resolve, reject) => {
        manager.onError = function(url){
            reject(new Error( 'error when loading: ' + url ));
        };
        manager.onLoad = function(){
            resolve(scene_source);
        };
        dae_urls.forEach((url, i) => {
            const loader = new THREE.ColladaLoader(manager);
            if(resource_urls[i]){
                loader.setResourcePath(resource_urls[i]);
            }
            loader.load(url, function(result){
                result.scene.traverse((obj) => {
                    if(obj.type === 'Mesh'){
                        scene_source.add( obj.clone() );
                    }
                });
            });
        });
    });
};
//-------- ----------
// LOADING
//-------- ----------
DAE_loader(
    // DAE FILES
    ['/dae/count_down_basic/cd4-nums.dae',
     '/dae/rpi4/rpi4_start_box.dae'],
    // RESOURCE PATHS
    ['/dae/count_down_basic/',
     '/dae/rpi4/']
)
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