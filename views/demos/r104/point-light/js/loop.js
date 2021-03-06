// loop
var frame = 0,
maxFrame = 180,
per,
bias,
loop = function () {
    setTimeout(loop, 33);
    per = frame / maxFrame;
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    r = Math.PI * 2 * per,
    sin = Math.sin(r) * 30,
    cos = Math.cos(r) * 30;
    // update point lights
    whitePointLight.position.y = 20 * bias;
    redPointLight.position.set(cos, sin, 0);
    greenPointLight.position.set(cos, 0, sin);
    bluePointLight.position.set(0, cos, sin);
    // render
    renderer.render(scene, camera);
    // step frame
    frame += 1;
    frame %= maxFrame;
};
loop();
