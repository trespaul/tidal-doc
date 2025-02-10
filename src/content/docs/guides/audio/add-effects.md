---
title: Add effects to SuperDirt
---

This help file is based on a file found in the [SuperDirt GitHub](https://github.com/musikinformatik/SuperDirt/blob/develop/hacks/adding-effects.scd) repository. Report to the original version to get more information or add your improved workflow to this page to help other users. Adding new effects for Tidal and SuperDirt is a three-step process: 
1. add the desired parameters to Tidal
2. add a module definition to SuperDirt, so it can be found when the parameter is not `nil`
3. add the `SynthDef` to SuperDirt, so it can be played

## Adding a local effect

As an example, we'll add a weird spectral delay to SuperDirt. This assumes that you have an instance of SuperDirt accessible via `~dirt` in the SuperCollider interactive editor.

### Tidal Side

We are going to add two parameters: `tsdelay` (float, delay time) and `xsdelay` (int, delay structure). Run the following Tidal Code (as if it was a tidal pattern):

```haskell
let tsdelay = pF "tsdelay"
    xsdelay = pI "xsdelay"
```

If you want this the above be automatically available every time you start tidal, then add it to the definitions in your [BootTidal.hs boot file](reference/tidal/configuration/).

### SuperCollider Side

Add a module for SuperDirt. This adds a responder for the parameters.
```c
(
~dirt.addModule('spectral-delay', { |dirtEvent|
	dirtEvent.sendSynth('spectral-delay' ++ ~dirt.numChannels,
		// OPTIONAL
		// passing this array of parameters could be left out,
		// but it makes it clear what happens
		[
			xsdelay: ~xsdelay,
			tsdelay: ~tsdelay,
			sustain: ~sustain,
			out: ~out
		]
	)
}, { ~tsdelay.notNil or: { ~xsdelay.notNil } }); // play synth only if at least one of the two was given
)
```

You can previsualise the effect order using this command in SuperCollider:
```c
~dirt.modules;
```

You can reorder the effects if you need to. For instance, if you want the low pass filter to come after the delay, run the following line:

```c
~dirt.orderModules(['spectral-delay', 'hpf', 'klm']);
```

### Make a SynthDef

The last step is to declare our spectral delay itself, that will be declared in a classic SuperCollider SynthDef:
```c
(

var numChannels =  ~dirt.numChannels;

SynthDef("spectral-delay" ++ numChannels, { |out, tsdelay, xsdelay = 1, sustain|

	var signal, delayTime, delays, freqs, filtered;
	var size = 16;
	var maxDelayTime = 0.2;

	signal = In.ar(out, numChannels);
	delayTime = tsdelay * maxDelayTime;
	filtered = (1..size).sum { |i|
		var filterFreq = i.linexp(1, size, 40, 17000);
		var sig = BPF.ar(signal, filterFreq, 0.005);
		// the delay pattern is determined from xsdelay by bitwise-and:
		DelayN.ar(sig, maxDelayTime, i & xsdelay * (1/size) * delayTime )
	};
	signal = signal * 0.2 + (filtered * 4); // this controls wet/dry
	ReplaceOut.ar(out, signal)

}).add;
)
```

### Final result

Now you should be able to write the following in Tidal:
```haskell
d1 $ sound "can*4" # tsdelay "0 0.25 0.5 0.75 1" # xsdelay "3 124 3 12 62 2"
```


## Add a global effect

This help file is based on a file found in the [SuperDirt GitHub](https://github.com/musikinformatik/SuperDirt/blob/develop/hacks/adding-effects.scd) repository. Report to the original version to get more information or add your improved workflow to this page to help other users.

:::caution
Make sure you've started SuperCollider and that SuperDirt is currently running. To start it, you can type `SuperDirt.start` in the interactive text editor.
:::

We want to add a new global effect on each `orbit`. A global effect is definitely not the same thing as an "effect". Global effects will always be there on the signal chain, waiting for you to tweak their parameters. Effects, on the contrary, can be used and called specifically for a pattern only. They are instantiated on demand.

We can take a look at all the global effects declared on each orbit using this command in SuperCollider: 


```c
// these are the global effects on each orbit
~dirt.orbits.do { |x| x.globalEffects.postln }
```

As an example, we'll add a global low-pass filter on every `orbit`. First we need to generate a `SynthDef` for it:

### Building a SynthDef

```c
(
var numChannels = ~dirt.numChannels;
(1..SuperDirt.maxSampleNumChannels).do { |numChannels|
	SynthDef("dirt_global_lpf" ++ numChannels, { |dryBus, effectBus, gate = 1, cutoffFreq = 440|
		var signal = In.ar(dryBus, numChannels);

		var rq;
		signal = signal.asArray.collect { |sig|
			rq = 1/LFNoise2.kr(0.1).exprange(10, 20);
			RLPF.ar(sig, cutoffFreq, rq).tanh;
		};
		signal = signal * EnvGen.kr(Env.asr, gate, doneAction:2);
		DirtPause.ar(signal.sum, graceTime:4);

		Out.ar(effectBus, signal)
	}, [\ir, \ir]).add;
};
)
```

### Adding on the orbits

We need to add this `SynthDef` on each SuperDirt orbit:

```haskell
(
~dirt.orbits.do { |x|
	x.globalEffects = x.globalEffects
		.addFirst(GlobalDirtEffect(\dirt_global_lpf, [\cutoffFreq]))

	x.initNodeTree;
};
)

~dirt.orbits.do { |x| x.globalEffects.postln; " ----------".postln; }
```

### Tidal Side

Add the following line to your Tidal Boot file:
```haskell
let cutoffFreq = pF "cutoffFreq"
```

You can now have fun playing with your new effect:
```haskell
cps (40/120)
d1 $ sound "[sn [sn sn]][sn [sn sn*3]][sn [sn*5 sn]][bd bd]" # cutoffFreq "220 880"
```

