---
title: Visualise Tidal events
---

## Visualise events with `tidal-vis`

`tidal-vis` is a tool made by Alex McLean to visualise Tidal patterns. This package allows several things:
* OSC messages sent to SuperCollider to be dynamically rendered in realtime with a separate window. Demo of realtime visualisation.
* Colour patterns to be rendered as PDF or SVG files. See *Examples.hs* in the [GitHub
  repository](https://github.com/tidalcycles/tidal-vis) for more help.
* Colour patterns to be rendered to be rendered dynamicly in separate window. See
  *CycleAnimation.hs* for more. Demo.

1. Comment out any existing lines in `BootTidal.hs` that begin with `tidal <- startTidal`.

2. Add the following lines to `BootTidal.hs`:

```haskell
 -- Target and shape for pattern visualizing.
 patternTarget = Target { oName = "Pattern handler", oAddress = "127.0.0.1", oPort = 5050, oBusPort = Nothing, oLatency = 0.02, oWindow = Nothing, oSchedule = Pre BundleStamp, oHandshake = False }
 patternShape = OSC "/trigger/something" $ Named {requiredArgs = []}

 -- Target for playing music via SuperCollider.
 musicTarget = superdirtTarget { oLatency = 0.1, oAddress = "127.0.0.1", oPort = 57120 }

 config = defaultConfig {cFrameTimespan = 1/20}

 -- Send pattern as OSC both to SuperCollider and to tidal-vis.
 tidal <- startStream config [(musicTarget, [superdirtShape]), (patternTarget, [patternShape])]

 -- Send pattern as OSC to SuperCollider only.
 -- tidal <- startTidal musicTarget config
```

3. Install `tidal-vis` and run:

```bash
 cabal update
 cabal install tidal-vis
 tidal-vis
```

4. Evaluate your Tidal code.

To learn more about `tidal-vis`, head to the [GitHub
repository](https://github.com/tidalcycles/tidal-vis) of the project.


## Visualise the Tidal clock

You can use SuperCollider GUI libraries to create a small window showing the current state of the Tidal clock. `pulu` scripted the following solution:

```c
// start superdirt first
(
var clockMods, clockBeats, screenW, screenH, clockW, clockH, clockX, clockY, resizable, border;
clockMods = [4,6];
clockBeats = 4;
screenW = 1440;
screenH = 900;
clockW = 120;
clockH = 22;
clockX = screenW - clockW;
clockY = screenH - 1;
resizable = false;
border = false;

~clockText = StaticText()
.string_("[clock]")
.font_(Font.defaultMonoFace)
.align_(\center)
.stringColor_(Color(1,1,1))
.minHeight_(20);

~updateClock = { |cycle|
    var text, beat;
    text = clockMods.collect { |m| "" ++ (cycle.floor.asInteger.mod(m) + 1) ++ "/" ++ m; }.join(" ");
    beat = (cycle.mod(1)*clockBeats).round.asInteger + 1;
    text = text ++ " " ++ clockBeats.collect { |i| if(i < beat, ".", " "); }.join;
    ~clockText.string_(text);
};

~clockWindow = Window("clock", Rect(clockX, clockY, clockW, clockH), resizable, border)
.background_(Color(0.3,0.3,0.3))
.layout_(
    HLayout(
        ~clockText
    ).margins_(0!4)
);

~clockWindow.alwaysOnTop_(true);
~clockWindow.visible_(true);

SynthDef(\tick, { |cycle|
    SendReply.kr(Impulse.kr(0), "/tick", [cycle]);
    FreeSelf.kr(Impulse.kr(0));
}).add;

OSCdef(\tick, { |msg|
    var cycle;
    #cycle = msg[3..];
    Routine {
        { ~updateClock.(cycle); }.defer;
    }.play(SystemClock);
}, "/tick");
)
```

After evaluating this script (in your `BootTidal.hs` or after booting SuperDirt), play the following pattern:

```haskell
p "tick" $ "0*4" # s "tick"
```

## The Didactic Pattern Visualiser

For a different approach to visualizing Tidal patterns, see the [Didactic Pattern Visualizer](https://github.com/ivan-abreu/didacticpatternvisualizer/tree/main) by Iván Abreu. Also see the blog post on it by `HighHarmonics` with examples and code: [Tidal Visualization with Didactic Pattern Visualizer].

<!-- TODO: add blog link above -->
