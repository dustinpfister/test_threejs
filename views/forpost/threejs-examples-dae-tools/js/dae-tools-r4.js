// dae-tools.js - r4 - for threejs-examples-dae-tools
// * new load method while still keeping older loadOne and loadAll methods for now
// * starting a colllection of methods that work with a DAE result object and a new sourceObj
(function (api) {

    // names should always have at least one underscore like box_1
    var vaildNameCheck = function(obj){
        // object type is not a mesh!? return false
        if(obj.type.toLowerCase() != 'mesh'){
            return false;
        }
        // name is not a string!? Yeah return false.
        if(typeof obj.name != 'string'){
            return false;
        }
        // return false for empty string
        if(obj.name === ''){
            return false;
        }
        // check underscore count
        var uCount = obj.name.split('_').length;
        if(uCount < 1){
            return false;
        }
        // if we make it this far all checks are a pass
        return true;
    };

    // just load a single URL to a dae file. Resolve with a state object that contains raw result object
    // also a sourceObj that has been created using the api.createSourceObj method.
    var loadURL = function(url){
        // cusotm loading manager
        var manager = new THREE.LoadingManager();
        manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
            console.log('loading DAE File: ' + url);
        };
        manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
            console.log(itemsLoaded + '/' + itemsTotal);
        };
        // retrun a promise
        return new Promise(function(resolve, reject){
            var state = {
                result: null,
                sourceObj: null
            };
            // on Error reject with custom generic error message
            manager.onError = function ( url, b ) {
               reject(  new Error('Error while loading DAE FILE ' + url) )
            };
            manager.onLoad = function ( a ) {
                console.log('done loading DAE File: ' + url);
                // result with state object
                resolve(state);
            };
            // create the loader
            var loader = new THREE.ColladaLoader(manager);
            // load the dae file and resolve with source object if all goes well
            loader.load(url, function (result) {
                // set up state object props
                state.result = result;
                state.sourceObj = api.createSourceObj(result);
            });
        });
    };

    //******** **********
    //  new load method
    //******** **********
    

    //******** **********
    //  RESULT and SOURCE OBJECT METHODS
    //******** **********
    api.createSourceObj = function(result){
        // source object
        var sourceObj = {};
        // loop children of scene
        result.scene.children.forEach(function(obj, i, arr){
            // load all vaild mesh objects to sourceObj
            if(vaildNameCheck){
                console.log('keyed in: ', obj.name);
                // set position to 0, 0, 0
                obj.position.set(0, 0, 0);
                // add ref to sourceObj
                sourceObj[obj.name] = obj;
            }
        });
        return sourceObj;
    };
    // create a new mesh from a source object
    api.createMesh = function(sourceObj, name){
        var mesh = sourceObj[name].clone();
        mesh.geometry = sourceObj[name].geometry.clone();
        return mesh;
    };

    //******** **********
    //  new load method
    //******** **********
    api.load = function(url){
        // just load one
        if(typeof url === 'string'){
            return loadURL(url)
        }
        // load all
        return Promise.all( url.map( (urlStr) => { return loadUrl(urlStr) } ) );
    };

    //******** **********
    //  OLD daeObject METHODS
    //******** **********

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
    
    // get just mesh objects
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
