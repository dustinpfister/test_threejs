
var Sections = (function () {

    // create land sections objects
    var createLandSections = function(){
        var sections = new THREE.Group();
        var sectionCount = 12,
        sectionIndex = 0,
        radian = 0;
        while(sectionIndex < sectionCount){
            var mesh = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshBasicMaterial({
                    color: 0x00ff00,
                    wireframe: true
                }));
            radian = Math.PI * 2 / 12 * sectionIndex;
            mesh.position.x = Math.cos(radian) * 3;
            mesh.position.y = Math.sin(radian) * 3;
            mesh.position.z = 0;
            mesh.lookAt(0,0,0);
            sections.add(mesh);
            sectionIndex += 1;
        }
        return sections;
    };

    // PUBLIC API
    var api = {};

    api.create = function(){
        var mainGroup = new THREE.Group();
        mainGroup.add(createLandSections());
        return mainGroup;
    };

    return api;

}
    ());
