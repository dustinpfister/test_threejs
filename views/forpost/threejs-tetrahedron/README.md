# threejs-tetrahedron


<div align="center">
      <a href="https://www.youtube.com/watch?v=2-B_dzUrN8w">
         <img src="https://img.youtube.com/vi/2-B_dzUrN8w/0.jpg" style="width:50%;">
      </a>
</div>

## Regular tetrahedron

It would seem that the THREE.Tetrahedron Constructor creates what is really called a "[Regular tetrahedron](https://en.wikipedia.org/wiki/Tetrahedron)"

## Irregular tetrahedron

If I where to take the time to make a custom function for creating this kind of geometry then the focus should be on making some of th other kinds of tetrahedron that do not have equal sides.

## Geometry Browser Style

On A side note I made Objects that are like that of what are used in the Geometry browser used in the threejs docs.
They are not just using Mesh objects, but rather Groups with a mesh Object as well as a Line Segments obejcts added
As Children

```
https://github.com/mrdoob/three.js/blob/dev/docs/scenes/geometry-browser.html
```