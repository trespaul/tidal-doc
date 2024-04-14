---
title: SuperDirt configuration
---

This SuperCollider script,
[from the SuperDirt GitHub](https://github.com/musikinformatik/SuperDirt/blob/develop/superdirt_startup.scd?plain=1),
indicates the SuperCollider and SuperDirt settings you may want to adjust when launching SuperDirt:

```c
(
// SuperCollider server options are only updated on reboot
s.reboot {

  // configure the sound server: here you could add hardware specific options
  // see http://doc.sccode.org/Classes/ServerOptions.html

  // increase this if you need to load more samples
  s.options.numBuffers = 1024 * 256;

  // increase this if you get "alloc failed" messages
  s.options.memSize = 8192 * 32;

  // increase this if you get "exceeded number of interconnect buffers" messages
  s.options.numWireBufs = 2048;

  // increase this if you are getting drop outs and the message "too many nodes"
  s.options.maxNodes = 1024 * 32;

  // set this to your hardware output channel size, if necessary
  s.options.numOutputBusChannels = 2;

  // set this to your hardware output channel size, if necessary
  s.options.numInputBusChannels = 2;

  // boot the server and start SuperDirt
  s.waitForBoot {

    // stop any old ones, avoid duplicate dirt
    // (if it is nil, this won't do anything)
    ~dirt.stop;

    // two output channels, increase if you want to pan across more channels
    ~dirt = SuperDirt(2, s);

    // load samples (path containing a wildcard can be passed in)
    ~dirt.loadSoundFiles;
    // ~dirt.loadSoundFiles("/Users/myUserName/Dirt/samples/*");

    // optionally: wait for samples to be read
    // s.sync;

    // start listening on port 57120, create two busses
    // each sending audio to channel 0
    ~dirt.start(57120, 0 ! 12);

    // make this instance available in sclang (optional)
    SuperDirt.default = ~dirt;

    // optional, needed for convenient access from sclang:
    (
       ~d1 = ~dirt.orbits[0];  ~d2 = ~dirt.orbits[1];   ~d3 = ~dirt.orbits[2];
       ~d4 = ~dirt.orbits[3];  ~d5 = ~dirt.orbits[4];   ~d6 = ~dirt.orbits[5];
       ~d7 = ~dirt.orbits[6];  ~d8 = ~dirt.orbits[7];   ~d9 = ~dirt.orbits[8];
      ~d10 = ~dirt.orbits[9]; ~d11 = ~dirt.orbits[10]; ~d12 = ~dirt.orbits[11];
    );

    // Directly below here, in your own copy of this file, you
    // could add further code that you want to call on startup.
    // This makes sure the server and ~dirt are running.
    // You can keep this separate and make it easier to switch
    // between setups by using "path/to/my/file.scd".load and
    // if necessary commenting out different load statements.

  };

  // increase this if you get "late" messages
  s.latency = 0.3;

};
);
```
