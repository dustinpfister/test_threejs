(function () {
    
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1f1f1f);
    var camera = new THREE.PerspectiveCamera(50, 640 / 480, 1, 1000);
    camera.position.set(2, 3, 2);
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // POINT LIGHT
    // ---------- ----------
    var pl = new THREE.PointLight(0xffffff, 1);
    pl.position.set(0, 0.5, 0);
    scene.add( pl );
    // ---------- ----------
    // MESH
    // ---------- ----------
    var mesh = new THREE.Mesh(
         new THREE.TorusGeometry(1, 0.5, 150, 150),
         new THREE.MeshPhongMaterial({wireframe:false})
    );
    mesh.geometry.rotateX(Math.PI * 0.5);
    scene.add(mesh);
    camera.lookAt(mesh.position);
    // ---------- ----------
    // RENDER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());
