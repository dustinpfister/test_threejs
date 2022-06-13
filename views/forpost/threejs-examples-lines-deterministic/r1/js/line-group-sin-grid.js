//******** **********
// Lines Group sinGrid plug-in for line-group.js r1 in the threejs-examples-lines-deterministic project
// By Dustin Pfister : https://dustinpfister.github.io/
LineGroup.load( (function(){


    var getGridVector = function(state, lineIndex, lineCount, pointIndex, pointCount, mapping){
        var v = new THREE.Vector3();
        mapping = mapping || 'xz'; // 'xz' of zx mapping
        ma = mapping.split('');
        var wh = {
           x: state.sizeWidth * 2,
           z: state.sizeHeight * 2
        }
        var pointPer = pointIndex / (pointCount - 1);
        v[ ma[0] ] = ( wh[ ma[0] ] / ( lineCount - 1 ) ) * lineIndex;
        v[ ma[1] ] = wh[ ma[1] ] * pointPer;
        return v;        
    };



    return {
        key: 'sinGrid',
        // default options such as the number of lines, and how many points per line
        opt: {
            lineCount: 8,
            pointsPerLine: 4,
            forLineStyle: function(m, i){
                m.linewidth = 4;
                m.color = new THREE.Color( 'red' );
            }
        },
        baseData:{
        
        },
        // called just once in LineGroup.create before lines are created
        create: function(opt, lineGroup){

        },
        // for frame method used to set the current 'state' with 'baseData', and 'frameData'
        forFrame : function(state, baseData, frameData, lineGroup){

            state.countWidth = 4;

            state.sizeWidth = 1;
            state.sizeHeight = 1;

            // figure state values for each line
            //var ud = lineGroup.userData;
            //var i = 0, len = ud.opt.lineCount;
            //while(i < len){
            //    i += 1;
            //}
        },
        // create/update points of a line in the line group with 'current state' object
        forLine : function(points, state, lineIndex, lineCount, lineGroup){
            var ud = lineGroup.userData;
            // for each point of each line
            var i = 0, len = ud.opt.pointsPerLine;

            // get startx and startz values for this line
            var startX = 0; //i % lineCount % state.countWidth;





            // is this the first or second set of lines?
            var a = lineIndex < lineCount / 2 ? 0 : 1;
            var mapping = a == 0 ? 'xz': 'zx';

            var h = state.countWidth;
            var li = lineIndex % h;




            while(i < len ){



                //var linePer = i / len;
                //var v = new THREE.Vector3();

                //v.x = 1 * lineIndex;
                //v.z = 10 * linePer;


                var v = getGridVector(state, li, h, i, len, mapping )

                points[i].copy(v);
                i += 1;
            }
        }
    };
}()) );
