//******** **********
// Lines Grpoup module - ( r0 )
// By Dustin Pfister : https://dustinpfister.github.io/
//******** **********
var LineGroup = (function(){
    //******** **********
    // BUILT IN TYPE(S)
    //******** **********
    var TYPES = {};
    // tri
    TYPES.rnd3 = {
        key: 'rnd3',
        // default options such as the number of lines, and how many points per line
        opt: {
            lineCount: 3,
            pointsPerLine: 5
        },
        // called just once in LineGroup.create before lines are created for first time
        // this can be used to add generated options that are not part of the
        // start state object
        create: function(opt, lineGroup){
            opt.rndPoints = [];
            var i = 0;
            while(i < opt.lineCount){
                var v = new THREE.Vector3();
                v.x = -2 + THREE.MathUtils.seededRandom() * 4;
                v.y = -2 + THREE.MathUtils.seededRandom() * 4;
                v.z = -2 + THREE.MathUtils.seededRandom() * 4;
                opt.rndPoints.push(v);

                

                i += 1;
            }
        },

        // for frame method used to set the current 'state' with 'startState', and 'frameData'
        forFrame : function(state, startState, frameData){
            startState.v = startState.v || new THREE.Vector3(0, 3, 0)
            state.v = new THREE.Vector3();
            state.v.set(0, 0, 0).lerp(startState.v, frameData.bias);
        },

        // create/update points of a line in the line group with 'current state' object
        forLine : function(points, state, lineIndex, lineCount, lineGroup){
             var ud = lineGroup.userData,
             rndPoints = ud.opt.rndPoints;
             var sp = rndPoints[lineIndex],
             ep = rndPoints[ (lineIndex + 1) % lineCount];
             var i = 0;
             while(i < ud.opt.pointsPerLine){
                 var v = sp.clone().lerp(ep, i / ( ud.opt.pointsPerLine-1 ) ).add(state.v)
                 points[i].copy( v );
                 i += 1;
             }
        }
    };
    //******** **********
    // HELPERS
    //******** **********

    // remove all lines from lineGroup
    var removeAllLines = function(lineGroup){
        var i = lineGroup.children.length;
        while(i--){
            var line = lineGroup.children[i];
            lineGroup.remove(line);
        }
    };


    //******** **********
    // PUBLIC API
    //******** **********
    var api = {};

    // create a type
    api.create = function(typeKey, opt){
        typeKey = typeKey || 'rnd3';
        typeObj = TYPES[typeKey];

        // make the line group
        var lineGroup = new THREE.Group();

        // the opt object
        // use given option, or default options to create an opt object
        opt = opt || {};
        Object.keys( typeObj.opt ).forEach(function(key){
            opt[key] = opt[key] || typeObj.opt[key]; 
        });

        // create blank points
        var groupPoints = [];
        var lineIndex = 0;
        while(lineIndex < opt.lineCount){
            var pointIndex = 0;
            var points = [];
            while(pointIndex < opt.pointsPerLine){
                points.push( new THREE.Vector3() )
                pointIndex += 1;
            }
            groupPoints.push(points);
            lineIndex += 1;
        }

        // user data object
        var ud = lineGroup.userData; 
        ud.typeKey = typeKey;
        ud.opt = opt;
        ud.groupPoints = groupPoints;

        typeObj.create(opt, lineGroup);

        // call set for first time
        api.set(lineGroup, 0, 30, {});

        return lineGroup;
    };

    // load a type
    api.load = function(typeObj){
        TYPES[typeObj.key] = typeObj;
    };

    // set a line group with the given frame, maxFrame, and initState
    api.set = function(lineGroup, frame, frameMax, startState){
        var ud = lineGroup.userData,
        typeKey = ud.typeKey,
        typeObj = TYPES[typeKey];

        // state object
        var state = {};

        // frame data object
        var frameData = {
            frame: frame,
            frameMax: frameMax
        };
        frameData.per = frameData.frame / frameData.frameMax;
        frameData.bias = 1 - Math.abs(0.5 - frameData.per) / 0.5;

        // call for frame method of type to update state object
        typeObj.forFrame(state, startState, frameData);

        // remove all old lines if any
        removeAllLines(lineGroup);
        ud.groupPoints.forEach(function(points, lineIndex){
            // call for line
            typeObj.forLine(points, state, lineIndex, ud.opt.lineCount, lineGroup);
            // create and add the line
            var geo = new THREE.BufferGeometry();
            geo.setFromPoints(points);
            var line = new THREE.Line(geo, new THREE.LineBasicMaterial({
                linewidth: 4
            }))
            lineGroup.add(line);
        });
    };

    // return public API
    return api;
}());