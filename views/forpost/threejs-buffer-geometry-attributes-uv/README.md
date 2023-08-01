# threejs-buffer-geometry-attributes-uv

The [uv attribute](https://dustinpfister.github.io/2021/06/09/threejs-buffer-geometry-attributes-uv/) is what is used to change the offsets used for skinning the faces of a geometry. That is that it is a way to map out what parts of a 2d texture will be used for what parts of an 3D model. With many of the built in geometry classes in threejs the UV attribute is set up to begin with. Often the starting state of the UV attribute will be what is needed, but in some cases it might need to be mutated or even changed over time to get an effect that is wanted. Also it should go without saying that when it comes to creating a custom geometry form the ground up this will need to be worked out from the ground up.

<div align="center">
      <a href="https://www.youtube.com/watch?v=Ntz_B7Ye130">
         <img src="https://img.youtube.com/vi/Ntz_B7Ye130/0.jpg" style="width:50%;">
      </a>
</div>
