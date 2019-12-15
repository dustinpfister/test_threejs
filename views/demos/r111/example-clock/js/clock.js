
var clock = {};

clock.createFace = function (cx, cy, radius) {
    cx = cx || 0;
    cy = cy || 0;
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
        z = 0;
        faceMarks.push([x, y, z]);
        i += 1;
    }
    return faceMarks;
};

clock.get = function (date) {
    var c = {};
    c.now = date || new Date(0);
    c.timeText = c.now.getTime();
    c.secPer = c.now.getMilliseconds() / 1000;
    c.minPer = c.now.getSeconds() / 60;
    c.hourPer = c.now.getMinutes() / 24;
    var dayStart = new Date(c.now.getFullYear(), c.now.getMonth(), c.now.getDate(), 0, 0, 0, 0);
    c.dayPer = (c.now - dayStart) / 86400000;
    return c;
};
