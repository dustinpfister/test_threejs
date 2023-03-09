// camera-planes - r0 - from threejs-examples-planes
(function(api){
    //-------- ----------
    // CONST VALUES
    //-------- ----------
    const MATERIAL_PLANE = new THREE.MeshBasicMaterial({
        side: THREE.FrontSide,
        transparent: true,
        opacity: 0.25
    });
    const DEFAULT_EFFECT = (group, mesh_plane, gud, mud, a_plane, alpha) => {
        const z = gud.zMax - gud.zMax * a_plane * alpha;
        mesh_plane.position.set(0, 0, z);
        mesh_plane.material.opacity = alpha;
    };
    const DEFAULT_CREATE_OPTIONS = {
        camera: new THREE.PerspectiveCamera(50, 16 / 9, 0.1, 1000),
        planeScale: 0.75,
        zMax: 15,
        count: 1,
        effect: DEFAULT_EFFECT
    };
    //-------- ----------
    // HELPER FUNCITONS
    //-------- ----------
    // create a single plane
    const createPlane = (id) => {
        const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
        geometry.rotateY(Math.PI);
        const mesh_plane = new THREE.Mesh(geometry, MATERIAL_PLANE.clone());
        mesh_plane.name = 'plane_' + id;
        const mud = mesh_plane.userData;
        mud.id = id;
        return mesh_plane
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    api.update = (group, alpha) => {
        const gud = group.userData;
        group.traverse( (obj, i) => {
            // if an object is a mesh, and the name starts with 'plane'
            if(obj.type === 'Mesh' && obj.name.split('_')[0] === 'plane'){
                const mesh_plane = obj;
                const mud = mesh_plane.userData;
                const s = gud.planeScale;
                mesh_plane.scale.set( gud.camera.aspect * s, s, s );
                const a_plane = ( mud.id + 1 ) / gud.count;
                gud.effect(group, mesh_plane, gud, mud, a_plane, alpha);
            }
        });
    };
    api.create = (opt) => {
        opt = opt || {};
        // create group, set up userData Object
        const group = new THREE.Group();
        const gud = group.userData;
        Object.assign(gud, DEFAULT_CREATE_OPTIONS, opt);
        group.add(gud.camera);
        gud.camera.position.set(0, 0, -1);
        gud.camera.lookAt(group.position);
        // create first plane, call update for first time
        let i = 0;
        while(i < gud.count){
            group.add( createPlane(i) );
            i += 1;
        }
        api.update(group, 1);
        return group;
    };
}( this['cameraPlanes'] = {} ));
