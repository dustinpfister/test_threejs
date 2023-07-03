# examples-tri12-scene

This is a demo in which I am working out some things for what I am calling my 'tri12' project for now. This time the aim is to have an over all scene with many models from my tri12 collection in the json folder rather than just one

 This means that the focus is to just work out very simple models composed of at least one, but no more than 12 triangles. I might want to bump this up to 16, but the focus is still very much on a kind of less is more art style. Although I am setting a limit of 12 triangle on myself when it comes to making models, I am not setting any limits when it comes to everything else with the geometry. These modules can, and actually should contain position, normal, uv, and even color attributes. Also I would like for these to have morph attributes as well as I want to get some basic things worked out when it comes to using these as a means of having animations.

So then:
* must have at least one, but no more than 12 triangles
* must have a position, normal, uv, and color attribute.
* must have at least one morph attribute.
* index is optional as I might need for these to be non indexed in some cases
* THREE.DoubleSide must be used for the side option of the material
* vertexColor boolen can be set to true, or work something out with textures with the material as there is a UV Attribute



