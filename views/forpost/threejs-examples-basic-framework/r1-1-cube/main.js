// basic rotating cube
const tf = threeFrame.create({
    // user data object
    userData: {
        radian: 0,
        mesh: new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshNormalMaterial()
        )
    },
    // called just once and only once
    init: function (api) {
        // set size of renderer
        api.renderer.setSize(640, 480, false);
        // add mesh to scene
        api.scene.add(api.userData.mesh);
    },
    // update
    update: function (api, secs) {
        const ud = api.userData;
        ud.radian += Math.PI / 180 * 45 * secs;
        ud.radian %= Math.PI * 2;
        ud.mesh.rotation.y = ud.radian;
        api.camera.position.set( 1.25, 1.25, 1.25 );
        api.camera.lookAt( 0, 0, 0);
    }
});

threeFrame.start(tf);
