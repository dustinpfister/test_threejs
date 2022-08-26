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

    // load the dae file with the given URL, and create a sourceObject from it
    // returns a Promsie
    api.load = function(url){
        return new Promise(function(resolve, reject){

            // load dae, start loop
            var loader = new THREE.ColladaLoader();
            loader.load(url, function (result) {
                var sourceObj = {};
                // get objects by name
                [ 'box_1', 'box_2', 'box_3', 'box_4' ].forEach(function(objName, i, arr){
                    // get the source object and change position to 0, 0, 0
                    var obj = result.scene.getObjectByName(objName);
                    obj.position.set(0, 0, 0);
                    // add ref to sourceObj
                    sourceObj[objName] = obj;
                });
        // can now make new mesh objects by cloning a source object
        //mesh = sourceObj.box_1.clone();
        //mesh.geometry = sourceObj.box_1.geometry.clone();
        //scene.add(mesh);
        // start loop
        //loop();

               resolve(sourceObj);

    });


        });
    };
 
    // return the public API
    return api;
 
}
    ());
