
var Tree = function (opt) {

    opt = opt || {};
    this.sections = opt.sections || 5;
    this.conesPerSection = opt.conesPerSection || 7;
    this.coneMaterial = opt.coneMaterial || new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });
    this.coneMaxRadius = opt.coneMaxRadius || 0.7;
    this.sectionYStep = opt.sectionYStep || 1;
    this.sectionRadius = opt.sectionRadius || 10;

    this.group = new THREE.Group();

    var sectionIndex = 0;
    while (sectionIndex < this.sections) {

        var groupSection = new THREE.Group(),
        coneRadius = this.coneMaxRadius - 0.3 * (sectionIndex / this.sections),
        //coneRadius = this.coneMaxRadius - 0.3 * Math.pow(2, (sectionIndex / this.sections)),
        //coneRadius = this.coneMaxRadius - Math.pow(0.3, sectionIndex / this.sections),

        //coneLength = 7 / (sectionIndex + 1),
        coneLength = 7 - 3 * (Math.pow(1.5, sectionIndex) - 1) / Math.pow(1.5, this.sections),
        secRadius = this.sectionRadius / (sectionIndex + 1),
        coneIndex = 0;
        while (coneIndex < this.conesPerSection) {

            cone = new THREE.ConeGeometry(coneRadius, coneLength, 32),
            per = coneIndex / this.conesPerSection,
            radian = Math.PI * 2 * per,
            x = Math.cos(radian) * secRadius,
            y = 0,
            z = Math.sin(radian) * secRadius;

            var mesh = new THREE.Mesh(
                    cone,
                    this.coneMaterial);

            mesh.position.set(x, y, z);
            mesh.rotateX(Math.PI / 2);
            mesh.rotateZ(Math.PI * 2 / this.conesPerSection * coneIndex - Math.PI / 2);
            groupSection.add(mesh);

            coneIndex += 1;

        }

        groupSection.position.y = coneRadius * 2 * sectionIndex;
        sectionIndex += 1;

        this.group.add(groupSection);

    }

};

(function () {
    // SCENE
    var scene = new THREE.Scene();
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 10);
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
