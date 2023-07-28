# threejs-material-loader

This is what I have in terms of demos and notes for my blog post on the material loader in threejs. At the time of this writing I have been logging a lot of time into expanding my post on materials in general into a deep dive kind of content piece and as such while I am at it, it does very much make sense to also write some new content pieces on the subject of materials to link to from that post and vis versa. 

## THREEJS DOCS AND SOURCE CODE

The first and foremost resources for doing research on this topic as always is the threejs docs, and after that reading the actual source code files when it comes to auditing code. With that said there is not just looking at the source code of the Material loader, but also the base loader class from which the material loader extends from.

THREEJS DOCS:

https://threejs.org/docs/#api/en/loaders/MaterialLoader

SOURCE CODE:

* Material loader Source ( r152 )
https://github.com/mrdoob/three.js/blob/r152/src/loaders/MaterialLoader.js

* Loader class Source ( r152 )
https://github.com/mrdoob/three.js/blob/r152/src/loaders/Loader.js

## The Deal with loading textures

One major problem with using the Material loader is how to go about loading the textures that will be used with the materials. There are ways of doing it, but the process is a little convoluted which makes me prefer to go with the Object loader. 


## Other Blog Posts and sources on the material loader

I was not able to find any blog posts on the material loader alone in threejs, which is a good thing as that means that there is very much a content gap with this one. At least with the keywords that I have tried such as "threejs material loader", and "THREE.MaterialLoader". The threejs docs for that material loader come up, but for the most part it seems like that is where the relevant links begin and end. My post on the texture loader comes up which is great, but that is not what I would like to see when it comes to scoping out the competition.

So yeah it seems like just about everything that comes up is on some other kind of loader in threejs such as the texture loader, objLoader and so forth. However I was able to find a stack overflow question that might bring up a good point about the limitations of the loader.

### Stackoverflow

https://stackoverflow.com/questions/47168553/three-js-materialloader-doesnt-load-embedded-texture-image

I was able to find a stack overflow post on one of the relevant limitations of the material loader when it comes to loading textures. I am all ready of the mindset that it is a better general idea to use the ObjectLoader as a way to load in materials, and with that everything else that I would want to use in a project. However if people want to break things down more in place of using the object loader, than there is knowing that the texture loader will need to be used in combination with the material loader as the material loader does not load or parse textures.

