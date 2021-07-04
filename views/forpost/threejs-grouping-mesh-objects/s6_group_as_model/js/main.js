var Model = (function () {
 
    // the constructor
    var Mod = function (opt) {
 
        // this is what will be added to the Scene
        this.group = new THREE.Group;
 
        // set default, or use what is given
        opt = opt || {};
        this.radius = opt.radius === undefined ? 4 : opt.radius;
        this.count = opt.count === undefined ? 5 : opt.count;
        this.bxSize = opt.bxSize === undefined ? 1 : opt.bxSize;
        this.color = opt.color === undefined ? 0x00ff00 : opt.color;
 
        var i = 0,
        bx,
        radian;
        while (i < this.count) {
 
            bx = new THREE.Mesh(
                    new THREE.BoxGeometry(this.bxSize, this.bxSize, this.bxSize),
                    new THREE.MeshStandardMaterial({
                        color: this.color,
                        emissive: 0x0f0f0f
 
                    }));
 
            this.group.add(bx);
 
            i += 1;
        }
 
        this.update();
 
        console.log(this.group);
 
    };
 
    // update the group
    Mod.prototype.update = function () {
 
        var i = 0,
        bx,
        radian;
        while (i < this.count) {
 
            bx = this.group.children[i];
 
            radian = Math.PI * 2 / this.count * i;
 
            bx.position.set(
 
                Math.cos(radian) * this.radius,
                0,
                Math.sin(radian) * this.radius);
 
            bx.lookAt(0, 0, 0);
 
            i += 1;
 
        };
 
    };
 
    // set radius and update
    Mod.prototype.setRadius = function (radius) {
 
        this.radius = radius;
        this.update();
 
    };
 
    // return the constructor
    return Mod;
 
}
    ());


(function () {
 
    // Scene
    var scene = new THREE.Scene();
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 150);
    camera.position.set(20, 20, 20);
 
    // Orbit Controls
    //var controls = new THREE.OrbitControls(camera);
    camera.lookAt(0, 0, 0);
 
    // three instances of the model
    var mod1 = new Model({
 
            count: 8,
            bxSize: 1,
            color: 0xff0000
 
        });
    scene.add(mod1.group);
 
    var mod2 = new Model({
 
            count: 16,
            radius: 8,
            bxSize: 1
 
        });
    scene.add(mod2.group);
 
    var mod3 = new Model({
 
            count: 32,
            radius: 9,
            bxSize: 1,
            color: 0x0000ff
 
        });
    mod3.group.rotation.set(Math.PI * 1.5, 0, 0)
    scene.add(mod3.group);
 
    // light
    scene.add(new THREE.PointLight().add(new THREE.Mesh(
                new THREE.SphereGeometry(.5, 10, 10),
                new THREE.MeshBasicMaterial({
                    color: 0xffffff
                }))));
 
    var light = new THREE.PointLight();
    light.position.set(15, 0, 0);
    light.add(new THREE.Mesh(
            new THREE.SphereGeometry(.5, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            })))
    scene.add(light);
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // loop
    var frame = 0,
    maxFrame = 500;
    var loop = function () {
 
        var per = frame / maxFrame,
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
 
}
    ());