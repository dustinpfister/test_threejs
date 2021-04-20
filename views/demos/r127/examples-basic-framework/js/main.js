// basic scene
var sceneObj = threeFrame.createBasicScene(),
scene = sceneObj.scene;

// ARROWS FOR SCENE
threeFrame.addArrow(scene, 2, 0, 0, 3.2, 'lime');
threeFrame.addArrow(scene, 0, 2, 0, 2.5, 'blue');
threeFrame.addArrow(scene, 0, 0, 2, 2.7, 'cyan');

// cube
var cube = threeFrame.addCube(scene, -2.5, 0, .5);
// ARROW FOR CUBE
threeFrame.addArrow(cube, 0, 2, 0, 2.5, 'blue');

// render
sceneObj.draw();
