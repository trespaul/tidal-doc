---
title: Modulate parameters with signals
---

Signals are continuously varying patterns without structure. Unless otherwise stated, signals give minimum values of `0` and maximum values of `1`, and repeat once per cycle.

## Using the built-in signals

### Periodic signals: oscillators

#### `saw`

A sawtooth wave starts at 0 and rises with a linear ramp to end in 1. It then jumps back to 0 for the next cycle:

```haskell
d1 $ sound "bd*8" # pan saw
```
:::tip
If you want to have an inverted sawtooth that starts at 1 and ends at 0, you can use `(1 - saw)`, or its alias `isaw`.
:::

#### `tri`

A triangle wave is like a sawtooth and an inverted sawtooth that were smooshed together. It starts at 0, rises and arrives to 1 halfway through, and then falls back to return to 0:

```haskell
d1 $ sound "bd*16" # speed (slow 2 $ range 0.5 2 tri)
```

#### `sine`

A sinusoidal wave is like a triangle wave but "smoothed out", so that the change is slower in the peaks and faster in the in-between values. Compare these two lines that move the sound from your left to your right speaker and back:

```haskell
d1 $ sound "bd*8" # pan sine

d1 $ sound "bd*8" # pan tri
```

#### `square`

A square wave starts at 0 and jumps to 1 halfway through a cycle. It then jumps back to 0 for the next cycle:

```haskell
d1 $ sound "bd*8" # pan (cat [square, sine])
```

### Some non-periodic signals

#### `rand`

An infinitely detailed stream of (pseudo-)random numbers.

```haskell
d1 $ sound "bd*8" # pan rand
```

#### `perlin`

A function that smoothly interpolates between a value and a randomly chosen destination. In the next cycle, the destination becomes the starting point and another destination is randomly chosen:

```haskell
d1 $ sound "bd*8" # pan rand
```

#### `irand`

A function from an integer (giving the maximum) to a stream of (pseudo-)random integer numbers.

```haskell
d1 $ sound "drum*8" # n (irand 8)
```

## Signals and structure

Signal are continuous patterns, which means they don't have any structure, and must be used with a pattern that does. For example `d1 $ n (irand 8) # s "drums"` won't work, because the `#` operator instructs Tidal to take structure from the left, and `irand` doesn't have any structure, so Tidal won't trigger any events. One possible solution is to reverse the order: `d1 $ s "drums" # n (irand 8)`.

### Sampling signals with `segment`

Another option is to use `segment`, which 'samples' any pattern at  a rate of `n` events per cycle, and so turns a continuous pattern into a discrete one:

```haskell
d1 $ n (slow 2 $ segment 16 $ range 0 32 $ sine) # sound "amencutup"
```

## Scaling signals

By default, the signals will output values scaled between `0` and `1`. You might want to use bigger or smaller values. You might want, for instance, to modulate the frequency of a filter or select a random midi note between `0` and `127`. To do so, you can use the `range` function:

```haskell
d1 $ s "bass:5*8" # lpf (range 200 5000 $ sine)
```

:::tip
A lot of signals have *bipolar* counterparts, where the amplitude goes from `-1` to `1`. Those are `sine2`, `cosine2`, `saw2`, `isaw2`, `tri2` and `square2`.
:::

## Phase-shifting signals

You can shift signals inside the cycle (i.e. their phase) using the `<~` and `~>` functions. For example, a `cosine` wave is a `sine` shifted in time by a quarter of a cycle. That is equivalent to `0.25 ~> sine`:

```haskell
d1 $ sound "bd*8" # pan cosine # speed (sine + 0.5)
```

## Changing the speed of signals

Signals are patterns! It means that you can speed them up or down using the same functions as usual (`fast`, `slow`, etc..):

```haskell
d1 $ s "bass:5*8" # lpf (slow 4 $ range 200 5000 $ sine)
```
:::tip
Notice that most of the time, the speed up/down will be in sync with your pattern. How convenient!
:::

## Generating your own signals

### via `smooth`

`smooth` receives a pattern of numbers and linearly goes from one to the next, passing through all of them. As time is cycle-based, after reaching the last number in the pattern, it will smoothly go to the first one again.

```haskell
d1 $ sound "bd*4" # pan (slow 4 $ smooth "0 1 0.5 1")
```

Note how the sound goes gradually from left to right, then to the center, then to the right again, and finally comes back to the left.

### via `sig`

You can also create your own signals with `sig`, which takes a function of time and turns it into a continuous function. For example, `saw` is defined as

```haskell
saw = sig $ \t -> mod' (fromRational t) 1
```