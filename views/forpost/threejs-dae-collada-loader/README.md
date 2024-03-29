# threejs-dae-collada-loader

These are the source code examples that I have together for my [post on the DAE file loader in threejs](https://dustinpfister.github.io/2021/04/30/threejs-dae-collada-loader/). The examples thus far have to do with just the getting started type thing with the DAE loader when it comes to just loading a single file with it, and not caring about textures, as well as one more that has to do with setting the resource path for a set of textures that is in another location than that of the DAE file.

<div align="center">
      <a href="https://www.youtube.com/watch?v=KuPMBoUZnZ4">
         <img src="https://img.youtube.com/vi/KuPMBoUZnZ4/0.jpg" style="width:50%;">
      </a>
</div>


So far I have to say that I like the DAE standard because of its plain text format that allows for me to just look at, and if need be edit, the state of the file with a text editor if need be. When it comes to using software to create and edit models so far I tend to just like using blender and the DAE file format works great when it comes to exporting from blender. 

## Alternative Options

Although The DAE format is a great option as it seems to be a fairly universal format, there are a lot of things to say about the various alternatives. For one thing I do tend to like to use the buffer geometry format, as that is an option that I can use with the core threejs library alone. Also although I tend to like plain text formats, I should at some point look into at least some of the binary file formats that there are to work with.
