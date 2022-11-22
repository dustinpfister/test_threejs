(function(api){
    // create menu buttons
    var checkButtons = function(menu){
        // set raycaster
        menu.raycaster.setFromCamera( menu.pointer, menu.camera );
        // check buttons group
        var intersects = menu.raycaster.intersectObjects( menu.buttons.children, true );
        // if button clicked
        if(intersects.length > 0){
            var button = intersects[0].object,
            data = button.userData;
            data.onClick(menu, button, menu.pointer.x, menu.pointer.y);
        }
    };
    // create and return a pointer down hander for the given sm object
    var createPointerDownHandler = function(menu){
        return function(event) {
            var canvas = event.target,
            box = canvas.getBoundingClientRect(),
            x = event.clientX - box.left,
            y = event.clientY - box.top;
            // update sm.pointer values
            menu.pointer.x = ( x / canvas.scrollWidth ) * 2 - 1;
            menu.pointer.y = - ( y / canvas.scrollHeight ) * 2 + 1;
            checkButtons(menu);
        };
    };
    // create a button group;
    var createButtonGroup = function(opt){
        opt = opt || {};
        var group = new THREE.Group();
        var i = 0;
        while(i < 3){
            var button = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 2),
                new THREE.MeshNormalMaterial());
            button.position.y = 1 - 1.25 * i;
            var data = button.userData;
            data.i = i;
            data.onClick = opt.onClick || function(menu, button, x, y){
                 console.log('button ' + button.userData.i + ' clicked')
            };
            group.add(button);
            i += 1;
        }
        return group;
    };
    // STATE MACHINE (sm) OBJECT
    api.create = function(opt){
        opt = opt || {};
        var menu = {
            raycaster: new THREE.Raycaster(),
            pointer: new THREE.Vector2(1, 1),
            camera : opt.camera || new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000),
            renderer : opt.renderer || new THREE.WebGL1Renderer(),
            scene : opt.scene || new THREE.Scene(),
            buttons: null
        };
        menu.buttons = createButtonGroup(menu);
        // add grid helper to the scene
        menu.scene.add(new THREE.GridHelper(9, 9));
        // adding a button group to the scene
        menu.scene.add(menu.buttons);
        // EVENTS
        menu.renderer.domElement.addEventListener( 'pointerup', createPointerDownHandler(menu), false );
        // return the sm object
        return menu;
    };
}( this['menuMod'] = {} ));
