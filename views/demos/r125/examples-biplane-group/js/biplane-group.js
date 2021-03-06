
var BiplaneGroup = (function () {

    var BIPLANE_COUNT = 3,
    MAX_FRAME = 75;

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
            y = -5 + 10 * bias(bi.userData.yFrame / MAX_FRAME);
            z = Math.sin(radian) * 10;
            bi.position.set(x,y,z);
            // make leader roll
            if(bi.userData.rotate){
                bi.rotation.set(bi.userData.r,0,0);
                bi.userData.r += Math.PI / 180 * bi.userData.rSpeed * secs;
                bi.userData.r %= (Math.PI * 2);
            }
            Biplane.update(bi, secs);
            bi.userData.yFrame += 1;
            bi.userData.yFrame %= MAX_FRAME;
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
            bi.userData.yFrame = Math.floor(MAX_FRAME * (i / BIPLANE_COUNT));
            bi.userData.rSpeed = 360;
            bi.userData.rotate = false;
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
