(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // MODEL OBJECTS
    //-------- ----------
    const mod1 = new Model({ count: 8, bxSize: 1, color: 0xff0000 });
    scene.add(mod1.group);
    const mod2 = new Model({ count: 16, radius: 8, bxSize: 1});
    scene.add(mod2.group);
    const mod3 = new Model({
            count: 32,
            radius: 9,
            bxSize: 1,
            color: 0x0000ff
        });
    mod3.group.rotation.set(Math.PI * 1.5, 0, 0)
    scene.add(mod3.group);
    //-------- ----------
    // LIGHT
    //-------- ----------
    scene.add(new THREE.PointLight().add(new THREE.Mesh(
                new THREE.SphereGeometry(.5, 10, 10),
                new THREE.MeshBasicMaterial({
                    color: 0xffffff
                }))));
    const light = new THREE.PointLight();
    light.position.set(15, 0, 0);
    light.add(new THREE.Mesh(
            new THREE.SphereGeometry(.5, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            })))
    scene.add(light);
    //-------- ----------
    // LOOP
    //-------- ----------
    let frame = 0;
    const maxFrame = 500;
    const loop = function () {
        const per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5,
        r = Math.PI * 2 * per;
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
        // using the setRadius method of the model to change
        // the radius.
        mod1.setRadius(1 + 6 * bias);
        // changing the rotation of the group
        mod1.group.rotation.set(
            Math.PI * 2 * per,
            Math.PI * 4 * per,
            Math.PI * 8 * per);
        // change position of light, and camera
        light.position.set(Math.cos(r) * 15, 0, Math.sin(r) * 15);
        camera.position.set(
            Math.cos(r + Math.PI * bias) * 20,
            -50 + 100 * bias,
            Math.sin(r) * 20);
        camera.lookAt(0, 0, 0);
        frame += 1;
        frame = frame % maxFrame;
    };
    loop();
}());
