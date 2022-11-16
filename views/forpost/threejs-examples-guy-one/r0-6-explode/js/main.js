(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0.1, 0.1, 0.1);
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.05, 100);
    const renderer = new THREE.WebGL1Renderer();
    camera.position.set(10, 5, 7);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const pl = new THREE.PointLight(0xffffff, 1);
    pl.position.set(3, 2, 1);
    scene.add(pl);
    const al = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(al);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create guy helper
    const createGuy = (scale) => {
        const guy = new Guy();
        const gud =  guy.group.userData;
        gud.scale = scale;
        guy.group.scale.set(scale, scale, scale);
        // for each mesh
        guy.group.traverse(( obj ) => {
            if(obj.type === 'Mesh'){
                const mesh = obj;
                const mud = mesh.userData;
                // I WANT A NON INDEX GEOMETRY
                mesh.geometry = mesh.geometry.toNonIndexed();
                // store refs to pos and a clone of the pos
                const pos = mesh.geometry.getAttribute('position');
                mud.pos = pos;
                mud.pos_home = pos.clone();
            }
        });
        // using set to plain surface
        setGuyPos(guy);
        return guy;
    };
    // create a guy by way of a hight scale value
    const createGuyHScale = (HScale) => {
        const scale_h1 = 1 / getGuySize( createGuy(1) ).y;
        const guy = createGuy(HScale * scale_h1);
        return guy;
    };
    // get guy size helper
    const getGuySize = (guy) => {
        const b3 = new THREE.Box3();
        b3.setFromObject(guy.group);
        const v3_size = new THREE.Vector3();
        b3.getSize(v3_size);
        return v3_size;
    };
    // set guy pos using box3 and userData object
    const setGuyPos = (guy, v3_pos) => {
        v3_pos = v3_pos || new THREE.Vector3();
        const gud = guy.group.userData;
        const v3_size = getGuySize(guy);
        guy.group.position.copy(v3_pos);
        guy.group.position.y = ( v3_size.y + gud.scale ) / 2 + v3_pos.y;
    };
    // a set guy rotation helper
    const setGuyRotation = (guy, v3_lookat, ignoreY) => {
        ignoreY = ignoreY === undefined ? true: ignoreY;
        const gud = guy.group.userData;
        const v3_size = getGuySize(guy);
        const v3 = v3_lookat.clone();
        v3.y = guy.group.position.y;
        if(!ignoreY){
            v3.y = v3_lookat.y + ( v3_size.y + gud.scale ) / 2;
        }
        guy.group.lookAt( v3 );
    };

    // guy1
    const guy1 = createGuyHScale(3);
    scene.add(guy1.group);
    guy1.group.traverse( (obj) => {
        if(obj.type === 'Mesh'){
            const mesh = obj;
            const mud = mesh.userData;
            console.log(mud);
        }
    });


    ///-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    let f = 0,
    lt = new Date();
    const fMax = 200;
    const loop = function () {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 0.05) {

            // draw
            renderer.render(scene, camera);
            f += 30 * secs;
            f %= fMax;
            lt = now;
        }
    };
    loop();
}
    ());
