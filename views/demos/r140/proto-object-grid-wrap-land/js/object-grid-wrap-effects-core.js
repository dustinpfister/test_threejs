(function(){
    var setOpacity = function(obj_root, alpha){
        obj_root.traverse(function(obj){
            // any object with a material
            if(obj.material){
                //obj.material.transparent = true;
                //obj.material.opacity = alpha;
                if(obj.material instanceof Array){
                    obj.material.forEach(function(m){
                        m.transparent = true;
                        m.opacity = alpha;
                    });
                }else{
                    obj.material.transparent = true;
                    obj.material.opacity = alpha;
                }
            }
        });
    };
    ObjectGridWrap.load( {
        EFFECTS : {
            // effect method that will set opacity of object based on distance from center
            opacity : function(grid, obj, objData){
                setOpacity(obj, objData.b);
            },
            // set scale based on distance from center
            scale : function(grid, obj, objData){
                obj.scale.set(1, 1, 1).multiplyScalar( objData.b );
            },
            // rotationA demo effect
            rotationA : function(grid, obj, objData){
                var y = objData.b * Math.PI * 4;
                obj.rotation.set(0, y, 0);
            },
            // rotationB demo effect
            rotationB : function(grid, obj, objData){
                obj.rotation.set(0, 0, 0);
            },
            // positionA demo effect
            positionA : function(grid, obj, objData){
                var ud = grid.userData;
                obj.position.y = ud.tw / 2 * objData.b;
            }
        }
    } );
}());