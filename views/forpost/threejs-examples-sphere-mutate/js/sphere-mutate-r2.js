(function (api) {
    //-------- ----------
    // DEFAULTS
    //-------- ----------
    // default for pole function
    const DEFAULT_FORPOLE = function(vs, i, x, y, mesh, alpha, opt){
        return vs;
    };
    // defualt for all other points
    const DEFAULT_FORPOINT = function(vs, i, x, y, mesh, alpha, opt){
        return vs.normalize().multiplyScalar(0.75 + 0.25 * Math.random());
    };
    //-------- ----------
    // HELPERS
    //-------- ----------
    // get index if x and y are known
    const getIndex = (geo, x, y) => {
        const h = geo.parameters.heightSegments;
        return y * ( h + 1 ) + x;
    };
    // get a Vector3 object of the given buffer attribute and index
    const getV3 = (ba, index) => {
        return new THREE.Vector3(ba.getX(index), ba.getY(index), ba.getZ(index));
    };
    // UPDATE NORMALS HELPER
    const updateNormals = (geo) => {
        const w = geo.parameters.widthSegments
        const h = geo.parameters.heightSegments;
        // just call compute vertex normals for all points first
        geo.computeVertexNormals();
        // need to fix the seam normals though
        const x = w;
        let y = 1;
        const normal = geo.getAttribute('normal');
        while(y < h){
            const i =  getIndex(geo, x, y),
            i2 = i - x;
            const v = getV3(normal, i2);
            normal.setXYZ(i, v.x, v.y, v.z);
            y += 1;
        }
        normal.needsUpdate = true;
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    // create the mesh object
    //api.create = (size, w, h, texture) => {
    api.create = (opt) => {
        opt = opt || {};
        opt.size = opt.size === undefined ? 1 : opt.size;
        opt.w = opt.w === undefined ? 10 : opt.w;
        opt.h = opt.h === undefined ? 10 : opt.h;
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(opt.size, opt.w, opt.h, 0, Math.PI * 2), 
            opt.material || new THREE.MeshPhongMaterial({
                color: 'white',
                map: opt.texture || null
            }));
        const pos = mesh.geometry.getAttribute('position');
        mesh.userData.pos = pos;
        mesh.userData.pos_base = pos.clone();
        return mesh;
    };
    // main update method
    api.update = (mesh, alpha, opt) => {
        alpha = alpha === undefined ? 0 : alpha;
        opt = opt || {};
        opt.forPoint = opt.forPoint || DEFAULT_FORPOINT;
        opt.forPole = opt.forPole || DEFAULT_FORPOLE;
        // mutate
        const geo = mesh.geometry;
        const pos = mesh.userData.pos;
        const pos_base = mesh.userData.pos_base; 
        const w = geo.parameters.widthSegments;
        const h = geo.parameters.heightSegments;
        let i = 0;
        while(i < pos.count){
            const x = i % ( w + 1);
            const y = Math.floor(i / ( h + 1) );
            const vs = getV3(pos_base, i);
            let v = vs.clone();
            // do something special for top and bottom points
            if(y === 0 || y === h){
                v = opt.forPole(vs.clone(), i, x, y, mesh, alpha, opt);
            }else{
                // else to what needs to be done for all others
                if(x < w){
                    v = opt.forPoint(vs.clone(), i, x, y, mesh, alpha, opt);
                }else{
                    // deal with seam by setting to point that was all ready set
                    v.copy( getV3(pos, getIndex(geo, x, y) - w ) );
                }
            }
            pos.setXYZ(i, v.x, v.y, v.z);
            i += 1;
        }
        pos.needsUpdate = true;
        // update normals
        updateNormals(geo);
    };
}
    (this['sphereMutate'] = {}));
