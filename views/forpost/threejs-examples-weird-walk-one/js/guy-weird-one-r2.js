//-------- ----------
// WEIRD GUY MODULE - r2 - from threeks-examples-weird-walk-one
// * removed data textures
// * materials create option
// * walk trans update method
// * get guy name, and wrap radian helpers
//-------- ----------
(function(api){
    //-------- ----------
    // MATERIALS
    //-------- ----------
    const MATERIALS = [
        new THREE.MeshPhongMaterial( { color: 0x9a8800} ), // body
        new THREE.MeshPhongMaterial( { color: 0x00aaff} ), // legs
        new THREE.MeshPhongMaterial( { color: 0xffffff} ), // eyes1
        new THREE.MeshPhongMaterial( { color: 0x1a1a1a} ), // eyes2
        new THREE.MeshPhongMaterial( { color: 0xaa0000} )  // mouh
    ];
    //-------- ----------
    // HELPERS
    //-------- ----------
    // return the next default guy name string (guy1, guy2, ...)
    const genGuyName = (function(){
        let n = 1;
        return function(){
            const id = 'guy' + n;
            n += 1;
            return id;
        };
    }());
    // wrap radaian
    const wrapRadian = (r) => {
        return THREE.MathUtils.euclideanModulo(r, Math.PI * 2);
    };
    //-------- ----------
    // CREATE A NEW WEIRD GUY OBJECT
    //-------- ----------
    // create a new weird guy
    api.create = function(opt){
        opt = opt || {};
        opt.materials = opt.materials || MATERIALS;
        const guy = new THREE.Group();
        guy.name = opt.guyID || genGuyName();
        // BODY
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(1, 2.0, 1),
            opt.materials[0]
        );
        body.position.y = 0.25;
        body.name = guy.name + '_body';
        guy.add(body);
        // EYES
        ['eye1', 'eye2'].forEach(function(nameStr, i){
            const eye = new THREE.Mesh(
                new THREE.SphereGeometry(0.2, 30, 30),
                opt.materials[2]
            );
            eye.name = guy.name + '_' + nameStr;
            eye.position.set(-0.2 + 0.4 * i, 0.2, 0.5);
            const innerEye = new THREE.Mesh(
                new THREE.SphereGeometry(0.1, 30, 30),
                opt.materials[3]
            );
            innerEye.position.set(0, 0, 0.125);
            eye.add(innerEye);
            body.add(eye);
        });
        // ADD MOUTH
        const mouth = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.125, 0.25),
            opt.materials[4]
        );
        mouth.name = guy.name + '_mouth';
        mouth.position.set(0, -0.3, 0.5);
        body.add(mouth);
        // ADD ARMS
        ['arm1', 'arm2'].forEach(function(nameStr, i){
            const arm = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 1.0, 0.25),
                opt.materials[0]
            );
            arm.geometry.translate( 0, 0.5, 0 );
            arm.name = guy.name + '_' + nameStr;
            arm.position.set(-0.625 + 1.25 * i, 0.5, 0);
            const tri = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 1.0, 0.25),
                opt.materials[0]
            );
            tri.geometry.translate( 0, 0.5, 0 );
            tri.name = guy.name + '_' + nameStr + '_tri';
            tri.position.set(0, 1, 0);
            arm.add(tri); 
            body.add(arm);
        });
        // ADD PELVIS
        const pelvis = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.5, 1),
            opt.materials[1]
        );
        pelvis.name = guy.name + '_pelvis';
        pelvis.position.set(0, -1.0, 0);
        guy.add(pelvis);
        // ADD LEGS
        ['leg1', 'leg2'].forEach(function(nameStr, i){
            const leg = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 1.5, 1),
                opt.materials[1]
            );
            leg.name = guy.name + '_' + nameStr;
            leg.position.set(-0.25 + 0.5 * i, -1, 0);
            pelvis.add(leg);
        });
        // call set arm for first time
        api.setArm(guy, 1, 0, 0);
        api.setArm(guy, 2, 0, 0);
        return guy;
    };
    //-------- ----------
    // UPDATE A WEIRD GUY OBJECT
    //-------- ----------
    // setWalk
    api.setWalk = function(guy, walkPer){
        const leg1 = guy.getObjectByName(guy.name + '_leg1'),
        leg2 = guy.getObjectByName(guy.name + '_leg2')
        // set scale of legs
        leg1.scale.y = walkPer;
        leg2.scale.y = 1 - walkPer;
        // adjust position of legs
        leg1.position.y = -1.0 + 0.75 * (1 - walkPer);
        leg2.position.y = -1.0 + 0.75 * walkPer;
    };
    api.transLegs = (guy, a_walkstart, a2) => {
        const leg1 = guy.getObjectByName(guy.name + '_leg1');
        const leg2 = guy.getObjectByName(guy.name + '_leg2');
        // set from last walk state using a1 alpha
        api.setWalk(guy, a_walkstart);
        const d1 = 1 - leg1.scale.y;
        const d2 = 1 - leg2.scale.y;
        leg1.scale.y = leg1.scale.y + d1 * a2;
        leg2.scale.y = leg2.scale.y + d2 * a2;
        leg1.position.y = -1 * leg1.scale.y;
        leg2.position.y = -1 * leg2.scale.y;; 
    };
    // set arms method
    api.setArm = function(guy, armNum, a1, a2){
        armNum = armNum === undefined ? 1 : armNum;
        armNum = armNum <= 0 ? 1: armNum;
        a1 = a1 === undefined ? 0 : a1;
        a2 = a2 === undefined ? 0 : a2;
        const arm = guy.getObjectByName(guy.name + '_arm' + armNum);
        arm.rotation.x = wrapRadian( Math.PI - Math.PI / 180 * a1 );
        // set tri rotation
        arm.children[0].rotation.x = wrapRadian( Math.PI / 180 * a2 * -1 );
    };
}( this['weirdGuy'] = {} ));
