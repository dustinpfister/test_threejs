## threejs r150 notes

As of r150 forward I am going to have to start doing everything with JSM in place of ye old javaScript files. In r148 the examples/js folder was removed which is a major resource that I often mentioned in my blog posts so all ready I will need to start editing my blog posts in light of that to being with. On top of that it looks like three.js, and three.min.js are on the chopping block as well, although it will not happening in r150 at least. However even though three.min.js will be there to work with in r150 I am going to start updating my blog posts with pure JSM code as of r150 forward so that I get a jump on this way before these files are removed which [may happen in r160](
https://github.com/mrdoob/three.js/pull/25435#issuecomment-1420622940).

However I will have to start update my blog posts in a way so that the older source code exmaples and text are still there for pople that which to stick to using older revisions of threejs. With that said r146 will be the last revision that I will be observing where both the examples/js folder and three.min.js exist and I will have to write about this in each "Version Numbers Matter" section.

### What I will be doing as of r150+

So then as of r150 I will be doing the following

* use three.module.js over that of three.min.js, as three.min.js will be removed in a future revision
* use addons from examples/jsm folder, as examples/js is no more
* use import maps for each r150+ demo, and module script type for all javaScript files
* use import maps when updating old for post folder examples to r150 style outline
* use import and export over an IIFE pattern when making and updating various custom threejs modules
* THREE.Clock should be used over new Date() or Date.now() when getting time stamps for loops
* Alpha values should follow a pattern like a1, a2, a3, ect.

### r150 style example

As with older demo folders I have made the getting-started demo the first demo that will set the tone for just about all other demos. it would be best to check out the [source code of that example](https://github.com/dustinpfister/test_threejs/tree/master/views/demos/r150/getting-started) to get an index of what code style should be for r150+.


```html
<script type="importmap">
    {
        "imports": {
            "three": "/js/threejs/0.146.0/three.module.js",
            "OrbitControls": "/js/threejs/0.146.0/jsm/controls/OrbitControls.js"
        }
    }
</script>
<script type="module" src="/demos/r<%= r %>/<%= demoName %>/js/main.js"></script>
```

### Yes It does look like three.min.js is going to go bye bye

three.min.js will be removed from the threejs repo at some point in the future, maybe r160 it would seem. However this will cause a whole lot of problems with new users of threejs that are trying to get all these old threejs examples to work that make use of these old js files. I do what I can to update my content here, but it is going to take months to run threw the whole catalog to update all my examples to this change.

```
https://github.com/mrdoob/three.js/pull/25435#issuecomment-1420622940

After studying the current ecosystem a bit I agree with @neilrackett.
 
Removing the files is a solution but it will create problems for other users.
We want solutions that do not create more problems.
 
It's understandable that beginners get frustrated if things don't work and have no other option than go ask in the forum or chat. Lets delegate the teaching part to the library instead of doing it ourselves.
 
So, lets keep build/three.js and build/three.min.js (for a year, tentatively) and use them to communicate the users that these files are deprecated and teach them how to import using modules with a console.warn() as previously discussed.
```