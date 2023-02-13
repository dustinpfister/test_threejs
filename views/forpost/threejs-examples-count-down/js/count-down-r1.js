// count-down.js - r1 - from threejs-examples-count-down
//    * create method now takes a scene_source object that is a THREE.Scene Object
//    * DAE loader removed in favor of using this on top of dae-helper-r0.js and THREE.ColladaLoader
(function(api){
    //-------- ----------
    // DEFAULT OPTIONS
    //-------- ----------
    const DEFAULT_WIDTH = 2;
    const DEFAULT_DIGIT_COUNT = 2;
    //-------- ----------
    // DEFAULT SCENE SOURCE OBJECTS
    //-------- ----------
    const DEFAULT_SCENE_SOURCE = new THREE.Scene();
    let i = 0;
    while(i < 10){
        const n = 5 + 10 * i;
        const geo = new THREE.SphereGeometry(DEFAULT_WIDTH / 2, n, n);
        const mesh = new THREE.Mesh(geo, new THREE.MeshNormalMaterial({ wireframe: true}));
        mesh.name = 'num_' + i;
        DEFAULT_SCENE_SOURCE.add(mesh);
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
    const positionDigit = (digit, di, digitCount, width) => {
        const hd = digitCount / 2;
        const sx = hd * width * -1;
        digit.position.x = width / 2 + sx + width * di;
    };
    //-------- ----------
    // CREATE METHOD
    //-------- ----------
    api.create = (opt) => {
        opt = opt || {};
        opt.digitCount = opt.digitCount === undefined ? DEFAULT_DIGIT_COUNT : opt.digitCount;  // 2 digits
        opt.timeStr = opt.timeStr || '00';
        // USE A SCENE OBJECT
        opt.scene_source = opt.scene_source || DEFAULT_SCENE_SOURCE;
        opt.width = opt.width === undefined ? DEFAULT_WIDTH : opt.width;
        opt.countID = opt.countID || '';
        // main count object
        const countObj = new THREE.Group();
        countObj.name = opt.countID;
        // for each digit, clone all source objects
        let di = 0;
        while(di < opt.digitCount){
            const digit = new THREE.Group();
            digit.name = opt.countID + '_' + di;
            // position digit group
            positionDigit(digit, di, opt.digitCount, opt.width);
            countObj.add(digit);
            let ni = 0;
            while(ni < 10){
                // clone the mesh object by getting the propper object from scene
                const mesh = opt.scene_source.getObjectByName('num_' + ni).clone();
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
        const digitCount = countObj.children.length;
        timeStr = toPadString(timeStr, digitCount);
        while(di < digitCount){
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
    // OTHER PUBLIC METHODS
    //-------- ----------
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
 