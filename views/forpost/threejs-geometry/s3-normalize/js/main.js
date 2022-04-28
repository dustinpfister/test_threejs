    // creating a custom geometry
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
 
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(5, 0, 0),
        new THREE.Vector3(5, 5, 0),
        new THREE.Vector3(0, 5, 0));
    geometry.faces.push(
 
        new THREE.Face3(0, 1, 2),
        new THREE.Face3(3, 0, 2));
 
    // geometry is not centered, and it ranges
    // out of the range of 1
    console.log(geometry.vertices[0].x); // 0
    console.log(geometry.vertices[1].x); // 5
 
    // normalize
    geometry.normalize();
    geometry.computeVertexNormals();
 
    // geometry is now centered to the origin
    // and is inside the range of one
    console.log(geometry.vertices[0].x); // -0.707...
    console.log(geometry.vertices[1].x); // 0.707...