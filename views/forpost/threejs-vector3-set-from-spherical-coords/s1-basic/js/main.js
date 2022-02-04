
(function () {

    var v = new THREE.Vector3(0,0,0);

    var phi = THREE.MathUtils.degToRad(54.74),
    theta = THREE.MathUtils.degToRad(45);
    v.setFromSphericalCoords(10, phi, theta);

    var p = document.createElement('p');
    p.innerText = v.x.toFixed(2) + ', ' + v.y.toFixed(2) + ',' + v.z.toFixed(2);
    document.body.appendChild(p);

    console.log(v);

}
    ());
