---
title: Modulate parameters with signals
---

Signals are continuously varying patterns. Unless otherwise stated, signals give minimum values of `0` and maximum values of `1`, and repeat once per cycle.

## What is a signal?

Signal are continuous patterns, which means they don't have any structure, and must be used with a pattern that does. For example `d1 $ sound "bd*8" >| pan sine` won't work well, because the `>|` operator instructs Tidal to take structure from the right, and `sine` doesn't have any structure, so Tidal will simply trigger events at a fixed rate (depending on your configuration, this might be very fast). `d1 $ sound "bd*8" |> pan sine` is better, because `|>` takes structure from the left, so eight kick drums will play, with pan values sampled from the sine wave for each of the eight events. Where a pattern has the type `Fractional a => Pattern a`, that means that they can be used both as floating point numbers or (rational) time values.

## Using signals

### Periodic signals: oscillators
#### Sine

`sine` is a sinusoidal wave. Playing this example, you should hear the sound slowly moving from your left to your right speaker:

```haskell
d1 $ sound "bd*8" # pan sine
```

#### Cosine

A `cosine` wave, is a `sine` shifted in time by a quarter of a cycle. It sounds similar to the `sine` above:

```haskell
d1 $ sound "bd*8" # pan cosine # speed (sine + 0.5)
```

#### Square

A Square wave, starting at 0, then going up to 1 halfway through a cycle.

```haskell
d1 $ sound "bd*8" # pan (cat [square, sine])
```

#### Tri

A triangle wave, starting at 0, then linearly rising to 1 halfway through a cycle, then down again:

```haskell
d1 $ sound "bd*16" # speed (slow 2 $ range 0.5 2 tri)
```

#### Saw

A sawtooth wave starting at 0, then linearly rising to 1 over one cycle, then jumping back to 0:

```haskell
d1 $ sound "bd*8" # pan (slow 2 saw)
```

#### Isaw

An inverted sawtooth, starting at 1, then linearly falling to 0 over one cycle, then jumping back to 1:

```haskell
d1 $ sound "bd*8" # pan (slow 2 isaw)
```

#### Smooth

`Smooth` receives a pattern of numbers and linearly goes from one to the next, passing through all of them. As time is cycle-based, after reaching the last number in the pattern, it will smoothly go to the first one again.

```haskell
d1 $ sound "bd*4" # pan (slow 4 $ smooth "0 1 0.5 1")
```

Note how the sound goes gradually from left to right, then to the center, then to the right again, and finally comes back to the left.

### Non-periodic signals

#### Rand

An infinitely detailed stream of (pseudo-)random numbers.

```haskell
d1 $ sound "bd*8" # pan rand
```

#### Irand

A function from an integer (giving the maximum) to a stream of (pseudo-)random integer numbers.

```haskell
d1 $ sound "drum*8" # n (irand 8)
```

## Scaling signals

By default, the signals will output values scaled between `0` and `1`. You might want to use bigger or smaller values. You might want, for instance, to modulate the frequency of a filter or select a random midi note between `0` and `127`. To do so, you can use the `range` function:

```haskell
d1 $ s "bass:5*8" # lpf (range 200 5000 $ sine)
```

## Speeding up/down signals

Signals are patterns! It means that you can speed them up or down using the same function as usual (`fast`, `slow`, etc..):
```haskell
d1 $ s "bass:5*8" # lpf (slow 4 $ range 200 5000 $ sine)
```
:::tip
Notice that most of the time, the speed up/down will be in sync with your pattern. How convenient!
:::
