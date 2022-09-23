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
    // return true if an object has the given values else false
    const hasValues = (obj, useStr, valueStr) => {
        valueStr = valueStr || 'xz';
        const ud = obj.userData;
        return !(ud[useStr + '_' + valueStr] === undefined);
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    let api = {};
    // use the given object for svg path data
    // this is what I will want to use if I all ready have an object
    // that I want to use
    api.useObj = (data, id_prefix, obj) => {
        const ud = obj.userData;
        ud.data = data; // ref to raw data
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
    // create an Mesh based object with the given
    // svg data and id prefix
    api.createMesh = (data, id_prefix, opt ) => {
        opt = opt || {};
        opt.con = opt.con || 'Box';
        opt.argu = opt.argu || [1, 1, 1, 1];
        opt.material = opt.material || new THREE.MeshNormalMaterial();
        opt.geometry = null;
        // if opt is a string try to get con function like this
        // else assume the value given is all ready a function
        if(typeof opt.con === 'string'){
            opt.con = THREE[opt.con + 'Geometry'];
        }
        // if geometry is given use that and ignore any con and argu 
        // props that might be there, else we will need to create it
        if(!opt.geometry){
            opt.geometry = new opt.con(...opt.argu);
        }
        // create the mesh
        const mesh = new THREE.Mesh( 
            opt.geometry,
            opt.material);
        // use path data with the mesh
        api.useObj(data, id_prefix, mesh);
        // return the mesh
        return mesh;
    };
    // set an object by an alpha value of 0 - 1
    api.setToAlpha = (obj, alpha) => {
        // set position
        if( hasValues(obj, 'pos')){
            obj.position.copy( createV3(obj, 'pos', alpha) );
        }
        if( hasValues(obj, 'lookat')){
            obj.lookAt( createV3(obj, 'lookat', alpha) );
        }
    };
    return api;
}());
