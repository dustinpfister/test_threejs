(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#202020');
    scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0xffffff));
    const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    camera.position.set(7, 7, 7);
    camera.lookAt(0,0,0);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // Make a single mesh object
    const makeMesh = () => {
        var mesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 20, 20),
            new THREE.MeshNormalMaterial({
                transparent: true,
                opacity: 1
            })
        );
        return mesh;
    };
    // Make a group of mesh objects
    const makeGroup = (opt) => {
        opt = opt || {};
        opt.count = opt.count === undefined ? 10 : opt.count;
        const group = new THREE.Group();
        let i = 0;
        while(i < opt.count){
            const mesh = makeMesh();
            group.add(mesh);
            i+= 1;
        };
        return group;
    };
    const clamp = (i, d) => {
        // clamp i
        i = i < 0 ? 0 : i;
        i = i >= d ? d - 1 : i;
        return i;
    };
    // position a group to a geometry helper
    const positionGroupToGeometry = (group, geo, alpha) => {
        const pos = geo.getAttribute('position');
        const len1 = pos.count;
        const len2 = group.children.length;
        //const a1 = Math.floor( len1  * alpha ) / len1;
        const a2 = len1  * alpha / len1;
        const a3 = a2 % ( 1 / len1 ) * len1;
        //console.log(a1, a2 % ( 1 / len1 ) * len1)

        group.children.forEach( (mesh, mi) => {

            const i = Math.floor( len1 * alpha);
            //const i2 = clamp(i + mi, len1) //(i + mi) % len1;
            const i2 = (i + mi) % len1;;
            //const i2 = (len2 / len1 * mi)  % len1;;
            const v_c = new THREE.Vector3(pos.getX(i2), pos.getY(i2), pos.getZ(i2));
            //const i3 = clamp(i2 + 1, len1); //(i2 + 1) % len1;
            const i3 = (i2 + 1) % len1;
            const v_n = new THREE.Vector3(pos.getX(i3), pos.getY(i3), pos.getZ(i3));
            mesh.position.copy( v_c.lerp( v_n, a3) );

            //let i = clamp( Math.floor( len1  * a1 ) + mi + 5 * mi, len1);
            //let i = clamp( Math.floor( mi / len2 * len1  * a1 ), len1);
            //const v_c = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
            //const i2 = clamp(i + 1, len1);
            //const v_n = new THREE.Vector3(pos.getX(i2), pos.getY(i2), pos.getZ(i2));
            //mesh.position.copy( v_c.lerp(v_n, a3 ) );
        });
    };
    //-------- ----------
    // groups
    //-------- ----------
    const group1 = makeGroup({ count: 10 })
    scene.add(group1);
    const group2 = makeGroup({ count: 10 })
    scene.add(group2);

    const geo1 = new THREE.SphereGeometry(3, 10, 10);
    const geo2 = new THREE.BoxGeometry(3, 3, 3);


    //-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    const FPS_UPDATE = 20,    // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;        // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 1000;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const v_start = new THREE.Vector3(0, 0, 1);
    const v_delta = new THREE.Vector3(0, 0, 3);
    const update = function(frame, frameMax){
        const a1 = frame / frameMax;
        const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
        positionGroupToGeometry(group1, geo1, a2);
        positionGroupToGeometry(group2, geo2, a2);
    };
    // loop
    const loop = () => {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS_UPDATE){
            // update, render
            update( Math.floor(frame), FRAME_MAX);
            renderer.render(scene, camera);
            // step frame
            frame += FPS_MOVEMENT * secs;
            frame %= FRAME_MAX;
            lt = now;
        }
    };
    loop();
}());
