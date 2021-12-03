
var smMod = (function(){

    var api = {};

    // create and return a pointer down hander for the given sm object
    var createPointerDownHandler = function(sm){
        return function(event) {
            var canvas = event.target,
            box = canvas.getBoundingClientRect(),
            x = event.clientX - box.left,
            y = event.clientY - box.top;
            // update sm.pointer values
            sm.pointer.x = ( x / canvas.scrollWidth ) * 2 - 1;
            sm.pointer.y = - ( y / canvas.scrollHeight ) * 2 + 1;
            console.log(sm.pointer);
        };
    };

    // create a button group;
    var createButtonGroup = function(){
        var group = new THREE.Group();
        var i = 0;
        while(i < 3){
            var button = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 2),
                new THREE.MeshNormalMaterial());
            button.position.y = 1 - 1.25 * i;
            group.add(button);
            i += 1;
        }
        return group;
    };

    // STATE MACHINE (sm) OBJECT
    api.createSMObject = function(){
        var sm = {
            lt: new Date(),
            fps: 30,
            raycaster: new THREE.Raycaster(),
            pointer: new THREE.Vector2(1, 1),
            camera : new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000),
            renderer : new THREE.WebGLRenderer(),
            scene : new THREE.Scene()
        };
        // add grid helper to the scene
        sm.scene.add(new THREE.GridHelper(9, 9));
        // adding a button group to the scene
        sm.scene.add(createButtonGroup());
        // starting positon and look at for camera
        sm.camera.position.set(4, 2, 2);
        sm.camera.lookAt(0, 0, 0);
        // renderer
        sm.renderer.setSize(640, 480);
        document.getElementById('demo').appendChild(sm.renderer.domElement);
        // EVENTS
        sm.renderer.domElement.addEventListener( 'pointerdown', createPointerDownHandler(sm), false );
        // return the sm object
        return sm;
    };

    return api;

}());
