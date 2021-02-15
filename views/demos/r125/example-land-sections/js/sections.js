
var Sections = (function () {

    // create land sections objects
    var createLandSections = function(){
        var sections = new THREE.Group();
        var sectionCount = 12,
        sectionIndex = 0;
        while(sectionIndex < sectionCount){
            var mesh = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshBasicMaterial({
                    color: 0x00ff00,
                    wireframe: true
                }));
            mesh.position.x = 0;
            mesh.position.y = 0;
            mesh.position.z = -6 + sectionIndex * 2;
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
