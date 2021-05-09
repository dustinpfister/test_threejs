// loop
var frame = 0,
maxFrame = 180,
lt = new Date(),
fps = 30,
per,
bias,
loop = function () {
    requestAnimationFrame(loop);
    var r = Math.PI * 2 * per,
    sin = Math.sin(r) * 30,
    cos = Math.cos(r) * 30,
    now = new Date(),
    secs = (now - lt) / 1000;

    per = frame / maxFrame;
    bias = 1 - Math.abs(0.5 - per) / 0.5;

    if (secs > 1 / fps) {

        // update point lights
        whitePointLight.position.y = 20 * bias;
        redPointLight.position.set(cos, sin, 0);
        greenPointLight.position.set(cos, 0, sin);
        bluePointLight.position.set(0, cos, sin);

        // render
        renderer.render(scene, camera);
        lt = new Date();

        // step frame
        frame += fps * secs;
        frame %= maxFrame;

    }

};
loop();
