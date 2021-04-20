// basic scene
var sceneObj = utils.createBasicScene(),
scene = sceneObj.scene;

// ARROWS FOR SCENE
utils.addArrow(scene, 2, 0, 0, 3.2, 'lime');
utils.addArrow(scene, 0, 2, 0, 2.5, 'blue');
utils.addArrow(scene, 0, 0, 2, 2.7, 'cyan');

// cube
var cube = utils.addCube(scene, -2.5, 0, .5);
// ARROW FOR CUBE
utils.addArrow(cube, 0, 2, 0, 2.5, 'blue');

// render
sceneObj.draw();
