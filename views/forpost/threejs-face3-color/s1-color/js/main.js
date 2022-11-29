(function () { 
    // ---------- ---------- ----------
    // SCENE, CAMERA, and RENDERER
    // ---------- ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
    camera.position.set(1.5, 1.5, 1.5);
    camera.lookAt(0,0,0);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ---------- ----------
    // USING GROUPS
    // ---------- ---------- ----------
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    [ 0, 1, 2, 0, 1, 2 ].forEach( function(mi, i){
        geometry.groups[i].materialIndex = mi;
    });
    // ---------- ---------- ----------
    // MESH
    // ---------- ---------- ----------
    var mesh = new THREE.Mesh(geometry, [
        new THREE.MeshBasicMaterial( { color: 0x0000ff } ),
        new THREE.MeshBasicMaterial( { color: 0x00ffff } ),
        new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    ]);
    scene.add(mesh);
    // ---------- ---------- ----------
    // RENDER
    // ---------- ---------- ----------
    renderer.render(scene, camera);
}());
