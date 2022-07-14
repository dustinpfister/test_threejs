/*********
 Opcaity2 effect for object-grid-wrap.js r2
*********/
(function(){

    // set opacity helper function
    var setOpacity = function(obj_root, alpha){
        obj_root.traverse(function(obj){
            // any object with a material
            if(obj.material){
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
            // opacity2 works by only lowering the alpha value once objData.b value
            // is lower than of equal to 0.25
            opacity2 : function(grid, obj, objData, ud){
                if(objData.b <= 0.25){
                   var alpha = objData.b / 0.25;
                   setOpacity(obj, alpha);

                }else{
                   setOpacity(obj, 1);
                }
            }
        }
    } );
}());