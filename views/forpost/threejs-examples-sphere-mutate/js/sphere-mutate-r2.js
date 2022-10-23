(function (api) {
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
    api.update = (mesh) => {
        // mutate
        const geo = mesh.geometry;
        const pos = mesh.userData.pos;
        const pos_base = mesh.userData.pos_base; 
        let i = 0;
        const w = geo.parameters.widthSegments
        const h = geo.parameters.heightSegments;
        while(i < pos.count){
            const x = i % ( w + 1);
            const y = Math.floor(i / ( h + 1) );
            if(y === 0 || y === h){
                // do something special for top and bottom points
            }else{
                if(x < w){
                    const vs = new THREE.Vector3(pos_base.getX(i), pos_base.getY(i), pos_base.getZ(i));
                    const v = vs.clone().normalize().multiplyScalar(0.5 + 0.95 * Math.random());
                    pos.setXYZ(i, v.x, v.y, v.z);
                }else{
                    // deal with seam
                    const i2 = y * ( h + 1 );
                    pos.setXYZ( i, pos.getX(i2), pos.getY(i2), pos.getZ(i2) )
                }
            }
            i += 1;
        }
    };
}
    (this['sphereMutate'] = {}));
