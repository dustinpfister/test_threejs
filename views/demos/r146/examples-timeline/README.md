# examples-timeline r146 demo

I would like to make a project where I define a collection of events that start at a given point along a timeline.

# Should be able to give global options to define total time range

```
const tl = timeLine.create({
    timeStart: '2023-3-7-09:00:00.000',
    timeEnd: '2023-3-7-17:00:00.000'
});
// guy shows up to work 15 minutes late
timeLine.add(tl, { 
    ts: '09:15:00.000',
    update: (state) => {
       // what to do durring this time
    }
});
```

# Give percise full time stamp strings

If need be it would be nice to give percise time stamp strings

```
const tl = timeLine.create();
timeLine.add(tl, {
    timeStart: '2023-3-7-17:30:00.000',
    timeEnd: '2023-3-7-18:30:30.250' },
    update: () => {
    }
});
```