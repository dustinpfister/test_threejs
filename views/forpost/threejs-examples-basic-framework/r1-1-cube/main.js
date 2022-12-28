// basic rotating cube
threeFrame.create({
    init: function (api) {
        api.renderer.setSize(640, 480, false);
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshNormalMaterial());
        api.scene.add(mesh);
    },
    update: function (api, secs) {
        api.camera.position.set(2,2,2);
        api.camera.lookAt( 0, 0, 0);
    }
});
