---
title: SuperDirt configuration
---

## Add an effect

This help file is based on a file found in the [SuperDirt GitHub](https://github.com/musikinformatik/SuperDirt/blob/develop/hacks/adding-effects.scd) repository. Report to the original version to get more information or add your improved workflow to this page to help other users. Adding new effects for Tidal and SuperDirt is a three-step process: 

1. add the desired parameters to Tidal
2. add a module definition to SuperDirt, so it can be found when the parameter is not `nil`
3. add the `SynthDef` to SuperDirt, so it can be played

### Adding a spectral delay

We are going to add a weird spectral delay to SuperDirt. This assumes that you have an instance of SuperDirt accessible via `~dirt` in the SuperCollider interactive editor.

#### Tidal Side

We are going to add two parameters: `tsdelay` (float, delay time) and `xsdelay` (int, delay structure). Run the following Tidal Code (as if it was a tidal pattern):

```haskell
let tsdelay = pF "tsdelay"
    xsdelay = pI "xsdelay"
```

If you want this the above be automatically available every time you start tidal, then add it to the definitions in your [BootTidal.hs boot file](https://tidalcycles.org/docs/configuration/boot-tidal/).

#### SuperCollider Side

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

#### Make a SynthDef

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

#### Final result

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

### Low-pass Filter

We are going to add a global low-pass filter on every `orbit`. First we need to generate a `SynthDef` for it:

#### Building a SynthDef

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

#### Adding on the orbits

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

#### Tidal Side

Add the following line to your Tidal Boot file:
```haskell
let cutoffFreq = pF "cutoffFreq"
```

You can now have fun playing with your new effect:
```haskell
cps (40/120)
d1 $ sound "[sn [sn sn]][sn [sn sn*3]][sn [sn*5 sn]][bd bd]" # cutoffFreq "220 880"
```

## Adding a synthesizer

When you install SuperDirt, you also install a small library of *default* synthesizers. These synths are made specifically for Tidal and SuperDirt. They do sound nice, but at some point you will want to create your own synthesizers. This page will guide you and teach you the basic steps of synthesizer creation for SuperDirt.


### Building a simple synthesizer

#### Learning SuperCollider

If you want to build new synthesizers for TidalCycles, you will need to learn some rudiments of the SuperCollider language (*SCLang*) as well. There are many guides, courses and tutorials you can find on the internet. I personnally recommand the [Eli Fieldsteel](https://www.youtube.com/user/elifieldsteel) YouTube channel. It is the most complete and beginner friendly tutorial you can find. It starts from the very basics up to very advanced topics for the more courageous.

When you play with TidalCycles, SuperCollider and SuperDirt are in charge of handling audio. Everything audio-related on Tidal will happen on the SuperCollider side. Even if you haven't planned to learn more about audio synthesis, it is important to keep this architectural distinction in mind.


#### SuperDirt template

Everything starts with this boilerplate `SynthDef` that you need to copy and paste in your SuperCollider interactive editor:
```c
SynthDef(\test, {
    | out, sustain=1, freq=440, speed=1, begin=0, end=1, pan, accelerate, offset|
}).add;
```

In SuperCollider, a `SynthDef` is a definition of something that will be instantiated as a `Synth` node. Don't be affraid of the technical jargon, it just means that we are going to declare a function that will be the definition of our synthesizers.

Everything inside the `||` is a list of arguments: a list of required parameters for our synthesizer to work. You might recognize some Tidal oddities, such as the `accelerate` parameter, or the `begin` and `end` parameters.

We give our synthesizer a `\name`, here (`\test`). This way, `SuperCollider` will be able to retrieve it on-the-fly from its internal list of synths. The `.add` method simply means "add it to the server".


:::tip
A `SynthDef` can be overriden at any moment. You can play a pattern on the Tidal side and design/recompile your synth on-the-fly. This is a great way to test if your synth works well.
:::

#### Blip-blop state

So far so good. We have an *empty shell* kind of synth. Strictly speaking, our synth is an audio function, and it lives between the curly brackets `{}`. Some of you might like silence, but we want sound.

##### What are UGens?

We will compose our synth by chaining together `UGens`. What is a `UGen`? The SuperCollider help file tells us:
> UGens represent calculations with signals. They are the basic building blocks of synth definitions on the server, and are used to generate or process both audio and control signals

Think about them as "audio bricks". They are tiny components, each one representing a function or a modification of an incoming signal. Some `UGens` are creating signals from scratch (oscillators, enveloppes), some are modifying the signals (filters, resonators), some are distributing it (stereo, ambisonics). `UGens` are ubiquitous in computer music, and you might have encountered them already in another language/another software/another form: Max `~objects`, modules in modular synthesis, etc... Since the dawn of computer music, there is a convention around the fact that `UGens` have different "rates" depending on their usage:
- `audio rate`: `.ar` in SuperCollider. An audio rate `UGen` will run at your current audio sample rate, generally `44.1hz` per second. `.ar` signals are used for audible components (oscillators).
- `control rate`: `.kr` in SuperCollider. Control rates are used for signals when the sampling rate is not crucial (enveloppes and LFOs). They are generally running at `samplerate/some amount`.
- `initial rate`: `.ir` in SuperCollider. A static non-modulable rate. It is more efficient on the CPU compared to a regular argument. But yeah, sounds like some sort of variable.

##### Basic synthesizer

In the following example, I've arranged everything you need to get a basic synthesizer running:
```c
SynthDef(\test, {
    | out, sustain=1, freq=440, speed=1, begin=0, end=1, pan, accelerate, offset|
    var env    = Line.ar(1, 0, sustain);
    var osc    = SinOsc.ar(freq);
    var output = osc * env;
    OffsetOut.ar(out, Pan2.ar(in: output, pos: pan));
}).add;
```
These four lines alone are enough to make a basic synthesizer. Notice that we are introducing new variables using the `var blabla = ...` syntax. We added the following components:
* `osc`: `SinOsc` is a basic sinusoïdal oscillator, running at `freq` speed.
* `env`: `Line` is a line generator, running from `1.0` to `0.0` over `sustain` seconds.
* `output`: by multiplying `osc` by `env`, we created an amplitude enveloppe for our synth, turning a continuous signal into discrete notes.
* `OffsetOut`: the audio output itself. The first argument is the buffer we want to write the sound to. If we leave `out` unspecified as it is the case here, SuperCollider will direct the sound to the audio output. How convenient! The following arguments are used to pass the signal `output` to the buffer.
* `Pan2`: this `UGen` will turn our mono signal into a stereo signal.

You can test it by running the following pattern with Tidal:
```haskell
d1
  $ cat[
    note "c ds g bf", note "c ds g bf",
    note "c f af c6", note "c f af c6"]
  # s "test"
```

##### Free the synthesizer

Our synth is currently working but something is wrong. The `synth` will never die, meaning that each note we will play will slowly increase the memory usage until audio glitches and other problems start to appear, apparently at random. SuperCollider can fix that by using `DoneAction`. Take a look at this updated version:
```c
SynthDef(\test, {
    | out, sustain=1, freq=440, speed=1, begin=0, end=1, pan, accelerate, offset|
    var env    = Line.ar(1, 0, sustain, doneAction: Done.freeSelf);
    var osc    = SinOsc.ar(freq);
    var output = osc * env;
    OffsetOut.ar(out, Pan2.ar(in: output, pos: pan));
}).add;
```
Using `doneAction` is *extremely important*. Our synth will now free whatever resource it was using while playing.

#### Adapt your synth to SuperDirt

SuperDirt is Tidal's audio engine. If you wish to use your synth with SuperDirt, there are a couple more things you should take care of. Remember the `OffsetOut` part? We will improve it in order to make it compatible with Tidal. We were hearing sound, but the sound was not managed and handled by SuperDirt itself but by the *vanilla* SuperCollider audio server instance.

Take a look at this new version of our `Blip-blop` synthesizer:
```c
SynthDef(\test, {
    | out, sustain=1, freq=440, speed=1, begin=0, end=1, pan, accelerate, offset, volume|
    var env    = Line.ar(1, 0, sustain, doneAction: Done.freeSelf);
    var osc    = SinOsc.ar(freq);
    OffsetOut.ar(out,DirtPan.ar(osc, ~dirt.numChannels, pan, env));
}).add;
```

As you can see, we are now using special objects for the audio output: `DirtPan`, as well as a reference to `~dirt.numChannels`. It a SuperDirt compatible version of what we were doing so far: outputting in stereo with a `pan` parameter. The only difference is that... now it works. Test this synth with the following Tidal pattern:
```haskell
d1
  $ superimpose (fast 2 . (|+ note "12 0 24 -12 0"))
  $ cat[
    note "c ds g bf", note "c ds g bf",
    note "c f af c6", note "c f af c6"]
  # s "test" # pan (slow 2 $ range "-1" 1 $ sine)
```
It sounds really nice! Your synth is now totally compatible with SuperDirt.

Note that we changed a few things:
* `output`: it's gone. We didn't needed it. We are now feeding the enveloppe to `DirtPan`
* `osc` is directly fed to `DirtPan` as well.

### More complex synthesis

This page taught you to create a synthesizer for SuperDirt but it is still pretty basic. If you learn a bit more about SuperCollider, you will be able to refine your ideas. Take a look at the following `SynthDef`. Keep the same pattern running, it sounds nice:

```haskell
SynthDef(\elegiac, {
    | out, sustain=1, freq=440, speed=1, begin=0, end=1, pan, accelerate, offset, volume|
    var env    = Line.ar(1, 0, sustain, doneAction: Done.freeSelf);
	var osc    = RLPF.ar(in: SawDPW.ar([freq, freq/2]), freq: SinOsc.ar(pan).range(200,2000));
    OffsetOut.ar(out,DirtPan.ar(osc, ~dirt.numChannels, pan, env))
}).add;
```

#### Using custom parameters

If you want to create any custom parameter for your `SynthDef`, it also has to be referenced in Tidal.
To do this, you have to create a parameter in Tidal with the same name the argument has in SuperCollider.
For example, if the arguments in SuperCollider were `| harm, pit, model |`, you should add this to your [Tidal Boot File](https://tidalcycles.org/docs/configuration/boot-tidal/):

```haskell
let harm = pF "harm"
let pit = pF "pit"
let model = pI "model" 
```

#### Listing Tidal paramenters
From SuperCollider, you can generate a Tidal parameter list for any SuperDirt SynthDef:

```c
SuperDirt.postTidalParameters([\imp, \default]);
SuperDirt.postTidalParameters([\supersaw, \default])
```

This will generate the exact parameters registered with Tidal for the "imp" or "supersaw" synths. 

```haskell
-- | parameters for the SynthDefs: imp, default
let (begin, begin_p) = pF "begin" (Nothing)
    (end, end_p) = pF "end" (Nothing)
    (freq, freq_p) = pF "freq" (Nothing)
    (span, span_p) = pF "span" (Nothing)
    (speed, speed_p) = pF "speed" (Nothing)
```

### Troubleshooting

#### I can hear 'clicks'

When using your custom synthesizers for Tidal, you will sometimes hear 'clicks'. These clicks are breaks/discontinuities in the audio signal. Audio clicks are ubiquitous in computer music, and people are doing everything they can to avoid them and to fix the problem.

If you can hear audio clicks while playing with your custom SuperCollider synths, try the following:
* rewrite your `SynthDef` the Tidal way (see above).
* raise the `legato` value in your pattern.
* increase the `fadeTime` parameter in SuperDirt:

```c
~dirt.orbits[3].set(\fadeTime, 0.01);
~dirt.orbits[4].set(\fadeTime, 0.1);
```
