/*   tween-many.js - r0 - from threejs-examples-many-object-tweening
 *   By Dustin Pfister - https://dustinpfister.github.io/
 */
var tweenMany = (function () {
 
    var api = {};
 
    // LERP GEO FUNCTION based off the method from threejs-examples-lerp-geo
    var lerpGeo = function(geo, geoA, geoB, alpha){
        alpha = alpha || 0;
        // pos, and new pos
        let pos = geo.getAttribute('position');
        // positions for a and b
        let posA = geoA.getAttribute('position');
        let posB = geoB.getAttribute('position');
        // loop over pos and lerp between posA and posB
        var i = 0, len = pos.array.length;
        while(i < len){
            // creating Vector3 instances for current posA and PosB vertices
            var v = new THREE.Vector3(posA.array[i], posA.array[i + 1], posA.array[i + 2]);
            var v2 = new THREE.Vector3(posB.array[i], posB.array[i + 1], posB.array[i + 2]);
            // lerping between v and v2 with given alpha value
            v.lerp(v2, alpha);
            // set pos vertex to state of v
            pos.array[i] = v.x;
            pos.array[i + 1] = v.y;
            pos.array[i + 2] = v.z;
            i += 3;
        }
        // the needs update bool of pos should be set true
        pos.needsUpdate = true;
    };
 
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
 
    // the main PUBLIC TWEEN Method
    api.tween = function(geo, states){
        states = states || [];
        // figure numbefr to div my to get mean
        var a1 = states.reduce(function(acc, lgArgu){
            if(lgArgu[2] > 0){
                acc.push(lgArgu)
            }
            return acc;
        }, []);
        var d = states.length;
        // array of new geos that is the lerp between each given geo and alpha
        var a2 = states.map( function( lgArgu ){
            var n = geo.clone();
            lerpGeo.apply(null, [ n ].concat(lgArgu) );
            return n;
        });
        // get the mean of all, and update main geo while doing so
        var pos = geo.getAttribute('position');
        var i = 0, len = pos.array.length;
        while(i < len){
            var v = new THREE.Vector3();
            a2.forEach(function(nGeo){
                var nPos = nGeo.getAttribute('position');
                v.x += nPos.array[i];
                v.y += nPos.array[i + 1];
                v.z += nPos.array[i + 2];
            });
            v.divideScalar( d );
            // set pos vertex to state of v
            pos.array[i] = v.x;
            pos.array[i + 1] = v.y;
            pos.array[i + 2] = v.z;
            i += 3;
        }
        pos.needsUpdate = true;
    };

    // create a new mesh from a source object
    api.createMesh = function(sourceObj, name){
        var mesh = sourceObj[name].clone();
        mesh.geometry = sourceObj[name].geometry.clone();
        return mesh;
    };
 
    // create a source object from a DAE file result object create with the DAE file loader
    // I have this public here so I can bypass using the load methid when I all ready have a result
    // object. This is the case when making a video with my videoground applaction.
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

    // load the dae file with the given URL, and create a sourceObject from it
    // returns a Promsie
    api.load = function(url){
        // cusotm loading manager
        var manager = new THREE.LoadingManager();
        manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
            console.log('loading DAE File: ' + url);
        };
        manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
            console.log(itemsLoaded + '/' + itemsTotal);
        };
        manager.onLoad = function ( a ) {
            console.log('done loading DAE File');
        };
        // retrun a promise
        return new Promise(function(resolve, reject){
            // on Error reject with custom generic error message
            manager.onError = function ( url, b ) {
               reject(  new Error('Error while loading DAE FILE') )
            };
            // create the loader
            var loader = new THREE.ColladaLoader(manager);
            // load the dae file and resolve with source object if all goes well
            loader.load(url, function (result) {
                // resolve with the source object
                resolve(api.createSourceObj(result));
            });
        });
    };
 
    // return the public API
    return api;
 
}
    ());
