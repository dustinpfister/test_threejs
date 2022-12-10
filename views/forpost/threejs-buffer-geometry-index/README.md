# threejs-buffer-geometry-index

The index property of a buffer geometry class instance in threejs will store a buffer attribute as its value that is an index for points in the position attribute of the geometry. Simply put this is a way to define just a few points in space in the position attribite and then  use this index property as a way to define what the triangles of the geometry should be. In other words it is a way to reuse points in the positon attribute, thus allowing for a lower array size for the geometry in terms of the number of points needed.



<div align="center">
      <a href="https://www.youtube.com/watch?v=x-qV4hYJLOA">
         <img src="https://img.youtube.com/vi/x-qV4hYJLOA/0.jpg" style="width:50%;">
      </a>
</div>
