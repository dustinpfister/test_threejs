// started with this codepen https://codepen.io/urishaked/pen/PEpoYo
// fixed a few problems with it
const container = ( document.getElementById('demo') || document.body );
const canvas = document.createElement('canvas');
canvas.width = 160;
canvas.height = 120;
container.appendChild(canvas);
const gl = canvas.getContext('webgl');
// use the vertex shader
const vertShader = gl.createShader( gl.VERTEX_SHADER );
gl.shaderSource(vertShader, document.querySelector('#vertex-shader').textContent);
gl.compileShader(vertShader);
// use the fragment shader
const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, document.querySelector('#fragment-shader').textContent);
gl.compileShader(fragShader);
// the shader program
const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader); 
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);
gl.viewport(0, 0, 160, 120);
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
// https://stackoverflow.com/a/20315187
const vertices = new Float32Array([0.0, 0.0, 0.0]), vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
gl.bindAttribLocation(shaderProgram, 0, 'a_Position');
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(0);
// the draw arrays method can be used to draw a single point
gl.drawArrays(gl.POINTS, 0, 1);


