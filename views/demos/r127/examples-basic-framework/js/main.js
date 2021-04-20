// basic rotating cube
threeFrame.create({
    materials: [new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true
        }),
        new THREE.MeshNormalMaterial({})],
    init: function (api) {
        api.cube = threeFrame.addCube(api, api.scene, 0, 0, 0, 1, 1, false);
        api.rotation = 0;
    },
    update: function (api, secs) {
        api.rotation += 1 * secs;
        api.rotation %= Math.PI * 2;
        api.cube.rotation.set(0, api.rotation, 0);
    }
});
