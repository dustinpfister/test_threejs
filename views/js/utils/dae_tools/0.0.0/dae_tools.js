(function (api) {


    api.create = function () {
        var state = {
           results: []
        };
        return state;
    };

    api.loadOne = function(daeObjects, url, onDone){
        var loader = new THREE.ColladaLoader();
        onDone = onDone || function(){};
        return new Promise(function(resolve, reject){
            loader.load(url,
                // done
                function (result) {
                    daeObjects.results.push(result);
                    onDone(result, daeObjects.results, daeObjects);
                    resolve(daeObjects);
                },
                // progress
                function(xhr){
                  
                },
                // error
                function(e){
                    reject(e);
                }
             );
        });
    };

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


}
    (this['DAE'] = {}));
