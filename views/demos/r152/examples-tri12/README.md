# examples-tri12

I would like to start a standard for JSON files of Buffer Geometry that are composed of no more that 12 triangles, thus the name 'tri12' with this demo. With that said I have also started a collection of corresponding JSON files that can be used as examples of the data to be used with this demo. However there is more that needs to be outlined when it comes to what the rules are with this beyond just limiting myself to 12 triangles. I am not sure if I want to go with vertex color attributes alone, or get into more with uv mapping with textures, so one additional rule is that these models should have both a color, and uv attribute and with that also a normal attribute as well. Sense there is such a low ceiling with the number of triangles these the THREE.DoubleSide option should also be used with these.

I would like to also use these models for future blog posts that have to do with animation, so they should have at least one if not more morph attributes.

So then:
* must have at least one, but no more than 12 triangles
* must have a position, normal, uv, and color attribute.
* must have at least one morph attribute.
* index is optional as I might need for these to be non indexed in some cases
* THREE.DoubleSide must be used for the side option of the material
* vertexColor boolen can be set to true, or work soemthing out with textures with the material as there is a UV Attribute

