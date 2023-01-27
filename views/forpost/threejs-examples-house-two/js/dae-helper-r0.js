// dae-helper.js - r0 - from threejs-dae-collada-loader
(function(global){
    // a hard coded default cloner function
    const DEFAULT_CLONER = function(obj, scene_source, scene_result, result){
        scene_source.add(obj.clone());
    };
    // The public DAE_loader function
    global.DAE_loader = function( opt ){
        opt = opt || {};
        opt.urls_dae = opt.urls_dae || [];
        opt.urls_resource = opt.resource_urls || [];
        // use given cloner or defult to add everything
        opt.cloner = opt.cloner || DEFAULT_CLONER;
        const manager = new THREE.LoadingManager();
        const scene_source = new THREE.Scene();
        return new Promise( (resolve, reject) => {
            manager.onError = function(url){
                reject( new Error( 'error when loading: ' + url ) );
            };
            manager.onLoad = function(){
                resolve(scene_source);
            };
            opt.urls_dae.forEach((url, i) => {
                const loader = new THREE.ColladaLoader( manager );
                if(opt.urls_resource[i]){
                    loader.setResourcePath( opt.urls_resource[i] );
                }
                loader.load(url, function(result){
                    result.scene.traverse( (obj) => {
                          opt.cloner(obj, scene_source, result.scene, result);
                    });
                });
            });
        });
    };
}( window ));