// basic rotating cube
threeFrame.create({
    init: function (api) {
        api.cube = threeFrame.addCube(api.scene);
        api.rotation = 0;
    },
    update: function (api, secs) {
        api.rotation += 1 * secs;
        api.rotation %= Math.PI * 2;
        api.cube.rotation.set(0, api.rotation, 0);
    }
});
