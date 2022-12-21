// count-down.js - r0 - from threejs-examples-count-down
(function(api){
    // DEFAULT SOURCE OBJECTS
    const DEFAULT_OBJECTS = {};
    let i = 0;
    while(i < 10){
        const n = 5 + 10 * i;
        const geo = new THREE.SphereGeometry(0.5, n, n);
        DEFAULT_OBJECTS[i] = new THREE.Mesh(geo, new THREE.MeshNormalMaterial({ wireframe: true}));
        i += 1;
    }
    // to pad string ( 9 to 009 if 3 digits )
    const toPadString = (a, digits) => {
        return String(a).padStart(digits, '0');
    }
    // position a digit group
    const positionDigit = (digit, di, digits, width) => {
        const hd = digits / 2;
        const sx = hd * width * -1;
        digit.position.x = width / 2 + sx + width * di;
    };
    // set to the given time string
    api.set = (countObj, timeStr) => {
        let di = 0;
        const digits = countObj.children.length;
        timeStr = toPadString(timeStr, digits);
        while(di < digits){
            let ni = 0;
            while(ni < 10){
                const mesh = countObj.getObjectByName(countObj.name + '_' + di + '_' + ni);
                const n = parseInt(timeStr[di]);
                mesh.visible = false;
                if(n === ni){
                    mesh.visible = true;
                }
                ni += 1;
            }
            di += 1;
        }
    };
    // create a count group
    api.create = (opt) => {
        opt = opt || {};
        opt.timeStr = opt.timeStr || '00';
        opt.digits = opt.digits === undefined ? 2 : opt.digits;  // 2 digits
        opt.source_objects = opt.source_objects || DEFAULT_OBJECTS;
        opt.width = opt.width === undefined ? 1 : opt.width;
        opt.countID = opt.countID || '';
        // main count object
        const countObj = new THREE.Group();
        countObj.name = opt.countID;
        // for each digit, clone all source objects
        let di = 0;
        while(di < opt.digits){
            const digit = new THREE.Group();
            digit.name = opt.countID + '_' + di;
            // position digit group
            positionDigit(digit, di, opt.digits, opt.width);
            countObj.add(digit);
            let ni = 0;
            while(ni < 10){
                // clone the mesh object
                const mesh = opt.source_objects[ni].clone();
                mesh.name = opt.countID + '_' + di + '_' + ni;
                mesh.visible = false; // mesh objects viable gets set true based on time value
                // I will want a clone for the geometry and material also
                mesh.geometry = mesh.geometry.clone();
                mesh.material = mesh.material.clone();
                digit.add(mesh);
                ni += 1;
            }
            di += 1;
        }
        api.set(countObj, opt.timeStr);
        return countObj;
    };
    // DAE FILE LOADER HELPER
    api.DAE_loader = function( dae_url, on_loaded_item ){
        const manager = new THREE.LoadingManager();
        return new Promise( (resolve, reject) => {
            // ERROR WHEN LOADING
            manager.onError = function(url){
                reject(new Error( 'error when loading: ' + url ));
            };
            // WHEN ALL LOADING IS DONE
            manager.onLoad = function(){
                resolve();
            };
            const loader = new THREE.ColladaLoader(manager);
            loader.load(dae_url, on_loaded_item );
        });
    };
}( this['countDown'] = {} ));
 