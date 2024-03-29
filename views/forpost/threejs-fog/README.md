# threejs-fog

Here I have the source code examples for [my post on fog](https://dustinpfister.github.io/2018/04/16/threejs-fog/) in threejs. When choosing to use fog there are two constructors to choose from one of which is a linear fog, and the other is an exponential squared fog. The fog object that is returned by one of these constructors then just needs to be added to the scene.fog property of a scene object, and then one will also want to set the background color of the scene object also.

<div align="center">
      <a href="https://www.youtube.com/watch?v=qDhzsXUyuY8">
         <img src="https://img.youtube.com/vi/qDhzsXUyuY8/0.jpg" style="width:50%;">
      </a>
</div>

## Resources

I am going to do something different with this post that I think I might start doing with additional posts as i continue to edit old threejs posts such as this one as well as writing new ones, and that is keeping better tack of my sources.

### - Official Docs as threejs.org

[THREE.fog](https://threejs.org/docs/#api/en/scenes/Fog)
[THREE.FogExp2](https://threejs.org/docs/#api/en/scenes/FogExp2)

### - Confusion with scene.fog, and scene.background

It would seem that there is [some confusion when it comes to the background color, and the fog color](https://discourse.threejs.org/t/is-there-a-way-to-apply-fog-to-mesh-only-and-not-be-visible/12511/3). The thing about fog is that it will only effect the materials of mesh objects, not the background. As such this is something that I should write about right away in the basic section, and maybe even go so far is to have a whole section and examples on this topic.

### - Youtube

[SimonDev - Fog, Basic Fog, and Better Fog](https://www.youtube.com/watch?v=k1zGz55EqfU)

The first and foremost youtube video that comes up for fog as of this writing at least is better good, going beyond just the basics, but also explaining what the basics are without going on for too long about it. Also this video gets into how to go about making yet another kind of fog that involves the use of a custom shader, a Subject that I am still pretty weak with at this point.
