---
title: Params
---

## Misc

### `grp`

```haskell
:: [String -> ValueMap] -> Pattern String -> ControlPattern
```

Group multiple params into one.

### `mF`

```haskell
:: String -> String -> ValueMap
```

### `mI`

```haskell
:: String -> String -> ValueMap
```

### `mS`

```haskell
:: String -> String -> ValueMap
```


## Param makers

### `pF`

```haskell
:: String -> Pattern Double -> ControlPattern
```

### `pI`

```haskell
:: String -> Pattern Int -> ControlPattern
```

### `pB`

```haskell
:: String -> Pattern Bool -> ControlPattern
```

### `pR`

```haskell
:: String -> Pattern Rational -> ControlPattern
```

### `pN`

```haskell
:: String -> Pattern Note -> ControlPattern
```

### `pS`

```haskell
:: String -> Pattern String -> ControlPattern
```

### `pX`

```haskell
:: String -> Pattern [Word8] -> ControlPattern
```

### `pStateF`

```haskell
:: String	-- A parameter, e.g. note; a String recognizable by a ValueMap.
-> String	-- Identifies the cycling state pattern. Can be anything the user wants.
-> (Maybe Double -> Double)
-> ControlPattern
```

### `pStateList`

```haskell
:: String	 -- A parameter, e.g. note; a String recognizable by a ValueMap.
-> String	 -- Identifies the cycling state pattern. Can be anything the user wants.
-> [Value]	-- The list to cycle through.
-> ControlPattern
```

`pStateList` is made with cyclic lists in mind,
but it can even "cycle" through infinite lists.

### `pStateListF`

```haskell
:: String -> String -> [Double] -> ControlPattern
```

A wrapper for `pStateList` that accepts a `[Double]`
rather than a `[Value]`.

### `pStateListS`

```haskell
:: String -> String -> [String] -> ControlPattern
```

A wrapper for `pStateList` that accepts a `[String]`
rather than a `[Value]`.


## Grouped params

### `sound`

```haskell
:: Pattern String -> ControlPattern
```

### `sTake`

```haskell
:: String -> [String] -> ControlPattern
```

### `cc`

```haskell
:: Pattern String -> ControlPattern
```

### `nrpn`

```haskell
:: Pattern String -> ControlPattern
```

### `nrpnn`

```haskell
:: Pattern Int -> ControlPattern
```

### `nrpnv`

```haskell
:: Pattern Int -> ControlPattern
```

### `grai'`

```haskell
:: Pattern String -> ControlPattern
```

`grain'` is a shortcut to join a `begin` and `end`

These are equivalent:
<pre>d1 $ slow 2 $ s "bev" # grain' "0.2:0.3" # legato 1
d1 $ slow 2 $ s "bev" # begin 0.2 # end 0.3 # legato 1</pre>

### `midinote`

```haskell
:: Pattern Note -> ControlPattern
```

### `drum`

```haskell
:: Pattern String -> ControlPattern
```

### `drumN`

```haskell
:: Num a => String -> a
```


## Generated params

### `accelerate`

```haskell
:: Pattern Double -> ControlPattern
```

A pattern of numbers that speed up (or slow down) samples while they play.
In the following example, the sound starts at the original pitch and gets
higher as it plays:

```haskell
d1 $ s "arpy" # accelerate 2
```

You can use a negative number to make the sound get lower. In this example, a
different acceleration is applied to each played note using state values:

```haskell
d1 $ arp "up" $ note "c'maj'4" # s "arpy" # accelerateTake "susan" [0.2,1,-1]
```

### `accelerateTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `accelerateCount`

```haskell
:: String -> ControlPattern
```

### `accelerateCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `acceleratebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `amp`

```haskell
:: Pattern Double -> ControlPattern
```

Controls the amplitude (volume) of the sound. Like `gain`, but linear.
Default value is 0.4.

```haskell
d1 $ s "arpy" # amp "<0.4 0.8 0.2>"
```

### `ampTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `ampCount`

```haskell
:: String -> ControlPattern
```

### `ampCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `ampbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `amprecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `array`

```haskell
:: Pattern [Word8] -> ControlPattern
```

### `arrayTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `arraybus`

```haskell
:: Pattern Int -> Pattern [Word8] -> ControlPattern
```

### `attack`

```haskell
:: Pattern Double -> ControlPattern
```

A pattern of numbers to specify the attack time (in seconds) of an envelope applied to each sample.

### `attackTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `attackCount`

```haskell
:: String -> ControlPattern
```

### `attackCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `attackbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `attackrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `bandf`

```haskell
:: Pattern Double -> ControlPattern
```

A pattern of numbers from 0 to 1. Sets the center frequency of the band-pass filter.

### `bandfTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `bandfCount`

```haskell
:: String -> ControlPattern
```

### `bandfCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `bandfbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `bandfrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `bandq`

```haskell
:: Pattern Double -> ControlPattern
```

A pattern of anumbers from 0 to 1. Sets the q-factor of the band-pass filter.

### `bandqTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `bandqCount`

```haskell
:: String -> ControlPattern
```

### `bandqCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `bandqbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `bandqrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `begin`

```haskell
:: Pattern Double -> ControlPattern
```
  
`begin` receives a pattern of numbers from 0 to 1 and skips the beginning
of each sample by the indicated proportion. I.e., 0 would play the sample from
the start, 1 would skip the whole sample, and 0.25 would cut off the first
quarter.

In this example, the first 3 `ade` samples are played on every cycle, but the
start point from which they are played changes on each cycle:

```haskell
d1 $ n "0 1 2" # s "ade" # begin "<0 0.25 0.5 0.75>" # legato 1
```

### `beginTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `beginCount`

```haskell
:: String -> ControlPattern
```

### `beginCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `beginbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `binshift`

```haskell
:: Pattern Double -> ControlPattern
```

Spectral binshift

### `binshiftTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `binshiftCount`

```haskell
:: String -> ControlPattern
```

### `binshiftCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `binshiftbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `binshiftrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `button0`

```haskell
:: Pattern Double -> ControlPattern
```

### `button0Take`

```haskell
:: String -> [Double] -> ControlPattern
```

### `button0Count`

```haskell
:: String -> ControlPattern
```

### `button0CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `button0bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `button0recv`

```haskell
:: Pattern Int -> ControlPattern
```

### `button1`

```haskell
:: Pattern Double -> ControlPattern
```

### `button1Take`

```haskell
:: String -> [Double] -> ControlPattern
```

### `button1Count`

```haskell
:: String -> ControlPattern
```

### `button1CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `button1bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `button1recv`

```haskell
:: Pattern Int -> ControlPattern
```

### `button10`

```haskell
:: Pattern Double -> ControlPattern
```

### `button10Take`

```haskell
:: String -> [Double] -> ControlPattern
```

### `button10Count`

```haskell
:: String -> ControlPattern
```

### `button10CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `button10bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `button10recv`

```haskell
:: Pattern Int -> ControlPattern
```

### `button11`

```haskell
:: Pattern Double -> ControlPattern
```

### `button11Take`

```haskell
:: String -> [Double] -> ControlPattern
```

### `button11Count`

```haskell
:: String -> ControlPattern
```

### `button11CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `button11bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `button11recv`

```haskell
:: Pattern Int -> ControlPattern
```

### `button12`

```haskell
:: Pattern Double -> ControlPattern
```

### `button12Take`

```haskell
:: String -> [Double] -> ControlPattern
```

### `button12Count`

```haskell
:: String -> ControlPattern
```

### `button12CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `button12bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `button12recv`

```haskell
:: Pattern Int -> ControlPattern
```

### `button13`

```haskell
:: Pattern Double -> ControlPattern
```

### `button13Take`

```haskell
:: String -> [Double] -> ControlPattern
```

### `button13Count`

```haskell
:: String -> ControlPattern
```

### `button13CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `button13bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `button13recv`

```haskell
:: Pattern Int -> ControlPattern
```

### `button14`

```haskell
:: Pattern Double -> ControlPattern
```

### `button14Take`

```haskell
:: String -> [Double] -> ControlPattern
```

### `button14Count`

```haskell
:: String -> ControlPattern
```

### `button14CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `button14bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `button14recv`

```haskell
:: Pattern Int -> ControlPattern
```

### `button15`

```haskell
:: Pattern Double -> ControlPattern
```

### `button15Take`

```haskell
:: String -> [Double] -> ControlPattern
```

### `button15Count`

```haskell
:: String -> ControlPattern
```

### `button15CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `button15bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `button15recv`

```haskell
:: Pattern Int -> ControlPattern
```

### `button2`

```haskell
:: Pattern Double -> ControlPattern
```

### `button2Take`

```haskell
:: String -> [Double] -> ControlPattern
```

### `button2Count`

```haskell
:: String -> ControlPattern
```

### `button2CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `button2bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `button2recv`

```haskell
:: Pattern Int -> ControlPattern
```

### `button3`

```haskell
:: Pattern Double -> ControlPattern
```

### `button3Take`

```haskell
:: String -> [Double] -> ControlPattern
```

### `button3Count`

```haskell
:: String -> ControlPattern
```

### `button3CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `button3bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `button3recv`

```haskell
:: Pattern Int -> ControlPattern
```

### `button4`

```haskell
:: Pattern Double -> ControlPattern
```

### `button4Take`

```haskell
:: String -> [Double] -> ControlPattern
```

### `button4Count`

```haskell
:: String -> ControlPattern
```

### `button4CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `button4bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `button4recv`

```haskell
:: Pattern Int -> ControlPattern
```

### `button5`

```haskell
:: Pattern Double -> ControlPattern
```

### `button5Take`

```haskell
:: String -> [Double] -> ControlPattern
```

### `button5Count`

```haskell
:: String -> ControlPattern
```

### `button5CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `button5bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `button5recv`

```haskell
:: Pattern Int -> ControlPattern
```

### `button6`

```haskell
:: Pattern Double -> ControlPattern
```

### `button6Take`

```haskell
:: String -> [Double] -> ControlPattern
```

### `button6Count`

```haskell
:: String -> ControlPattern
```

### `button6CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `button6bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `button6recv`

```haskell
:: Pattern Int -> ControlPattern
```

### `button7`

```haskell
:: Pattern Double -> ControlPattern
```

### `button7Take`

```haskell
:: String -> [Double] -> ControlPattern
```

### `button7Count`

```haskell
:: String -> ControlPattern
```

### `button7CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `button7bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `button7recv`

```haskell
:: Pattern Int -> ControlPattern
```

### `button8`

```haskell
:: Pattern Double -> ControlPattern
```

### `button8Take`

```haskell
:: String -> [Double] -> ControlPattern
```

### `button8Count`

```haskell
:: String -> ControlPattern
```

### `button8CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `button8bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `button8recv`

```haskell
:: Pattern Int -> ControlPattern
```

### `button9`

```haskell
:: Pattern Double -> ControlPattern
```

### `button9Take`

```haskell
:: String -> [Double] -> ControlPattern
```

### `button9Count`

```haskell
:: String -> ControlPattern
```

### `button9CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `button9bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `button9recv`

```haskell
:: Pattern Int -> ControlPattern
```

### `ccn`

```haskell
:: Pattern Double -> ControlPattern
```

### `ccnTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `ccnCount`

```haskell
:: String -> ControlPattern
```

### `ccnCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `ccnbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `ccv`

```haskell
:: Pattern Double -> ControlPattern
```

### `ccvTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `ccvCount`

```haskell
:: String -> ControlPattern
```

### `ccvCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `ccvbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `channel`

```haskell
:: Pattern Int -> ControlPattern
```

choose the channel the pattern is sent to in superdirt

### `channelTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `channelCount`

```haskell
:: String -> ControlPattern
```

### `channelCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `channelbus`

```haskell
:: Pattern Int -> Pattern Int -> ControlPattern
```

### `clhatdecay`

```haskell
:: Pattern Double -> ControlPattern
```

### `clhatdecayTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `clhatdecayCount`

```haskell
:: String -> ControlPattern
```

### `clhatdecayCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `clhatdecaybus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `clhatdecayrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `coarse`

```haskell
:: Pattern Double -> ControlPattern
```

fake-resampling, a pattern of numbers for lowering the sample rate, i.e. 1 for original 2 for half, 3 for a third and so on.

### `coarseTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `coarseCount`

```haskell
:: String -> ControlPattern
```

### `coarseCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `coarsebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `coarserecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `comb`

```haskell
:: Pattern Double -> ControlPattern
```

Spectral comb

### `combTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `combCount`

```haskell
:: String -> ControlPattern
```

### `combCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `combbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `combrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `control`

```haskell
:: Pattern Double -> ControlPattern
```

### `controlTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `controlCount`

```haskell
:: String -> ControlPattern
```

### `controlCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `controlbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `cps`

```haskell
:: Pattern Double -> ControlPattern
```
A control pattern; `setcps` is the standalone function.
Patterns don’t (yet) have independent tempos though, if you change it on one
  pattern, it changes on all of them.
  <pre>p "cpsfun" $ s "bd sd(3,8)" # cps (slow 8 $ 0.5 + saw)</pre>

### `cpsTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `cpsCount`

```haskell
:: String -> ControlPattern
```

### `cpsCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `cpsbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `cpsrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `crush`

```haskell
:: Pattern Double -> ControlPattern
```

bit crushing, a pattern of numbers from 1 (for drastic reduction in bit-depth) to 16 (for barely no reduction).

### `crushTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `crushCount`

```haskell
:: String -> ControlPattern
```

### `crushCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `crushbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `crushrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `ctlNum`

```haskell
:: Pattern Double -> ControlPattern
```

### `ctlNumTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `ctlNumCount`

```haskell
:: String -> ControlPattern
```

### `ctlNumCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `ctlNumbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `ctranspose`

```haskell
:: Pattern Double -> ControlPattern
```

### `ctransposeTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `ctransposeCount`

```haskell
:: String -> ControlPattern
```

### `ctransposeCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `ctransposebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `ctransposerecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `cut`

```haskell
:: Pattern Int -> ControlPattern
```

In the style of classic drum-machines, `cut` will stop a playing sample as soon as another samples with in same cutgroup is to be played. An example would be an open hi-hat followed by a closed one, essentially muting the open.

### `cutTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `cutCount`

```haskell
:: String -> ControlPattern
```

### `cutCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `cutbus`

```haskell
:: Pattern Int -> Pattern Int -> ControlPattern
```

### `cutrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `cutoff`

```haskell
:: Pattern Double -> ControlPattern
```

a pattern of numbers from 0 to 1. Applies the cutoff frequency of the low-pass filter.

### `cutoffTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `cutoffCount`

```haskell
:: String -> ControlPattern
```

### `cutoffCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `cutoffbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `cutoffrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `cutoffegint`

```haskell
:: Pattern Double -> ControlPattern
```

### `cutoffegintTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `cutoffegintCount`

```haskell
:: String -> ControlPattern
```

### `cutoffegintCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `cutoffegintbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `cutoffegintrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `decay`

```haskell
:: Pattern Double -> ControlPattern
```

### `decayTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `decayCount`

```haskell
:: String -> ControlPattern
```

### `decayCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `decaybus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `decayrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `degree`

```haskell
:: Pattern Double -> ControlPattern
```

### `degreeTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `degreeCount`

```haskell
:: String -> ControlPattern
```

### `degreeCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `degreebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `degreerecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `delay`

```haskell
:: Pattern Double -> ControlPattern
```

a pattern of numbers from 0 to 1. Sets the level of the delay signal.

### `delayTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `delayCount`

```haskell
:: String -> ControlPattern
```

### `delayCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `delaybus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `delayrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `delayfeedback`

```haskell
:: Pattern Double -> ControlPattern
```

a pattern of numbers from 0 to 1. Sets the amount of delay feedback.

### `delayfeedbackTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `delayfeedbackCount`

```haskell
:: String -> ControlPattern
```

### `delayfeedbackCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `delayfeedbackbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `delayfeedbackrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `delaytime`

```haskell
:: Pattern Double -> ControlPattern
```

a pattern of numbers from 0 to 1. Sets the length of the delay.

### `delaytimeTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `delaytimeCount`

```haskell
:: String -> ControlPattern
```

### `delaytimeCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `delaytimebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `delaytimerecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `detune`

```haskell
:: Pattern Double -> ControlPattern
```

### `detuneTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `detuneCount`

```haskell
:: String -> ControlPattern
```

### `detuneCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `detunebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `detunerecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `distort`

```haskell
:: Pattern Double -> ControlPattern
```

noisy fuzzy distortion

### `distortTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `distortCount`

```haskell
:: String -> ControlPattern
```

### `distortCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `distortbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `distortrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `djf`

```haskell
:: Pattern Double -> ControlPattern
```

DJ filter, below 0.5 is low pass filter, above is high pass filter.

### `djfTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `djfCount`

```haskell
:: String -> ControlPattern
```

### `djfCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `djfbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `djfrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `dry`

```haskell
:: Pattern Double -> ControlPattern
```

when set to 1 will disable all reverb for this pattern. See `room` and `size` for more information about reverb.

### `dryTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `dryCount`

```haskell
:: String -> ControlPattern
```

### `dryCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `drybus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `dryrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `dur`

```haskell
:: Pattern Double -> ControlPattern
```

### `durTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `durCount`

```haskell
:: String -> ControlPattern
```

### `durCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `durbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `durrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `end`

```haskell
:: Pattern Double -> ControlPattern
```

Similar to `begin`, but cuts the end off samples, shortening them; e.g.
0.75 to cut off the last quarter of each sample.

```haskell
d1 $ s "bev" >| begin 0.5 >| end "[0.65 0.55]"
```

The example above will play the sample two times for cycle, but the second time
will play a shorter segment than the first time, creating a kind of canon effect.

### `endTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `endCount`

```haskell
:: String -> ControlPattern
```

### `endCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `endbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `enhance`

```haskell
:: Pattern Double -> ControlPattern
```

Spectral enhance

### `enhanceTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `enhanceCount`

```haskell
:: String -> ControlPattern
```

### `enhanceCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `enhancebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `enhancerecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `expression`

```haskell
:: Pattern Double -> ControlPattern
```

### `expressionTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `expressionCount`

```haskell
:: String -> ControlPattern
```

### `expressionCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `expressionbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `expressionrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `fadeInTime`

```haskell
:: Pattern Double -> ControlPattern
```

As with `fadeTime`, but controls the fade in time of the grain envelope. Not used if the grain begins at position 0 in the sample.

### `fadeInTimeTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `fadeInTimeCount`

```haskell
:: String -> ControlPattern
```

### `fadeInTimeCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `fadeInTimebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `fadeTime`

```haskell
:: Pattern Double -> ControlPattern
```
  
Used when using begin<em>end or chop</em>striate and friends, to change the fade out time of the `grain` envelope.

### `fadeTimeTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `fadeTimeCount`

```haskell
:: String -> ControlPattern
```

### `fadeTimeCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `fadeTimebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `frameRate`

```haskell
:: Pattern Double -> ControlPattern
```

### `frameRateTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `frameRateCount`

```haskell
:: String -> ControlPattern
```

### `frameRateCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `frameRatebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `frames`

```haskell
:: Pattern Double -> ControlPattern
```

### `framesTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `framesCount`

```haskell
:: String -> ControlPattern
```

### `framesCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `framesbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `freeze`

```haskell
:: Pattern Double -> ControlPattern
```

Spectral freeze

### `freezeTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `freezeCount`

```haskell
:: String -> ControlPattern
```

### `freezeCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `freezebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `freezerecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `freq`

```haskell
:: Pattern Double -> ControlPattern
```

### `freqTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `freqCount`

```haskell
:: String -> ControlPattern
```

### `freqCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `freqbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `freqrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `from`

```haskell
:: Pattern Double -> ControlPattern
```

for internal sound routing

### `fromTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `fromCount`

```haskell
:: String -> ControlPattern
```

### `fromCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `frombus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `fromrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `fshift`

```haskell
:: Pattern Double -> ControlPattern
```

frequency shifter

### `fshiftTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `fshiftCount`

```haskell
:: String -> ControlPattern
```

### `fshiftCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `fshiftbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `fshiftrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `fshiftnote`

```haskell
:: Pattern Double -> ControlPattern
```

frequency shifter

### `fshiftnoteTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `fshiftnoteCount`

```haskell
:: String -> ControlPattern
```

### `fshiftnoteCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `fshiftnotebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `fshiftnoterecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `fshiftphase`

```haskell
:: Pattern Double -> ControlPattern
```

frequency shifter

### `fshiftphaseTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `fshiftphaseCount`

```haskell
:: String -> ControlPattern
```

### `fshiftphaseCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `fshiftphasebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `fshiftphaserecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `gain`

```haskell
:: Pattern Double -> ControlPattern
```

Used to control the amplitude (volume) of the sound. Values less than 1
make the sound quieter and values greater than 1 make the sound louder.

`gain` uses a power function, so the volume change around 1 is subtle, but it
gets more noticeable as it increases or decreases. Typical values for `gain` are
between 0 and 1.5.

For the linear equivalent, see `amp`.

```haskell
d1 $ s "arpy" # gain 0.8
```

This plays the first arpy sample at a quieter level than the default.

```haskell
d1 $ s "ab*16" # gain (range 0.8 1.3 $ sine)
```

This plays a hihat sound, 16 times per cycle, with a `gain` moving from 0.8 to 1.3
following a sine wave.

### `gainTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `gainCount`

```haskell
:: String -> ControlPattern
```

### `gainCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `gainbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `gate`

```haskell
:: Pattern Double -> ControlPattern
```

### `gateTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `gateCount`

```haskell
:: String -> ControlPattern
```

### `gateCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `gatebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `gaterecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `harmonic`

```haskell
:: Pattern Double -> ControlPattern
```

### `harmonicTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `harmonicCount`

```haskell
:: String -> ControlPattern
```

### `harmonicCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `harmonicbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `harmonicrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `hatgrain`

```haskell
:: Pattern Double -> ControlPattern
```

### `hatgrainTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `hatgrainCount`

```haskell
:: String -> ControlPattern
```

### `hatgrainCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `hatgrainbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `hatgrainrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `hbrick`

```haskell
:: Pattern Double -> ControlPattern
```

High pass sort of spectral filter

### `hbrickTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `hbrickCount`

```haskell
:: String -> ControlPattern
```

### `hbrickCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `hbrickbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `hbrickrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `hcutoff`

```haskell
:: Pattern Double -> ControlPattern
```

a pattern of numbers from 0 to 1. Applies the cutoff frequency of the high-pass filter. Also has alias `hpf`

### `hcutoffTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `hcutoffCount`

```haskell
:: String -> ControlPattern
```

### `hcutoffCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `hcutoffbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `hcutoffrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `hold`

```haskell
:: Pattern Double -> ControlPattern
```

a pattern of numbers to specify the hold time (in seconds) of an envelope applied to each sample. Only takes effect if `attack` and `release` are also specified.

### `holdTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `holdCount`

```haskell
:: String -> ControlPattern
```

### `holdCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `holdbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `holdrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `hours`

```haskell
:: Pattern Double -> ControlPattern
```

### `hoursTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `hoursCount`

```haskell
:: String -> ControlPattern
```

### `hoursCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `hoursbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `hresonance`

```haskell
:: Pattern Double -> ControlPattern
```

a pattern of numbers from 0 to 1. Applies the resonance of the high-pass filter. Has alias `hpq`

### `hresonanceTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `hresonanceCount`

```haskell
:: String -> ControlPattern
```

### `hresonanceCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `hresonancebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `hresonancerecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `imag`

```haskell
:: Pattern Double -> ControlPattern
```

### `imagTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `imagCount`

```haskell
:: String -> ControlPattern
```

### `imagCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `imagbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `imagrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `kcutoff`

```haskell
:: Pattern Double -> ControlPattern
```

### `kcutoffTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `kcutoffCount`

```haskell
:: String -> ControlPattern
```

### `kcutoffCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `kcutoffbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `kcutoffrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `krush`

```haskell
:: Pattern Double -> ControlPattern
```

shape/bass enhancer

### `krushTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `krushCount`

```haskell
:: String -> ControlPattern
```

### `krushCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `krushbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `krushrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `lagogo`

```haskell
:: Pattern Double -> ControlPattern
```

### `lagogoTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `lagogoCount`

```haskell
:: String -> ControlPattern
```

### `lagogoCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `lagogobus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `lagogorecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `lbrick`

```haskell
:: Pattern Double -> ControlPattern
```

Low pass sort of spectral filter

### `lbrickTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `lbrickCount`

```haskell
:: String -> ControlPattern
```

### `lbrickCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `lbrickbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `lbrickrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `lclap`

```haskell
:: Pattern Double -> ControlPattern
```

### `lclapTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `lclapCount`

```haskell
:: String -> ControlPattern
```

### `lclapCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `lclapbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `lclaprecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `lclaves`

```haskell
:: Pattern Double -> ControlPattern
```

### `lclavesTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `lclavesCount`

```haskell
:: String -> ControlPattern
```

### `lclavesCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `lclavesbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `lclavesrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `lclhat`

```haskell
:: Pattern Double -> ControlPattern
```

### `lclhatTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `lclhatCount`

```haskell
:: String -> ControlPattern
```

### `lclhatCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `lclhatbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `lclhatrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `lcrash`

```haskell
:: Pattern Double -> ControlPattern
```

### `lcrashTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `lcrashCount`

```haskell
:: String -> ControlPattern
```

### `lcrashCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `lcrashbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `lcrashrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `legato`

```haskell
:: Pattern Double -> ControlPattern
```


controls the amount of overlap between two adjacent sounds

### `legatoTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `legatoCount`

```haskell
:: String -> ControlPattern
```



### `legatoCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `legatobus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `leslie`

```haskell
:: Pattern Double -> ControlPattern
```



### `leslieTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `leslieCount`

```haskell
:: String -> ControlPattern
```



### `leslieCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `lesliebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `leslierecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `lfo`

```haskell
:: Pattern Double -> ControlPattern
```



### `lfoTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `lfoCount`

```haskell
:: String -> ControlPattern
```



### `lfoCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `lfobus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `lforecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `lfocutoffint`

```haskell
:: Pattern Double -> ControlPattern
```



### `lfocutoffintTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `lfocutoffintCount`

```haskell
:: String -> ControlPattern
```



### `lfocutoffintCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `lfocutoffintbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `lfocutoffintrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `lfodelay`

```haskell
:: Pattern Double -> ControlPattern
```



### `lfodelayTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `lfodelayCount`

```haskell
:: String -> ControlPattern
```



### `lfodelayCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `lfodelaybus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `lfodelayrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `lfoint`

```haskell
:: Pattern Double -> ControlPattern
```



### `lfointTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `lfointCount`

```haskell
:: String -> ControlPattern
```



### `lfointCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `lfointbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `lfointrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `lfopitchint`

```haskell
:: Pattern Double -> ControlPattern
```



### `lfopitchintTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `lfopitchintCount`

```haskell
:: String -> ControlPattern
```



### `lfopitchintCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `lfopitchintbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `lfopitchintrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `lfoshape`

```haskell
:: Pattern Double -> ControlPattern
```



### `lfoshapeTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `lfoshapeCount`

```haskell
:: String -> ControlPattern
```



### `lfoshapeCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `lfoshapebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `lfoshaperecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `lfosync`

```haskell
:: Pattern Double -> ControlPattern
```



### `lfosyncTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `lfosyncCount`

```haskell
:: String -> ControlPattern
```



### `lfosyncCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `lfosyncbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `lfosyncrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `lhitom`

```haskell
:: Pattern Double -> ControlPattern
```



### `lhitomTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `lhitomCount`

```haskell
:: String -> ControlPattern
```



### `lhitomCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `lhitombus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `lhitomrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `lkick`

```haskell
:: Pattern Double -> ControlPattern
```



### `lkickTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `lkickCount`

```haskell
:: String -> ControlPattern
```



### `lkickCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `lkickbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `lkickrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `llotom`

```haskell
:: Pattern Double -> ControlPattern
```



### `llotomTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `llotomCount`

```haskell
:: String -> ControlPattern
```



### `llotomCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `llotombus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `llotomrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `lock`

```haskell
:: Pattern Double -> ControlPattern
```


A pattern of numbers. Specifies whether delaytime is calculated relative to cps. When set to 1, delaytime is a direct multiple of a cycle.

### `lockTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `lockCount`

```haskell
:: String -> ControlPattern
```



### `lockCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `lockbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `lockrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `loop`

```haskell
:: Pattern Double -> ControlPattern
```

loops the sample (from `begin` to `end`) the specified number of times.

### `loopTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `loopCount`

```haskell
:: String -> ControlPattern
```



### `loopCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `loopbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `lophat`

```haskell
:: Pattern Double -> ControlPattern
```



### `lophatTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `lophatCount`

```haskell
:: String -> ControlPattern
```



### `lophatCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `lophatbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `lophatrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `lrate`

```haskell
:: Pattern Double -> ControlPattern
```



### `lrateTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `lrateCount`

```haskell
:: String -> ControlPattern
```



### `lrateCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `lratebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `lraterecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `lsize`

```haskell
:: Pattern Double -> ControlPattern
```



### `lsizeTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `lsizeCount`

```haskell
:: String -> ControlPattern
```



### `lsizeCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `lsizebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `lsizerecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `lsnare`

```haskell
:: Pattern Double -> ControlPattern
```



### `lsnareTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `lsnareCount`

```haskell
:: String -> ControlPattern
```



### `lsnareCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `lsnarebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `lsnarerecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `metatune`

```haskell
:: Pattern Double -> ControlPattern
```


A pattern of numbers. Specifies whether the pitch of played samples should be tuned relative to their pitch metadata, if it exists. When set to 1, pitch metadata is applied. When set to 0, pitch metadata is ignored.

### `metatuneTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `metatuneCount`

```haskell
:: String -> ControlPattern
```



### `metatuneCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `metatunebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `metatunerecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `midibend`

```haskell
:: Pattern Double -> ControlPattern
```



### `midibendTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `midibendCount`

```haskell
:: String -> ControlPattern
```



### `midibendCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `midibendbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `midichan`

```haskell
:: Pattern Double -> ControlPattern
```



### `midichanTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `midichanCount`

```haskell
:: String -> ControlPattern
```



### `midichanCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `midichanbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `midicmd`

```haskell
:: Pattern String -> ControlPattern
```



### `midicmdTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `midicmdbus`

```haskell
:: Pattern Int -> Pattern String -> ControlPattern
```



### `miditouch`

```haskell
:: Pattern Double -> ControlPattern
```



### `miditouchTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `miditouchCount`

```haskell
:: String -> ControlPattern
```



### `miditouchCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `miditouchbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `minutes`

```haskell
:: Pattern Double -> ControlPattern
```



### `minutesTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `minutesCount`

```haskell
:: String -> ControlPattern
```



### `minutesCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `minutesbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `modwheel`

```haskell
:: Pattern Double -> ControlPattern
```



### `modwheelTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `modwheelCount`

```haskell
:: String -> ControlPattern
```



### `modwheelCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `modwheelbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `modwheelrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `mtranspose`

```haskell
:: Pattern Double -> ControlPattern
```



### `mtransposeTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `mtransposeCount`

```haskell
:: String -> ControlPattern
```



### `mtransposeCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `mtransposebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `mtransposerecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `n`

```haskell
:: Pattern Note -> ControlPattern
```


The note or sample number to choose for a synth or sampleset

### `nTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `nCount`

```haskell
:: String -> ControlPattern
```



### `nCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `nbus`

```haskell
:: Pattern Int -> Pattern Note -> ControlPattern
```



### `note`

```haskell
:: Pattern Note -> ControlPattern
```


The note or pitch to play a sound or synth with

### `noteTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `noteCount`

```haskell
:: String -> ControlPattern
```



### `noteCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `notebus`

```haskell
:: Pattern Int -> Pattern Note -> ControlPattern
```



### `nudge`

```haskell
:: Pattern Double -> ControlPattern
```


Nudges events into the future by the specified number of seconds. Negative numbers work up to a point as well (due to internal latency)

### `nudgeTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `nudgeCount`

```haskell
:: String -> ControlPattern
```



### `nudgeCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `nudgebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `nudgerecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `octave`

```haskell
:: Pattern Int -> ControlPattern
```



### `octaveTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `octaveCount`

```haskell
:: String -> ControlPattern
```



### `octaveCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `octavebus`

```haskell
:: Pattern Int -> Pattern Int -> ControlPattern
```



### `octaveR`

```haskell
:: Pattern Double -> ControlPattern
```



### `octaveRTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `octaveRCount`

```haskell
:: String -> ControlPattern
```



### `octaveRCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `octaveRbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `octaveRrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `octer`

```haskell
:: Pattern Double -> ControlPattern
```


octaver effect

### `octerTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `octerCount`

```haskell
:: String -> ControlPattern
```



### `octerCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `octerbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `octerrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `octersub`

```haskell
:: Pattern Double -> ControlPattern
```


octaver effect

### `octersubTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `octersubCount`

```haskell
:: String -> ControlPattern
```



### `octersubCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `octersubbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `octersubrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `octersubsub`

```haskell
:: Pattern Double -> ControlPattern
```


octaver effect

### `octersubsubTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `octersubsubCount`

```haskell
:: String -> ControlPattern
```



### `octersubsubCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `octersubsubbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `octersubsubrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `offset`

```haskell
:: Pattern Double -> ControlPattern
```



### `offsetTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `offsetCount`

```haskell
:: String -> ControlPattern
```



### `offsetCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `offsetbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `ophatdecay`

```haskell
:: Pattern Double -> ControlPattern
```



### `ophatdecayTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `ophatdecayCount`

```haskell
:: String -> ControlPattern
```



### `ophatdecayCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `ophatdecaybus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `ophatdecayrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `orbit`

```haskell
:: Pattern Int -> ControlPattern
```


a pattern of numbers. An "orbit" is a global parameter context for patterns. Patterns with the same orbit will share hardware output bus offset and global effects, e.g. reverb and delay. The maximum number of orbits is specified in the superdirt startup, numbers higher than maximum will wrap around.

### `orbitTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `orbitCount`

```haskell
:: String -> ControlPattern
```



### `orbitCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `orbitbus`

```haskell
:: Pattern Int -> Pattern Int -> ControlPattern
```



### `orbitrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `overgain`

```haskell
:: Pattern Double -> ControlPattern
```



### `overgainTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `overgainCount`

```haskell
:: String -> ControlPattern
```



### `overgainCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `overgainbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `overshape`

```haskell
:: Pattern Double -> ControlPattern
```



### `overshapeTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `overshapeCount`

```haskell
:: String -> ControlPattern
```



### `overshapeCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `overshapebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `overshaperecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `pan`

```haskell
:: Pattern Double -> ControlPattern
```


a pattern of numbers between 0 and 1, from left to right (assuming stereo), once round a circle (assuming multichannel)

### `panTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `panCount`

```haskell
:: String -> ControlPattern
```



### `panCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `panbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `panrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `panorient`

```haskell
:: Pattern Double -> ControlPattern
```


a pattern of numbers between -1.0 and 1.0, which controls the relative position of the centre pan in a pair of adjacent speakers (multichannel only)

### `panorientTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `panorientCount`

```haskell
:: String -> ControlPattern
```



### `panorientCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `panorientbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `panorientrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `panspan`

```haskell
:: Pattern Double -> ControlPattern
```


a pattern of numbers between -inf and inf, which controls how much multichannel output is fanned out (negative is backwards ordering)

### `panspanTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `panspanCount`

```haskell
:: String -> ControlPattern
```



### `panspanCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `panspanbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `panspanrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `pansplay`

```haskell
:: Pattern Double -> ControlPattern
```


a pattern of numbers between 0.0 and 1.0, which controls the multichannel spread range (multichannel only)

### `pansplayTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `pansplayCount`

```haskell
:: String -> ControlPattern
```



### `pansplayCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `pansplaybus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `pansplayrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `panwidth`

```haskell
:: Pattern Double -> ControlPattern
```


a pattern of numbers between 0.0 and inf, which controls how much each channel is distributed over neighbours (multichannel only)

### `panwidthTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `panwidthCount`

```haskell
:: String -> ControlPattern
```



### `panwidthCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `panwidthbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `panwidthrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `partials`

```haskell
:: Pattern Double -> ControlPattern
```



### `partialsTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `partialsCount`

```haskell
:: String -> ControlPattern
```



### `partialsCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `partialsbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `partialsrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `phaserdepth`

```haskell
:: Pattern Double -> ControlPattern
```


Phaser Audio DSP effect. Params are `phaserrate` and `phaserdepth`


### `phaserdepthTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `phaserdepthCount`

```haskell
:: String -> ControlPattern
```



### `phaserdepthCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `phaserdepthbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `phaserdepthrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `phaserrate`

```haskell
:: Pattern Double -> ControlPattern
```


Phaser Audio DSP effect. Params are `phaserrate` and `phaserdepth`


### `phaserrateTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `phaserrateCount`

```haskell
:: String -> ControlPattern
```



### `phaserrateCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `phaserratebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `phaserraterecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `pitch1`

```haskell
:: Pattern Double -> ControlPattern
```



### `pitch1Take`

```haskell
:: String -> [Double] -> ControlPattern
```



### `pitch1Count`

```haskell
:: String -> ControlPattern
```



### `pitch1CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `pitch1bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `pitch1recv`

```haskell
:: Pattern Int -> ControlPattern
```



### `pitch2`

```haskell
:: Pattern Double -> ControlPattern
```



### `pitch2Take`

```haskell
:: String -> [Double] -> ControlPattern
```



### `pitch2Count`

```haskell
:: String -> ControlPattern
```



### `pitch2CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `pitch2bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `pitch2recv`

```haskell
:: Pattern Int -> ControlPattern
```



### `pitch3`

```haskell
:: Pattern Double -> ControlPattern
```



### `pitch3Take`

```haskell
:: String -> [Double] -> ControlPattern
```



### `pitch3Count`

```haskell
:: String -> ControlPattern
```



### `pitch3CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `pitch3bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `pitch3recv`

```haskell
:: Pattern Int -> ControlPattern
```



### `polyTouch`

```haskell
:: Pattern Double -> ControlPattern
```



### `polyTouchTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `polyTouchCount`

```haskell
:: String -> ControlPattern
```



### `polyTouchCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `polyTouchbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `portamento`

```haskell
:: Pattern Double -> ControlPattern
```



### `portamentoTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `portamentoCount`

```haskell
:: String -> ControlPattern
```



### `portamentoCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `portamentobus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `portamentorecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `progNum`

```haskell
:: Pattern Double -> ControlPattern
```



### `progNumTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `progNumCount`

```haskell
:: String -> ControlPattern
```



### `progNumCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `progNumbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `rate`

```haskell
:: Pattern Double -> ControlPattern
```


used in SuperDirt softsynths as a control rate or "speed"

### `rateTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `rateCount`

```haskell
:: String -> ControlPattern
```



### `rateCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `ratebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `raterecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `real`

```haskell
:: Pattern Double -> ControlPattern
```


Spectral conform

### `realTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `realCount`

```haskell
:: String -> ControlPattern
```



### `realCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `realbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `realrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `release`

```haskell
:: Pattern Double -> ControlPattern
```


a pattern of numbers to specify the release time (in seconds) of an envelope applied to each sample.

### `releaseTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `releaseCount`

```haskell
:: String -> ControlPattern
```



### `releaseCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `releasebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `releaserecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `resonance`

```haskell
:: Pattern Double -> ControlPattern
```


a pattern of numbers from 0 to 1. Specifies the resonance of the low-pass filter.

### `resonanceTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `resonanceCount`

```haskell
:: String -> ControlPattern
```



### `resonanceCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `resonancebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `resonancerecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `ring`

```haskell
:: Pattern Double -> ControlPattern
```


ring modulation

### `ringTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `ringCount`

```haskell
:: String -> ControlPattern
```



### `ringCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `ringbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `ringrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `ringdf`

```haskell
:: Pattern Double -> ControlPattern
```


ring modulation

### `ringdfTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `ringdfCount`

```haskell
:: String -> ControlPattern
```



### `ringdfCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `ringdfbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `ringdfrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `ringf`

```haskell
:: Pattern Double -> ControlPattern
```


ring modulation

### `ringfTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `ringfCount`

```haskell
:: String -> ControlPattern
```



### `ringfCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `ringfbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `ringfrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `room`

```haskell
:: Pattern Double -> ControlPattern
```


a pattern of numbers from 0 to 1. Sets the level of reverb.

### `roomTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `roomCount`

```haskell
:: String -> ControlPattern
```



### `roomCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `roombus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `roomrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `sagogo`

```haskell
:: Pattern Double -> ControlPattern
```



### `sagogoTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `sagogoCount`

```haskell
:: String -> ControlPattern
```



### `sagogoCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `sagogobus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `sagogorecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `sclap`

```haskell
:: Pattern Double -> ControlPattern
```



### `sclapTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `sclapCount`

```haskell
:: String -> ControlPattern
```



### `sclapCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `sclapbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `sclaprecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `sclaves`

```haskell
:: Pattern Double -> ControlPattern
```



### `sclavesTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `sclavesCount`

```haskell
:: String -> ControlPattern
```



### `sclavesCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `sclavesbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `sclavesrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `scram`

```haskell
:: Pattern Double -> ControlPattern
```


Spectral scramble

### `scramTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `scramCount`

```haskell
:: String -> ControlPattern
```



### `scramCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `scrambus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `scramrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `scrash`

```haskell
:: Pattern Double -> ControlPattern
```



### `scrashTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `scrashCount`

```haskell
:: String -> ControlPattern
```



### `scrashCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `scrashbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `scrashrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `seconds`

```haskell
:: Pattern Double -> ControlPattern
```



### `secondsTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `secondsCount`

```haskell
:: String -> ControlPattern
```



### `secondsCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `secondsbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `semitone`

```haskell
:: Pattern Double -> ControlPattern
```



### `semitoneTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `semitoneCount`

```haskell
:: String -> ControlPattern
```



### `semitoneCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `semitonebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `semitonerecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `shape`

```haskell
:: Pattern Double -> ControlPattern
```


wave shaping distortion, a pattern of numbers from 0 for no distortion up to 1 for loads of distortion.

### `shapeTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `shapeCount`

```haskell
:: String -> ControlPattern
```



### `shapeCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `shapebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `shaperecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `size`

```haskell
:: Pattern Double -> ControlPattern
```


a pattern of numbers from 0 to 1. Sets the perceptual size (reverb time) of the `room` to be used in reverb.

### `sizeTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `sizeCount`

```haskell
:: String -> ControlPattern
```



### `sizeCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `sizebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `sizerecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `slide`

```haskell
:: Pattern Double -> ControlPattern
```



### `slideTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `slideCount`

```haskell
:: String -> ControlPattern
```



### `slideCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `slidebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `sliderecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `slider0`

```haskell
:: Pattern Double -> ControlPattern
```



### `slider0Take`

```haskell
:: String -> [Double] -> ControlPattern
```



### `slider0Count`

```haskell
:: String -> ControlPattern
```



### `slider0CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `slider0bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `slider0recv`

```haskell
:: Pattern Int -> ControlPattern
```



### `slider1`

```haskell
:: Pattern Double -> ControlPattern
```



### `slider1Take`

```haskell
:: String -> [Double] -> ControlPattern
```



### `slider1Count`

```haskell
:: String -> ControlPattern
```



### `slider1CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `slider1bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `slider1recv`

```haskell
:: Pattern Int -> ControlPattern
```



### `slider10`

```haskell
:: Pattern Double -> ControlPattern
```



### `slider10Take`

```haskell
:: String -> [Double] -> ControlPattern
```



### `slider10Count`

```haskell
:: String -> ControlPattern
```



### `slider10CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `slider10bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `slider10recv`

```haskell
:: Pattern Int -> ControlPattern
```



### `slider11`

```haskell
:: Pattern Double -> ControlPattern
```



### `slider11Take`

```haskell
:: String -> [Double] -> ControlPattern
```



### `slider11Count`

```haskell
:: String -> ControlPattern
```



### `slider11CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `slider11bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `slider11recv`

```haskell
:: Pattern Int -> ControlPattern
```



### `slider12`

```haskell
:: Pattern Double -> ControlPattern
```



### `slider12Take`

```haskell
:: String -> [Double] -> ControlPattern
```



### `slider12Count`

```haskell
:: String -> ControlPattern
```



### `slider12CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `slider12bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `slider12recv`

```haskell
:: Pattern Int -> ControlPattern
```



### `slider13`

```haskell
:: Pattern Double -> ControlPattern
```



### `slider13Take`

```haskell
:: String -> [Double] -> ControlPattern
```



### `slider13Count`

```haskell
:: String -> ControlPattern
```



### `slider13CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `slider13bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `slider13recv`

```haskell
:: Pattern Int -> ControlPattern
```



### `slider14`

```haskell
:: Pattern Double -> ControlPattern
```



### `slider14Take`

```haskell
:: String -> [Double] -> ControlPattern
```



### `slider14Count`

```haskell
:: String -> ControlPattern
```



### `slider14CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `slider14bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `slider14recv`

```haskell
:: Pattern Int -> ControlPattern
```



### `slider15`

```haskell
:: Pattern Double -> ControlPattern
```



### `slider15Take`

```haskell
:: String -> [Double] -> ControlPattern
```



### `slider15Count`

```haskell
:: String -> ControlPattern
```



### `slider15CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `slider15bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `slider15recv`

```haskell
:: Pattern Int -> ControlPattern
```



### `slider2`

```haskell
:: Pattern Double -> ControlPattern
```



### `slider2Take`

```haskell
:: String -> [Double] -> ControlPattern
```



### `slider2Count`

```haskell
:: String -> ControlPattern
```



### `slider2CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `slider2bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `slider2recv`

```haskell
:: Pattern Int -> ControlPattern
```



### `slider3`

```haskell
:: Pattern Double -> ControlPattern
```



### `slider3Take`

```haskell
:: String -> [Double] -> ControlPattern
```



### `slider3Count`

```haskell
:: String -> ControlPattern
```



### `slider3CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `slider3bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `slider3recv`

```haskell
:: Pattern Int -> ControlPattern
```



### `slider4`

```haskell
:: Pattern Double -> ControlPattern
```



### `slider4Take`

```haskell
:: String -> [Double] -> ControlPattern
```



### `slider4Count`

```haskell
:: String -> ControlPattern
```



### `slider4CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `slider4bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `slider4recv`

```haskell
:: Pattern Int -> ControlPattern
```



### `slider5`

```haskell
:: Pattern Double -> ControlPattern
```



### `slider5Take`

```haskell
:: String -> [Double] -> ControlPattern
```



### `slider5Count`

```haskell
:: String -> ControlPattern
```



### `slider5CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `slider5bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `slider5recv`

```haskell
:: Pattern Int -> ControlPattern
```



### `slider6`

```haskell
:: Pattern Double -> ControlPattern
```



### `slider6Take`

```haskell
:: String -> [Double] -> ControlPattern
```



### `slider6Count`

```haskell
:: String -> ControlPattern
```



### `slider6CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `slider6bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `slider6recv`

```haskell
:: Pattern Int -> ControlPattern
```



### `slider7`

```haskell
:: Pattern Double -> ControlPattern
```



### `slider7Take`

```haskell
:: String -> [Double] -> ControlPattern
```



### `slider7Count`

```haskell
:: String -> ControlPattern
```



### `slider7CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `slider7bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `slider7recv`

```haskell
:: Pattern Int -> ControlPattern
```



### `slider8`

```haskell
:: Pattern Double -> ControlPattern
```



### `slider8Take`

```haskell
:: String -> [Double] -> ControlPattern
```



### `slider8Count`

```haskell
:: String -> ControlPattern
```



### `slider8CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `slider8bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `slider8recv`

```haskell
:: Pattern Int -> ControlPattern
```



### `slider9`

```haskell
:: Pattern Double -> ControlPattern
```



### `slider9Take`

```haskell
:: String -> [Double] -> ControlPattern
```



### `slider9Count`

```haskell
:: String -> ControlPattern
```



### `slider9CountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `slider9bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `slider9recv`

```haskell
:: Pattern Int -> ControlPattern
```



### `smear`

```haskell
:: Pattern Double -> ControlPattern
```


Spectral smear

### `smearTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `smearCount`

```haskell
:: String -> ControlPattern
```



### `smearCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `smearbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `smearrecv`

```haskell
:: Pattern Int -> ControlPattern
```



### `songPtr`

```haskell
:: Pattern Double -> ControlPattern
```



### `songPtrTake`

```haskell
:: String -> [Double] -> ControlPattern
```



### `songPtrCount`

```haskell
:: String -> ControlPattern
```



### `songPtrCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```



### `songPtrbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```



### `speed`

```haskell
:: Pattern Double -> ControlPattern
```


A pattern of numbers which changes the speed of sample playback which also
changes pitch. Negative values will play the sample backwards.

```haskell
d1 $ slow 5 $ s "sax:5" # legato 1 # speed 0.5
```
This will play the `sax:5` sample at half its rate. As a result, the sample will
last twice the normal time, and will be pitched a whole octave lower. This is
equivalent to `d1 $ slow 5 $ s "sax:5" # legato 1 |- note 12`.

```haskell
d1 $ fast 2 $ s "breaks125:1" # cps (125/60/4) # speed (-2)
```

In the above example, the break (which lasts for exactly one bar at 125 BPM), will be played backwards, and at double speed (so, we use `fast 2` to fill the whole cycle).

### `speedTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `speedCount`

```haskell
:: String -> ControlPattern
```

### `speedCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `speedbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `squiz`

```haskell
:: Pattern Double -> ControlPattern
```

### `squizTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `squizCount`

```haskell
:: String -> ControlPattern
```

### `squizCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `squizbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `squizrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `stepsPerOctave`

```haskell
:: Pattern Double -> ControlPattern
```

### `stepsPerOctaveTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `stepsPerOctaveCount`

```haskell
:: String -> ControlPattern
```

### `stepsPerOctaveCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `stepsPerOctavebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `stepsPerOctaverecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `stutterdepth`

```haskell
:: Pattern Double -> ControlPattern
```

### `stutterdepthTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `stutterdepthCount`

```haskell
:: String -> ControlPattern
```

### `stutterdepthCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `stutterdepthbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `stutterdepthrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `stuttertime`

```haskell
:: Pattern Double -> ControlPattern
```

### `stuttertimeTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `stuttertimeCount`

```haskell
:: String -> ControlPattern
```

### `stuttertimeCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `stuttertimebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `stuttertimerecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `sustain`

```haskell
:: Pattern Double -> ControlPattern
```

A pattern of numbers that indicates the total duration of sample playback in seconds.

This `sustain` refers to the whole playback duration and is not to be confused with the sustain level of a typical ADSR envelope.

```haskell
d1 $ fast 2 $ s "breaks125:1" # cps (120/60/4) # sustain 1
```

At 120 BPM, a cycle lasts for two seconds. In the above example, we cut the
sample so it plays just for one second, and repeat this part two times, so we
fill the whole cycle. Note that sample pitch isn’t modified.

```haskell
d1 $ s "breaks125:2!3" # cps (120/60/4) # sustain "0.4 0.2 0.4" # begin "0 0 0.4"
```

Here, we take advantage that sustain receives a pattern to build a different
break from the original sample.

### `sustainTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `sustainCount`

```haskell
:: String -> ControlPattern
```

### `sustainCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `sustainbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `sustainpedal`

```haskell
:: Pattern Double -> ControlPattern
```

### `sustainpedalTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `sustainpedalCount`

```haskell
:: String -> ControlPattern
```

### `sustainpedalCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `sustainpedalbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `sustainpedalrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `timescale`

```haskell
:: Pattern Double -> ControlPattern
```

`timescale` is the main function used to activate time-stretching, and usually
the only one you need. It receives a single parameter which is the stretching
rate to apply.

You can use any positive number as the ratio, but the particular method used is
designed for ratios greater than 1, and work reasonably well for values between
0.1 and 3.

```haskell
d1 $ slow 2 $ s "breaks152" # legato 1 # timescale (152/130) # cps (130/60/4)
```

In the example above, we set tempo at 130 beats per minute. But we want to play
one of the `breaks152` samples, which are, as indicated, at 152 BPM. So, the
ratio we want is 152 over 130. This will slow down the sample to fit in our 130
BPM tempo.

### `timescaleTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `timescaleCount`

```haskell
:: String -> ControlPattern
```

### `timescaleCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `timescalebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `timescalewin`

```haskell
:: Pattern Double -> ControlPattern
```

Time stretch window size.

The algorithm used to time-stretch a sample divides a sample in many little parts, modifies them, and puts them all together again. It uses one particular parameter, called `windowSize`, which is the length of each sample part.
The `windowSize` value is automatically calculated, but can be changed with `timescalewin`. The `windowSize` value is multiplied by the number provided.

`timescalewin` can be used to improve the quality of time-stretching for some samples, or simply as an effect.

Consider the following two examples. In the first one, `timescalewin 0.01` makes
the window size a lot smaller, and the extreme chopping of the sample causes
a rougher sound.  In the second one, `timescalewin 10` makes the chunks a lot
bigger. The method used overlaps the treated chunks when recomposing the sample,
and, with the bigger window size, this overlap is noticeable and causes a kind
of delay effect.

```haskell
d1 $ slow 2
   $ s "breaks152"
   # legato 1
   # timescale (152/130)
   # timescalewin 0.01
   # cps (130/60/4)
```

```haskell
d1 $ slow 2
   $ s "breaks152"
   # legato 1
   # timescale (152/130)
   # timescalewin 10
   # cps (130/60/4)
```

### `timescalewinTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `timescalewinCount`

```haskell
:: String -> ControlPattern
```

### `timescalewinCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `timescalewinbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `to`

```haskell
:: Pattern Double -> ControlPattern
```

for internal sound routing

### `toTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `toCount`

```haskell
:: String -> ControlPattern
```

### `toCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `tobus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `torecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `toArg`

```haskell
:: Pattern String -> ControlPattern
```

for internal sound routing

### `toArgTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `toArgbus`

```haskell
:: Pattern Int -> Pattern String -> ControlPattern
```

### `toArgrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `tomdecay`

```haskell
:: Pattern Double -> ControlPattern
```

### `tomdecayTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `tomdecayCount`

```haskell
:: String -> ControlPattern
```

### `tomdecayCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `tomdecaybus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `tomdecayrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `tremolodepth`

```haskell
:: Pattern Double -> ControlPattern
```

Tremolo Audio DSP effect | params are `tremolorate` and `tremolodepth`

### `tremolodepthTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `tremolodepthCount`

```haskell
:: String -> ControlPattern
```

### `tremolodepthCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `tremolodepthbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `tremolodepthrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `tremolorate`

```haskell
:: Pattern Double -> ControlPattern
```

Tremolo Audio DSP effect | params are `tremolorate` and `tremolodepth`

### `tremolorateTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `tremolorateCount`

```haskell
:: String -> ControlPattern
```

### `tremolorateCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `tremoloratebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `tremoloraterecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `triode`

```haskell
:: Pattern Double -> ControlPattern
```

tube distortion

### `triodeTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `triodeCount`

```haskell
:: String -> ControlPattern
```

### `triodeCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `triodebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `trioderecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `tsdelay`

```haskell
:: Pattern Double -> ControlPattern
```

### `tsdelayTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `tsdelayCount`

```haskell
:: String -> ControlPattern
```

### `tsdelayCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `tsdelaybus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `tsdelayrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `uid`

```haskell
:: Pattern Double -> ControlPattern
```

### `uidTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `uidCount`

```haskell
:: String -> ControlPattern
```

### `uidCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `uidbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `unit`

```haskell
:: Pattern String -> ControlPattern
```

Used in conjunction with `speed`. It accepts values of `r` (rate, default
behavior), `c` (cycles), or `s` (seconds). Using `unit "c"` means `speed`
will be interpreted in units of cycles, e.g. `speed "1"` means samples will be
stretched to fill a cycle. Using `unit "s"` means the playback speed will be
adjusted so that the duration is the number of seconds specified by `speed`.

In the following example, `speed 2` means that samples will be stretched to fill
half a cycle:

```haskell
d1 $ stack [
  s "sax:5" # legato 1 # speed 2 # unit "c",
  s "bd*2"
]
```

### `unitTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `unitbus`

```haskell
:: Pattern Int -> Pattern String -> ControlPattern
```

### `val`

```haskell
:: Pattern Double -> ControlPattern
```

### `valTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `valCount`

```haskell
:: String -> ControlPattern
```

### `valCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `valbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `vcfegint`

```haskell
:: Pattern Double -> ControlPattern
```

### `vcfegintTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `vcfegintCount`

```haskell
:: String -> ControlPattern
```

### `vcfegintCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `vcfegintbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `vcfegintrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `vcoegint`

```haskell
:: Pattern Double -> ControlPattern
```

### `vcoegintTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `vcoegintCount`

```haskell
:: String -> ControlPattern
```

### `vcoegintCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `vcoegintbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `vcoegintrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `velocity`

```haskell
:: Pattern Double -> ControlPattern
```

### `velocityTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `velocityCount`

```haskell
:: String -> ControlPattern
```

### `velocityCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `velocitybus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `velocityrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `voice`

```haskell
:: Pattern Double -> ControlPattern
```

### `voiceTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `voiceCount`

```haskell
:: String -> ControlPattern
```

### `voiceCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `voicebus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `voicerecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `vowel`

```haskell
:: Pattern String -> ControlPattern
```

formant filter to make things sound like vowels, a pattern of either `a`, `e`, `i`, `o` or `u`. Use a rest (`~`) for no effect.

### `vowelTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `vowelbus`

```haskell
:: Pattern Int -> Pattern String -> ControlPattern
```

### `vowelrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `waveloss`

```haskell
:: Pattern Double -> ControlPattern
```

### `wavelossTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `wavelossCount`

```haskell
:: String -> ControlPattern
```

### `wavelossCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `wavelossbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `wavelossrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `xsdelay`

```haskell
:: Pattern Double -> ControlPattern
```

### `xsdelayTake`

```haskell
:: String -> [Double] -> ControlPattern
```

### `xsdelayCount`

```haskell
:: String -> ControlPattern
```

### `xsdelayCountTo`

```haskell
:: String -> Pattern Double -> Pattern ValueMap
```

### `xsdelaybus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `xsdelayrecv`

```haskell
:: Pattern Int -> ControlPattern
```


## Aliases

### `voi`

```haskell
:: Pattern Double -> ControlPattern
```

### `voibus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `voirecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `vco`

```haskell
:: Pattern Double -> ControlPattern
```

### `vcobus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `vcorecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `vcf`

```haskell
:: Pattern Double -> ControlPattern
```

### `vcfbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `vcfrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `up`

```haskell
:: Pattern Note -> ControlPattern
```

### `tremr`

```haskell
:: Pattern Double -> ControlPattern
```

### `tremrbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `tremrrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `tremdp`

```haskell
:: Pattern Double -> ControlPattern
```

### `tremdpbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `tremdprecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `tdecay`

```haskell
:: Pattern Double -> ControlPattern
```

### `tdecaybus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `tdecayrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `sz`

```haskell
:: Pattern Double -> ControlPattern
```

### `szbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `szrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `sus`

```haskell
:: Pattern Double -> ControlPattern
```

### `stt`

```haskell
:: Pattern Double -> ControlPattern
```

### `sttbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `sttrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `std`

```haskell
:: Pattern Double -> ControlPattern
```

### `stdbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `stdrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `sld`

```haskell
:: Pattern Double -> ControlPattern
```

### `sldbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `sldrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `scr`

```haskell
:: Pattern Double -> ControlPattern
```

### `scrbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `scrrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `scp`

```haskell
:: Pattern Double -> ControlPattern
```

### `scpbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `scprecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `scl`

```haskell
:: Pattern Double -> ControlPattern
```

### `sclbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `sclrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `sag`

```haskell
:: Pattern Double -> ControlPattern
```

### `sagbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `sagrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `s`

```haskell
:: Pattern String -> ControlPattern
```

### `rel`

```haskell
:: Pattern Double -> ControlPattern
```

### `relbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `relrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `por`

```haskell
:: Pattern Double -> ControlPattern
```

### `porbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `porrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `pit3`

```haskell
:: Pattern Double -> ControlPattern
```

### `pit3bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `pit3recv`

```haskell
:: Pattern Int -> ControlPattern
```

### `pit2`

```haskell
:: Pattern Double -> ControlPattern
```

### `pit2bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `pit2recv`

```haskell
:: Pattern Int -> ControlPattern
```

### `pit1`

```haskell
:: Pattern Double -> ControlPattern
```

### `pit1bus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `pit1recv`

```haskell
:: Pattern Int -> ControlPattern
```

### `phasr`

```haskell
:: Pattern Double -> ControlPattern
```

### `phasrbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `phasrrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `phasdp`

```haskell
:: Pattern Double -> ControlPattern
```

### `phasdpbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `phasdprecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `ohdecay`

```haskell
:: Pattern Double -> ControlPattern
```

### `ohdecaybus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `ohdecayrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `number`

```haskell
:: Pattern Note -> ControlPattern
```

### `lsn`

```haskell
:: Pattern Double -> ControlPattern
```

### `lsnbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `lsnrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `lpq`

```haskell
:: Pattern Double -> ControlPattern
```

### `lpqbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `lpqrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `lpf`

```haskell
:: Pattern Double -> ControlPattern
```

### `lpfbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `lpfrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `loh`

```haskell
:: Pattern Double -> ControlPattern
```

### `lohbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `lohrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `llt`

```haskell
:: Pattern Double -> ControlPattern
```

### `lltbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `lltrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `lht`

```haskell
:: Pattern Double -> ControlPattern
```

### `lhtbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `lhtrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `lfop`

```haskell
:: Pattern Double -> ControlPattern
```

### `lfopbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `lfoprecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `lfoi`

```haskell
:: Pattern Double -> ControlPattern
```

### `lfoibus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `lfoirecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `lfoc`

```haskell
:: Pattern Double -> ControlPattern
```

### `lfocbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `lfocrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `lcr`

```haskell
:: Pattern Double -> ControlPattern
```

### `lcrbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `lcrrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `lcp`

```haskell
:: Pattern Double -> ControlPattern
```

### `lcpbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `lcprecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `lcl`

```haskell
:: Pattern Double -> ControlPattern
```

### `lclbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `lclrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `lch`

```haskell
:: Pattern Double -> ControlPattern
```

### `lchbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `lchrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `lbd`

```haskell
:: Pattern Double -> ControlPattern
```

### `lbdbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `lbdrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `lag`

```haskell
:: Pattern Double -> ControlPattern
```

### `lagbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `lagrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `hpq`

```haskell
:: Pattern Double -> ControlPattern
```

### `hpqbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `hpqrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `hpf`

```haskell
:: Pattern Double -> ControlPattern
```

### `hpfbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `hpfrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `hg`

```haskell
:: Pattern Double -> ControlPattern
```

### `hgbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `hgrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `gat`

```haskell
:: Pattern Double -> ControlPattern
```

### `gatbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `gatrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `fadeOutTime`

```haskell
:: Pattern Double -> ControlPattern
```

### `dt`

```haskell
:: Pattern Double -> ControlPattern
```

### `dtbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `dtrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `dfb`

```haskell
:: Pattern Double -> ControlPattern
```

### `dfbbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `dfbrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `det`

```haskell
:: Pattern Double -> ControlPattern
```

### `detbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `detrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `delayt`

```haskell
:: Pattern Double -> ControlPattern
```

### `delaytbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `delaytrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `delayfb`

```haskell
:: Pattern Double -> ControlPattern
```

### `delayfbbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `delayfbrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `ctfg`

```haskell
:: Pattern Double -> ControlPattern
```

### `ctfgbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `ctfgrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `ctf`

```haskell
:: Pattern Double -> ControlPattern
```

### `ctfbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `ctfrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `chdecay`

```haskell
:: Pattern Double -> ControlPattern
```

### `chdecaybus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `chdecayrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `bpq`

```haskell
:: Pattern Double -> ControlPattern
```

### `bpqbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `bpqrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `bpf`

```haskell
:: Pattern Double -> ControlPattern
```

### `bpfbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `bpfrecv`

```haskell
:: Pattern Int -> ControlPattern
```

### `att`

```haskell
:: Pattern Double -> ControlPattern
```

### `attbus`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern
```

### `attrecv`

```haskell
:: Pattern Int -> ControlPattern
```
