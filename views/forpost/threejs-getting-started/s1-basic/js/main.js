(function () {
    // ---------- ---------- ----------
    // SCENE, CAMERA, and RENDERER
    // ---------- ---------- ----------
    // a scene is needed to place objects in
    let scene = new THREE.Scene();
    // I will need an camera to look at objects in the scene
    let camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    // In order to see anything I will also need a renderer
    // to use with my scene, and camera
    let renderer = new THREE.WebGLRenderer();
    // I must append the dom element used by the renderer to the html
    // that I am using. 
    // !!!HERE I AM USING document.body IN THEN EVENT THAT YOU ARE
    // JUST COPYING THIS OVER BUT YOU SHOUD CHANGE THIS FOR WHAT IS GOING ON
    // WITH YOUR HTML 
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ---------- ----------
    // ADD A MESH
    // ---------- ---------- ----------
    // I will want to add at least one Mesh to the scene so that I have 
    // something to look at. In order to add a Mesh I will need a Geometry, and
    // a material to skin that geometry with to create the mesh.
    let mesh = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), new THREE.MeshNormalMaterial());
    // ---------- ---------- ----------
    // CHANGE THINGS, AND CALL RENDER METHOD
    // ---------- ---------- ----------
    // now that I have everything I need I can call some methods
    // of what I have to set up my scene, camera, and renderer.
    // I must at least add the mesh to the scene, and position the camera
    // in a way so that it is looking at the mesh
    scene.add(mesh);
    camera.position.set(250, 250, 250);
    camera.lookAt(0,0,0);
    renderer.setSize(640, 480);
    // finally I call renderer.render to draw the current
    // state of the scene, from the perspective of the camera
    renderer.render(scene, camera);
 
}
    ());