# threejs-quaternion

There is a lot to take in when it comes to quaternion objects in threejs as they are a little more complex compared to Euler angles. However much of that complexity might very well be justified as there are problems like [Gimbel Lock](https://en.wikipedia.org/wiki/Gimbal_lock) that happen with Euler angles. This is then what I have together for my first blog post on the subject in threejs, and I think it is safe to say that it will not be the last as well. As with just about any other first blog post on a subject such as this I think the main focus should be on the basic section for people that are new to this. After that rest of the content should be a general overview of some of the various prototype methods, and then at least a few animation loop demos.

### Plan for future Edits

* get axis angle section
* stochastic loop section
* expand methods section
* Simplify / expand basic section examples if possible
* expand animation loop section


## Focus on the basic section, and with that the set from axis angle method

One nice thing about Euler angles is that they are easy to work with when it comes to directly mutating the properties of one of these objects. When it comes to quaternion objects though, doing so is not so easy, so the main focus in the basic section should just be on the use of the set from axis angle method as a way to get started with these.

<div align="center">
      <a href="https://www.youtube.com/watch?v=4X4qaK0ei28">
         <img src="https://img.youtube.com/vi/4X4qaK0ei28/0.jpg" style="width:50%;">
      </a>
</div>

It might be possible to have a basic section demo on directly mutating the properties it is just that doing so strikes me as something that is not so basic. I might want to expand on doing that sort of thing in a whole other section of blog post. The current basic example for this as of this writing involves pointing out the source code of the set from axis angle method as a way to learn how to do this. Which resulting in me making a helper method that is more or less the same code with just a few simple changes.

```js
const setRotationByAxis = (q, v_axis, n_degree) => {
    const vector = v_axis.normalize();
    const radian = THREE.MathUtils.degToRad(n_degree);
    const halfAngle = radian / 2, s = Math.sin( halfAngle );
    q.x = vector.x * s;
    q.y = vector.y * s;
    q.z = vector.z * s;
    q.w = Math.cos( halfAngle );
};
```

## The methods section

For this post I am going to want to have a section in which I demo most, if not all prototype methods of the THREE.Quaternion class.

## Animation Loop Section

Some animaiton loop examples are called for. These can include at least one that demos the core set of prototype methods that I should be aware of in order to just do what it is that I want to do with them when it comes to rotations. After that I might expand into one or more demos that make use of many other threejs features if I get around to it in future edits.

<div align="center">
      <a href="https://www.youtube.com/watch?v=C_BMlJqrJIc">
         <img src="https://img.youtube.com/vi/C_BMlJqrJIc/0.jpg" style="width:50%;">
      </a>
</div>

## A get axis method section

I might want to add a get axis method section to the post. That is getting an axis vector from a quaternion when it is not known. I have a working demo on this thus far, but I think I would like to see abotu just working with the prototype methods more first.

## Stochastic loop section

For this subject I might see about doing something that I often do not do which is a Stochastic animation loop section. In other words a few if not more examples that work by way of user input, randomness and so forth. Many of my blog posts feature an animation loop section and this post is no exception. However the focus is to create something that can be used to make one or more videos and not something that responds to user input.


