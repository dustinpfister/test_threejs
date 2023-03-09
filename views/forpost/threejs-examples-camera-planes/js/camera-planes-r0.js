// camera-planes - r0 - r146 prototype
(function(api){

    const MATERIAL_PLANE = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
    });

    const DEFAULT_CREATE_OPTIONS = {
        camera: new THREE.PerspectiveCamera(50, 16 / 9, 0.1, 1000),
        planeScale: 0.75
    };

    api.create = (opt) => {

        opt = opt || {};

        const geometry_plane = new THREE.PlaneGeometry(1, 1, 1, 1);

        const mesh_plane_1 = new THREE.Mesh(geometry_plane, MATERIAL_PLANE.clone());

        const group = new THREE.Group();
        const gud = group.userData;
        Object.assign(gud, DEFAULT_CREATE_OPTIONS, opt);

        group.add(mesh_plane_1);
        group.add(gud.camera);

        const s = gud.planeScale;
        mesh_plane_1.scale.set( gud.camera.aspect * s, s, s );
        mesh_plane_1.position.set(0, 0, 0);

        gud.camera.position.set(0, 0, -1);
        gud.camera.lookAt(group.position);

        return group;

    };

}( this['cameraPlanes'] = {} ));
