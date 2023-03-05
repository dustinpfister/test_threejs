// camera-planes - r0 - r146 prototype
(function(api){
    const material_plane = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
    });


    api.create = (opt) => {

        opt = opt || {};
        opt.camera = opt.camera || new THREE.PerspectiveCamera();

        const geometry_plane = new THREE.PlaneGeometry(1, 1, 1, 1);
        const mesh_plane_1 = new THREE.Mesh(geometry_plane, material_plane.clone());

        const group = new THREE.Group();
        const gud = group.userData;
        gud.camera = opt.camera;
        group.add(mesh_plane_1);
        group.add(opt.camera);

        mesh_plane_1.scale.set(camera.aspect,1,1);
        mesh_plane_1.position.set(0, 0, 0);

        opt.camera.position.set(0, 0, 1);
        opt.camera.lookAt(group.position);

        return group;

    };

}( this['cameraPlanes'] = {} ));
