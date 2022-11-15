(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
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
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create guy helper
    const createGuy = (scale) => {
        const guy = new Guy();
        const gud =  guy.group.userData;
        gud.scale = scale;
        guy.group.scale.set(scale, scale, scale);
        // using set to plain surface
        setGuyPos(guy);
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
    //-------- ----------
    // ADDING GUY OBJECT TO SCENE
    //-------- ----------
    const scale_h1 = 1 / getGuySize( createGuy(1) ).y;
    
    const guy1 = createGuy(scale_h1);
    setGuyPos(guy1, new THREE.Vector3(-2,0,0));
    scene.add(guy1.group);

    const guy2 = createGuy(scale_h1 * 2);
    setGuyPos(guy2, new THREE.Vector3(0,0,0));
    scene.add(guy2.group);

    const guy3 = createGuy(scale_h1 * 4);
    setGuyPos(guy3, new THREE.Vector3(2,0,0));
    guy3.moveArm('arm_left', -0.125, 0);
    guy3.moveArm('arm_right', 0.125, 0);
    scene.add(guy3.group);

    const guy4 = createGuy(scale_h1 * 6);
    setGuyPos(guy4, new THREE.Vector3(6,0,0));
    scene.add(guy4.group);

    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
