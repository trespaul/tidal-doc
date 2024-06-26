---
title: Time
---

## Types

### `type Time = Rational`

Time is `Rational`.

### `data ArcF a`

An arc of time, with a start time (or onset) and a stop time (or offset)


## Utility functions — Time

### sam

```haskell
:: Time -> Time
```

The `sam` (start of cycle) for the given time value.
Cycles have duration 1, so every integer Time value divides two cycles.

### toTime

```haskell
:: Real a => a -> Rational
```

Turns a number into a (rational) time value. An alias for `toRational`.

### fromTime

```haskell
:: Fractional a => Time -> a
```

Turns a (rational) time value into another number. An alias for `fromRational`.

### nextSam

```haskell
:: Time -> Time
```

The end point of the current cycle (and starting point of the next cycle)

### cyclePos

```haskell
:: Time -> Time
```

The position of a time value relative to the start of its cycle.


## Utility functions — Arc

### hull

```haskell
:: Arc -> Arc -> Arc
```

convex hull union

### subArc

```haskell
:: Arc -> Arc -> Maybe Arc
```

`subArc i j` is the timespan that is the intersection of `i` and `j`.
intersection
The definition is a bit fiddly as results might be zero-width, but
not at the end of an non-zero-width arc - e.g. (0,1) and (1,2) do
not intersect, but (1,1) (1,1) does.

### subMaybeArc

```haskell
:: Maybe Arc -> Maybe Arc -> Maybe (Maybe Arc)
```

### sect

```haskell
:: Arc -> Arc -> Arc
```

Simple intersection of two arcs

### timeToCycleArc

```haskell
:: Time -> Arc
```

The Arc returned is the cycle that the Time falls within.

Edge case: If the Time is an integer,
the Arc claiming it is the one starting at that Time,
not the previous one ending at that Time.

### cycleArc

```haskell
:: Arc -> Arc
```

Shifts an Arc to one of equal duration that starts within cycle zero.
(Note that the output Arc probably does not start *at* Time 0 --
that only happens when the input Arc starts at an integral Time.)

### cyclesInArc

```haskell
:: Integral a => Arc -> [a]
```

Returns the numbers of the cycles that the input `Arc` overlaps
(excluding the input `Arc`'s endpoint, unless it has duration 0 --
see "Edge cases" below).
(The "cycle number" of an `Arc` is equal to its start value.
Thus, for instance, `cyclesInArc (Arc 0 1.5) == [0,1]`.)

Edge cases:

```haskell
cyclesInArc $ Arc 0 1.0001 == [0,1]
cyclesInArc $ Arc 0 1      == [0] -- the endpoint is excluded
cyclesInArc $ Arc 1 1      == [1] -- unless the Arc has duration 0
```

PITFALL: Don't be fooled by the name. The output cycles
are not necessarily completely contained in the input `Arc`,
but they definitely overlap it,
and they include every cycle that overlaps it.

### cycleArcsInArc

```haskell
:: Arc -> [Arc]
```

This provides exactly the same information as `cyclesInArc`,
except that this represents its output as `Arc`s,
whereas `cyclesInArc` represents the same information as integral indices.
(The `Arc` from 0 to 1 corresponds to the index 0,
the one from 1 to 2 has index 1, etc.)

### arcCycles

```haskell
:: Arc -> [Arc]
```

Splits the given `Arc` into a list of `Arc`s, at cycle boundaries.

### arcCyclesZW

```haskell
:: Arc -> [Arc]
```

Like `arcCycles`, but returns zero-width arcs

### mapCycle

```haskell
:: (Time -> Time) -> Arc -> Arc
```

Similar to `fmap` but time is relative to the cycle (i.e. the
`sam` of the start of the arc)

### isIn

```haskell
:: Arc -> Time -> Bool
```

`isIn a t` is `True` if `t` is inside
 the arc represented by `a`.

