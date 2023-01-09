// airplane.js - r0 - from threejs-examples-lookat-with-apply-euler
(function(api){
    //-------- ----------
    // MATERIALS
    //-------- ----------
    // materuials to use for mesh objects
    const materials = [
        new THREE.MeshStandardMaterial({color: new THREE.Color('white')}),
        new THREE.MeshStandardMaterial({color: new THREE.Color('red')}),
        new THREE.MeshStandardMaterial({color: new THREE.Color('lime')}),
        new THREE.MeshStandardMaterial({color: new THREE.Color('cyan')})
    ];
    // make a part of the object
    const mkPart = function(g, partName, w, h, d, x, y, z, mi){
        // the mesh object
        const m = new THREE.Mesh(
            new THREE.BoxGeometry(w, h, d),
            materials[mi === undefined ? 0 : mi]);
        // name of part
        m.name = g.name + '_' + partName;
        // position it
        m.position.set(x, y, z);
        return m;
    };
    // make the whole group with all parts
    api.create = function(gName){
        const g = new THREE.Group();
        g.name = gName || 'g-' + g.uuid;
        // add parts
        g.add( mkPart(g, 'body',  1.0, 1.0, 4.0,  0.0, 0.0,  0.0, 0) );
        g.add( mkPart(g, 'tail',  0.5, 1.0, 1.0,  0.0, 1.0, -1.5, 3) );
        g.add( mkPart(g, 'rwing', 2.0, 0.5, 1.0, -1.5, 0.0,  0.0, 1) );
        g.add( mkPart(g, 'lwing', 2.0, 0.5, 1.0,  1.5, 0.0,  0.0, 2) );
        return g;
    };
}( this['airplane'] = {} ));