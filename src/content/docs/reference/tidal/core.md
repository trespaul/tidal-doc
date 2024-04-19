---
title: Core
---

## Elemental patterns

### `sig`

```haskell
:: (Time -> a) -> Pattern a
```

Takes a function of time to values, and turns it into a `Pattern`.
Useful for creating continuous patterns such as `sine` or `perlin`.

For example, `saw` is defined as

```haskell
saw = sig $ \t -> mod' (fromRational t) 1
```

### `sine`

```haskell
:: Fractional a => Pattern a
```

Unipolar sine wave. A pattern of continuous values following a
sine wave with frequency of one cycle, and amplitude from 0 to 1.

### `sine2`

```haskell
:: Fractional a => Pattern a
```

Bipolar sine wave. A pattern of continuous values following a
sine wave with frequency of one cycle, and amplitude from -1 to 1.

### `cosine`

```haskell
:: Fractional a => Pattern a
```

Unipolar cosine wave. A pattern of continuous values
following a cosine with frequency of one cycle, and amplitude from
0 to 1. Equivalent to `0.25 ~> sine`.

### `cosine2`

```haskell
:: Fractional a => Pattern a
```

Bipolar cosine wave. A pattern of continuous values
following a cosine with frequency of one cycle, and amplitude from
-1 to 1. Equivalent to `0.25 ~> sine2`.

### `saw`

```haskell
:: (Fractional a, Real a) => Pattern a
```

Unipolar ascending sawtooth wave. A pattern of continuous values
following a sawtooth with frequency of one cycle, and amplitude from
0 to 1.

### `saw2`

```haskell
:: (Fractional a, Real a) => Pattern a
```

Bipolar ascending sawtooth wave. A pattern of continuous values
following a sawtooth with frequency of one cycle, and amplitude from
-1 to 1.

### `isaw`

```haskell
:: (Fractional a, Real a) => Pattern a
```

Like `saw`, but a descending (inverse) sawtooth.

### `isaw2`

```haskell
:: (Fractional a, Real a) => Pattern a
```

Like `saw2`, but a descending (inverse) sawtooth.

### `tri`

```haskell
:: (Fractional a, Real a) => Pattern a
```

Unipolar triangle wave. A pattern of continuous values
following a triangle wave with frequency of one cycle, and amplitude from
0 to 1.

### `tri2`

```haskell
:: (Fractional a, Real a) => Pattern a
```

Bipolar triangle wave. A pattern of continuous values
following a triangle wave with frequency of one cycle, and amplitude from
-1 to 1.

### `square`

```haskell
:: Fractional a => Pattern a
```

Unipolar square wave. A pattern of continuous values
following a square wave with frequency of one cycle, and amplitude from
0 to 1.

`square` is like `sine`, for square waves.

### `square2`

```haskell
:: Fractional a => Pattern a
```

Bipolar square wave. A pattern of continuous values
following a square wave with frequency of one cycle, and amplitude from
-1 to 1.

### `envL`

```haskell
:: Pattern Double
```

`envL` is a `Pattern` of continuous `Double` values, representing
a linear interpolation between 0 and 1 during the first cycle, then
staying constant at 1 for all following cycles. Possibly only
useful if you're using something like the `retrig` function defined
in `tidal.el`.

### `envLR`

```haskell
:: Pattern Double
```

Like `envL` but reversed.

### `envEq`

```haskell
:: Pattern Double
```

'Equal power' version of `env`, for gain-based transitions

### `envEqR`

```haskell
:: Pattern Double
```

Equal power reversed

## Pattern algebra

```haskell
class Unionable a where
```

### `union`

```haskell
:: a -> a -> a
```

### `(|+|)`

```haskell
:: (Applicative a, Num b) => a b -> a b -> a b
```


### `(|+)`

```haskell
:: Num a => Pattern a -> Pattern a -> Pattern a
```


### `(+|)`

```haskell
:: Num a => Pattern a -> Pattern a -> Pattern a
```


### `(||+)`

```haskell
:: Num a => Pattern a -> Pattern a -> Pattern a
```


### `(|++|)`

```haskell
:: Applicative a => a String -> a String -> a String
```


### `(|++)`

```haskell
:: Pattern String -> Pattern String -> Pattern String
```


### `(++|)`

```haskell
:: Pattern String -> Pattern String -> Pattern String
```


### `(||++)`

```haskell
:: Pattern String -> Pattern String -> Pattern String
```


### `(|/|)`

```haskell
:: (Applicative a, Fractional b) => a b -> a b -> a b
```


### `(|/)`

```haskell
:: Fractional a => Pattern a -> Pattern a -> Pattern a
```


### `(/|)`

```haskell
:: Fractional a => Pattern a -> Pattern a -> Pattern a
```


### `(||/)`

```haskell
:: Fractional a => Pattern a -> Pattern a -> Pattern a
```


### `(|*|)`

```haskell
:: (Applicative a, Num b) => a b -> a b -> a b
```


### `(|*)`

```haskell
:: Num a => Pattern a -> Pattern a -> Pattern a
```


### `(*|)`

```haskell
:: Num a => Pattern a -> Pattern a -> Pattern a
```


### `(||*)`

```haskell
:: Num a => Pattern a -> Pattern a -> Pattern a
```


### `(|-|)`

```haskell
:: (Applicative a, Num b) => a b -> a b -> a b
```


### `(|-)`

```haskell
:: Num a => Pattern a -> Pattern a -> Pattern a
```


### `(-|)`

```haskell
:: Num a => Pattern a -> Pattern a -> Pattern a
```


### `(||-)`

```haskell
:: Num a => Pattern a -> Pattern a -> Pattern a
```


### `(|%|)`

```haskell
:: (Applicative a, Moddable b) => a b -> a b -> a b
```


### `(|%)`

```haskell
:: Moddable a => Pattern a -> Pattern a -> Pattern a
```


### `(%|)`

```haskell
:: Moddable a => Pattern a -> Pattern a -> Pattern a
```


### `(||%)`

```haskell
:: Moddable a => Pattern a -> Pattern a -> Pattern a
```


### `(|**|)`

```haskell
:: (Applicative a, Floating b) => a b -> a b -> a b
```


### `(|**)`

```haskell
:: Floating a => Pattern a -> Pattern a -> Pattern a
```


### `(**|)`

```haskell
:: Floating a => Pattern a -> Pattern a -> Pattern a
```


### `(||**)`

```haskell
:: Floating a => Pattern a -> Pattern a -> Pattern a
```


### `(|>|)`

```haskell
:: (Applicative a, Unionable b) => a b -> a b -> a b
```


### `(|>)`

```haskell
:: Unionable a => Pattern a -> Pattern a -> Pattern a
```


### `(>|)`

```haskell
:: Unionable a => Pattern a -> Pattern a -> Pattern a
```


### `(||>)`

```haskell
:: Unionable a => Pattern a -> Pattern a -> Pattern a
```


### `(|<|)`

```haskell
:: (Applicative a, Unionable b) => a b -> a b -> a b
```


### `(|<)`

```haskell
:: Unionable a => Pattern a -> Pattern a -> Pattern a
```


### `(<|)`

```haskell
:: Unionable a => Pattern a -> Pattern a -> Pattern a
```


### `(||<)`

```haskell
:: Unionable a => Pattern a -> Pattern a -> Pattern a
```


### `(#)`

```haskell
:: Unionable b => Pattern b -> Pattern b -> Pattern b
```

## Constructing patterns

### `fromList`

```haskell
:: [a] -> Pattern a
```

Turns a list of values into a pattern, playing one of them per cycle.
The following are equivalent:

```haskell
d1 $ n (fromList [0, 1, 2]) # s "superpiano"
d1 $ n "<0 1 2>" # s "superpiano"
```

### `fastFromList`

```haskell
:: [a] -> Pattern a
```

Turns a list of values into a pattern, playing *all* of them per cycle.
The following are equivalent:

```haskell
d1 $ n (fastFromList [0, 1, 2]) # s "superpiano"
d1 $ n "[0 1 2]" # s "superpiano"
```

### `listToPat`

```haskell
:: [a] -> Pattern a
```

A synonym for `fastFromList`.

### `fromMaybes`

```haskell
:: [Maybe a] -> Pattern a
```

`fromMaybes` is similar to `fromList`, but allows values to
be optional using the `Maybe` type, so that `Nothing` results in
gaps in the pattern.

The following are equivalent:

```haskell
d1 $ n (fromMaybes [Just 0, Nothing, Just 2]) # s "superpiano"
d1 $ n "0 ~ 2" # s "superpiano"
```

### `run`

```haskell
:: (Enum a, Num a) => Pattern a -> Pattern a
```

A pattern of whole numbers from 0 to the given number, in a single cycle.
Can be used to `run` through a folder of samples in order:

```haskell
d1 $ n (run 8) # sound "amencutup"
```

The first parameter to run can be given as a pattern:

```haskell
d1 $ n (run "<4 8 4 6>") # sound "amencutup"
```

### `_run`

```haskell
:: (Enum a, Num a) => a -> Pattern a
```

### `scan`

```haskell
:: (Enum a, Num a) => Pattern a -> Pattern a
```

Similar to `run`, but starts from `1` for the first cycle, successively
adds a number until it gets up to `n`.

```haskell
d1 $ n (scan 8) # sound "amencutup"
```

### `_scan`

```haskell
:: (Enum a, Num a) => a -> Pattern a
```


## Combining patterns

### `append`

```haskell
:: Pattern a -> Pattern a -> Pattern a
```

Alternate between cycles of the two given patterns

```haskell
d1 $ append (sound "bd*2 sn") (sound "arpy jvbass*2")
```

### `cat`

```haskell
:: [Pattern a] -> Pattern a
```

Like `append`, but for a list of patterns. Interlaces them, playing the
first cycle from each in turn, then the second cycle from each, and so on. It
concatenates a list of patterns into a new pattern; each pattern in the list
will maintain its original duration. For example:

```haskell
d1 $ cat [sound "bd*2 sn", sound "arpy jvbass*2"]
d1 $ cat [sound "bd*2 sn", sound "arpy jvbass*2", sound "drum*2"]
d1 $ cat [sound "bd*2 sn", sound "jvbass*3", sound "drum*2", sound "ht mt"]
```

### `slowCat`

```haskell
:: [Pattern a] -> Pattern a
```

Alias for `cat`


### `slowcat`

```haskell
:: [Pattern a] -> Pattern a
```

### `slowAppend`

```haskell
:: Pattern a -> Pattern a -> Pattern a
```

Alias for `append`

### `slowappend`

```haskell
:: Pattern a -> Pattern a -> Pattern a
```

### `fastAppend`

```haskell
:: Pattern a -> Pattern a -> Pattern a
```

Like `append`, but twice as fast

```haskell
d1 $ fastAppend (sound "bd*2 sn") (sound "arpy jvbass*2")
```

### `fastappend`

```haskell
:: Pattern a -> Pattern a -> Pattern a
```

### `fastCat`

```haskell
:: [Pattern a] -> Pattern a
```

The same as `cat`, but speeds up the result by the number of
patterns there are, so the cycles from each are squashed to fit a
single cycle.

```haskell
d1 $ fastcat [sound "bd*2 sn", sound "arpy jvbass*2"]
d1 $ fastcat [sound "bd*2 sn", sound "arpy jvbass*2", sound "drum*2"]
d1 $ fastcat [sound "bd*2 sn", sound "jvbass*3", sound "drum*2", sound "ht mt"]
```

### `fastcat`

```haskell
:: [Pattern a] -> Pattern a
```

Alias for `fastCat`

### `timeCat`

```haskell
:: [(Time, Pattern a)] -> Pattern a
```

Similar to `fastCat`, but each pattern is given a relative duration.
You provide proportionate sizes of the patterns to each other for when they’re
concatenated into one cycle. The larger the value in the list, the larger
relative size the pattern takes in the final loop. If all values are equal
then this is equivalent to `fastcat` (e.g. the following two code fragments are
equivalent).

```haskell
d1 $ fastcat [s "bd*4", s "hh27*8", s "superpiano" # n 0]
```

```haskell
d1 $ timeCat
      [ (1, s "bd*4")
      , (1, s "hh27*8")
      , (1, s "superpiano" # n 0)
      ]
```

### `timecat`

```haskell
:: [(Time, Pattern a)] -> Pattern a
```

Alias for `timeCat`

### `overlay`

```haskell
:: Pattern a -> Pattern a -> Pattern a
```

`overlay` combines two `Pattern`s into a new pattern, so that their events
are combined over time. For example, the following two lines are equivalent:

```haskell
d1 $ sound (overlay "bd sn:2" "cp*3")
d1 $ sound "[bd sn:2, cp*3]"
```

`overlay` is equal to `<>`,

### `(<>)`

```haskell
:: Semigroup a => a -> a -> a
```

which can thus be used as an infix operator equivalent of `overlay`:

```haskell
d1 $ sound ("bd sn:2" <> "cp*3")
```

### `stack`

```haskell
:: [Pattern a] -> Pattern a
```

`stack` combines a list of `Pattern`s into a new pattern, so that their
events are combined over time, i.e., all of the patterns in the list are played
simultaneously.

```haskell
d1 $ stack
      [ sound "bd bd*2"
      , sound "hh*2 [sn cp] cp future*4"
      , sound "arpy" +| n "0 .. 15"
      ]
```

This is particularly useful if you want to apply a function or synth control
pattern to multiple patterns at once:

```haskell
d1 $ whenmod 5 3 (striate 3)
   $ stack
      [ sound "bd bd*2"
      , sound "hh*2 [sn cp] cp future*4"
      , sound "arpy" +| n "0 .. 15"
      ]
   # speed "[[1 0.8], [1.5 2]*2]/3"
```

## Manipulating time

### `(<~)`

```haskell
:: Pattern Time -> Pattern a -> Pattern a
```

Shifts a pattern back in time by the given amount, expressed in cycles

### `(~>)`

```haskell
:: Pattern Time -> Pattern a -> Pattern a
```

Shifts a pattern forward in time by the given amount, expressed in cycles

### `slowSqueeze`

```haskell
:: Pattern Time -> Pattern a -> Pattern a
```

Slow down a pattern by the factors in the given time pattern, "squeezing"
the pattern to fit the slot given in the time pattern. It is the slow analogue
to `fastSqueeze`.
If the time pattern only has a single value in a cycle, `slowSqueeze` becomes equivalent to slow. These are equivalent:

```haskell
d1 $ slow "<2 4>" $ s "bd*8"
d1 $ slowSqueeze "<2 4>" $ s "bd*8"
```

When the time pattern has multiple values, however, the behavior is a little
different. Instead, a slowed version of the pattern will be made for each value
in the time pattern, and they’re all combined together in a cycle according to
the structure of the time pattern. For example, these are equivalent:

```haskell
d1 $ slowSqueeze "2 4 8 16" $ s "bd*8"
d1 $ s "bd*4 bd*2 bd bd/2"
```

as are these:

```haskell
d1 $ slowSqueeze "2 4 [8 16]" $ s "bd*8"
d1 $ s "bd*4 bd*2 [bd bd/2]"
```

### `sparsity`

```haskell
:: Pattern Time -> Pattern a -> Pattern a
```

An alias for `slow`

### `zoom`

```haskell
:: (Time, Time) -> Pattern a -> Pattern a
```

Plays a portion of a pattern, specified by a time arc (start and end time).
The new resulting pattern is played over the time period of the original pattern.

```haskell
d1 $ zoom (0.25, 0.75) $ sound "bd*2 hh*3 [sn bd]*2 drum"
```

In the pattern above, `zoom` is used with an arc from 25% to 75%. It is
equivalent to:

```haskell
d1 $ sound "hh*3 [sn bd]*2"
```

Here’s an example of it being used with a conditional:

```haskell
d1 $ every 4 (zoom (0.25, 0.75)) $ sound "bd*2 hh*3 [sn bd]*2 drum"
```

### `zoomArc`

```haskell
:: Arc -> Pattern a -> Pattern a
```

### `fastGap`

```haskell
:: Pattern Time -> Pattern a -> Pattern a
```

`fastGap` is similar to `fast` but maintains its cyclic alignment, i.e.,
rather than playing the pattern multiple times, it instead leaves a gap in
the remaining space of the cycle. For example, `fastGap 2 p` would squash the
events in pattern `p` into the first half of each cycle (and the second halves
would be empty). The factor should be at least 1.

### `densityGap`

```haskell
:: Pattern Time -> Pattern a -> Pattern a
```

An alias for `fastGap`

### `compress`

```haskell
:: (Time, Time) -> Pattern a -> Pattern a
```

`compress` takes a pattern and squeezes it within the specified time span (i.e.
the ‘arc’). The new resulting pattern is a sped up version of the original.

```haskell
d1 $ compress (1/4, 3/4) $ s "[bd sn]!"
```

In the above example, the pattern will play in an arc spanning from 25% to 75%
of the duration of a cycle. It is equivalent to:

```haskell
d1 $ s "~ [bd sn]! ~"
```

Another example, where all events are different:

```haskell
d1 $ compress (1/4, 3/4) $ n (run 4) # s "arpy"
```

It differs from `zoom` in that it preserves the original pattern but it speeds
up its events so to match with the new time period.

### `compressTo`

```haskell
:: (Time, Time) -> Pattern a -> Pattern a
```

### `repeatCycles`

```haskell
:: Pattern Int -> Pattern a -> Pattern a
```

### `_repeatCycles`

```haskell
:: Int -> Pattern a -> Pattern a
```

### `fastRepeatCycles`

```haskell
:: Int -> Pattern a -> Pattern a
```

### `every`

```haskell
:: Pattern Int -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

`every n f p` applies the function `f` to `p`, but only affects
every `n` cycles.

It takes three inputs: how often the function should be applied (e.g. 3 to
apply it every 3 cycles), the function to be applied, and the pattern you are
applying it to. For example: to reverse a pattern every three cycles (and for
the other two play it normally)

```haskell
d1 $ every 3 rev $ n "0 1 [~ 2] 3" # sound "arpy"
```

Note that if the function you’re applying requires additional parameters
itself (such as fast 2 to make a pattern twice as fast), then you’ll need to
wrap it in parentheses, like so:

```haskell
d1 $ every 3 (fast 2) $ n "0 1 [~ 2] 3" # sound "arpy"
```

Otherwise, the every function will think it is being passed too many parameters.

### `_every`

```haskell
:: Int -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

### `every'`

```haskell
:: Pattern Int -> Pattern Int -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

`every' n o f p` is like `every n f p` but with an offset of `o` cycles.
For example, `every' 3 0 (fast 2)` will speed up the cycle on cycles 0,3,6,…
whereas `every' 3 1 (fast 2)` will transform the pattern on cycles 1,4,7,….
With this in mind, setting the second argument of `every'` to 0 gives the
equivalent every function. For example, every 3 is equivalent to every' 3 0.
The `every` functions can be used to silence a full cycle or part of a cycle
by using silent or mask "~". Mask provides additional flexibility to turn on/off
individual steps.

```haskell
d1 $ every 3 silent $ n "2 9 11 2" # s "hh27"
d1 $ every 3 (mask "~") $ n "2 9 10 2" # s "hh27"
d1 $ every 3 (mask "0 0 0 0") $ n "2 9 11 2" # s "hh27"
```

### `_every'`

```haskell
:: Int -> Int -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

### `foldEvery`

```haskell
:: [Int] -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

`foldEvery ns f p` applies the function `f` to `p`, and is applied for
each cycle in `ns`.
It is similar to chaining multiple `every` functions together. It transforms
a pattern with a function, once per any of the given number of cycles. If a
particular cycle is the start of more than one of the given cycle periods, then
it is applied more than once.

```haskell
d1 $ foldEvery [5,3] (|+ n 1) $ s "moog" # legato 1
```

The first Moog samples are tuned to C2, C3 and C4. Note how on cycles that are
multiples of 3 or 5 the pitch is an octave higher, and on multiples of 15 the
pitch is two octaves higher, as the transformation is applied twice.

### `when`

```haskell
:: (Int -> Bool) -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

The given pattern transformation is applied only `when` the given test function
returns `True`. The test function will be called with the current cycle as
a number.

```haskell
d1 $ when (elem '4' . show)
          (striate 4)
   $ sound "hh hc"
```

The above will only apply `striate 4` to the pattern if the current
cycle number contains the number 4. So the fourth cycle will be
striated and the fourteenth and so on. Expect lots of striates after
cycle number 399.

### `whenT`

```haskell
:: (Time -> Bool) -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

Like `when`, but works on continuous time values rather than cycle numbers.
The following will apply `# speed 2` only when the remainder of the current
`Time` divided by 2 is less than 0.5:

```haskell
d1 $ whenT ( (< 0.5) . (flip Data.Fixed.mod' 2) )
           ( # speed 2 )
   $ sound "hh(4,8) hc(3,8)"
```

### `_getP_`

```haskell
:: (Value -> Maybe a) -> Pattern Value -> Pattern a
```

### `_getP`

```haskell
:: a -> (Value -> Maybe a) -> Pattern Value -> Pattern a
```

### `_cX`

```haskell
:: a -> (Value -> Maybe a) -> String -> Pattern a
```

### `_cX_`

```haskell
:: (Value -> Maybe a) -> String -> Pattern a
```

### `cF`

```haskell
:: Double -> String -> Pattern Double
```

### `cF_`

```haskell
:: String -> Pattern Double
```

### `cF0`

```haskell
:: String -> Pattern Double
```

### `cN`

```haskell
:: Note -> String -> Pattern Note
```

### `cN_`

```haskell
:: String -> Pattern Note
```

### `cN0`

```haskell
:: String -> Pattern Note
```

### `cI`

```haskell
:: Int -> String -> Pattern Int
```

### `cI_`

```haskell
:: String -> Pattern Int
```

### `cI0`

```haskell
:: String -> Pattern Int
```

### `cB`

```haskell
:: Bool -> String -> Pattern Bool
```

### `cB_`

```haskell
:: String -> Pattern Bool
```

### `cB0`

```haskell
:: String -> Pattern Bool
```

### `cR`

```haskell
:: Rational -> String -> Pattern Rational
```

### `cR_`

```haskell
:: String -> Pattern Rational
```

### `cR0`

```haskell
:: String -> Pattern Rational
```

### `cT`

```haskell
:: Time -> String -> Pattern Time
```

### `cT0`

```haskell
:: String -> Pattern Time
```

### `cT_`

```haskell
:: String -> Pattern Time
```

### `cS`

```haskell
:: String -> String -> Pattern String
```

### `cS_`

```haskell
:: String -> Pattern String
```

### `cS0`

```haskell
:: String -> Pattern String
```

### `in0`, `in1`, `in2`, …, `in127`

```haskell
:: Pattern Double
```

