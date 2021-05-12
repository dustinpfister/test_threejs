(function(api){

    // creating a group
    var createBoxGroup = function(count, groupNamePrefix, groupNameCount, childNamePrefix){
        var group = new THREE.Group();
        group.name = groupNamePrefix + '_' + groupNameCount;
        var i = 0,
        box,
        len = count;
        while(i < len){
            box = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshNormalMaterial());
            box.position.set(0, 0, 0);
            box.name = childNamePrefix + '_' + i;
            group.add(box);
            i += 1;
        }
        return group;
    };

    // CREATE A BOX GROUP
    var groupCount = 0;
    api.create = function(){
        var group = createBoxGroup(4, 'boxgroup', groupCount, 'box');
        // set cube zero to a bigger scale than the others
        // this should be the front
        var box = group.getObjectByName('box_0');
        box.scale.set(1, 1, 3);
        box.position.set(0, 0, 1);
        // side box objects
        box = group.getObjectByName('box_1');
        box.scale.set(1, 1, 1);
        box.position.set(2, 0, 0);
        box = group.getObjectByName('box_2');
        box.scale.set(1, 1, 1);
        box.position.set(-2, 0, 0);
        // rear
        box = group.getObjectByName('box_3');
        box.scale.set(1, 1, 1);
        box.position.set(0, 0, -2);
        // step group count
        groupCount += 1;
        return group
    };

}(this['BoxGroup'] = {}));