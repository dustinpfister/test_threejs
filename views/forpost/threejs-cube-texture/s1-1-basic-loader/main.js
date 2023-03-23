(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // LOAD CUBE TEXTURE
    //-------- ----------
    new THREE.CubeTextureLoader()
    .setPath('/img/cube/skybox/')
    .load(
        // urls of images used in the cube texture
        [
            'px.jpg',
            'nx.jpg',
            'py.jpg',
            'ny.jpg',
            'pz.jpg',
            'nz.jpg'
        ],
        // what to do when loading is over
        (cubeTexture) => {
            // Geometry
            const geometry = new THREE.SphereGeometry(1, 60, 60);
            // Material
            const material = new THREE.MeshBasicMaterial({
                // CUBE TEXTURE can be used with
                // the environment map property of
                // a material.
                envMap: cubeTexture
            });
            // Mesh
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
            // CUBE TEXTURE is also an option for a background
            scene.background = cubeTexture;
            // render
            renderer.render(scene, camera);
        }
    );
}
    ());
