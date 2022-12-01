(function(){
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ----------
    // Tetrahedron Geometry
    // ---------- ----------
    const geo = new THREE.TetrahedronGeometry(1, 0);
    const mesh_material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh( geo, mesh_material );
    scene.add(mesh);
    // ---------- ----------
    // RENDER
    // ---------- ----------
    camera.position.set(3.25, 2.25, 3).normalize().multiplyScalar(2);
    camera.lookAt(mesh.position);
    renderer.render(scene, camera);
}());