(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    scene.add(camera);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // CREATING A GROUP WITH CHILDREN
    //-------- ----------
    const group = new THREE.Group();
    let i = 0, len = 30, radian, radius, x, y, z;
    while(i < len){
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        radian = Math.PI * 2 * 4 / len * i;
        radius = 1;
        x = Math.cos(radian) * radius;
        y = 10 / 2 * -1 + 10 * ( i / len);
        z = Math.sin(radian) * radius;
        // SETTING THE POSITION OF JUST THIS MESH
        mesh.position.set(x, y, z);
        group.add(mesh);
        i += 1;
    }
    scene.add(group);
    // SETTING POSITION OF THE GROUP
    group.position.set(-5,0,-5)
    // POSITON AND ROTATION OF CAMERA
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 1, 0);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());