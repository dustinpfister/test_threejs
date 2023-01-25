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
// what to do for a DAE result object
const DAE_on_loaded_item = (result, scene_source) => {
    result.scene.children.forEach( (obj) => {
        // if an object is a mesh object
        if(obj.type === 'Mesh'){
            obj.position.set(0, 0, 0);
            scene_source.add(obj);
        }
    });
};
const DAE_loader = function( dae_urls, resource_urls, on_loaded_item ){
    resource_urls = resource_urls || [];
    on_loaded_item = on_loaded_item || function(){};
    const manager = new THREE.LoadingManager();
    const scene_source = new THREE.Scene();
    return new Promise( (resolve, reject) => {
        // ERROR WHEN LOADING
        manager.onError = function(url){
            reject(new Error( 'error when loading: ' + url ));
        };
        // WHEN ALL LOADING IS DONE
        manager.onLoad = function(){
            resolve(scene_source);
        };
        dae_urls.forEach((url, i) => {
            const loader = new THREE.ColladaLoader(manager);
            if(resource_urls[i]){
                loader.setResourcePath(resource_urls[i]);
            }
            loader.load(url, function(result){
                // what to do for each DAE by calling the built in helper for this
                DAE_on_loaded_item(result, scene_source);
                on_loaded_item(result, scene_source );
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
     '/dae/box_house_1/box_house1.dae'],
    // RESOURCE PATHS
    ['/dae/count_down_basic/',
     '/dae/box_house_1/']
)
.then( (scene_source) => {
    console.log('Done loading.');
    console.log(scene_source);

    scene.add(scene_source.getObjectByName('num_0'))

    camera.position.set(10, 10, 10);
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
})
.catch( (e) => {
    console.warn(e);
});