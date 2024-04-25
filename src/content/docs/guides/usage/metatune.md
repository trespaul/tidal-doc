---
title: Assign the actual notes to the samples
---

By default, SuperDirt treats all samples as having a pitch of C4 (MIDI note 60).
Playing a sample tonally is simple as long the sound is indeed a C. But what if not?

It is possible to embed pitch metadata in WAV files in the form of a [`smpl` chunk](https://www.recordingblogs.com/wiki/sample-chunk-of-a-wave-file).
This is used by some samplers to automatically map samples to MIDI notes.
SuperDirt also reads the pitch metadata for all loaded samples, allowing them to be pitched correctly (assuming the metadata is correct) by setting the `metatune` parameter to 1.

For example, the sample `bass1:18` from Dirt-Samples is an F2 (MIDI note 41) and is tagged with the appropriate pitch metadata.
With `metatune`, we can easily play it in tune with a superpiano chord:

```haskell
d1 $ stack
  [ note "<d4 c4 a3 bf3>" # s "bass1:18" # legato 1 # metatune 1
  , note "[~ d5'min'o]*4" # s "superpiano" # release 0.4
  ] # cps 0.35
```

`smpl` chunk metadata can be edited with various tools such as [pitcheon](https://github.com/ahihi/pitcheon) or [LoopAuditioneer](https://loopauditioneer.sourceforge.io/).
