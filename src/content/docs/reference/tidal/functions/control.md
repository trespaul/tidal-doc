---
title: Control
---

## `spin`

```haskell
:: Pattern Int -> ControlPattern -> ControlPattern
```

`spin` will "spin" and layer up a pattern the given number of times,
with each successive layer offset in time by an additional `1/n` of a cycle,
and panned by an additional `1/n`. The result is a pattern that seems to spin
around. This function work well on multichannel systems.

```haskell
d1 $ slow 3
   $ spin 4
   $ sound "drum*3 tabla:4 [arpy:2 ~ arpy] [can:2 can:3]"
```

## `_spin`

```haskell
:: Int -> ControlPattern -> ControlPattern
```

## `chop`

```haskell
:: Pattern Int -> ControlPattern -> ControlPattern
```

`chop` granularises every sample in place as it is played, turning a
pattern of samples into a pattern of sample parts. Can be used to explore
granular synthesis.

Use an integer value to specify how many granules each sample is chopped into:

```haskell
d1 $ chop 16 $ sound "arpy arp feel*4 arpy*4"
```

Different values of `chop` can yield very different results, depending on the
samples used:

```haskell
d1 $ chop 16 $ sound (samples "arpy*8" (run 16))
d1 $ chop 32 $ sound (samples "arpy*8" (run 16))
d1 $ chop 256 $ sound "bd*4 [sn cp] [hh future]*2 [cp feel]"
```

You can also use `chop` (or `striate`) with very long samples to cut them into short
chunks and pattern those chunks. The following cuts a sample into 32 parts, and
plays it over 8 cycles:

```haskell
d1 $ loopAt 8 $ chop 32 $ sound "bev"
```

The `loopAt` takes care of changing the speed of sample playback so that the
sample fits in the given number of cycles perfectly. As a result, in the above
the granules line up perfectly, so you can’t really hear that the sample has
been cut into bits. Again, this becomes more apparent when you do further
manipulations of the pattern, for example `rev` to reverse the order of the cut
up bits:

```haskell
d1 $ loopAt 8 $ rev $ chop 32 $ sound "bev"
```

## `chopArc`

```haskell
:: Arc -> Int -> [Arc]
```

## `_chop`

```haskell
:: Int -> ControlPattern -> ControlPattern
```

## `striate`

```haskell
:: Pattern Int -> ControlPattern -> ControlPattern
```

Striate is a kind of granulator, cutting samples into bits in a similar to
chop, but the resulting bits are organised differently. For example:

```haskell
d1 $ striate 3 $ sound "ho ho:2 ho:3 hc"
```

This plays the loop the given number of times, but triggers progressive portions
of each sample. So in this case it plays the loop three times, the first
time playing the first third of each sample, then the second time playing the
second third of each sample, and lastly playing the last third of each sample.
Replacing `striate` with `chop` above, one can hear that the '`chop` version
plays the bits from each chopped-up sample in turn, while `striate` "interlaces"
the cut up bits of samples together.

You can also use `striate` with very long samples, to cut them into short
chunks and pattern those chunks. This is where things get towards granular
synthesis. The following cuts a sample into 128 parts, plays it over 8 cycles
and manipulates those parts by reversing and rotating the loops:

```haskell
d1 $  slow 8 $ striate 128 $ sound "bev"
```

## `_striate`

```haskell
:: Int -> ControlPattern -> ControlPattern
```

## `mergePlayRange`

```haskell
:: (Double, Double) -> ValueMap -> ValueMap
```

## `striateBy`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern -> ControlPattern
```

The `striateBy` function is a variant of `striate` with an extra
parameter which specifies the length of each part. The `striateBy`
function still scans across the sample over a single cycle, but if
each bit is longer, it creates a sort of stuttering effect. For
example the following will cut the `bev` sample into 32 parts, but each
will be 1/16th of a sample long:

```haskell
d1 $ slow 32 $ striateBy 32 (1/16) $ sound "bev"
```

Note that `striate` and `striateBy` use the `begin` and `end` parameters
internally. This means that you probably shouldn't also specify `begin` or
`end`.

## `striate'`

```haskell
:: Pattern Int -> Pattern Double -> ControlPattern -> ControlPattern
```

**DEPRECATED**, use `striateBy` instead.

## `_striateBy`

```haskell
:: Int -> Double -> ControlPattern -> ControlPattern
```

## `gap`

```haskell
:: Pattern Int -> ControlPattern -> ControlPattern
```

`gap` is similar to `chop` in that it granualizes every sample in place as it is played,
but every other grain is silent. Use an integer value to specify how many granules
each sample is chopped into:

```haskell
d1 $ gap 8 $ sound "jvbass"
d1 $ gap 16 $ sound "[jvbass drum:4]"
```

## `_gap`

```haskell
:: Int -> ControlPattern -> ControlPattern
```

## `weave`

```haskell
:: Time -> ControlPattern -> [ControlPattern] -> ControlPattern
```

`weave` applies one control pattern to a list of other control patterns, with
a successive time offset. It uses an `OscPattern` to apply the function at
different levels to each pattern, creating a weaving effect. For example:

```haskell
d1
  $ weave 16 (pan sine)
      [ sound "bd sn cp"
      , sound "casio casio:1"
      , sound "[jvbass*2 jvbass:2]/2"
      , sound "hc*4"
      ]
```

In the above, the `pan sine` control pattern is slowed down by the given
number of cycles, in particular 16, and applied to all of the given sound
patterns. What makes this interesting is that the `pan` control pattern is
successively offset for each of the given sound patterns; because the `pan` is
closed down by 16 cycles, and there are four patterns, they are ‘spread out’,
i.e. with a gap of four cycles. For this reason, the four patterns seem to
chase after each other around the stereo field. Try listening on headphones to
hear this more clearly.

You can even have it the other way round, and have the effect parameters chasing
after each other around a sound parameter, like this:

```haskell
d1
  $ weave 16 (sound "arpy" >| n (run 8))
      [ vowel "a e i"
      , vowel "i [i o] o u"
      , vowel "[e o]/3 [i o u]/2"
      , speed "1 2 3"
      ]
```

## `weaveWith`

```haskell
:: Time -> Pattern a -> [Pattern a -> Pattern a] -> Pattern a
```

`weaveWith` is similar to the above, but weaves with a list of functions, rather
than a list of controls. For example:

```haskell
d1
  $ weaveWith 3 (sound "bd [sn drum:2*2] bd*2 [sn drum:1]")
      [ fast 2
      , (# speed "0.5")
      , chop 16
      ]
```

## `weave'`

```haskell
:: Time -> Pattern a -> [Pattern a -> Pattern a] -> Pattern a
```

An old alias for `weaveWith`.

## `interlace`

```haskell
:: ControlPattern -> ControlPattern -> ControlPattern
```

(A function that takes two `ControlPatterns`, and blends them together into
a new `ControlPattern`. A `ControlPattern` is basically a pattern of messages to
a synthesiser.)

Shifts between the two given patterns, using distortion.

Example:

```haskell
d1 $ interlace (sound  "bd sn kurt") (every 3 rev $ sound  "bd sn:2")
```

## `slice`

```haskell
:: Pattern Int -> Pattern Int -> ControlPattern -> ControlPattern
```

`slice` is similar to `chop` and `striate`, in that it’s used to slice
samples up into bits. The difference is that it allows you to rearrange those
bits as a pattern.

```haskell
d1 $ slice 8 "7 6 5 4 3 2 1 0"
   $ sound "breaks165"
   # legato 1
```

The above slices the sample into eight bits, and then plays them backwards,
equivalent of applying rev $ chop 8. Here’s a more complex example:

```haskell
d1 $ slice 8 "[<0*8 0*2> 3*4 2 4] [4 .. 7]"
   $ sound "breaks165"
   # legato 1
```

## `_slice`

```haskell
:: Int -> Int -> ControlPattern -> ControlPattern
```

## `randslice`

```haskell
:: Pattern Int -> ControlPattern -> ControlPattern
```

`randslice` chops the sample into the given number of pieces and then plays back
a random one each cycle:

```haskell
d1 $ randslice 32 $ sound "bev"
```

Use `fast` to get more than one per cycle:

```haskell
d1 $ fast 4 $ randslice 32 $ sound "bev"
```

## `_splice`

```haskell
:: Int -> Pattern Int -> ControlPattern -> Pattern (Map String Value)
```

## `splice`

```haskell
:: Pattern Int -> Pattern Int -> ControlPattern -> Pattern (Map String Value)
```

`splice` is similar to `slice`, but the slices are automatically pitched up or down
to fit their ‘slot’.

```haskell
d1 $ splice 8 "[<0*8 0*2> 3*4 2 4] [4 .. 7]" $ sound "breaks165"
```

## `loopAt`

```haskell
:: Pattern Time -> ControlPattern -> ControlPattern
```

`loopAt` makes a sample fit the given number of cycles. Internally, it works by
setting the `unit` parameter to `"c"`, changing the playback speed of the sample
with the `speed` parameter, and setting the `density` of the pattern to match.

```haskell
d1 $ loopAt 4 $ sound "breaks125"
```

It’s a good idea to use this in conjunction with `chop`, so the break is chopped
into pieces, and you don’t have to wait for the whole sample to start/stop.

```haskell
d1 $ loopAt 4 $ chop 32 $ sound "breaks125"
```

Like all Tidal functions, you can mess about with this considerably. The below
example shows how you can supply a pattern of cycle counts to `loopAt`:

```haskell
d1 $ juxBy 0.6 (|* speed "2")
   $ slowspread (loopAt) [4,6,2,3]
   $ chop 12
   $ sound "fm:14"
```

## `hurry`

```haskell
:: Pattern Rational -> ControlPattern -> ControlPattern
```

`hurry` is similar to `fast` in that it speeds up a pattern, but it also
increases the speed control by the same factor. So, if you’re triggering
samples, the sound gets higher in pitch. For example:

```haskell
d1 $ every 2 (hurry 2) $ sound "bd sn:2 ~ cp"
```

## `smash`

```haskell
:: Pattern Int -> [Pattern Time] -> ControlPattern -> Pattern ValueMap
```

`smash` is a combination of `spread` and `striate` — it cuts the samples
into the given number of bits, and then cuts between playing the loop
at different speeds according to the values in the list. So this:

```haskell
d1 $ smash 3 [2,3,4] $ sound "ho ho:2 ho:3 hc"
```

is a bit like this:

```haskell
d1 $ spread (slow) [2,3,4] $ striate 3 $ sound "ho ho:2 ho:3 hc"
```

This is quite dancehall:

```haskell
d1 $ ( spread' slow "1%4 2 1 3"
     $ spread (striate) [2,3,4,1]
     $ sound "sn:2 sid:3 cp sid:4"
     )
   # speed "[1 2 1 1]/2"
```

## `smash'`

```haskell
:: Int -> [Pattern Time] -> ControlPattern -> ControlPattern
```

An alternative form of `smash`, which uses `chop` instead of `striate`.

Compare the following variations:

```haskell
d1 $ smash 6 [2,3,4] $ sound "ho ho:2 ho:3 hc"
d1 $ smash' 6 [2,3,4] $ sound "ho ho:2 ho:3 hc"
d1 $ smash 12 [2,3,4] $ s "bev*4"
d1 $ smash' 12 [2,3,4] $ s "bev*4"
```

## `echo`

```haskell
:: Pattern Integer -> Pattern Rational -> Pattern Double -> ControlPattern -> ControlPattern
```

Applies a type of delay to a pattern.
It has three parameters, which could be called `depth`, `time` and `feedback`.
`depth` is an integer, and `time` and `feedback` are floating point numbers.

This adds a bit of echo:

```haskell
d1 $ echo 4 0.2 0.5 $ sound "bd sn"
```

The above results in 4 echoes, each one 50% quieter than the last, with 1/5th of a cycle between them.

It is possible to reverse the echo:

```haskell
d1 $ echo 4 (-0.2) 0.5 $ sound "bd sn"
```

## `_echo`

```haskell
:: Integer -> Rational -> Double -> ControlPattern -> ControlPattern
```

## `echoWith`

```haskell
:: Pattern Int -> Pattern Time -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

`echoWith` is similar to `echo`, but instead of just decreasing volume to
produce echoes, `echoWith` applies a function each step and overlays the
result delayed by the given time.

```haskell
d1 $ echoWith 2 "1%3" (# vowel "{a e i o u}%2") $ sound "bd sn"
```

In this case there are two _overlays_ delayed by 1/3 of a cycle, where each
has the `vowel` filter applied.

```haskell
d1 $ echoWith 4 (1/6) (|* speed "1.5") $ sound "arpy arpy:2"
```

In the above, three versions are put on top, with each step getting higher in
pitch as `|* speed "1.5"` is successively applied.

## `_echoWith`

```haskell
:: (Num n, Ord n) => n -> Time -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

## `stut`

```haskell
:: Pattern Integer -> Pattern Double -> Pattern Rational -> ControlPattern -> ControlPattern
```

**DEPRECATED**, use `echo` instead

## `_stut`

```haskell
:: Integer -> Double -> Rational -> ControlPattern -> ControlPattern
```

## `stutWith`

```haskell
:: Pattern Int -> Pattern Time -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

**DEPRECATED**, use `echoWith` instead

## `_stutWith`

```haskell
:: (Num n, Ord n) => n -> Time -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

## `stut'`

```haskell
:: Pattern Int -> Pattern Time -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

**DEPRECATED**, use `echoWith` instead

## `sec`

```haskell
:: Fractional a => Pattern a -> Pattern a
```

Turns a pattern of seconds into a pattern of (rational) cycle durations

## `msec`

```haskell
:: Fractional a => Pattern a -> Pattern a
```

Turns a pattern of milliseconds into a pattern of (rational)
cycle durations, according to the current cps.

## `trigger`

```haskell
:: Pattern a -> Pattern a
```

Align the start of a pattern with the time a pattern is evaluated,
rather than the global start time. Because of this, the pattern will
probably not be aligned to the pattern grid.

## `qtrigger`

```haskell
:: Pattern a -> Pattern a
```

(Alias `qt`) Quantise trigger. Aligns the start of the pattern
with the next cycle boundary. For example, this pattern will fade in
starting with the next cycle after the pattern is evaluated:

```haskell
d1 $ qtrigger $ s "hh(5, 8)" # amp envL
```

Note that the pattern will start playing immediately. The <em>start</em> of the
pattern aligns with the next cycle boundary, but events will play before
if the pattern has events at negative timestamps (which most loops do).
These events can be filtered out, for example:

```haskell
d1 $ qtrigger $ filterWhen (>= 0) $ s "hh(5, 8)"
```

Alternatively, you can use `wait` to achieve the same result:

```haskell
wait 1 1 $ s "bd hh hh hh"
```

## `qt`

```haskell
:: Pattern a -> Pattern a
```

Alias for `qtrigger`.

## `ctrigger`

```haskell
:: Pattern a -> Pattern a

```

Ceiling trigger. Aligns the start of a pattern to the next cycle
boundary, just like `qtrigger`.

## `rtrigger`

```haskell
:: Pattern a -> Pattern a
```

Rounded trigger. Aligns the start of a pattern to the nearest cycle
boundary, either next or previous.

## `ftrigger`

```haskell
:: Pattern a -> Pattern a
```

Floor trigger. Aligns the start of a pattern to the previous cycle
boundary.

## `mtrigger`

```haskell
:: Int -> Pattern a -> Pattern a
```

(Alias `<strong>mt</strong>`) Mod trigger. Aligns the start of a pattern to the
next cycle boundary where the cycle is evenly divisible by a given
number. `qtrigger` is equivalent to `mtrigger 1`.

In the following example, when activating the `d1` pattern, it will start at the
same time as the next clap, even if it has to wait for 3 cycles. Once activated,
the `arpy` sound will play on every cycle, just like any other pattern:

```haskell
do
  resetCycles
  d2 $ every 4 (# s "clap") $ s "bd"
```

```haskell
d1 $ mtrigger 4 $ filterWhen (>=0) $ s "arpy"
```

## `mt`

```haskell
:: Int -> Pattern a -> Pattern a
```

Alias for `mtrigger`.

## `triggerWith`

```haskell
:: (Time -> Time) -> Pattern a -> Pattern a
```

This aligns the start of a pattern to some value relative to the
time the pattern is evaluated. The provided function maps the evaluation
time (on the global cycle clock) to a new time, and then `triggerWith`
aligns the pattern's start to the time that's returned.

This is a more flexible triggering function. In fact, all the other trigger
functions are defined based on `triggerWith`. For example, `trigger` is just
`triggerWith id`.

In the next example, use `d1` as a metronome, and play with different values
(from 0 to 1) on the `const` expression. You’ll notice how the `clap` is
displaced from the beginning of each cycle to the end, as the number increases:

```haskell
d1 $ s "bd hh!3"

d2 $ triggerWith (const 0.1) $ s "clap"
```

This last example is equivalent to this:

```haskell
d2 $ rotR 0.1 $ s "clap"
```

## `splat`

```haskell
:: Pattern Int -> ControlPattern -> ControlPattern -> ControlPattern
```
