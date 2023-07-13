# threejs-animation-mixer

It would seem that when it comes to learning a thing or two about the animation system in threejs it might be best to start with the animation mixer and then work up from there into animation action, animation clip, and key track objects. There is stating the other way around, but I have found that if I want even a basic working animation this way I will want to start out this way.

## Updating a mixer video style with mixer.setTime

There is an update method of the mixer object which might be what I would want to use in some kind of real time project. However I often find myself working on video like projects, as such there should be some way to just set the state of an animation to some kine of time index value. With that said it would seem that the mixer.setTime method is what I want to be using when it comes to using a mixer this way.