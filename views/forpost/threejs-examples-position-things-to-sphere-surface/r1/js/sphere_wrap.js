/*  sphere_wrap.js - r1 - from threejs-examples-position-things-to-sphere-surface
 *  
 */
(function (api) {

    // position a mesh to a sphere mesh with a given lat, long, and alt
    api.positionToSphere = function(sphereMesh, mesh, lat, long, alt){

        // sphere geometry
        var sGeo = sphereMesh.geometry;

        // computer bounding sphere
        sGeo.computeBoundingSphere();

        // use radius value of Sphere instance at 
        // boundingSphere of the geometry of sphereMesh
        var radius = sGeo.boundingSphere.radius;

        // position mesh to position of sphereMesh, and translate
        // from there using lat, long, alt, and radius of sphereMesh
        var v1 = new THREE.Vector3(0, radius, 0);
        var x = Math.PI * lat;
        var z = Math.PI * 2 * long;
        var e1 = new THREE.Euler(x, 0, z)
        mesh.position.copy(sphereMesh.position).add(v1).applyEuler(e1);

console.log(mesh.position)


    };

}
    (this['SphereWrap'] = {}));
