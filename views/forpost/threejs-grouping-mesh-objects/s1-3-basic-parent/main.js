(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 2.5, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(1, 3, 2);
    scene.add(dl);
    //-------- ----------
    // HELPER
    //-------- ----------
    const makeCube = (size, x, y, z) => { 
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(size, size, size),
            new THREE.MeshPhongMaterial({color: new THREE.Color(1,1,1)}));
        mesh.position.set(x, y, z);
        return mesh;
    };
    //-------- ----------
    // CREATING A GROUP
    //-------- ----------
    const group = new THREE.Group();
    scene.add(group);
    //-------- ----------
    // ADDING MESH OBJECTS TO THE GROUP
    //-------- ----------
    const mesh = makeCube(3, 0, 0, 0);
    const meshChild = makeCube(1.5, 0, 3, 0);
    mesh.add( meshChild );
    mesh.add( makeCube(1.5, 0, -3, 0) );
    mesh.add( makeCube(1.5, 3, 0, 0) );
    mesh.add( makeCube(1.5, -3, 0, 0) );
    group.add( mesh );
    //-------- ----------
    // GER REFS BY PARENT PROP
    //-------- ----------
    meshChild.material.color = new THREE.Color(1, 0, 0);
    meshChild.parent.material.color = new THREE.Color(0, 1, 0);
    meshChild.parent.parent.position.set(-5, 0, -5);
    meshChild.parent.parent.rotation.y = Math.PI / 180 * 45;
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
