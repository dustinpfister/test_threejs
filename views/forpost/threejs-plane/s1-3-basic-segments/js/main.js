(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.5, 100);
    camera.position.set(6, 6, 6);
    camera.lookAt(0.75, -2, 0);
    scene.add(camera);
    // render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // ---------- ----------
    // MESH - 
    // ---------- ----------
    // shared material in wire frame mode
    const material = new THREE.MeshBasicMaterial( { wireframe: true, wireframeLinewidth: 3 });
    // 5 by 5 size, but just 1 by 1 with segments ( DEFAULT ) 
    const mesh2 = new THREE.Mesh(
        new THREE.PlaneGeometry(5, 5),
        material);
    mesh2.geometry.rotateX( Math.PI * 0.5 );
    mesh2.position.set(-3, 0, 0);
    scene.add(mesh2);
    // 5 by 5 size, and 10 by 10 with segments
    const mesh3 = new THREE.Mesh(
        new THREE.PlaneGeometry(5, 5, 10, 10),
        material);
    mesh3.geometry.rotateX( Math.PI * 0.5 );
    mesh3.position.set(3, 0, 0);
    scene.add(mesh3);
    // ---------- ----------
    // RENDER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());