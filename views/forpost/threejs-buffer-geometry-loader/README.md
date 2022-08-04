# threejs-buffer-geometry-loader

In threejs one of the built in options when it comes to external resource loaders is the [buffer geometry loader](https://threejs.org/docs/#api/en/loaders/BufferGeometryLoader). Here I have a collection of [resources that has to do with my blog post on this specific topic on loading buffer geometry from a json file](https://dustinpfister.github.io/2018/04/12/threejs-buffer-geometry-loader/). 


### The Blender buffer geometry exporter \( io_three \)

The blender io_three exporter can be found in the [r92 repo of threejs](https://github.com/mrdoob/three.js/tree/r92/utils/exporters/blender).

### Might want to go with the DAE \( COLLADA \) format

The buffer geometry loader might prove to be a good starting point when it comes to loading external resources into a threejs project, however the [DAE file loader](https://dustinpfister.github.io/2021/04/30/threejs-dae-collada-loader/) is what I have come to enjoy using in place of the buffer geometry loader. The one draw back of the DAE loader though is that it is not built into threejs itself, but adding it is just a means of loading one more additional javaScript file on top of threejs itself.


