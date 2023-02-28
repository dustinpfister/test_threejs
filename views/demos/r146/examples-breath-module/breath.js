// breath.js - r0 - r146 prototype
(function(api){
    const BREATH_KEYS = 'restLow,breathIn,restHigh,breathOut'.split(',');
    //-------- ----------
    // DEFAULTS
    //-------- ----------
    const DEFAULT_BREATH_PARTS = {restLow: 1, breathIn: 5, restHigh: 1, breathOut: 5};
    const DEFAULT_CURVE_UPDATE = (curve, alpha, v_c1, v_c2, v_start, v_end, gud, group) => {
        const e1 = new THREE.Euler();
        e1.z = Math.PI / 180 * 90 * alpha;
        v_c1.copy( v_start.clone().lerp(v_end, 0.25).applyEuler(e1).multiplyScalar(1 + 0.5 * alpha) );
    };
    const DEFAULT_MESH_UPDATE = (mesh, curve, alpha, index, count, group) => {
        const a_meshpos = (index + 1) / count;
        mesh.position.copy( curve.getPoint(a_meshpos * alpha) );
    };
    //-------- ----------
    // HELPERS
    //-------- ----------
    // update curve control points and mesh object values
    const updateGroup = (group, alpha) => {
        const gud = group.userData;
        let index_curve = 0;
        while(index_curve < gud.curveCount){
            const curve = gud.curvePath.curves[index_curve];
            const v_start = curve.v0, v_c1 = curve.v1, v_c2 = curve.v2, v_end = curve.v3;
            gud.curveUpdate(curve, alpha, v_c1, v_c2, v_start, v_end, gud, group);
            let index_mesh = 0;
            while(index_mesh < gud.meshPerCurve){
                const name = getMeshName(gud, index_curve, index_mesh);
                const mesh = group.getObjectByName(name);
                gud.meshUpdate(mesh, curve, alpha, index_mesh, gud.meshPerCurve, group);
                index_mesh += 1;
            }
            index_curve += 1;
        };
    };
    // get a mesh object name to be used when creating and getting mesh objects in breath group
    const getMeshName = (gud, index_curve, index_mesh) => {
        return 'breath_id' + gud.id + '_curve' + index_curve + '_mesh' + index_mesh;
    };
    // get the sum of a breath parts object
    const getBreathPartsSum = (breathParts) => {
        return Object.keys( breathParts ).reduce( ( acc, key ) => { return acc + breathParts[key]; }, 0);
    };

    console.log( getBreathPartsSum(DEFAULT_BREATH_PARTS) );

/*
    const BREATH_ALPHA_TARGETS = BREATH_KEYS.reduce((acc, key, i, arr) => {
        let a = BREATH_PARTS[ key ];
        if(i > 0){
            a += acc[i - 1]
        }
        acc.push( a );
        return acc;
    }, []).map((n)=>{
        return n / BREATH_PARTS_SUM;
    });
*/

    //-------- ----------
    // PUBLIC API
    //-------- ----------

    // main update method
    api.update = (group, alpha) => {
        updateGroup(group, alpha);
    };
    // main create method
    api.create = (opt) => {
        opt = opt || {};
        const group = new THREE.Group();
        const gud = group.userData;
        gud.radiusMin = opt.radiusMin === undefined ? 0.50 : opt.radiusMin;
        gud.radiusMax = opt.radiusMax === undefined ? 2.80 : opt.radiusMax;
        gud.curveCount = opt.curveCount === undefined ? 10 : opt.curveCount;
        gud.meshPerCurve = opt.meshPerCurve === undefined ? 10 : opt.meshPerCurve;
        gud.geometry = opt.geometry || new THREE.SphereGeometry(0.1, 20, 20);
        gud.material = opt.material || new THREE.MeshPhongMaterial();

        gud.curveUpdate = opt.curveUpdate || DEFAULT_CURVE_UPDATE;
        gud.meshUpdate = opt.meshUpdate || DEFAULT_MESH_UPDATE;

        gud.curvePath = new THREE.CurvePath();
        gud.id = opt.id || '1';
        let index_curve = 0;
        while(index_curve < gud.curveCount){
            const a_curve_index = index_curve / gud.curveCount;
            // add current curve
            const e = new THREE.Euler();
            e.z = Math.PI * 2 * a_curve_index;
            const v_start = new THREE.Vector3(1, 0, 0);
            const v_end = new THREE.Vector3(1, 0, 0);
            v_start.applyEuler(e).multiplyScalar(gud.radiusMin);
            v_end.applyEuler(e).multiplyScalar(gud.radiusMax);
            const v_c1 = v_start.clone().lerp(v_end, 0.25);
            const v_c2 = v_start.clone().lerp(v_end, 0.75);
            const curve = new THREE.CubicBezierCurve3(v_start.clone(), v_c1, v_c2, v_end);
            gud.curvePath.add(curve);
            // add mesh objects for each curve
            let index_mesh = 0;
            while(index_mesh < gud.meshPerCurve){
                const mesh = new THREE.Mesh(gud.geometry, gud.material.clone());
                mesh.material.transparent = true;
                mesh.name = getMeshName(gud, index_curve, index_mesh);
                group.add(mesh);
                index_mesh += 1;
            }
            index_curve += 1;
        };
        api.update(group, 0);
        return group;
    };
}(this['BreathMod'] = {} ));