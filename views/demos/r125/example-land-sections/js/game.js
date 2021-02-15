
var game = (function () {

    // game state object for now
    var game = {
        sun: {
            x: -25,
            y: -25,
            r: 64
        },
        sectionDist: 100,
        sections: []
    };
    var i = 0,
    section,
    radian,
    sectionCount = 12;
    while(i < sectionCount){
         radian = Math.PI * 2 / sectionCount * i;
         section = {
             x: Math.cos(radian) * game.sectionDist,
             y: Math.sin(radian) * game.sectionDist,
             r: 32
         };
         game.sections.push(section);
         i += 1;
    }

    return game;

}
    ());
