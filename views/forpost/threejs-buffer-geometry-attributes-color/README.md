# threejs-buffer-geometry-attributes-color

The color attribute of a buffer geometry instance is how to go about defining a color to use for each vertex in a position attribute of such a geometry. In other words it is a way to set a color for each point in space that will be used with a material that can be set into vertex color mode by setting the [vertexColors Boolean to true](https://threejs.org/docs/#api/en/materials/Material.vertexColors). 

## Works with just about all built in mesh materials

Sense the vertexColors boolen is a property of the base material class, this should work with just about all built in materials. In fact as I have confirmed vertex coloring does work with almost all mesh materials with the two exceptions being the MeshDepthMatreial, and the MeshNormalMaterial. Which makes sense as these two materials are just used to render the surface of mesh objects based on the state of the position of the mesh relative to the camera, or the state of the normal attribute of the buffer geometry. I would not want to use vertex coloring with those kinds of materials anyway. However it does work with all the other materials all of which are materials that i would consider using in an actual final project of some kind.

## Works with Lines and Points

Again because the vertexColors boolen is a base material class property vertex colors work with materials like LineBasicMaterial when it comes to Lines, and the PointsMaterial when it comes to Points.


