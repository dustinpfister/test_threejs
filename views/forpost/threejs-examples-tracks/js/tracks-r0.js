/*  tracks.js - r0 - from threejs-examples-tracks
 *
 */
( function(api){
    // ---------- ----------
    // HELPERS
    // ---------- ----------
    // I like to think in terms of deltas from center of what would be a string line
    const createCurve = (v_start, v_end, v_d1, v_d2) => {
        v_d1 = v_d1 || new THREE.Vector3();
        v_d2 = v_d2 || new THREE.Vector3();
        const v_c1 = v_start.clone().lerp(v_end, 0.25).add(v_d1);
        const v_c2 = v_start.clone().lerp(v_end, 0.75).add(v_d2);
        return new THREE.CubicBezierCurve3(v_start, v_c1, v_c2, v_end);
    };
    // rotate a curve
    const rotateCurve = (curve, r, negateX, negateZ) => {
        r = r === undefined ? 0 : r;
        negateX = negateX === undefined ? false : negateX;
        negateZ = negateZ === undefined ? false : negateZ;
        let vi = 0;
        while(vi < 4){
            const v = curve['v' + vi];
            const e = new THREE.Euler();
            e.y = Math.PI * 2 / 4 * r;
            v.applyEuler(e);
            const v3_negate = v.clone().negate();
            if(negateX){
               v.set(v3_negate.x, v.y, v.z );
            }
            if(negateZ){
               v.set(v.x, v.y, v3_negate.z );
            }
            vi += 1;
        };
    };
    // ---------- ----------
    // PUBLIC API
    // ---------- ----------
    // create a source object
    api.createSourceObject = (w, d, sx, sz, ex, ez, dx1, dz1, dx2, dz2 ) => {
        const obj1 = new THREE.Group();
        const gud = obj1.userData;
        const v_start = new THREE.Vector3(sx, 1.0, sz);
        const v_end =  new THREE.Vector3(ex, 1.0, ez);
        const v_d1 =  new THREE.Vector3(dx1, 0.0, dz1);
        const v_d2 =  new THREE.Vector3(dx2, 0.0, dz2);
        gud.curve = createCurve(v_start, v_end, v_d1, v_d2);
        obj1.add( new THREE.Mesh( new THREE.BoxGeometry(w, 1, d), new THREE.MeshNormalMaterial()) )
        //const geo_points = new THREE.BufferGeometry().setFromPoints( gud.curve.getPoints(19) );
        //obj1.add( new THREE.Points( geo_points, new THREE.PointsMaterial({size: 0.25}) ) );
        return obj1;
    };
    // create a curve to be used as a track curve from a tack object
    api.createTrackCurvePart = (obj_track) => {
        const c1 = obj_track.userData.curve;
        const v_objpos = new THREE.Vector3();
        obj_track.getWorldPosition(v_objpos);
        const v_start = v_objpos.clone().add(c1.v0);
        const v_c1 = v_objpos.clone().add(c1.v1);
        const v_c2 = v_objpos.clone().add(c1.v2);
        const v_end = v_objpos.clone().add(c1.v3);
        return new THREE.CubicBezierCurve3(v_start, v_c1, v_c2, v_end);
    };
    // create a track object for the scene
    api.createTrackObject = (group_source, index, x, z, dy, r, negateX, negateZ) => {
        dy = dy === undefined ? 0 : dy;
        const obj_source = group_source.children[index];
        const track = obj_source.clone();
        track.userData.curve = obj_source.userData.curve.clone();
        track.position.set(x, 0.5 + dy, z);
        track.rotation.y = Math.PI * 2 / 4 * r;
        rotateCurve(track.userData.curve, r, negateX, negateZ);
        return track;
    };
}( this['trackMod'] ={} ));
