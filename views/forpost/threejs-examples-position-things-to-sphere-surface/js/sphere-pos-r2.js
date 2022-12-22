/*  sphere-pos.js - r2 - from threejs-examples-position-things-to-sphere-surface
 *  
 *    * getPositionOnSphere method that will give a Vector3
 *    * positionToSphere method calls getPositionOnSphere to get position
 *    * positionToSphere method gets radius by using computeBoundingSphere while getPositionOnSphere takes a radius argument
 */
(function (api) {
    //-------- ----------
    // HELPERS
    //-------- ----------
    const getRadius = (sphereMesh) => {
        // get geometry of the sphere mesh
        var sGeo = sphereMesh.geometry;
        // computer bounding sphere for geometry of the sphere mesh
        sGeo.computeBoundingSphere();
        // use radius value of Sphere instance at 
        // boundingSphere of the geometry of sphereMesh
        return sGeo.boundingSphere.radius;
    };
    //-------- ----------
    // Position an Object to a sphere mesh
    //-------- ----------
    // for a given sphere mesh, position a given object to it
    api.positionToSphere1 = function(sphereMesh, obj, lat, long, alt){
        var radius = getRadius(sphereMesh);
        const pos = api.getPositionOnSphere(sphereMesh, radius, lat, long, alt);
        obj.position.copy(pos);
    };
    //-------- ----------
    // Get A Vector3
    //-------- ----------
    // get position by raycaster
    const raycaster = new THREE.Raycaster();
    api.getRaycasterPositionOnSphere = function(sphereMesh, radius, lat, long, alt){

        const dir = api.getPositionOnSphere(sphereMesh, radius, lat, long, alt);
        dir.negate()
        raycaster.set(sphereMesh.position, dir);


    };

    // for a given sphere mesh, get a Vector3 object on the surface
    api.getPositionOnSphere = function(sphereMesh, radius, lat, long, alt){
        // defaults for lat, long, and alt
        lat = lat === undefined ? 0 : lat;
        long = long === undefined ? 0 : long;
        alt = alt === undefined ? 0 : alt;
        // position mesh to position of sphereMesh, and translate
        // from there using lat, long, alt, and radius of sphereMesh
        // using the copy, add, and apply Euler methods of the Vector3 class
        var v1 = new THREE.Vector3(0, radius + alt, 0);
        var x = Math.PI * lat;
        var z = Math.PI * 2 * long;
        var e1 = new THREE.Euler(x, 0, z);
        return sphereMesh.position.clone().add(v1).applyEuler(e1);
    };
}
    (this['SphereWrap'] = {}));
