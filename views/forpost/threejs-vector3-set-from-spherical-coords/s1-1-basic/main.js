// creating a vector3 instance
const a = new THREE.Vector3();
//-------- ----------
// USING VECTOR3.setFromSphericalCoords
//-------- ----------
// getting radian values for phi and theta with the help
// of the MathUtils.degToRad method
const phi = THREE.MathUtils.degToRad(54.74),
theta = THREE.MathUtils.degToRad(45);
// setting to position of the vector3 with a radius and two angles
a.setFromSphericalCoords(10, phi, theta);
// distnaceTo
const radius = new THREE.Vector3(0, 0, 0).distanceTo( new THREE.Vector3(10, 10, 10));
const b = new THREE.Vector3().setFromSphericalCoords(radius, 
    THREE.MathUtils.degToRad(45),
    THREE.MathUtils.degToRad(0)); 
// output
const p = document.createElement('p');
p.innerText = a.x.toFixed(2) + ', ' + a.y.toFixed(2) + ',' + a.z.toFixed(2);
document.body.appendChild(p); // 5.77, 5.77,5.77
