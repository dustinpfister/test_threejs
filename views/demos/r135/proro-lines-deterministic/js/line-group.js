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
        // options such as the number of lines, and how many points per line
        opt: {
            lineCount: 3,
            pointsPerLine: 10
        },
        // called just once in LineGroup.create before lines are created
        // this can be used to add generated options that are not part of the
        // start state object
        beforeCreate: function(opt, lineGroup){},

        // for frame method used to set 'current state' with 'startState', and 'frameData'
        forFrame : function(state, startState, frameData){

        },

        // create/update points of a line in the line group with 'current state' object
        forLine : function(points, state, lineIndex, lineCount){

        }
    };

    //******** **********
    // PUBLIC API
    //******** **********
    var api = {};

    // create a type
    api.create = function(typeKey){
        typeKey = typeKey || 'rnd3';
        // make the line group
        var lineGroup = new THREE.Group();
        return lineGroup;
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