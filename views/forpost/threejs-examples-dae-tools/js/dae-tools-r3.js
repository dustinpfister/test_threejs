// dae-tools.js - r3 - for threejs-examples-dae-tools
// * added methods for getting buffer geomerty text
(function (api) {

    // create a daeObjects state object
    api.create = function (opt) {
        opt = opt || {};
        var state = {
           results: [],
           onItemProgress : opt.onItemProgress || function(){},
           onFileLoad : opt.onFileLoad || function(){},
           onLoad : opt.onLoad || function(){}
        };
        return state;
    };
 
    // load one dae file
    api.loadOne = function(daeObjects, url, onFileLoad){
        // I will want a manager for this
        var manager = new THREE.LoadingManager();
        // the collada loader instance
        var loader = new THREE.ColladaLoader(manager);
        // result value to pass to onFileLoad
        var resultValue = {};
        onFileLoad = onFileLoad || function(){};
        // return a promise
        return new Promise(function(resolve, reject){
            // call on done, and resolve the promise only when the dae file AND all textures load
            var len = daeObjects.results.length;
            manager.onLoad = function(){
                onFileLoad(resultValue, daeObjects.results, daeObjects);
                resolve(daeObjects);
            };
            // load the dae file and any textures
            loader.load(url,
                // done
                function (result) {
                    resultValue = result;
                    daeObjects.results.push(result);
                },
                // progress
                function(xhr){
                  //console.log(xhr);
                },
                // error
                function(e){
                    reject(e);
                }
             );
        });
    };
 
    // load a collection of dea files
    api.loadAll = function(daeObjects, opt){
        opt = opt || {};
        opt.baseUrl = opt.baseUrl === undefined ? '/' : opt.baseUrl;
        opt.relUrls = opt.relUrls === undefined ? [] : opt.relUrls;
        opt.origin = opt.origin === undefined ? document.location.origin : opt.origin;
        // resolve urls
        var url_obj_base = new URL(opt.baseUrl, document.location.origin);
        var urls = opt.relUrls.map(function(relUrl){
            var url_obj_file = new URL(relUrl, url_obj_base.href + '/');
            return url_obj_file.href;
        });
        // create and return Promise.all of load one method called for each file
        var n = 0,
        d = urls.length;
        return Promise.all(urls.map(function(url, i){
            return api.loadOne(daeObjects, url, daeObjects.onFileLoad).then(function(){
                n += 1;
                daeObjects.onItemProgress(n / d, n , d);
            });
        })).then(function(){
            daeObjects.onLoad(daeObjects, daeObjects.results);
        });
    };
 
    // create a group from a dae result object
    api.createGroup = function(daeObjects, what){
        var result = typeof what === 'object' ? what : daeObjects.results[what];
        var group = new THREE.Group();
        // copy mesh objects only
        result.scene.children.forEach(function(obj){
            if(obj.type === 'Mesh'){
                group.add(obj.clone());
            }
        });
        // copy result.scene rotation to group
        group.rotation.copy(result.scene.rotation);
        return group;
    };
    
    api.getMeshObjects = function(daeObjects, resultIndex){
        resultIndex = resultIndex === undefined ? 0 : resultIndex;
        var result = daeObjects.results[resultIndex];
        var meshObjects = new THREE.Group();
        result.scene.traverse(function(obj){
            if(obj.type === 'Mesh'){
                meshObjects.add(obj);
            }
        });
        return meshObjects;
    };
    
    // get buffer geometry text that can then be used with the buffer geometry loader
    api.getBufferGeoText = function(daeObjects, resultIndex, meshIndex){
        resultIndex = resultIndex === undefined ? 0 : resultIndex;
        meshIndex = meshIndex === undefined ? 0 : meshIndex;
        var meshGroup = api.getMeshObjects(daeObjects, resultIndex);
        var mesh = meshGroup.children[meshIndex];
        // return text for the mesh
        return JSON.stringify( mesh.geometry.toNonIndexed().toJSON() );
    };
    // buffer geometry text to geomerry
    api.fromBufferGeoText = function(text){

        var loader = new THREE.BufferGeometryLoader();

        return loader.parse( JSON.parse(text) );

    };
}
    (this['DAE'] = {}));
