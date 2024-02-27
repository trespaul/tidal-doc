---
title: Control latency
---

There are three configuration values which relate to latency: `cProcessAhead`, `cFrameTimespan`, and `oLatency`. Here's an example configuration:

```haskell
tidal <- startTidal
  ( superdirtTarget { oLatency = 0.05 } )
  ( defaultConfig { cFrameTimespan = 1/20, cProcessAhead = 3/10 } )
```

* **Frame timespan**: This is the duration of Tidal's calculation window in seconds. The default is `0.05 seconds`, in other words a calculation rate of 20 frames per second. If you find Tidal is using too much CPU, increasing the frame timespan will probably help. 

*  **Latency**: This parameter lets you account for the time a target takes to produce a sound. For example, we might need SuperDirt to schedule the event 100 ms before it should hit the speaker. A higher latency parameter will move the sound earlier in time. The default is `0.05 seconds`.

* **Process Ahead**: This parameter controls how far ahead Tidal will start processing events. It might need to be adjusted when a high latency value is set. Adjust this value if you get late messages in SuperCollider. The default is `0.3 seconds`.
