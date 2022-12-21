// count-down.js - r0 - from threejs-examples-count-down
(function(api){
    //-------- ----------
    // DEFAULT SOURCE OBJECTS
    //-------- ----------
    const DEFAULT_OBJECTS = {};
    let i = 0;
    while(i < 10){
        const n = 5 + 10 * i;
        const geo = new THREE.SphereGeometry(0.5, n, n);
        DEFAULT_OBJECTS[i] = new THREE.Mesh(geo, new THREE.MeshNormalMaterial({ wireframe: true}));
        i += 1;
    }
    //-------- ----------
    // HELPERS
    //-------- ----------
    // to pad string ( 9 to 009 if 3 digits )
    const toPadString = (a, digits) => {
        return String(a).padStart(digits, '0');
    };
    // position a digit group
    const positionDigit = (digit, di, digits, width) => {
        const hd = digits / 2;
        const sx = hd * width * -1;
        digit.position.x = width / 2 + sx + width * di;
    };
    // what to do for a DAE result object
    const DAE_on_loaded_item = (result, SOURCE_OBJECTS) => {
        let i = 0;
        // add numbers
        while(i < 10){
            const obj = SOURCE_OBJECTS[i] = result.scene.getObjectByName('num_' + i);
            // using a single texture
            //obj.material.map = canObj_rnd1.texture_data;
            obj.position.set(0, 0, 0);
            // adding line
            //addLine(obj, 1, new THREE.Vector3(), 4, 0xffffff);
            i += 1;
        }
        // add ground object
        const obj_ground = result.scene.getObjectByName('ground_0');
        if(obj_ground){
            SOURCE_OBJECTS['ground_0'] = obj_ground;
            //obj_ground.material.map = canObj_rnd2.texture_data;
            obj_ground.position.set(0, 0, 0);
            //addLine(obj_ground, 1, new THREE.Vector3(0.01,0,0.01), 4, 0xffffff);
        }
    };
    //-------- ----------
    // CREATE METHOD
    //-------- ----------
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
    //-------- ----------
    // SET METHOD
    //-------- ----------
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
    //-------- ----------
    // DAE FILE LOADER 
    //-------- ----------
    api.DAE_loader = function( dae_url, on_loaded_item ){
        on_loaded_item = on_loaded_item || function(){};
        const manager = new THREE.LoadingManager();
        const SOURCE_OBJECTS = {};
        return new Promise( (resolve, reject) => {
            // ERROR WHEN LOADING
            manager.onError = function(url){
                reject(new Error( 'error when loading: ' + url ));
            };
            // WHEN ALL LOADING IS DONE
            manager.onLoad = function(){
                resolve(SOURCE_OBJECTS);
            };
            const loader = new THREE.ColladaLoader(manager);
            loader.load(dae_url, function(result){
                // what to do for each DAE by calling the built in helper for this
                DAE_on_loaded_item(result, SOURCE_OBJECTS);
                on_loaded_item(result, SOURCE_OBJECTS );
            });
        });
    };
    // add lines for a mesh object
    api.addLine = (obj, s, pos, lw, color) => {
        s = s === undefined ? 1 : s;
        pos = pos || new THREE.Vector3();
        const material_line = new THREE.LineBasicMaterial({
            color: color || 0xffffff, 
            linewidth: lw === undefined ? 8: lw,
            transparent: true, opacity: 1
        });
        const line = new THREE.LineSegments( new THREE.EdgesGeometry(obj.geometry), material_line );
        line.scale.set(s, s, s);
        line.position.copy(pos);
        obj.add(line);
    };
}( this['countDown'] = {} ));
 