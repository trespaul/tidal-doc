---
title: Transition
---

```haskell
type TransitionMapper = Time -> [ControlPattern] -> ControlPattern
```

## `transition`

```haskell
:: Stream -> Bool -> TransitionMapper -> ID -> ControlPattern -> IO ()
```

## `mortalOverlay`

```haskell
:: Time -> Time -> [Pattern a] -> Pattern a
```

## `wash`

```haskell
:: (Pattern a -> Pattern a)
-> (Pattern a -> Pattern a)
-> Time
-> Time
-> Time
-> Time
-> [Pattern a]
-> Pattern a
```

Washes away the current pattern after a certain delay by applying a
function to it over time, then switching over to the next pattern to
which another function is applied.

## `washIn`

```haskell
:: (Pattern a -> Pattern a) -> Time -> Time -> [Pattern a] -> Pattern a
```

## `xfadeIn`

```haskell
:: Time -> Time -> [ControlPattern] -> ControlPattern
```

## `histpan`

```haskell
:: Int -> Time -> [ControlPattern] -> ControlPattern
```

Pans the last n versions of the pattern across the field

## `wait`

```haskell
:: Time -> Time -> [ControlPattern] -> ControlPattern
```

Just stop for a bit before playing new pattern

## `waitT`

```haskell
:: (Time -> [ControlPattern] -> ControlPattern)
-> Time
-> Time
-> [ControlPattern]
-> ControlPattern
```

Just as `wait`, `waitT` stops for a bit and then applies the given transition to the playing pattern

```haskell
d1 $ sound "bd"

t1 (waitT (xfadeIn 8) 4) $ sound "hh*8"
```

## `jump`

```haskell
:: Time -> [ControlPattern] -> ControlPattern
```

Jumps directly into the given pattern, this is essentially the _no transition_-transition.

Variants of `jump` provide more useful capabilities, see `jumpIn` and `jumpMod`


## `jumpIn`

```haskell
:: Int -> Time -> [ControlPattern] -> ControlPattern
```

Sharp `jump` transition after the specified number of cycles have passed.

```haskell
t1 (jumpIn 2) $ sound "kick(3,8)"
```

## `jumpI'`

```haskell
:: Int -> Time -> [ControlPattern] -> ControlPattern
```


Unlike `jumpIn` the variant `jumpIn'` will only transition at cycle boundary (e.g. when the cycle count is an integer).

## `jumpMod`

```haskell
:: Int -> Time -> [ControlPattern] -> ControlPattern
```

Sharp `jump` transition at next cycle boundary where `cycle mod n == 0`

## `jumpMod'`

```haskell
:: Int -> Int -> Time -> [ControlPattern] -> ControlPattern
```

Sharp `jump` transition at next cycle boundary where `cycle mod n == p`

## `mortal`

```haskell
:: Time -> Time -> Time -> [ControlPattern] -> ControlPattern
```

Degrade the new pattern over time until it ends in silence

## `interpolate`

```haskell
:: Time -> [ControlPattern] -> ControlPattern
```

## `interpolateIn`

```haskell
:: Time -> Time -> [ControlPattern] -> ControlPattern
```

## `clutch`

```haskell
:: Time -> [Pattern a] -> Pattern a
```

Degrades the current pattern while undegrading the next.

This is like `xfade` but not by gain of samples but by randomly removing events from the current pattern and slowly adding back in missing events from the next one.

```haskell
d1 $ sound "bd(3,8)"

t1 clutch $ sound "[hh*4, odx(3,8)]"
```

`clutch` takes two cycles for the transition, essentially this is `clutchIn 2`.

## `clutchIn`

```haskell
:: Time -> Time -> [Pattern a] -> Pattern a
```

Also degrades the current pattern and undegrades the next.
To change the number of cycles the transition takes, you can use `clutchIn` like so:

```haskell
d1 $ sound "bd(5,8)"

t1 (clutchIn 8) $ sound "[hh*4, odx(3,8)]"
```

will take 8 cycles for the transition.

## `anticipateIn`

```haskell
:: Time -> Time -> [ControlPattern] -> ControlPattern
```

same as `anticipate` though it allows you to specify the number of cycles until dropping to the new pattern, e.g.:

```haskell
d1 $ sound "jvbass(3,8)"

t1 (anticipateIn 4) $ sound "jvbass(5,8)"
```

## `anticipate`

```haskell
:: Time -> [ControlPattern] -> ControlPattern
```

`anticipate` is an increasing comb filter.

Build up some tension, culminating in a _drop_ to the new pattern after 8 cycles.

