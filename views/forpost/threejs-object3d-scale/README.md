# threejs-object3d-scale

The scale property of the object3d class holds an instance of the Vector3 class that can be used to adjust what the scale of the object should be. By default the values for each of the axes of the Vector3 class are 1, setting values lower than 1 will scale the object down and setting values above 1 will of course scale the object up. This is a collection of source code examples on the use of this scale property that I write about in detail for [my post on the subject of the object3d scale property](https://dustinpfister.github.io/2021/05/11/threejs-object3d-scale/).

There is also a scale method of the buffer geometry class that can be used to set what the base scale of an object should be. That is because mutation of geometry is a little expensive setting the scale of the geometry should be done just once if one can do so to set what the starting size should be. After that using the scale property of the object3d class is what should be used to scale the object up and down as needed over time. The same can be said of buffer geometry methods and object3d class methods in general when it comes to translation and rotation of things.

<div align="center">
      <a href="https://www.youtube.com/watch?v=jpcjC3jedrQ">
         <img src="https://img.youtube.com/vi/jpcjC3jedrQ/0.jpg" style="width:50%;">
      </a>
</div>

