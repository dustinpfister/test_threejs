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
        lineCount: 3,
        pointsPerLine: 10,
        // called just once in LineGroup.create before lines are created
        // this can be used to add generated options that are not part of the
        // start state object
        beforeCreate: function(opt){},

        // for frame method used to update lineGroup with startState, and frameData
        forFrame : function(lineGroup, startState, frameData, opt){

        }
        

    };

    //******** **********
    // PUBLIC API
    //******** **********
    var api = {};

    // create a type
    api.create = function(typeKey){
        typeKey = typeKey || 'rnd3';
    };

    // load a type
    api.load = function(typeObj){
        TYPES[typeObj.key] = typeObj;
    };

    // set a line group with the given frame, maxFrame, and initState
    api.set = function(lineGroup, frame, maxFrame, startState){
    };

    // return public API
    return api;
}());