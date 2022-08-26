# threejs-examples-many-object-tweening proto folder

This threejs example is the continuing development of my many-object-tweening threejs r140 prototype that as the name suggests has to do with tweeing or 'in betweening' if that makes more sense between two or more object states. In threejs you have these things called mesh objects, and these mesh objects have nested objects mainly a buffer geometry instance, and one or more materials. A buffer geometry contains a few core attributes such as position, normal, and uv. Say that I have two objects with geometries that contain the same count of vertices, and I want to transition from one object state to another, then say while at some point between doing so I want to stop and transition to a thid object. This threejs example has to do with making a crude yet effective system for doing so that has to do with creating a mean between each of these various geometries and various lerp points between them.

<div align="center">
      <a href="https://www.youtube.com/watch?v=xfzR932YClU">
         <img src="https://img.youtube.com/vi/xfzR932YClU/0.jpg" style="width:50%;">
      </a>
</div>

## The DAE file folder

The DAE file used for this project example is [many-object-tweening-1a.dae which can be found in the DAE folder of this repo](https://github.com/dustinpfister/test_threejs/tree/master/views/dae/many-object-tweening).

## The r140 prototype

When it comes to the javascript code examples I started out with [the r140 proto](https://github.com/dustinpfister/test_threejs/tree/master/views/demos/r140/proto-many-object-tweening) folder can be found i the r140 folder of the demos folder. The main goal there was just to get the basic proof of concept that I had in mind working with the position attribute alone. I was using the compute vertex normals methods to update the normals there, and I was doing nothing with uvs, or anything else in the objects such as with materials and textures.
