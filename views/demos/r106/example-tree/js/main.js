
var Tree = function (opt) {

    opt = opt || {};
    this.sections = opt.sections || 5;
    this.conesPerSection = opt.conesPerSection || 7;
    this.coneMaterial = opt.coneMaterial || new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });
    this.coneMaxRadius = opt.coneMaxRadius || 0.7;
    this.forCone = opt.forCone || function () {};

    this.group = new THREE.Group();

    var secObj = {
        i: 0
    }
    while (secObj.i < this.sections) {

        var groupSection = new THREE.Group(),
        coneRadius = this.coneMaxRadius - 0.3 * (secObj.i / this.sections),
        coneLength = 7 - 6 * (Math.pow(2, secObj.i) - 1) / Math.pow(2, this.sections),
        coneIndex = 0;

        var coneObj = {
            radius: this.coneMaxRadius - 0.3 * (secObj.i / this.sections),
            length: 7 - 6 * (Math.pow(2, secObj.i) - 1) / Math.pow(2, this.sections),
            i: 0
        };

        secObj.radius = coneLength - coneLength / 2;
        secObj.y = coneRadius * 2 * secObj.i;
        while (coneObj.i < this.conesPerSection) {

            var cone = new THREE.ConeGeometry(coneObj.radius, coneObj.length, 32),
            per = coneObj.i / this.conesPerSection,
            radian = Math.PI * 2 * per,
            x = Math.cos(radian) * secObj.radius,
            y = 0,
            z = Math.sin(radian) * secObj.radius;

            var mesh = new THREE.Mesh(
                    cone,
                    this.coneMaterial);

            mesh.position.set(x, y, z);
            mesh.rotateX(Math.PI / 2);
            mesh.rotateZ(Math.PI * 2 / this.conesPerSection * coneObj.i - Math.PI / 2);

            this.forCone.call(this, mesh, secObj, coneObj);

            groupSection.add(mesh);

            coneObj.i += 1;

        }

        groupSection.position.y = secObj.y;
        secObj.i += 1;

        this.group.add(groupSection);

    }

    console.log(this.group)

};

(function () {
    // SCENE
    var scene = new THREE.Scene();
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 8, 10);
    camera.lookAt(0, 0, 0);
    // LIGHT
    scene.add(camera);
    var light = new THREE.PointLight(0xffffff);
    camera.add(light);
    // TREE
    var tree = new Tree({
            coneMaterial: new THREE.MeshStandardMaterial({
                color: 0x00af00
            })
        });
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
