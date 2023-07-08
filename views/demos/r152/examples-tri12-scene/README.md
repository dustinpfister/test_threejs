# examples-tri12-scene

This is a demo in which I am working out some things for what I am calling my 'tri12' project for now. This time the aim is to have an over all scene with many models from my tri12 collection in the json folder rather than just one

## what is 'tri12' ?

This means that the focus is to just work out very simple models composed of at least one, but no more than 12 triangles. I might want to bump this up to 16, but the focus is still very much on a kind of less is more art style. Although I am setting a limit of 12 triangle on myself when it comes to making models, I am not setting any limits when it comes to everything else with the geometry. These modules can, and actually should contain position, normal, uv, and even color attributes. Also I would like for these to have morph attributes as well as I want to get some basic things worked out when it comes to using these as a means of having animations.

For more info on this you might want to check out my [first r152 demo where this all started](https://github.com/dustinpfister/test_threejs/tree/master/views/demos/r152).

## Object Grid Wrap Module

While working on this demo I started an updated revision of my object grid wrap module. Changes thus far involve a new opacity3 effect that is built into the module as this is somehting that I am just about always goint to want to have with this kind of module to say the least. I have added lots of other little changes such as allowing for setting user data object key values pairs for the group object when calling the create method, and having a gud argumnets for effects funcitons. I am still seeing a lot of room for improvement for this module, but for now I would say it works well enought for what I care for this project to say the least. I migth want to have this as a special hack gob for this demo alone, but I am sure I will want to apply a lot of what I worked out her for my next revision of this exmaple when I get to it.

