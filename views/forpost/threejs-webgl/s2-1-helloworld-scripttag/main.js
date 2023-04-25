const container = ( document.getElementById('demo') || document.body );
const canvas = document.createElement('canvas');
canvas.width = 320;
canvas.height = 240;
container.appendChild(canvas);
const ctx = canvas.getContext('webgl');
const r = 1, g = 0, b = 0, alpha = 0.5;
ctx.clearColor( r, g, b, alpha );
ctx.clear( ctx.COLOR_BUFFER_BIT );
