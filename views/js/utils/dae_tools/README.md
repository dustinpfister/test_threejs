# dae_tools.js

This project aims to just be my custom cut set of tools that have to do with using the ColladaLoader.js file in the three.js repo to load \*.dae files that is the default standard when it comes to exporting something from blender. This file is mainly just an additional abstraction of the Collada Loader when it comes to loading Collada files, however I also intend to add at least a few more methods that have to do with processing the results of a file, and creating a group object from a result that is then ready to add to a main scene object of a project.

## Basic use case example

If I have a basic threejs project like this.

```js
(function () {
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('cyan');
    // point light
    var pl = new THREE.PointLight(0xffffff);
    pl.position.set(2, 5, 3);
    scene.add(pl);
    // camera
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(-15, 15, -15);
    camera.add(pl);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
    // controls
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // app loop
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
        controls.update();
    };
```

Then I can use my dae tools module like this to load a dae file, and create a group from the result. All the children from the group are just mesh objects from the dae file, any additonal stuff that might be added to the scene object of the result will not be in the group.

```js
    // USING DAE TOOLS TO LOAD THE *.dae file
    var daeObjects = DAE.create();
    DAE.loadOne(daeObjects, "/dae/rpi4/rpi4_start_box.dae")
    .then(function(daeObjects){
        var group = DAE.createGroup(daeObjects, 0);
        scene.add(group);
        loop();
    })
    .catch(function(e){
        console.log(e);
        loop();
    });
}
    ());
```
