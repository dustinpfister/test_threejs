(function (api) {


    api.create = function () {
        var state = {
           results: []
        };
        return state;
    };

    api.loadOne = function(deaObjects, url, onDone){

        var loader = new THREE.ColladaLoader();
        loader.load("/dae/rpi4/rpi4_start_box.dae", function (result) {
            deaObjects.results.push(result);
            onDone(result, deaObjects.results, deaObjects);
            // create group
            //var group = new THREE.Group();
            // copy mesh objects only
            //result.scene.children.forEach(function(obj){
            //    if(obj.type === 'Mesh'){
            //        console.log(obj.geometry);
            //        group.add(obj.clone());
            //    }
            //});
            //scene.add(group);
            // copy result.scene rotation to group
            //group.rotation.copy(result.scene.rotation);
            // start the app loop
            //loop();
        });
    };


}
    (this['DAE'] = {}));
