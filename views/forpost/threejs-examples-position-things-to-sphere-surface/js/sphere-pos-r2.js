/*  sphere-pos.js - r2 - from threejs-examples-position-things-to-sphere-surface
 *  
 *    * getPositionOnSphere method that will give a Vector3
 *    * positionToSphere method calls getPositionOnSphere to get position
 *    * positionToSphere method gets radius by using computeBoundingSphere while getPositionOnSphere takes a radius argument
 *    * getRaycasterPositionOnSphere method started
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
    api.getRaycasterPositionOnSphere = function(sphereMesh, radius, deg1, deg2, alt){
        // defaults for lat, long, and alt
        deg1 = deg1 === undefined ? 0 : deg1;
        deg2 = deg2 === undefined ? 0 : deg2;
        alt = alt === undefined ? 0 : alt;
        // orign for raycaster
        const angle1 = Math.PI / 180 * deg1;
        const angle2 = Math.PI / 180 * deg2;
        // using applyEuler and multiplyScalar to set origin for rayster
        const origin = new THREE.Vector3(1, 0, 0);
        origin.applyEuler( new THREE.Euler( 0, angle1, angle2) ).multiplyScalar(radius);
        // direction for raycaster
        // using vector3 clone, lerp, negate, and normalize methods to get a dir
        const dir = origin.clone().lerp(sphereMesh.position, 0.5).negate().normalize();
        // create and set raycaster
        const raycaster = new THREE.Raycaster();
        raycaster.set( origin, dir );
        const arr = raycaster.intersectObjects([ sphereMesh ]);
        if(arr.length === 1){
            // copy position
            const pos = arr[0].point;
            return pos.setLength( pos.length() + alt )
        }
        return new THREE.Vector3();
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
