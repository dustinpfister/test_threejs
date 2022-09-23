// svgmove.js - r0 - from threejs-examples-svg-movement
const SVGMove = (function () {
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create a v2 from the given obj, useStr, valueStr, and index
    // ex getV2(obj, 'pos', 'xz', 0)
    const getV2 = (obj, useStr, valueStr, index) => {
        const ud = obj.userData;
        const arr = ud[ useStr + '_' + valueStr ];
        const len = arr.length;
        const i = THREE.MathUtils.euclideanModulo(index, len);
        return arr[i];
    };
    // create a v3 for the given obj, use string, and alpha value
    // ex crateV3(obj, 'pos', 0.35);
    const createV3 = (obj, useStr, alpha) => {
        const ud = obj.userData;
        let len = 0, fi, i = 0, lerpAlpha;
        // get current xz Vector2
        len = ud[useStr + '_xz'].length;
        fi = ( len - 1) * alpha; // fraction index ex: 1.44
        i = Math.floor( fi);     // index ex: 1
        lerpAlpha = fi % 1;      // lerpAlpha from current to next point ex: 0.44
        // current pos
        const xz = getV2(obj, useStr, 'xz', i); 
        const xz_next = getV2(obj, useStr, 'xz', i + 1); 
        // next pos
        const y = getV2(obj, useStr, 'y', i);
        const y_next = getV2(obj, useStr, 'y', i + 1);
        // use xz Vector2 to set position of object
        const v3_current = new THREE.Vector3(xz.x, y.y, xz.y);
        const v3_next = new THREE.Vector3(xz_next.x, y_next.y, xz_next.y);
        return v3_current.clone().lerp(v3_next, lerpAlpha);
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    let api = {};
    // create an Mesh based object with the given
    // svg data and id prefix
    api.createMesh = (data, id_prefix, ) => {
        const obj = new THREE.Mesh( 
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshNormalMaterial());
        const ud = obj.userData;
        data.paths.forEach((path)=>{
            // get id of the path
            const id = path.userData.node.id;
            const idParts = id.split('_');
            if(idParts[0] === id_prefix){
                // get points
                const points = path.subPaths[0].getPoints();
                ud[ idParts[1] + '_' + idParts[2] ] = points;
            }
        });
        return obj;
    };
    // set an object by an alpha value of 0 - 1
    api.setToAlpha = (obj, alpha) => {
        // just setting position for now
        obj.position.copy( createV3(obj, 'pos', alpha) );
    };
    return api;
}());
