
var game = (function () {

    var distance = function(game, section){
        return Math.sqrt( Math.pow(game.sun.x - section.x, 2) + Math.pow(game.sun.y - section.y, 2) );
    };

    // game state object for now
    var game = {
        sun: {
            x: 40,
            y: 0,
            r: 64
        },
        sectionDist: 75,
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
             r: 48,
             per: 0
         };
         section.per = distance(game, section) / (game.sectionDist * 2);
         section.per = section.per > 1 ? 1 : section.per;
         section.per = section.per < 0 ? 0 : section.per;
         game.sections.push(section);
         i += 1;
    }

    return game;

}
    ());
