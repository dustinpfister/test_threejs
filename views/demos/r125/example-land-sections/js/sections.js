
var Sections = (function () {

    var THREEJS_MAX_RADIUS = 4;

    // create land sections objects
    var createLandSections = function(game){
        var sections = new THREE.Group();
        var sectionCount = game.sections.length,
        sectionIndex = 0,
        radian = 0;
        while(sectionIndex < sectionCount){
            var mesh = new THREE.Mesh(
                new THREE.SphereGeometry(0.75, 20),
                new THREE.MeshBasicMaterial({
                    color: 0x00ff00,
                    wireframe: true
                }));
            radian = Math.PI * 2 / sectionCount * sectionIndex;
            mesh.userData.type = 'section';
            mesh.position.x = Math.cos(radian) * THREEJS_MAX_RADIUS;
            mesh.position.y = Math.sin(radian) * THREEJS_MAX_RADIUS;
            mesh.position.z = 0;
            mesh.lookAt(0,0,0);
            sections.add(mesh);
            sectionIndex += 1;
        }
        sections.userData.type = 'sectionGroup';
        return sections;
    };

    // create land sections objects
    var createSun = function(){
        var mesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.75, 20),
            new THREE.MeshBasicMaterial({
                color: 0xffff00,
                wireframe: true
            }));
        mesh.userData.type = 'sun';
        mesh.position.x = 0
        mesh.position.y = 0
        mesh.position.z = 0;
        return mesh;
    };

    // PUBLIC API
    var api = {};

    api.create = function(game){
        var mainGroup = new THREE.Group();
        // add land sections
        mainGroup.add(createLandSections(game));
        // add sun
        mainGroup.add(createSun());
        return mainGroup;
    };

    api.update = function(game, mainGroup){
        mainGroup.children.forEach(function(child){
             console.log(child.userData);
             if(child.userData.type === 'sun'){
                 console.log('sun');
                 child.position.x = game.sun.x / game.sectionDist * THREEJS_MAX_RADIUS;
                 child.position.y = game.sun.y / game.sectionDist * THREEJS_MAX_RADIUS;
             }
        });
    };

    return api;

}
    ());
