let lerpGeo = function(geo, geoA, geoB, alpha){
    alpha = alpha || 0;
    // pos, and new pos
    let pos = geo.getAttribute('position');
    let norm = geo.getAttribute('normal');
    // positions for a and b
    let posA = geoA.getAttribute('position');
    let posB = geoB.getAttribute('position');
    // normals for a and b
    let normA = geoA.getAttribute('normal');
    let normB = geoB.getAttribute('normal');
    // update position
    let i = 0, len = pos.array.length;
    while(i < len){
        let v = new THREE.Vector3(posA.array[i], posA.array[i + 1], posA.array[i + 2]);
        let v2 = new THREE.Vector3(posB.array[i], posB.array[i + 1], posB.array[i + 2]);
        v.lerp(v2, alpha);
        pos.array[i] = v.x;
        pos.array[i + 1] = v.y;
        pos.array[i + 2] = v.z;      
        i += 3;
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
};

