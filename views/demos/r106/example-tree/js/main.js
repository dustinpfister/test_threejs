
var Tree = function (opt) {

    opt = opt || {};
    opt.sections = opt.sections || 3;
    opt.conesPerSection = opt.conesPerSection || 7;
    opt.sectionRadius = opt.sectionRadius || 3;

    this.group = new THREE.Group();

    var sectionIndex = 0;
    while (sectionIndex < opt.conesPerSection) {

        var cone = new THREE.ConeGeometry(1, 7, 32),
        per = sectionIndex / opt.conesPerSection,
        radian = Math.PI * 2 * per,
        x = Math.cos(radian) * opt.sectionRadius,
        y = 0,
        z = Math.sin(radian) * opt.sectionRadius;
        var coneMaterial = new THREE.MeshBasicMaterial({
                color: 0x00ff00
            });
        var mesh = new THREE.Mesh(
                cone,
                coneMaterial);

        mesh.position.set(x, y, z);
        mesh.rotateX(Math.PI / 2);
        mesh.rotateZ(Math.PI * 2 / opt.conesPerSection * sectionIndex - Math.PI / 2);
        this.group.add(mesh);

        sectionIndex += 1;

    }

};

(function () {
    // SCENE
    var scene = new THREE.Scene();
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 10);
    camera.lookAt(0, 0, 0);

    var tree = new Tree();
    scene.add(tree.group);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
    // CONTROLS
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // LOOP
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();
}
    ());
