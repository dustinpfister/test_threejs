// camera-planes - r0 - r146 prototype
(function(api){
    //-------- ----------
    // CONST VALUES
    //-------- ----------
    const MATERIAL_PLANE = new THREE.MeshBasicMaterial({
        side: THREE.FrontSide,
        transparent: true,
        opacity: 0.5
    });
    const DEFAULT_CREATE_OPTIONS = {
        camera: new THREE.PerspectiveCamera(50, 16 / 9, 0.1, 1000),
        planeScale: 0.75,
        zMax: 15
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
                const s = gud.planeScale;
                obj.scale.set( gud.camera.aspect * s, s, s );
                const z = gud.zMax - gud.zMax * alpha;
                obj.position.set(0, 0, z);
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
        group.add( createPlane(0) );
        api.update(group, 0);
        return group;
    };

}( this['cameraPlanes'] = {} ));
