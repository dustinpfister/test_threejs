# threejs-curve-quadratic-bezier-curve3

These are the examples for my blog post on [quadratic bezier curve3 ](https://dustinpfister.github.io/2022/10/21/threejs-curve-quadratic-bezier-curve3/). This is one of the many built in extentsions of the base curve class, and it is one of the typical options for a 3d curve. This kind of curve will take a start point, single control point and an end point. 

<div align="center">
      <a href="https://www.youtube.com/watch?v=Flm1zCt-s1I">
         <img src="https://img.youtube.com/vi/Flm1zCt-s1I/0.jpg" style="width:50%;">
      </a>
</div>

## Other Options for 3d curves

Although for the most part this built in option for curves will work fine there is also the cubic bezier curve3 class that will use two control points. Sense this can be used to get the same results as a quadratic bezier curve, while also allowing for greater flexibility because of the extra control point I often prefer to make use of that kind of curve over that of the quadratic option.