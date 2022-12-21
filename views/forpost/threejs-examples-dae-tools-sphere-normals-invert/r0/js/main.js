
(function () {
    //------ ----------
    // SCENE
    //------ ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('cyan');
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(0, 10, 0);
    camera.lookAt(0, 5, 10);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //------ ----------
    // LIGHT
    //------ ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(2, 1, 3)
    scene.add(dl);
    //------ ----------
    // LOOP
    //------ ----------
    let frame = 0;
    const frameMax = 300;
    const loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
        const per = frame / frameMax, bias = 1 - Math.abs( per - 0.5) / 0.5;
        const r = Math.PI * 2 * per;
        camera.lookAt(Math.cos(r) * 10, 15 - 15 * bias, Math.sin(r) * 10);
        frame += 1;
        frame %= frameMax;
    };
    // USING DAE TOOLS TO LOAD THE *.dae file
    const daeObjects = DAE.create();
    DAE.loadOne(daeObjects, "/dae/sphere-normal-invert/sphere-normal-invert.dae")
    .then(function(daeObjects){
        const group = DAE.createGroup(daeObjects, 0);
        scene.add(group);
        const mesh = group.children[0];
        // REPLACE WITH BASIC MATERIAL, USING MAP VALUE 
        // FROM DAE FILE IMPORT
        const sourceMaterial = mesh.material;
        const newMaterial = new THREE.MeshBasicMaterial({
            map: sourceMaterial.map
        });
        mesh.material = newMaterial;
        // BASE GROUND MESH
        const baseGround = new THREE.Mesh( new THREE.BoxGeometry(1, 0.1, 1), new THREE.MeshPhongMaterial({
             color: 0x00ff00
        }));
        baseGround.position.y = -0.125;
        baseGround.scale.set(60, 1, 60);
        scene.add(baseGround);
        loop();
    })
    .catch(function(e){
        console.log(e);
        loop();
    });
}
    ());
