
var BiplaneGroup = (function () {

    var BIPLANE_COUNT = 3;

    var api = {};

    var bias = function(per){
        return Math.abs(0.5 - per) / 0.5;
    };

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
            y = -5 + 10 * bias(bi.userData.yFrame / 50);
            z = Math.sin(radian) * 10;
            bi.position.set(x,y,z);
            // make leader roll
            if(i === 0){
                bi.rotation.set(bi.userData.r,0,0);
                bi.userData.r += Math.PI / 180 * 180 * secs;
                bi.userData.r %= (Math.PI * 2);
            }
            Biplane.update(bi, secs);
            bi.userData.yFrame += 1;
            bi.userData.yFrame %= 50;
            i += 1;
        }
    };


    // main create method
    api.create = function(opt){
        opt = opt || {};
        var group = new THREE.Group();
        var i = 0;
        while(i < BIPLANE_COUNT){
            var bi = Biplane.create();
            //bi.userData.y = -5 + 10 * (i / 3);
            bi.userData.yFrame = Math.floor(50 * (i / BIPLANE_COUNT));
            bi.userData.r = 0;
            group.add(bi);
            i += 1;
        }
        api.update(group, 0);
        return group;
    };

    return api;
}
    ());
