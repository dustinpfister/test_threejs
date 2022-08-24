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
            // is lower than of equal to a min value such as 0.25. A 'minB' value of the 
            // userData object of the grid can be used to change this
            opacity2 : function(grid, obj, objData, ud){
                var minB = grid.userData.minB === undefined ? 0.5: grid.userData.minB;
                if(objData.b <= minB){
                   var alpha = objData.b / minB;
                   alpha = alpha < 0 ? 0 : alpha;
                   // using Math.pow for smoother change
                   alpha = Math.pow(1.75, 8 * alpha) / Math.pow(1.75, 8)
                   setOpacity(obj, alpha);
                }else{
                   setOpacity(obj, 1);
                }
            }
        }
    } );
}());