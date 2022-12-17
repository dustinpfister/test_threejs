(function(api){

    // DEFAULT SOURCE OBJECTS
    const DEFAULT_OBJECTS = {};
    let i = 0;
    while(i < 10){
        const n = 5 + 5 * i;
        const geo = new THREE.SphereGeometry(0.5, n, n);
        DEFAULT_OBJECTS[i] = new THREE.Mesh(geo, new THREE.MeshNormalMaterial());
        i += 1;
    }

    // create a count group
    api.create = (opt) => {
        opt = opt || {};
        opt.digits = opt.digits === undefined ? 2 : opt.digits;  // 2 digits
        opt.nMax = opt.nMax === undefined ? 60 : opt.nMax;       // 60 => 0 - 59
        opt.source_objects = opt.source_objects || DEFAULT_OBJECTS;
        opt.countID = opt.countID || '';
        // main count object
        const countObj = new THREE.Group();
        countObj.name = opt.countID;
        // for each digit, clone all source objects
        let di = 0;
        while(di < opt.digits){
            const digit = new THREE.Group();
            digit.name = opt.countID + '_' + di;
            countObj.add(digit);
            let ni = 0;
            while(ni < 10){
                const mesh = opt.source_objects[ni].clone();
                mesh.name = opt.countID + '_' + di + '_' + ni;
                digit.add(mesh);
                ni += 1;
            }
            di += 1;
        }
        return countObj;
    };

}( this['countDown'] = {} ));