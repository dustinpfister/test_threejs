# examples-aplay-sin-frames r152 demo

This is the code that I have togetaher for having some code to generate binary data that is then to be used with the linux ALSA aplay command.

## nodejs scripts

The nodejs folder of this demo has a sin\_frame.js script that will open a JSON file and then spit out binary data in the standard output that I can then in turn redirect to a file that can then be opened and played with the linux aplay command.


```json
{
  "bytes_per_frame" : 1400,
  "frames": [
      [1, 40, 10],
      [2, 40, 10],
      [3, 40, 10],
      [4, 40, 10],
      [5, 40, 10],
      [6, 40, 10],
      [7, 40, 10],
      [8, 40, 10],
      [9, 40, 10],
      [10, 40, 10],
      [11, 40, 10],
      [12, 40, 10],
      [13, 39, 9],
      [14, 38, 9],
      [15, 37, 9],
      [16, 36, 8],
      [17, 35, 8],
      [18, 34, 8],
      [19, 33, 7],
      [20, 32, 7],
      [21, 31, 7],
      [22, 30, 6],
      [23, 29, 6],
      [24, 28, 6],
      [25, 25, 5],
      [26, 22, 5],
      [27, 18, 5],
      [28, 16, 2],
      [29, 10, 3],
      [30, 8, 2]
  ]
}
```

```
$ node sin_frame fd1.json > adata
$ aplay -f U8 -r 42000 adata
```
