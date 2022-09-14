(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(2, 2, 4);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 0.2);
    dl.position.set(3, 2, 1);
    scene.add(dl);
    const pl = new THREE.PointLight(0xffffff, 1);
    pl.position.set(-3, 2, -3);
    scene.add(pl);
    //-------- ----------
    // PLANE MATERIAL INDEX DATA
    //-------- ----------
    const images = [
        [
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
        ],
        [
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1
        ]
    ]
    //-------- ----------
    // HELPERS
    //-------- ----------
    const createPlaneGeo = (images, imageIndex) => {
        const geometry = new THREE.PlaneGeometry(5, 5, 16, 16);
        const img = images[imageIndex];
        geometry.rotateX(Math.PI * 1.5);
        let pxIndex = 0, len = 256;
        while(pxIndex < len){
            geometry.addGroup(pxIndex * 6, 6, img[pxIndex]);
            pxIndex += 1;
        }


        return geometry;
    };
    //-------- ----------
    // GEOMETRY AND GROUPS
    //-------- ----------
    // new plane geometry
    var geometry = createPlaneGeo(images, 1);
    // MESH
    //-------- ----------
    var mesh = new THREE.Mesh(
        // geometry as first argument
        geometry,
        // array of materials as the second argument
        [
            new THREE.MeshPhongMaterial({
                color: 0x000000
            }),
            new THREE.MeshPhongMaterial({
                color: 0xffffff
            })
        ]
    );
    scene.add(mesh);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());