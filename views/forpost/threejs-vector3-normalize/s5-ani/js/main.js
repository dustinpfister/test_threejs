
(function () {
    //-------- ----------
    // HELPERS
    //-------- ----------
    // vector from angles helper
    var vectorFromAngles = function(a, b, c, len, start){
        len = len = undefined ? 1 : len;
        var e = new THREE.Euler(
            THREE.MathUtils.degToRad(a),
            THREE.MathUtils.degToRad(b), 
            THREE.MathUtils.degToRad(c));
        var v = start || new THREE.Vector3(0, 1, 0);
        v.applyEuler(e).normalize();
        return v.multiplyScalar(len);
    };
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // ADD MESH OBJECTS
    //-------- ----------
    [
        {x: 1, y: 1, z: 1, ul: 3}
    ].forEach(function(opt, i, arr){
        // create a normalize vector based on the given options for x, y, and z
        // then apply the unit length option using multiplyScalar
        var v = new THREE.Vector3(opt.x, opt.y, opt.z).normalize().multiplyScalar(opt.ul);
        console.log( v.length() ); // about same as opt.ul
        console.log( v.distanceTo( new THREE.Vector3() )); // same as v.length()
        // UNIT LENGTH ( or distance to 0,0,0 ) can be used to 
        // set length attribute of capsule geometry based mesh object
        var geo = new THREE.CapsuleGeometry( 0.125, v.length(), 30, 30 );
        // translate geometry on y by half the vector length
        geo.translate(0,v.length() / 2,0);
        var mesh = new THREE.Mesh(geo, new THREE.MeshNormalMaterial());
        scene.add(mesh);
    });
    //-------- ----------
    // LOOP
    //-------- ----------
    var lt = new Date(),
    fps = 30;
    var loop = function(){
        var now = new Date(),
        secs = ( now - lt ) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / fps){
            lt = now;
            renderer.render(scene, camera);
        }
    };
    loop();
}
    ());
