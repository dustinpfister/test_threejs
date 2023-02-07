## threejs r150 notes

As of r150 forward I am going to have to start doing everything with JSM in place of ye old javaScript files. In r148 the js folder was removed which is a major resource that I often mentioned in my blog posts so all ready I will need to start editing my blog posts in light of that to being with. On top of that it looks like three.js, and three.min.js are on the chopping block as well, although it will not happening in r150 at least. However even though three.min.js will be there to work with in r150 I am going to start updating my blog posts with pure JSOM code as of r150 forward so that I get a jump on this way before these files are removed which [may happen in r160](
https://github.com/mrdoob/three.js/pull/25435#issuecomment-1420622940).

### What I will be doing as of r150+

So then as of r150 I will be doing the following

* use three.module.js over that of three.min.js, as three.min.js will be removed in a future revision
* use addons from examples/jsm folder, as examples/js is no more
* use importmap for each r150+ demo
* start using import maps and r150+ when updating old for post folder examples

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


### It does look like three.min.js is going to go bye bye

three.min.js will be removed from the threejs repo at some point in the future, maybe r160 it would seem. However this will cause a whole lot of problems with new users of threejs that are trying to get all these old threejs examples to work that make use of these old js files. I do what I can to update my content here, but it is going to take months to run threw the whole catalog to update all my examples to this change.

```
https://github.com/mrdoob/three.js/pull/25435#issuecomment-1420622940

After studying the current ecosystem a bit I agree with @neilrackett.
 
Removing the files is a solution but it will create problems for other users.
We want solutions that do not create more problems.
 
It's understandable that beginners get frustrated if things don't work and have no other option than go ask in the forum or chat. Lets delegate the teaching part to the library instead of doing it ourselves.
 
So, lets keep build/three.js and build/three.min.js (for a year, tentatively) and use them to communicate the users that these files are deprecated and teach them how to import using modules with a console.warn() as previously discussed.
```