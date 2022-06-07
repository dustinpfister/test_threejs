//******** **********
// Lines Grpoup module - ( r0 )
// By Dustin Pfister : https://dustinpfister.github.io/
//******** **********
var LineGroup = (function(){
    //******** **********
    // BUILT IN TYPE(S)
    //******** **********
    var TYPES = {};
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
        // call create hook
        typeObj.create(opt, lineGroup);
        // call set for first time
        api.set(lineGroup, 0, 30, {});
        return lineGroup;
    };
    // load a type
    api.load = function(typeObj){
        typeObj.baseData = typeObj.baseData || {}; 
        TYPES[typeObj.key] = typeObj;
    };
    // set a line group with the given frame, maxFrame, and initState
    api.set = function(lineGroup, frame, frameMax, baseData){
        var ud = lineGroup.userData,
        typeKey = ud.typeKey,
        typeObj = TYPES[typeKey];
        // parse baseData
        baseData = ud.baseData = baseData || {};
        Object.keys( typeObj.baseData ).forEach(function(key){
            baseData[key] = baseData[key] || typeObj.baseData[key]; 
        });
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
        typeObj.forFrame(state, baseData, frameData, lineGroup);
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
            }));
            lineGroup.add(line);
        });
    };
    // return public API
    return api;
}());