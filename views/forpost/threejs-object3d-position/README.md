# threejs-object3d-position

The [position property of the Object3d class](https://dustinpfister.github.io/2022/04/04/threejs-object3d-position/) is an instance of Vector3, and can be used to set the location of the object in 3d space. Sense the Object3d class is a base class for Mesh objects, Cameras, and Lights just to name a few objects, once one gains an understanding of how to use this property they can learn how to set the position of just about everything in a threejs project at least when it comes to objects rather than custom geometry.

<div align="center">
      <a href="https://www.youtube.com/watch?v=ckQTPYZvpzI">
         <img src="https://img.youtube.com/vi/ckQTPYZvpzI/0.jpg" style="width:50%;">
      </a>
</div>


## The Basic Section

The Basics of getting started with this are simple enough. The vector3 object stored at the position property contains x, y, and z properties and as such can be mutated directly as one way to go about setting the position of an object of interest. However it is a good idea to look into the Vector3 class in depth if one can do so as there are a lot of useful methods to change the state of this Vector3 object.

<div align="center">
      <a href="https://www.youtube.com/watch?v=iqTSfkGX3no">
         <img src="https://img.youtube.com/vi/iqTSfkGX3no/0.jpg" style="width:50%;">
      </a>
</div>

## The Children Section

The main idea that I want to get solid in this section is the deal with what local space is compared to that of what is often referred to as world space. This applies to all object3d class based objects including the scene object.

## The Curve Section

One great tool for setting the position of objects would be curves. There is getting into making custom curve class, but for the most part I have found that doing so is not called for as there are many great options for these built into threejs itself to work with.