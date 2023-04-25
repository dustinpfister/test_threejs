# threejs-webgl

I [wrote a post on the subject of webgl and threejs in general](https://dustinpfister.github.io/2019/06/11/threejs-webgl/). For the most part though this post is just on testing if webgl is there to begin with. In the event that webgl is not there to work with at all I can use some kind of alterative renderer, or just let the user know that there browser does not support webgl. In the event that webgl is there to work with it is possible that I might only have webgl 1 to work with. I like to work on raspberry pi so I can say first hand that this is very much the case with some of us odd balls that like to work and play on that kind of a system.

## Future Edits

If this is an area where I think I should expand there is of course making this the general post on threejs in which case I am going to want to expand on other topics rather than just feature testing if webgl is supported. Some ideas for other sections, and new posts to link to might included

* webgl hello world program
* using raw GLSL code in place of threejs
* using the shader lib of threejs
* expanding on the use of other alternative renders
* having a section in which I go over webgl renderer features (event though I have another post on that)


## WebGl Hello world

I did some quick googling for an example of a WebGl hello World program and have found a [decent post](https://jameshfisher.com/2017/09/27/webgl-hello-world/) on what I had in mind for that kind of program.

```html
<div><canvas id="canvas" width="100" height="100"></canvas></div>
 
<script>
  const canvasEl = document.getElementById("canvas");
  const ctx = canvasEl.getContext("webgl");
  ctx.clientWidth = canvas.width;
  ctx.clientHeight = canvas.height;
  ctx.clearColor(0,1,0,1);
  ctx.clear(ctx.COLOR_BUFFER_BIT);
</script>
```

There is exapnding from this kind of example to have a welth of options when it comes to getting started with raw webgl. I could also have one or more demos that make use of the shader lib in threejs.

