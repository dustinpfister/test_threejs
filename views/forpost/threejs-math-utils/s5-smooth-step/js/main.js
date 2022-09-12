(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt( 0, 0, 0 );
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight();
    dl.position.set(1, 2.5, 5);
    scene.add(dl);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // Wrap method based off of the method from Phaser3 
    // ( https://github.com/photonstorm/phaser/blob/v3.55.2/src/math/Wrap.js )
    // * Added some code for case: Wrap(0, 0, 0)
    // * Using Math.min and Math.max so that Wrap(value, 2, 10) is same as Wrap(value, 10, 2)
    //
    var wrap = function (value, a, b){
        // get min and max this way
        var max = Math.max(a, b);
        var min = Math.min(a, b);
        // return 0 for Wrap(value, 0, 0);
        if(max === 0 && min === 0){
             return 0;
        }
        var range = max - min;
        return (min + ((((value - min) % range) + range) % range));
    };
    // UPDATE A GROUP USING THREE.mathUtils.smoothstep
    const updateGroupSmooth = (group, secs) => {
        group.children.forEach( (mesh) => {
            const mud = mesh.userData;
            // variable pixles per second using THREE.MathUtils.smoothstep and Vector3.distanceTo
            const d = mesh.position.distanceTo( new THREE.Vector3(0, 0, mesh.position.z) );
            const pps = THREE.MathUtils.smoothstep(d, -2.5, 2.5) * mud.maxPPS;
            // stepping posiiton
            mesh.position.x -= pps * secs;
            // wrap
            mesh.position.x = wrap(mesh.position.x, -5, 5);
        });
    };
    // simple update group with fixed pixles per second for sake of something to compare to
    const updateGroup = (group, secs) => {
        group.children.forEach( (mesh) => {
            const mud = mesh.userData;
            // stepping posiiton
            mesh.position.x -= mud.maxPPS * secs;
            // wrap
            mesh.position.x = wrap(mesh.position.x, -5, 5);
        });
    };
    // create a group
    const createGroup = (size, color) => {
        size = size === undefined ? 1 : size;
        color = color || new THREE.Color(1, 1, 1);
        let i = 0;
        const len = 5, group = new THREE.Group();
        while(i < len){
            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(size, size, size),
                new THREE.MeshPhongMaterial({
                    color: color,
                    transparent: true,
                    opacity: 0.5
                }));
            mesh.userData.maxPPS = 1.25 + 1.5 * (i / len);
            const x = 5;
            const z = -4 + 10 * (i / len);
            mesh.position.set(x, 0, z);
            group.add(mesh);
            i += 1;
        }
        return group;
    };
    //-------- ----------
    // OBJECTS
    //-------- ----------
    scene.add( new THREE.GridHelper(10, 10) );
    const group1 = createGroup( 1, new THREE.Color(0,1,0) );
    scene.add(group1);
    const group2 = createGroup( 0.75 );
    scene.add(group2);
    //-------- ----------
    // LOOP
    //-------- ----------
    let frame = 0,
    maxFrame = 90,
    fps = 30,
    lt = new Date();
    const loop = () => {
        const now = new Date(),
        secs = (now - lt) / 1000,
        per = frame / maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {

            updateGroupSmooth(group1, secs);
            updateGroup(group2, secs);

            renderer.render(scene, camera);
            frame += fps * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
