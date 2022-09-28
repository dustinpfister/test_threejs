(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10, 0x0000ff, 0xffffff));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // CREATING A GROUP WITH CHILDREN
    //-------- ----------
    const group = new THREE.Group();
    group.add( new THREE.GridHelper(10,10, 0xff0000, 0x00ff00));
    const len = 20;
    let i = 0, radian, radius = 5, x, y = 0, z;
    while(i < len){
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        radian = Math.PI * 2 / len * i;
        x = Math.cos(radian) * radius;
        z = Math.sin(radian) * radius;
        mesh.position.set(x, y, z);
        mesh.lookAt(group.position);
        group.add(mesh);
        i += 1;
    }
    scene.add(group);
    group.position.set(-12, 0, -7);
    //-------- ----------
    // WORLD SPACE VECTOR
    //-------- ----------
    const v_ws = new THREE.Vector3(1, 1.5, -1);
    const mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 3, 1),
        new THREE.MeshStandardMaterial({color: 'red'}));
    scene.add(mesh1);
    mesh1.position.copy(v_ws);
    const mesh2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 3, 1),
        new THREE.MeshStandardMaterial({color: 'red'}));
    scene.add(mesh2);
    // get world position works
    const v_ls = new THREE.Vector3()
    group.getWorldPosition(v_ls);
    v_ls.add(v_ws)
    mesh2.position.copy( v_ls );
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(1, 4, 2)
    scene.add(dl);
    //-------- ----------
    // RENDER
    //-------- ----------
    // camera position
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 1, 0);
    // render
    renderer.render(scene, camera);
}());