# material-loader-shader r152 demo

I would like to work out at least a few demos on the material loader as I might write a blog post on the subject. Also when it comes to the possibility of using the materials loader in a project I would assume that there is a way to use it to load materials that will be instances of the shader material. However I have found that I should assume nothing when it comes to these things, so I am starting this demo on this subject.

## The general Process of exporting to JSON

So far it would seem that I can just call the toJSON method of a ShaderMaterial and then pass that Object to JSON.parse. However I have found that there is one problem with that which is that if there are any \n instances in the resulting string the JSON.parse method throws a hissy fit. So it would seem that the GLSL code of the shader material should not have nay returns in it. In other words it needs to be minified.


