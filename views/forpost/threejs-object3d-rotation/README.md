# threejs-object3d-rotation

This is the collection of source code examples that I have together for my [blog post on the subject of setting the rotation property](https://dustinpfister.github.io/2022/04/08/threejs-object3d-rotation/) of an object3d instance.

<div align="center">
      <a href="https://www.youtube.com/watch?v=837fOzGk7XA">
         <img src="https://img.youtube.com/vi/837fOzGk7XA/0.jpg" style="width:50%;">
      </a>
</div>

## With Mesh objects there is also the rotation of the geometry

If the type of object3d class based object is a mesh, then there is also the buffer geometry that is used with that mesh. In some cases I might not want to rotate the mesh object, but rather the [rotation of the position attribute of the buffer geometry](https://dustinpfister.github.io/2021/05/20/threejs-buffer-geometry-rotation/). In that case I will want to use the rotation methods of the buffer geometry class.

## The Euler class

The rotation property of any object in threejs based off of the Object3d class contains an instance of the [THREE.Euler](https://dustinpfister.github.io/2021/04/28/threejs-euler/) class that is used for the rotation of the object in question. This is a class that will come into play elsewhere when it comes to doing just about anything with angles in threejs but the rotation property of object3d is what comes to mind first and foremost when I think about the class.