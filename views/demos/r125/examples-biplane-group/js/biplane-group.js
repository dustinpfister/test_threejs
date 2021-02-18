
var BiplaneGroup = (function () {

    var api = {};

    // update
    api.update = function(group, secs){
        var i = 0,
        bi,
        radian,
        x,y,z,
        len = group.children.length;
        while(i < len){
            bi = group.children[i];
            radian = Math.PI * 2 / len * i;
            x = Math.cos(radian) * 10;
            y = 0;
            z = Math.sin(radian) * 10;
            bi.position.set(x,y,z);
            i += 1;
        }
    };


    // main create method
    api.create = function(opt){
        opt = opt || {};

        var group = new THREE.Group();
        var i = 0;
        while(i < 3){
            var bi = Biplane.create();
            group.add(bi);
            i += 1;
        }
        api.update(group, 0);
        return group;
    };

    return api;
}
    ());
