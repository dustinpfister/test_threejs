
var clock = {};

clock.createFacePoints = function (cx, cy, cz, radius) {
    cx = cx || 0;
    cy = cy || 0;
    cz = cz || 0;
    radius = radius || 10;
    var faceMarks = [],
    marks = 12,
    i = 0,
    x,
    y,
    z;
    while (i < marks) {
        rad = Math.PI * 2 / marks * i;
        x = Math.cos(rad) * radius + cx;
        y = Math.sin(rad) * radius + cy;
        z = cz;
        faceMarks.push([x, y, z]);
        i += 1;
    }
    return faceMarks;
};

// create hand points array using given clockObj, origin, and radius
clock.createHandPoints = function (clockObj, cx, cy, cz, radius) {
    cx = cx || 0;
    cy = cy || 0;
    cz = cz || 0;
    radius = radius || 10;
    return 'sec,min,hour'.split(',').map(function (tUnit, i) {
        var per = clockObj[tUnit + 'Per'] || 0,
        rad = Math.PI * 2 * per * -1 + Math.PI / 2,
        x = Math.cos(rad) * (radius - (i * 2 + 2)) + cx,
        y = Math.sin(rad) * (radius - (i * 2 + 2)) + cy,
        z = cz;
        return [x,y,z];
    });
};

// get a clock object for the give date
clock.get = function (date) {
    var c = {};
    c.now = date || new Date(0);
    c.timeText = c.now.getTime();
    c.secPer = c.now.getMilliseconds() / 1000;
    c.minPer = c.now.getSeconds() / 60;
    c.hourPer = c.now.getMinutes() / 60;
    var dayStart = new Date(c.now.getFullYear(), c.now.getMonth(), c.now.getDate(), 0, 0, 0, 0);
    c.dayPer = (c.now - dayStart) / 86400000;
    return c;
};
