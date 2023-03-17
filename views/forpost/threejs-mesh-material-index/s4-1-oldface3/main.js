// REVISION 91 style 'face3' demo
(function () {
    console.log('You are using threejs revision: R' + THREE.REVISION + ', this was made for R91');
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // MATERIALS
    //-------- ----------
    // an array of materials
    var materials = [
        new THREE.MeshBasicMaterial({ color: 0xff0000 }),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff })
    ];
    //-------- ----------
    // GEOMETRY/OBJECTS
    //-------- ----------
    // create the mesh
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    // set material index values
    var len = materials.length;
    geometry.faces.forEach(function (face3, i) {
        face3.materialIndex = Math.floor(i % (len * 2) / 2);
    });
    // create the mesh
    var mesh = new THREE.Mesh( geometry, materials);
    // add mesh to scene
    scene.add(mesh);
    // some helpers
    scene.add( new THREE.FaceNormalsHelper(mesh, 2, 0x00ff00, 1) );
    scene.add( new THREE.VertexNormalsHelper(mesh, 2, 0xff0000, 1) );
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
