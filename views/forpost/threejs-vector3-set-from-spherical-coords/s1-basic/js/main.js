
(function () {
    // creating a vector3 instance
    var v = new THREE.Vector3(0,0,0);
    // getting radian values for phi and theta with the help
    // of the MathUtils.degToRad method
    var phi = THREE.MathUtils.degToRad(54.74),
    theta = THREE.MathUtils.degToRad(45);
    // setting to position of the vector3 with a radius and two angles
    v.setFromSphericalCoords(10, phi, theta);
    // output
    var p = document.createElement('p');
    p.innerText = v.x.toFixed(2) + ', ' + v.y.toFixed(2) + ',' + v.z.toFixed(2);
    document.body.appendChild(p); // 5.77, 5.77,5.77
}
    ());
