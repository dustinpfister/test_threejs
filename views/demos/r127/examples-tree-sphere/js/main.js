
var MATERIALS_TREE = {
    sphere: new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        map: canvasTextureMod.randomGrid(['0', 'r1', '0'], 32, 32, 150),
        side: THREE.DoubleSide
    }),
    trunk: new THREE.MeshBasicMaterial({
        color: 0xffaf00,
        map: canvasTextureMod.randomGrid(['r1', 'r1', '0'], 32, 32, 150),
        side: THREE.DoubleSide
    })
};

var createTrees = function(){
    var group = new THREE.Group();
    var i = 0,
    len = 8;
    while(i < len){
        // create a tree
        var tree = TreeSphereMod.create({
            sphereSize: 0.75,
            materials: MATERIALS_TREE 
        });
        // position and rotate the tree
        var per = i / len,
        radian = Math.PI * 2 * per;
        tree.position.set(Math.cos(radian) * 5, 0, Math.sin(radian) * 5);   
        tree.rotation.set(0, Math.PI * 2 - Math.PI / (len / 2) * i, Math.PI * 1.5);
        group.add(tree);
        i += 1;
    }
    return group;
};

// creating a scene
var scene = new THREE.Scene();

// world
var world = new THREE.Mesh(
    new THREE.SphereGeometry(4,30,30),
    new THREE.MeshBasicMaterial({
        map: canvasTextureMod.randomGrid(['0', 'r1', '0'], 128, 125, 200),
    })
);
// add the box mesh to the scene
var trees = createTrees(scene);
world.add(trees);
scene.add(world);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var lt = new Date(),
fps = 30;
var loop = function(){
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        world.rotation.x += Math.PI / 180 * 20 * secs;
        world.rotation.x %= Math.PI * 2;
        world.rotation.y += Math.PI / 180 * 40 * secs;
        world.rotation.y %= Math.PI * 2;
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();