### Looks Like r150 is broken, and also three.min.js is being removed.

I might have to start using r149 and also observe that as the last stable revision of threejs for now.

three.min.js will be removed from the threejs repo at some point in the future, maybe r160 it would seem. However this will cause a whole lot of problems with new users of threejs that are trying to get all these old threejs examples to work that make use of these old js files. I do what I can to update my content here, but it is going to take months to run threw the whole catalog to update all my examples to this change.

### Starting with a dev version

I am starting with a dev version of threejs r150 so I should take note of the commit hash that I am using

```
Feb/14/2022 - https://github.com/mrdoob/three.js/tree/e5bf1a843b081c145c902f5f5aca3b91f96fab5b/ <= too many errors
Feb/10/2022 - https://github.com/mrdoob/three.js/tree/ec3e38a25ffcfdc4f8eaacfecd57b317900bb595/ <= Works
```

```
https://github.com/mrdoob/three.js/pull/25435#issuecomment-1420622940

After studying the current ecosystem a bit I agree with @neilrackett.
 
Removing the files is a solution but it will create problems for other users.
We want solutions that do not create more problems.
 
It's understandable that beginners get frustrated if things don't work and have no other option than go ask in the forum or chat. Lets delegate the teaching part to the library instead of doing it ourselves.
 
So, lets keep build/three.js and build/three.min.js (for a year, tentatively) and use them to communicate the users that these files are deprecated and teach them how to import using modules with a console.warn() as previously discussed.
```