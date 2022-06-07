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
    TYPES.tri = {
        key: 'tri',
        lineCount: 3,
        pointsPerLine: 10,
        

    };

    //******** **********
    // PUBLIC API
    //******** **********
    var api = {};

    // create a type
    api.create = function(typeKey){
        typeKey = typeKey || 'tri';
    };

    // load a type
    api.load = function(typeObj){
        TYPES[typeObj.key] = typeObj;
    };

    // set a line group with the given frame, maxFrame, and initState
    api.set = function(lineGroup, frame, maxFrame, initState){
    };

    // return public API
    return api;
}());