(function(){
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // GROUP AND MESH OBJECTS
    //-------- ----------
    const group = new THREE.Group();
    // creating and adding a pointer mesh to the group
    const geo = new THREE.CylinderGeometry(0, 0.5, 1, 12);
    geo.rotateX(Math.PI * 0.5);
    const pointer = new THREE.Mesh(
        geo,
        new THREE.MeshNormalMaterial());
    pointer.position.set(0, 0, 0);
    group.add(pointer);
    // creating and adding a cube
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    cube.position.set(0, 0, 4);
    group.add(cube);
    // box helper for the group
    group.add(new THREE.BoxHelper(group));
    // changing the position of the group to something other that 0,0,0
    group.position.set(-2.0, 0, -2.0);
    // add group to the scene
    scene.add(group);
    //-------- ----------
    // POINTER LOOK
    //-------- ----------
    // IF I WANT TO HAVE THE POINTER LOOK AT THE CUBE
    // THAT IS A CHILD OF THE GROUP, THEN I WILL WANT TO ADJUST 
    // FOR THAT FOR THIS THERE IS THE getWorldPosition Method
    const v = new THREE.Vector3(0, 0, 0);
    cube.getWorldPosition(v);
    console.log(Object.values(v)); [-2, 0, 2];
    pointer.lookAt(v);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
