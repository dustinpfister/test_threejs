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