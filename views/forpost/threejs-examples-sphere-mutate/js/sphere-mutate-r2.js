(function (api) {
    const DEFAULT_FORPOLE = function(vs, mesh, alpha, opt){
        return vs;
    };
    // defualt for all other points
    const DEFAULT_FORPOINT = function(vs, mesh, alpha, opt){
        return vs.normalize().multiplyScalar(0.75 + 0.25 * Math.random());
    };
    // create the mesh object
    api.create = (texture) => {
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.25, 60, 60, 0, Math.PI * 2), 
            new THREE.MeshPhongMaterial({
                color: 'white',
                map: texture || null,
                side: THREE.DoubleSide
            }));
        const pos = mesh.geometry.getAttribute('position');
        mesh.userData.pos = pos;
        mesh.userData.pos_base = pos.clone();
        return mesh;
    };
    // update the mesh object
    api.update = (mesh, alpha, opt) => {
        alpha = alpha === undefined ? 0 : alpha;
        opt = opt || {};
        opt.forPoint = opt.forPoint || DEFAULT_FORPOINT;
        opt.forPole = opt.forPole || DEFAULT_FORPOLE;
        // mutate
        const geo = mesh.geometry;
        const pos = mesh.userData.pos;
        const pos_base = mesh.userData.pos_base; 
        const w = geo.parameters.widthSegments
        const h = geo.parameters.heightSegments;
        let i = 0;
        while(i < pos.count){
            const x = i % ( w + 1);
            const y = Math.floor(i / ( h + 1) );
            const vs = new THREE.Vector3(pos_base.getX(i), pos_base.getY(i), pos_base.getZ(i));
            let v = vs.clone();
            // do something special for top and bottom points
            if(y === 0 || y === h){
                v = opt.forPole(vs.clone(), mesh, alpha, opt);
            }else{
                // else to what needs to be done for all others
                if(x < w){
                    v = opt.forPoint(vs.clone(), mesh, alpha, opt);
                }else{
                    // deal with seam by setting to point that was all ready set
                    const i2 = y * ( h + 1 );
                    v.set(pos.getX(i2), pos.getY(i2), pos.getZ(i2));
                }
            }
            pos.setXYZ(i, v.x, v.y, v.z);
            i += 1;
        }
    };
}
    (this['sphereMutate'] = {}));
