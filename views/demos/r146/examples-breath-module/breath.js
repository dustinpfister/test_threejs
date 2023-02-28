// breath.js - r0 - r146 prototype
(function(api){

    const DEFAULT_CURVE_UPDATE = (curve, alpha, v_c1, v_c2, v_start, v_end) => {
        const e1 = new THREE.Euler();
        e1.z = Math.PI / 180 * 70 * alpha;
        const e2 = new THREE.Euler();
        e2.z = Math.PI / 180 * -70 * alpha;
        v_c1.copy( v_start.clone().lerp(v_end, 0.25).applyEuler(e1) );
        v_c2.copy( v_start.clone().lerp(v_end, 0.75).applyEuler(e2) );
    };

    //-------- ----------
    // HELPERS
    //-------- ----------
    // get a mesh object name to be used when creating and getting mesh objects in breath group
    const getMeshName = (gud, index_curve, index_mesh) => {
        return 'breath_id' + gud.id + '_curve' + index_curve + '_mesh' + index_mesh;
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    // update curve control points and mesh object values
    api.update = (group, alpha) => {


        const gud = group.userData;
        let index_curve = 0;
        while(index_curve < gud.curveCount){
            const curve = gud.curvePath.curves[index_curve];
            const v_start = curve.v0, v_c1 = curve.v1, v_c2 = curve.v2, v_end = curve.v3;

            DEFAULT_CURVE_UPDATE(curve, alpha, v_c1, v_c2, v_start, v_end, gud, group);

            let index_mesh = 0;
            while(index_mesh < gud.meshPerCurve){
                const name = getMeshName(gud, index_curve, index_mesh);
                const mesh = group.getObjectByName(name);

                const a_meshpos = (index_mesh + 1) / gud.meshPerCurve;
                mesh.position.copy( curve.getPoint(a_meshpos * alpha) );

                // opacity
                const a_meshopacity = (1 - a_meshpos) * 0.50 + 0.50 * alpha;
                mesh.material.opacity = a_meshopacity;
                // scale
                const s = 0.25 + 2.25 * a_meshpos * Math.sin(Math.PI * 0.5 * alpha);
                mesh.scale.set( s, s, s );
                index_mesh += 1;
            }
            index_curve += 1;
        };
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