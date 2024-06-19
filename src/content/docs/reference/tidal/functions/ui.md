---
title: UI
---

## Randomisation

### `xorwise`

```haskell
:: Int -> Int
```

An implementation of the well-known xorshift random number generator. Given a seed number, generates a reasonably random number out of it. This is an efficient algorithm suitable for use in tight loops and used to implement the below functions, which are used to implement rand.

See George Marsaglia (2003). "Xorshift RNGs", in Journal of Statistical Software, pages 8–14.

### `timeToIntSeed`

```haskell
:: RealFrac a => a -> Int
```

### `intSeedToRand`

```haskell
:: Fractional a => Int -> a
```

### `timeToRand`

```haskell
:: (RealFrac a, Fractional b) => a -> b
```

### `timeToRands`

```haskell
:: (RealFrac a, Fractional b) => a -> Int -> [b]
```

### `timeToRands'`

```haskell
:: Fractional a => Int -> Int -> [a]
```

### `rand`

```haskell
:: Fractional a => Pattern a
```

`rand` generates a continuous pattern of (pseudo-)random numbers between 0 and 1.

```haskell
sound "bd*8" # pan rand
```

pans bass drums randomly, and

```haskell
sound "sn sn ~ sn" # gain rand
```

makes the snares randomly loud and quiet.

Numbers coming from this pattern are 'seeded' by time. So if you reset time (using `resetCycles`, `setCycle`, or `cps`) the random pattern will emit the exact same _random_ numbers again.

In cases where you need two different random patterns, you can shift one of them around to change the time from which the _random_ pattern is read, note the difference:

```haskell
jux (# gain rand) $ sound "sn sn ~ sn" # gain rand
```

and with the juxed version shifted backwards for 1024 cycles:

```haskell
jux (# ((1024 <~) $ gain rand)) $ sound "sn sn ~ sn" # gain rand
```

### `brand`

```haskell
:: Pattern Bool
```

Boolean `rand` — a continuous stream of true/false values, with a 50/50 chance.

### `brandBy`

```haskell
:: Pattern Double -> Pattern Bool
```

Boolean `rand` with probability as input, e.g. `brandBy 0.25` produces `true`s 25% of the time.

### `_brandBy`

```haskell
:: Double -> Pattern Bool
```

### `irand`

```haskell
:: Num a => Pattern Int -> Pattern a
```

Just like rand but for whole numbers, irand n generates a pattern of (pseudo-) random whole numbers between 0 to n-1 inclusive. Notably used to pick a random samples from a folder:

```haskell
d1 $ segment 4 $ n (irand 5) # sound "drum"
```

### `_irand`

```haskell
:: Num a => Int -> Pattern a
```

### perlinWith

```haskell
:: Fractional a => Pattern Double -> Pattern a
```

1D Perlin (smooth) noise, works like rand but smoothly moves between random values each cycle. perlinWith takes a pattern as the RNG's "input" instead of automatically using the cycle count.

```haskell
d1 $ s "arpy*32" # cutoff (perlinWith (saw * 4) * 2000)
```

will generate a smooth random pattern for the cutoff frequency which will repeat every cycle (because the saw does) The perlin function uses the cycle count as input and can be used much like rand.

### perlin

```haskell
:: Fractional a => Pattern a
```

As perlin with a suitable choice of input pattern (sig fromRational).

### perlin2With

```haskell
:: Pattern Double -> Pattern Double -> Pattern Double
```

`perlin2With` is Perlin noise with a 2-dimensional input. This can be useful for more control over how the randomness repeats (or doesn't).

```haskell
d1
 $ s "[supersaw:-12*32]"
 # lpf (rangex 60 5000 $ perlin2With (cosine*2) (sine*2))
 # lpq 0.3
```

will generate a smooth random cutoff pattern that repeats every cycle without any reversals or discontinuities (because the 2D path is a circle). `perlin2` only needs one input because it uses the cycle count as the second input.

### perlin2

```haskell
:: Pattern Double -> Pattern Double
```

As `perlin2` with a suitable choice of input pattern `(sig fromRational)`.

### choose

```haskell
:: [a] -> Pattern a
```

Randomly picks an element from the given list

```haskell
sound "superpiano(3,8)" # note (choose ["a", "e", "g", "c"])
```

plays a melody randomly choosing one of the four notes "a", "e", "g", "c".

### chooseBy

```haskell
:: Pattern Double -> [a] -> Pattern a
```

Given a pattern of doubles, `chooseBy` normalizes them so that each corresponds to an index in the provided list. The returned pattern contains the corresponding elements in the list.

```haskell
choose = chooseBy rand
```

### wchoose

```haskell
:: [(a, Double)] -> Pattern a
```

Like `choose`, but works on a list of tuples of values and weights

```haskell
sound "superpiano(3,8)" # note (wchoose [("a",1), ("e",0.5), ("g",2), ("c",1)])
```

In the above example, the "a" and "c" notes are twice as likely to play as the "e" note, and half as likely to play as the "g" note.

### wchooseBy

```haskell
:: Pattern Double -> [(a, Double)] -> Pattern a
```

Given a pattern of probabilities and a list of (value, weight) pairs, `wchooseBy` creates a `Pattern` value by choosing values based on those probabilities and, weighted appropriately by the weights in the list of pairs.

```haskell
wchoose = wchooseBy rand
```

### randcat

```haskell
:: [Pattern a] -> Pattern a
```

`randcat ps` does a `slowcat` on the list of patterns `ps` but randomises the order in which they are played.

### wrandcat

```haskell
:: [(Pattern a, Double)] -> Pattern a
```

As `randcat`, but allowing weighted choice.

### degrade

```haskell
:: Pattern a -> Pattern a
```

`degrade` randomly removes events from a pattern 50% of the time:

```haskell
d1 $ slow 2 $ degrade $ sound "[[[feel:5*8,feel*3] feel:3*8], feel*4]"
   # accelerate "-6"
   # speed "2"
```

The shorthand syntax for `degrade` is a question mark: `?`. Using `?` will allow you to randomly remove events from a portion of a pattern:

```haskell
d1 $ slow 2 $ sound "bd ~ sn bd ~ bd? [sn bd?] ~"
```

You can also use `?` to randomly remove events from entire sub-patterns:

```haskell
d1 $ slow 2 $ sound "[[[feel:5*8,feel*3] feel:3*8]?, feel*4]"
```

### degradeBy

```haskell
:: Pattern Double -> Pattern a -> Pattern a
```

Similar to `degrade`, `degradeBy` allows you to control the percentage of events that are removed. For example, to remove events 90% of the time:

```haskell
d1 $ slow 2 $ degradeBy 0.9 $ sound "[[[feel:5*8,feel*3] feel:3*8], feel*4]"
   # accelerate "-6"
   # speed "2"
  ```

You can also invoke this behavior in the shorthand notation by specifying a percentage, as a number between 0 and 1, after the question mark:

```haskell
d1 $ s "bd hh?0.8 bd hh?0.4"
```

### _degradeBy

```haskell
:: Double -> Pattern a -> Pattern a
```

### _degradeByUsing

```haskell
:: Pattern Double -> Double -> Pattern a -> Pattern a
```

### unDegradeBy

```haskell
:: Pattern Double -> Pattern a -> Pattern a
```

As `degradeBy`, but the pattern of probabilities represents the chances to retain rather than remove the corresponding element.

### _unDegradeBy

```haskell
:: Double -> Pattern a -> Pattern a
```

### degradeOverBy

```haskell
:: Int -> Pattern Double -> Pattern a -> Pattern a
```

### sometimesBy

```haskell
:: Pattern Double -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

Use `sometimesBy` to apply a given function "sometimes". For example, the following code results in density 2 being applied about 25% of the time:

```haskell
d1 $ sometimesBy 0.25 (density 2) $ sound "bd*8"
```

There are some aliases as well:

```haskell
sometimes = sometimesBy 0.5
often = sometimesBy 0.75
rarely = sometimesBy 0.25
almostNever = sometimesBy 0.1
almostAlways = sometimesBy 0.9
```

### sometimesBy'

```haskell
:: Pattern Double -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

As `sometimesBy`, but applies the given transformation to the pattern in its entirety before filtering its actual appearances. Less efficient than `sometimesBy` but may be useful when the passed pattern transformation depends on properties of the pattern before probabilities are taken into account.

```haskell
sometimes' = sometimesBy' 0.5
often' = sometimesBy' 0.75
rarely' = sometimesBy' 0.25
almostNever' = sometimesBy' 0.1
almostAlways' = sometimesBy' 0.9
```

### sometimes

```haskell
:: (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

`sometimes` is an alias for `sometimesBy 0.5`.

### sometimes'

```haskell
:: (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

### often

```haskell
:: (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

`often` is an alias for `sometimesBy 0.75`.

### often'

```haskell
:: (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

### rarely

```haskell
:: (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

`rarely` is an alias for `sometimesBy 0.25`.

### rarely'

```haskell
:: (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

### almostNever

```haskell
:: (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

`almostNever` is an alias for `sometimesBy 0.1`.

### almostNever'

```haskell
:: (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

### almostAlways

```haskell
:: (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

`almostAlways` is an alias for `sometimesBy 0.9`.

### almostAlways'

```haskell
:: (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

### never

```haskell
:: (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

Never apply a transformation, returning the pattern unmodified.

```haskell
never = flip const
```

### always

```haskell
:: (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

Apply the transformation to the pattern unconditionally.

```haskell
always = id
```

### someCyclesBy

```haskell
:: Pattern Double -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

`someCyclesBy` is a cycle-by-cycle version of `sometimesBy`.

```haskell
someCycles = someCyclesBy 0.5
```

### _someCyclesBy

```haskell
:: Double -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

### somecyclesBy

```haskell
:: Pattern Double -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

### someCycles

```haskell
:: (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

```haskell
someCycles = someCyclesBy 0.5
```

### somecycles

```haskell
:: (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```


## Pattern transformations

Pattern transformations are functions generally of type `Pattern a -> Pattern a`. This means they take a pattern of any type and return a pattern of that type.

### brak

```haskell
:: Pattern a -> Pattern a
```

This transformation makes a pattern sound a bit like a breakbeat.

Example:

```haskell
d1 $ sound (brak "bd sn kurt")
```

### iter

```haskell
:: Pattern Int -> Pattern c -> Pattern c
```

Divides a pattern into a given number of subdivisions, plays the subdivisions in order, but increments the starting subdivision each cycle. The pattern wraps to the first subdivision after the last subdivision is played.

Example:

```haskell
d1 $ iter 4 $ sound "bd hh sn cp"
```

This will produce the following over four cycles:

```
bd hh sn cp
hh sn cp bd
sn cp bd hh
cp bd hh sn
```

There is also `iter'`, which shifts the pattern in the opposite direction.

### _iter

```haskell
:: Int -> Pattern a -> Pattern a
```

### iter'

```haskell
:: Pattern Int -> Pattern c -> Pattern c
```

`iter'` is the same as `iter`, but decrements the starting subdivision instead of incrementing it.

### _iter'

```haskell
:: Int -> Pattern a -> Pattern a
```

### palindrome

```haskell
:: Pattern a -> Pattern a
```

`palindrome p` applies `rev` to `p` every other cycle, so that the pattern alternates between forwards and backwards.

### fadeOut

```haskell
:: Time -> Pattern a -> Pattern a
```

Degrades a pattern over the given time.

### fadeOutFrom

```haskell
:: Time -> Time -> Pattern a -> Pattern a
```

Alternate version to `fadeOut` where you can provide the time from which the fade starts.

### fadeIn

```haskell
:: Time -> Pattern a -> Pattern a
```

"Undegrades" a pattern over the given time.

### fadeInFrom

```haskell
:: Time -> Time -> Pattern a -> Pattern a
```

Alternate version to `fadeIn` where you can provide the time from which the fade in starts.

### spread

```haskell
:: (a -> t -> Pattern b) -> [a] -> t -> Pattern b
```

The `spread` function allows you to take a pattern transformation which takes a parameter, such as slow, and provide several parameters which are switched between.
In other words it spreads a function across several values.

Taking a simple high hat loop as an example:

```haskell
d1 $ sound "ho ho:2 ho:3 hc"
```

We can slow it down by different amounts, such as by a half:

```haskell
d1 $ slow 2 $ sound "ho ho:2 ho:3 hc"
```

Or by four thirds (i.e. speeding it up by a third; 4%3 means four over three):

```haskell
d1 $ slow (4%3) $ sound "ho ho:2 ho:3 hc"
```

But if we use spread, we can make a pattern which alternates between the two speeds:

```haskell
d1 $ spread slow [2,4%3] $ sound "ho ho:2 ho:3 hc"
```

Note that if you pass `($)` as the function to spread values over, you can put functions as the list of values. (`spreadf` is an alias for `spread ($)`.) For example:

```haskell
d1 $ spread ($) [density 2, rev, slow 2, striate 3, (# speed "0.8")]
   $ sound "[bd*2 [~ bd]] [sn future]*2 cp jvbass*4"
```

Above, the pattern will have these transforms applied to it, one at a time, per cycle:

- cycle 1: `density 2` - pattern will increase in speed
- cycle 2: `rev` - pattern will be reversed
- cycle 3: `slow 2` - pattern will decrease in speed
- cycle 4: `striate 3` - pattern will be granualized
- cycle 5: `(# speed "0.8")` - pattern samples will be played back more slowly

After `(# speed "0.8")`, the transforms will repeat and start at `density 2` again.

### slowspread

```haskell
:: (a -> t -> Pattern b) -> [a] -> t -> Pattern b
```

An alias for `spread` consistent with `fastspread`.

### fastspread

```haskell
:: (a -> t -> Pattern b) -> [a] -> t -> Pattern b
```

`fastspread` works the same as `spread`, but the result is squashed into a single cycle.
If you gave four values to `spread`, then the result would seem to speed up by a factor of four. Compare these two:

```haskell
d1 $ spread chop [4,64,32,16] $ sound "ho ho:2 ho:3 hc"

d1 $ fastspread chop [4,64,32,16] $ sound "ho ho:2 ho:3 hc"
```

There is also `slowspread`, which is an alias of `spread`.

### spread'

```haskell
:: Monad m => (a -> b -> m c) -> m a -> b -> m c
```

There's a version of this function, `spread'` (pronounced "spread prime"), which takes a pattern of parameters, instead of a list:

```haskell
d1 $ spread' slow "2 4%3" $ sound "ho ho:2 ho:3 hc"
```

This is quite a messy area of Tidal — due to a slight difference of implementation this sounds completely different!
One advantage of using `spread'` though is that you can provide polyphonic parameters, e.g.:

```haskell
d1 $ spread' slow "[2 4%3, 3]" $ sound "ho ho:2 ho:3 hc"
```

### spreadChoose

```haskell
:: (t -> t1 -> Pattern b) -> [t] -> t1 -> Pattern b
```

`spreadChoose f xs p` is similar to `slowspread` but picks values from `xs` at random, rather than cycling through them in order.

### spreadr

```haskell
:: (t -> t1 -> Pattern b) -> [t] -> t1 -> Pattern b
```

A shorter alias for `spreadChoose`.

### ifp

```haskell
:: (Int -> Bool) -> (Pattern a -> Pattern a) -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

Decide whether to apply one or another function depending on the result of a test function that is passed the current cycle as a number.

```haskell
d1 $ ifp ((== 0).(flip mod 2))
  (striate 4)
  (# coarse "24 48") $
  sound "hh hc"
```

This will apply `striate 4` for every _even_ cycle and apply `# coarse "24 48"` for every _odd_.

Detail: As you can see the test function is arbitrary and does not rely on anything tidal specific.
In fact it uses only plain Haskell functionality, that is, it calculates the modulo of 2 of the current cycle which is either 0 (for even cycles) or 1.
It then compares this value against 0 and returns the result, which is either `true` or `false`. This is what the `ifp` signature's first part signifies, i.e., `(Int -> Bool)`, a function that takes a whole number and returns either `true` or `false`.

### wedge

```haskell
:: Pattern Time -> Pattern a -> Pattern a -> Pattern a
```

`wedge t p p'` combines patterns `p` and `p'` by squashing the `p` into the portion of each cycle given by `t`, and `p'` into the remainder of each cycle.

### _wedge

```haskell
:: Time -> Pattern a -> Pattern a -> Pattern a
```

### whenmod

```haskell
:: Pattern Time -> Pattern Time -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

`whenmod` has a similar form and behaviour to `every`, but requires an additional number. Applies the function to the pattern, when the remainder of the current loop number divided by the first parameter, is greater or equal than the second parameter.

For example the following makes every other block of four loops twice as dense:

```haskell
d1 $ whenmod 8 4 (density 2) (sound "bd sn kurt")
```

### _whenmod

```haskell
:: Time -> Time -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

### superimpose

```haskell
:: (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

```haskell
superimpose f p = stack [p, f p]
```

superimpose plays a modified version of a pattern at the same time as the original pattern, resulting in two patterns being played at the same time.

```haskell
d1 $ superimpose (density 2) $ sound "bd sn [cp ht] hh"
d1 $ superimpose ((# speed "2") . (0.125 <~)) $ sound "bd sn cp hh"
```

### trunc

```haskell
:: Pattern Time -> Pattern a -> Pattern a
```

`trunc` truncates a pattern so that only a fraction of the pattern is played. The following example plays only the first quarter of the pattern:

```haskell
d1 $ trunc 0.25 $ sound "bd sn*2 cp hh*4 arpy bd*2 cp bd*2"
```

### _trunc

```haskell
:: Time -> Pattern a -> Pattern a
```

### linger

```haskell
:: Pattern Time -> Pattern a -> Pattern a
```

`linger` is similar to `trunc` but the truncated part of the pattern loops until the end of the cycle.

```haskell
d1 $ linger 0.25 $ sound "bd sn*2 cp hh*4 arpy bd*2 cp bd*2"
```

If you give it a negative number, it will `linger` on the last part of the pattern, instead of the start of it. E.g. to `linger` on the last quarter:

```haskell
d1 $ linger (-0.25) $ sound "bd sn*2 cp hh*4 arpy bd*2 cp bd*2"
```

### _linger

```haskell
:: Time -> Pattern a -> Pattern a
```

### within

```haskell
:: (Time, Time) -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

Use within to apply a function to only a part of a pattern. For example, to apply `density 2` to only the first half of a pattern:

```haskell
d1 $ within (0, 0.5) (density 2) $ sound "bd*2 sn lt mt hh hh hh hh"
```

Or, to apply `(# speed "0.5")` to only the last quarter of a pattern:

```haskell
d1 $ within (0.75, 1) (# speed "0.5") $ sound "bd*2 sn lt mt hh hh hh hh"
```

### withinArc

```haskell
:: Arc -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

### within'

```haskell
:: (Time, Time) -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

For many cases, `within'` will function exactly as `within`.
The difference between the two occurs when applying functions that change the timing of notes such as fast or `<~`.
`within` first applies the function to all notes in the cycle, then keeps the results in the specified interval, and then combines it with the old cycle (an "apply split combine" paradigm).
`within'` first keeps notes in the specified interval, then applies the function to these notes, and then combines it with the old cycle (a "split apply combine" paradigm).
For example, whereas using the standard version of within

```haskell
d1 $ within (0, 0.25) (fast 2) $ sound "bd hh cp sd"
```

sounds like:

```haskell
d1 $ sound "[bd hh] hh cp sd"
```

using this alternative version, within'

```haskell
d1 $ within' (0, 0.25) (fast 2) $ sound "bd hh cp sd"
```

sounds like:

```haskell
d1 $ sound "[bd bd] hh cp sd"
```

### revArc

```haskell
:: (Time, Time) -> Pattern a -> Pattern a
```

Reverse the part of the pattern sliced out by the `(start, end)` pair.

```haskell
revArc a = within a rev
```

### euclid

```haskell
:: Pattern Int -> Pattern Int -> Pattern a -> Pattern a
```

You can use the `euclid` function to apply a Euclidean algorithm over a complex pattern, although the structure of that pattern will be lost:

```haskell
d1 $ euclid 3 8 $ sound "bd*2 [sn cp]"
```

In the above, three sounds are picked from the pattern on the right according to the structure given by `euclid 3 8`.
It ends up picking two `bd` sounds, a `cp` and missing the `sn` entirely.

A negative first argument provides the inverse of the Euclidean pattern.

These types of sequences use "Bjorklund's algorithm", which wasn't made for music but for an application in nuclear physics, which is exciting. More exciting still is that it is very similar in structure to the one of the first known algorithms written in Euclid's book of elements in 300 BC. You can read more about this in the paper [The Euclidean Algorithm Generates Traditional Musical Rhythms](http:/cgm.cs.mcgill.ca~godfriedpublicationsbanff.pdf) by Toussaint. Some examples from this paper are included below, including rotation as a third parameter in some cases (see `euclidOff`).

| Pattern    | Description
|:-----------|:------------
| (2,5)      | A thirteenth century Persian rhythm called Khafif-e-ramal.
| (3,4)      | The archetypal pattern of the Cumbia from Colombia, as well as a Calypso rhythm from Trinidad.
| (3,5,2)    | Another thirteenth century Persian rhythm by the name of Khafif-e-ramal, as well as a Rumanian folk-dance rhythm.
| (3,7)      | A Ruchenitza rhythm used in a Bulgarian folk-dance.
| (3,8)      | The Cuban tresillo pattern.
| (4,7)      | Another Ruchenitza Bulgarian folk-dance rhythm.
| (4,9)      | The Aksak rhythm of Turkey.
| (4,11)     | The metric pattern used by Frank Zappa in his piece titled Outside Now.
| (5,6)      | Yields the York-Samai pattern, a popular Arab rhythm.
| (5,7)      | The Nawakhat pattern, another popular Arab rhythm.
| (5,8)      | The Cuban cinquillo pattern.
| (5,9)      | A popular Arab rhythm called Agsag-Samai.
| (5,11)     | The metric pattern used by Moussorgsky in Pictures at an Exhibition.
| (5,12)     | The Venda clapping pattern of a South African children’s song.
| (5,16)     | The Bossa-Nova rhythm necklace of Brazil.
| (7,8)      | A typical rhythm played on the Bendir (frame drum).
| (7,12)     | A common West African bell pattern.
| (7,16,14)  | A Samba rhythm necklace from Brazil.
| (9,16)     | A rhythm necklace used in the Central African Republic.
| (11,24,14) | A rhythm necklace of the Aka Pygmies of Central Africa.
| (13,24,5)  | Another rhythm necklace of the Aka Pygmies of the upper Sangha.

There was once a shorter alias `e` for this function. It has been removed, but you may see references to it in older Tidal code.

### _euclid

```haskell
:: Int -> Int -> Pattern a -> Pattern a
```

### euclidFull

```haskell
:: Pattern Int -> Pattern Int -> Pattern a -> Pattern a -> Pattern a
```

`euclidFull n k pa pb` stacks `euclid n k pa` with `euclidInv n k pb.` For example, to implement the traditional flamenco rhythm, you could use hard claps for the former and soft claps for the latter:

```haskell
d1 $ euclidFull 3 7 "realclaps" ("realclaps" # gain 0.8)
```

### _euclidBool

```haskell
:: Int -> Int -> Pattern Bool
```

Less expressive than `euclid` due to its constrained types, but may be more efficient.

### _euclid'

```haskell
:: Int -> Int -> Pattern a -> Pattern a
```

### euclidOff

```haskell
:: Pattern Int -> Pattern Int -> Pattern Int -> Pattern a -> Pattern a
```

As `euclid`, but taking a third rotational parameter corresponding to the onset at which to start the rhythm.

### eoff

```haskell
:: Pattern Int -> Pattern Int -> Pattern Int -> Pattern a -> Pattern a
```

A shorter alias for `euclidOff`.

### _euclidOff

```haskell
:: Int -> Int -> Int -> Pattern a -> Pattern a
```

### euclidOffBool

```haskell
:: Pattern Int -> Pattern Int -> Pattern Int -> Pattern Bool -> Pattern Bool
```

As `euclidOff`, but specialized to `Bool`. May be more efficient than `euclidOff`.

### _euclidOffBool

```haskell
:: Int -> Int -> Int -> Pattern Bool -> Pattern Bool
```

### distrib

```haskell
:: [Pattern Int] -> Pattern a -> Pattern a
```

### _distrib

```haskell
:: [Int] -> Pattern a -> Pattern a
```

### euclidInv

```haskell
:: Pattern Int -> Pattern Int -> Pattern a -> Pattern a
```

`euclidInv` fills in the blanks left by `euclid`.

Whereas `euclid 3 8 "x"` produces `"x ~ ~ x ~ ~ x ~"`, `euclidInv 3 8 "x"` produces `"~ x x ~ x x ~ x"`.

### _euclidInv

```haskell
:: Int -> Int -> Pattern a -> Pattern a
```

### index

```haskell
:: Real b => b -> Pattern b -> Pattern c -> Pattern c
```

### rot

```haskell
:: Ord a => Pattern Int -> Pattern a -> Pattern a
```

`rot n p` rotates the values in a pattern `p` by `n` beats to the left. Example:

```haskell
d1 $ every 4 (rot 2) $ slow 2 $ sound "bd hh hh hh"
```

### _rot

```haskell
:: Ord a => Int -> Pattern a -> Pattern a
```

Calculates a whole cycle, rotates it, then constrains events to the original query arc.

### segment

```haskell
:: Pattern Time -> Pattern a -> Pattern a
```

`segment n p` "samples" the pattern `p` at a rate of `n` events per cycle. Useful for turning a continuous pattern into a discrete one.

### _segment

```haskell
:: Time -> Pattern a -> Pattern a
```

### discretise

```haskell
:: Pattern Time -> Pattern a -> Pattern a
```

The old (deprecated) name for `segment`.

### fit

```haskell
:: Pattern Int -> [a] -> Pattern Int -> Pattern a
```

The `fit` function takes a pattern of integer numbers, which are used to select values from the given list. What makes this a bit strange is that only a given number of values are selected each cycle. For example:

```haskell
d1 $ sound (fit 3 ["bd", "sn", "arpy", "arpy:1", "casio"] "0 [~ 1] 2 1")
```

The above fits three samples into the pattern, i.e. for the first cycle this will be `"bd"`, `"sn"` and `"arpy"`, giving the result `"bd [~ sn] arpy sn"` (note that we start counting at zero, so that `0` picks the first value). The following cycle the *next* three values in the list will be picked, i.e. `"arpy:1"`, `"casio"` and `"bd"`, giving the pattern `"arpy:1 [~ casio] bd casio"` (note that the list wraps round here).

### _fit

```haskell
:: Int -> [a] -> Pattern Int -> Pattern a
```

### permstep

```haskell
:: RealFrac b => Int -> [a] -> Pattern b -> Pattern a
```

### struct

```haskell
:: Pattern Bool -> Pattern a -> Pattern a
```

`struct a b` structures pattern `b` in terms of the pattern of boolean values `a`. Only `true` values in the boolean pattern are used.

### substruct

```haskell
:: Pattern Bool -> Pattern b -> Pattern b
```

Similar to struct, but each event in pattern `a` gets replaced with pattern `b`, compressed to fit the timespan of the event.

### randArcs

```haskell
:: Int -> Pattern [Arc]
```

### randStruct

```haskell
:: Int -> Pattern Int
```

### substruct'

```haskell
:: Pattern Int -> Pattern a -> Pattern a
```

### stripe

```haskell
:: Pattern Int -> Pattern a -> Pattern a
```

`stripe n p` repeats pattern `p` `n` times per cycle. So similar to fast, but with random durations. The repetitions will be contiguous (touching, but not overlapping) and the durations will add up to a single cycle. `n` can be supplied as a pattern of integers.

### _stripe

```haskell
:: Int -> Pattern a -> Pattern a
```

### slowstripe

```haskell
:: Pattern Int -> Pattern a -> Pattern a
```

`slowstripe n p` is the same as `stripe`, but the result is also `n` times slower, so that the mean average duration of the stripes is exactly one cycle, and every `n`th stripe starts on a cycle boundary (in Indian classical terms, the *sam*).

### parseLMRule

```haskell
:: String -> [(String, String)]
```

### parseLMRule'

```haskell
:: String -> [(Char, String)]
```

### lindenmayer

```haskell
:: Int -> String -> String -> String
```

Returns the nth iteration of a Lindenmayer System with given start sequence.

An example:

```haskell
lindenmayer 1 "a:b,b:ab" "ab" -> "bab"
```

### lindenmayerI

```haskell
:: Num b => Int -> String -> String -> [b]
```

`lindenmayerI` converts the resulting string into a list of integers with `fromIntegral` applied (so they can be used seamlessly where floats or rationals are required).

### runMarkov

```haskell
:: Int -> [[Double]] -> Int -> Time -> [Int]
```

`runMarkov n tmat xi seed` generates a Markov chain (as a list) of length `n` using the transition matrix `tmat` starting from initial state `xi`, starting with random numbers generated from `seed`.
Each entry in the chain is the index of state (starting from zero).
Each row of the matrix will be automatically normalized.

For example:

```haskell
runMarkov 8 [[2,3], [1,3]] 0 0
```

will produce a two-state chain 8 steps long, from initial state 0, where the transition probability from state 0->0 is 25, 0->1 is 35, 1->0 is 1/4, and 1->1 is 3/4.

### markovPat

```haskell
:: Pattern Int -> Pattern Int -> [[Double]] -> Pattern Int
```

### _markovPat

```haskell
:: Int -> Int -> [[Double]] -> Pattern Int
```

### mask

```haskell
:: Pattern Bool -> Pattern a -> Pattern a
```

Removes events from second pattern that don't start during an event from first.

Consider this kind of messy rhythm without any rests:

```haskell
d1 $ sound (slowcat ["sn*8", "[cp*4 bd*4, hc*5]"]) # n (run 8)
```

If we apply a `mask` to it

```haskell
d1 $ s (mask ("1 1 1 ~ 1 1 ~ 1" :: Pattern Bool)
             (slowcat ["sn*8", "[cp*4 bd*4, bass*5]"])
       )
   # n (run 8)
```

Due to the use of `slowcat` here, the same mask is first applied to `"sn*8"` and in the next cycle to `"[cp*4 bd*4, hc*5]"`.

You could achieve the same effect by adding rests within the `slowcat` patterns, but `mask` allows you to do this more easily. It kind of keeps the rhythmic structure, and you can change the used samples independently, e.g.

```haskell
d1 $ s (mask ("1 ~ 1 ~ 1 1 ~ 1")
  (slowcat ["can*8", "[cp*4 sn*4, jvbass*16]"] ))
  # n (run 8)
```

### enclosingArc

```haskell
:: [Arc] -> Arc
```

### stretch

```haskell
:: Pattern a -> Pattern a
```

### fit'

```haskell
:: Pattern Time -> Int -> Pattern Int -> Pattern Int -> Pattern a -> Pattern a
```

`fit'` is a generalization of `fit`, where the list is instead constructed by using another integer pattern to slice up a given pattern. The first argument is the number of cycles of that latter pattern to use when slicing. It's easier to understand this with a few examples:

```haskell
d1 $ sound (fit' 1 2 "0 1" "1 0" "bd sn")
```

So what does this do? The first `1` just tells it to slice up a single cycle of `"bd sn"`. The `2` tells it to select two values each cycle, just like the first argument to fit. The next pattern `"0 1"` is the "from" pattern which tells it how to slice, which in this case means `"0"` maps to `"bd"`, and `"1"` maps to `"sn"`. The next pattern `"1 0"` is the "to" pattern, which tells it how to rearrange those slices. So the final result is the pattern `"sn bd"`.

A more useful example might be something like

```haskell
d1 $ fit' 1 4 (run 4) "[0 3*2 2 1 0 3*2 2 [1*8 ~]]/2"
   $ chop 4
   $ (sound "breaks152" # unit "c")
```

which uses `chop` to break a single sample into individual pieces, which `fit'` then puts into a list (using the `run 4` pattern) and reassembles according to the complicated integer pattern.

### chunk

```haskell
:: Pattern Int -> (Pattern b -> Pattern b) -> Pattern b -> Pattern b
```

Treats the given pattern `p` as having `n` chunks, and applies the function `f` to one of those sections per cycle. Running:

- from left to right if chunk number is positive
- from right to left if chunk number is negative

```haskell
d1 $ chunk 4 (fast 4) $ sound "cp sn arpy [mt lt]"
 
```

### _chunk

```haskell
:: Integral a => a -> (Pattern b -> Pattern b) -> Pattern b -> Pattern b
```

### chunk'

```haskell
:: Integral a1 => Pattern a1 -> (Pattern a2 -> Pattern a2) -> Pattern a2 -> Pattern a2
```

**DEPRECATED**, use `chunk` with negative numbers instead.

### _chunk'

```haskell
:: Integral a => a -> (Pattern b -> Pattern b) -> Pattern b -> Pattern b
```

**DEPRECATED**, use `_chunk` with negative numbers instead.

### inside

```haskell
:: Pattern Time -> (Pattern a1 -> Pattern a) -> Pattern a1 -> Pattern a
```

`inside` carries out an operation inside a cycle. For example, while `rev "0 1 2 3 4 5 6 7"` is the same as `"7 6 5 4 3 2 1 0"`, `inside 2 rev "0 1 2 3 4 5 6 7"` gives `"3 2 1 0 7 6 5 4"`.

### _inside

```haskell
:: Time -> (Pattern a1 -> Pattern a) -> Pattern a1 -> Pattern a
```

### outside

```haskell
:: Pattern Time -> (Pattern a1 -> Pattern a) -> Pattern a1 -> Pattern a
```

`outside` is the inverse of the `inside` function. `outside` applies its function outside the cycle. Say you have a pattern that takes 4 cycles to repeat and apply the rev function:

```haskell
d1 $ rev $ cat [s "bd bd sn",s "sn sn bd", s"lt lt sd", s "sd sd bd"]
```

The above generates:

```haskell
d1 $ rev $ cat [s "sn bd bd",s "bd sn sn", s "sd lt lt", s "bd sd sd"]
```

However if you apply outside:

```haskell
d1 $ outside 4 (rev) $ cat [s "bd bd sn",s "sn sn bd", s"lt lt sd", s "sd sd bd"]
```

The result is:

```haskell
d1 $ rev $ cat [s "bd sd sd", s "sd lt lt", s "sn sn bd", s "bd bd sn"]
```

### _outside

```haskell
:: Time -> (Pattern a1 -> Pattern a) -> Pattern a1 -> Pattern a
```

### loopFirst

```haskell
:: Pattern a -> Pattern a
```

### timeLoop

```haskell
:: Pattern Time -> Pattern a -> Pattern a
```

### seqPLoop

```haskell
:: [(Time, Time, Pattern a)] -> Pattern a
```

### toScale

```haskell
:: Num a => [a] -> Pattern Int -> Pattern a
```

`toScale` lets you turn a pattern of notes within a scale (expressed as a list) to note numbers.

For example: `toScale [0, 4, 7] "0 1 2 3"` will turn into the pattern `"0 4 7 12"`.

This function assumes your scale fits within an octave; if that's not true, use `toScale'`.

```haskell
toScale = toScale' 12
```

### toScale'

```haskell
:: Num a => Int -> [a] -> Pattern Int -> Pattern a
```

As `toScale`, though allowing scales of arbitrary size.

An example:

```haskell
toScale' 24 [0,4,7,10,14,17] (run 8)
```

turns into `"0 4 7 10 14 17 24 28"`.

### swingBy

```haskell
:: Pattern Time -> Pattern Time -> Pattern a -> Pattern a
```

`swingBy x n` divides a cycle into `n` slices and delays the notes in the second half of each slice by `x` fraction of a slice.

### swing

```haskell
:: Pattern Time -> Pattern a -> Pattern a
```

As `swingBy`, with the cycle division set to ⅓.

### cycleChoose

```haskell
:: [a] -> Pattern a
```

`cycleChoose` is like `choose` but only picks a new item from the list once each cycle

### _rearrangeWith

```haskell
:: Pattern Int -> Int -> Pattern a -> Pattern a
```

Internal function used by `shuffle` and `scramble`.

### shuffle

```haskell
:: Pattern Int -> Pattern a -> Pattern a
```

`shuffle n p` evenly divides one cycle of the pattern `p` into `n` parts, and returns a random permutation of the parts each cycle. For example,

```haskell
shuffle 3 "a b c"
```

could return `"a b c"`, `"a c b"`, `"b a c"`, `"b c a"`, `"c a b"`, or `"c b a"`. But it will *never* return `"a a a"`, because that is not a permutation of the parts.

### _shuffle

```haskell
:: Int -> Pattern a -> Pattern a
```

### scramble

```haskell
:: Pattern Int -> Pattern a -> Pattern a
```

`scramble n p` is like `shuffle` but randomly selects from the parts of `p` instead of making permutations. For example,

```haskell
scramble 3 "a b c"
```

will randomly select 3 parts from `"a"`, `"b"`, and `"c"`, possibly repeating a single part.

### _scramble

```haskell
:: Int -> Pattern a -> Pattern a
```

### randrun

```haskell
:: Int -> Pattern Int
```

`randrun n` generates a pattern of random integers less than `n`.

The following plays random notes in an octave:

```haskell
d1 $ s "superhammond!12" # n (fromIntegral $ randrun 13)
```


## Composing patterns

### seqP

```haskell
:: [(Time, Time, Pattern a)] -> Pattern a
```

The function `seqP` allows you to define when a sound within a list starts and ends. The code below contains three separate patterns in a stack, but each has different start times (zero cycles, eight cycles, and sixteen cycles, respectively). All patterns stop after 128 cycles:

```haskell
d1 $ seqP [
  (0, 128, sound "bd bd*2"),
  (8, 128, sound "hh*2 [sn cp] cp future*4"),
  (16, 128, sound (samples "arpy*8" (run 16)))
]
```

### ur

```haskell
:: Time -> Pattern String -> [(String, Pattern a)] -> [(String, Pattern a -> Pattern a)] -> Pattern a
```

The `ur` function is designed for longer form composition, by allowing you to create "patterns of patterns" in a repeating loop. It takes four parameters: how long the loop will take, a pattern giving the structure of the composition, a lookup table for named patterns to feed into that structure, and a second lookup table for named transformations/effects.

The *ur-* prefix comes from German and means "proto-" or "original". For a mnemonic device, think of this function as assembling a set of original patterns (*ur*-patterns) into a larger, newer whole.

Lets say you had three patterns (called a, b and c), and that you wanted to play them four cycles each, over twelve cycles in total. Here is one way to do it:

```haskell
let
  pats =
    [ ("a", stack [ n "c4 c5 g4 f4 f5 g4 e5 g4" # s "superpiano" # gain "0.7"
                  , n "[c3,g4,c4]" # s "superpiano" # gain "0.7"
                  ]
      )
    , ("b", stack [ n "d4 c5 g4 f4 f5 g4 e5 g4" # s "superpiano" # gain "0.7"
                  , n "[d3,a4,d4]" # s "superpiano" # gain "0.7"
                  ]
      )
    , ("c", stack [ n "f4 c5 g4 f4 f5 g4 e5 g4" # s "superpiano" # gain "0.7"
                  , n "[f4,c5,f4]" # s "superpiano" # gain "0.7"
                  ]
      )
    ]
in
  d1 $ ur 12 "a b c" pats []
```

### inhabit

```haskell
:: [(String, Pattern a)] -> Pattern String -> Pattern a
```

A simpler version of `ur` that just provides name-value bindings that are reflected in the provided pattern.

### spaceOut

```haskell
:: [Time] -> Pattern a -> Pattern a
```

`spaceOut xs p` repeats a `Pattern p` at different durations given by the list of time values in `xs`.

### flatpat

```haskell
:: Pattern [a] -> Pattern a
```

`flatpat` takes a `Pattern` of lists and pulls the list elements as separate `EventFs`.

### layer

```haskell
:: [a -> Pattern b] -> a -> Pattern b
```

`layer` takes a list of `Pattern`-returning functions and a seed element, stacking the result of applying the seed element to each function in the list.

### arpeggiate

```haskell
:: Pattern a -> Pattern a
```

`arpeggiate` finds events that share the same timespan, and spreads them out during that timespan, so for example `arpeggiate "[bd,sn]"` gets turned into `"bd sn"`. Useful for creating arpeggios/broken chords.

### arpg

```haskell
:: Pattern a -> Pattern a
```

Shorthand alias for `arpeggiate`.

### arpWith

```haskell
:: ([EventF (ArcF Time) a] -> [EventF (ArcF Time) b]) -> Pattern a -> Pattern b
```

### arp

```haskell
:: Pattern String -> Pattern a -> Pattern a
```

The `arp` function takes an additional pattern of arpeggiation modes. For example:

```haskell
d1 $ sound "superpiano" # n (arp "down diverge" "e'7sus4'8")
```

The different arpeggiation modes are:

`up down updown downup up&down down&up converge diverge disconverge pinkyup pinkyupdown thumbup thumbupdown-`

### _arp

```haskell
:: String -> Pattern a -> Pattern a
```

### rolled

```haskell
:: Pattern a -> Pattern a
```

`rolled` plays each note of a chord quickly in order, as opposed to simultaneously; to give a chord a harp-like effect. This will be played from the lowest note to the highest note of the chord:

```haskell
rolled $ n "cmaj4" # s "superpiano"
```

```haskell
rolled = rolledBy (1/4)
```

### rolledBy

```haskell
:: Pattern (Ratio Integer) -> Pattern a -> Pattern a
```

### rolledWith

```haskell
:: Ratio Integer -> Pattern a -> Pattern a
```

### ply

```haskell
:: Pattern Rational -> Pattern a -> Pattern a
```

`ply n` repeats each event `n` times within its arc.

### _ply

```haskell
:: Rational -> Pattern a -> Pattern a
```

### plyWith

```haskell
:: (Ord t, Num t) => Pattern t -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

As `ply`, but applies a function each time. The applications are compounded.

### _plyWith

```haskell
:: (Ord t, Num t) => t -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

### press

```haskell
:: Pattern a -> Pattern a
```

Syncopates a rhythm, shifting each event halfway into its arc (aka timespan), e.g. `"a b [c d] e"` becomes the equivalent of `"[~ a] [~ b] [[~ c] [~ d]] [~ e]"`

### pressBy

```haskell
:: Pattern Time -> Pattern a -> Pattern a
```

Like `press`, but allows you to specify the amount in which each event is shifted. `pressBy 0.5` is the same as `press`, while `pressBy (1/3)` shifts each event by a third of its arc.

### _pressBy

```haskell
:: Time -> Pattern a -> Pattern a
```

### sew

```haskell
:: Pattern Bool -> Pattern a -> Pattern a -> Pattern a
```

Uses the first (binary) pattern to switch between the following two patterns. The resulting structure comes from the source patterns, not the binary pattern. See also `stitch`.

### stitch

```haskell
:: Pattern Bool -> Pattern a -> Pattern a -> Pattern a
```

Uses the first (binary) pattern to switch between the following two patterns. The resulting structure comes from the binary pattern, not the source patterns. See also `sew`.

### while

```haskell
:: Pattern Bool -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

A binary pattern is used to conditionally apply a function to a source pattern. The function is applied when a `true` value is active, and the pattern is let through unchanged when a `false` value is active. No events are let through where no binary values are active.

### stutter

```haskell
:: Integral i => i -> Time -> Pattern a -> Pattern a
```

`stutter n t pat` repeats each event in `pat` `n` times, separated by `t` time (in fractions of a cycle). It is like echo that doesn't reduce the volume, or `ply` if you controlled the timing.

```haskell
d1 $ stutter 4 (1/16) $ s "bd cp"
```

is functionally equivalent to

```haskell
d1 $ stut 4 1 (1/16) $ s "bd cp"
```

### jux

```haskell
:: (Pattern ValueMap -> Pattern ValueMap) -> Pattern ValueMap -> Pattern ValueMap
```

The `jux` function creates strange stereo effects, by applying a function to a pattern, but only in the right-hand channel. For example, the following reverses the pattern on the right-hand side:

```haskell
d1 $ slow 32 $ jux (rev) $ striateBy 32 (1/16) $ sound "bev"
```

When passing pattern transforms to functions like `jux` and `every`, it's possible to chain multiple transforms together with `.`. For example this both reverses and halves the playback speed of the pattern in the right-hand channel:

```haskell
d1 $ slow 32 $ jux ((# speed "0.5") . rev) $ striateBy 32 (1/16) $ sound "bev"
```

### juxcut

```haskell
:: (Pattern ValueMap -> Pattern ValueMap) -> Pattern ValueMap -> Pattern ValueMap
```

### juxcut'

```haskell
:: [t -> Pattern ValueMap] -> t -> Pattern ValueMap
```

### jux'

```haskell
:: [t -> Pattern ValueMap] -> t -> Pattern ValueMap
```

In addition to `jux`, `jux'` allows using a list of pattern transform. Resulting patterns from each transformation will be spread via pan from left to right.

For example:

```haskell
d1 $ jux' [iter 4, chop 16, id, rev, palindrome] $ sound "bd sn"
```

will put `iter 4` of the pattern to the far left and palindrome to the far right. In the centre the original pattern will play and mid left mid right the chopped and the reversed version will appear.

One could also write:

```haskell
d1 $ stack
      [ iter 4 $ sound "bd sn" # pan "0"
      , chop 16 $ sound "bd sn" # pan "0.25"
      , sound "bd sn" # pan "0.5"
      , rev $ sound "bd sn" # pan "0.75"
      , palindrome $ sound "bd sn" # pan "1"
      ]
```

### jux4

```haskell
:: (Pattern ValueMap -> Pattern ValueMap) -> Pattern ValueMap -> Pattern ValueMap
```

Multichannel variant of `jux`, _not sure what it does_

### juxBy

```haskell
:: Pattern Double -> (Pattern ValueMap -> Pattern ValueMap) -> Pattern ValueMap -> Pattern ValueMap
```

With `jux`, the original and effected versions of the pattern are panned hard left and right (i.e., panned at 0 and 1). This can be a bit much, especially when listening on headphones. The variant `juxBy` has an additional parameter, which brings the channel closer to the centre. For example:

```haskell
d1 $ juxBy 0.5 (density 2) $ sound "bd sn:1"
```

In the above, the two versions of the pattern would be panned at 0.25 and 0.75, rather than 0 and 1.

### pick

```haskell
:: String -> Int -> String
```

Given a sample's directory name and number, this generates a string suitable to pass to `fromString` to create a `Pattern String`. `samples` is a `Pattern`-compatible interface to this function.

```haskell
pick name n = name ++ ":" ++ show n
```

### samples

```haskell
:: Applicative f => f String -> f Int -> f String
```

Given a pattern of sample directory names and a of pattern indices create a pattern of strings corresponding to the sample at each name-index pair.

An example:

```haskell
samples "jvbass [~ latibro] [jvbass [latibro jvbass]]" ((1%2) rotL slow 6 "[1 6 8 7 3]")
```

The type signature is more general here, but you can consider this to be a function of type `Pattern String -> Pattern Int -> Pattern String`.

```haskell
samples = liftA2 pick
```

### samples'

```haskell
:: Applicative f => f String -> f Int -> f String
```

Equivalent to `samples`, though the sample specifier pattern (the `f Int`) will be evaluated first. Not a large difference in the majority of cases.

### spreadf

```haskell
:: [a -> Pattern b] -> a -> Pattern b
```

### stackwith

```haskell
:: Unionable a => Pattern a -> [Pattern a] -> Pattern a
```

### range

```haskell
:: Num a => Pattern a -> Pattern a -> Pattern a -> Pattern a
```

`range` will take a pattern which goes from 0 to 1 (like sine), and range it to a different range — between the first and second arguments. In the below example, `range 1 1.5` shifts the range of `sine1` from 0 – 1 to 1 – 1.5.

```haskell
d1 $ jux (iter 4) $ sound "arpy arpy:2*2"
  |+ speed (slow 4 $ range 1 1.5 sine1)
```

### _range

```haskell
:: (Functor f, Num b) => b -> b -> f b -> f b
```

### rangex

```haskell
:: (Functor f, Floating b) => b -> b -> f b -> f b
```

`rangex` is an exponential version of `range`, good for using with frequencies. Do *not* use negative numbers or zero as arguments!

### off

```haskell
:: Pattern Time -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

### _off

```haskell
:: Time -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

### offadd

```haskell
:: Num a => Pattern Time -> Pattern a -> Pattern a -> Pattern a
```

### step

```haskell
:: String -> String -> Pattern String
```

Step sequencing.

### steps

```haskell
:: [(String, String)] -> Pattern String
```

### step'

```haskell
:: [String] -> String -> Pattern String
```

Like `step`, but allows you to specify an array of strings to use for 0,1,2,…

### ghost''

```haskell
:: Time -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

Deprecated backwards-compatible alias for `ghostWith`.

### ghostWith

```haskell
:: Time -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

Like `ghost'`, but a user-supplied function describes how to alter the pattern.

### ghost'

```haskell
:: Time -> Pattern ValueMap -> Pattern ValueMap
```

### ghost

```haskell
:: Pattern ValueMap -> Pattern ValueMap
```

As `ghost`, but with the copies set to appear one-eighth of a cycle afterwards.

```haskell
ghost = ghost' 0.125
```

### tabby

```haskell
:: Int -> Pattern a -> Pattern a -> Pattern a
```

A more literal weaving than the `weave` function. Given `tabby threads p1 p`, parameters representing the threads per cycle and the patterns to weave, and this function will weave them together using a plain (aka "tabby") weave, with a simple over/under structure.

### select

```haskell
:: Pattern Double -> [Pattern a] -> Pattern a
```

Chooses between a list of patterns, using a pattern of floats (from 0-1)

### _select

```haskell
:: Double -> [Pattern a] -> Pattern a
```

### selectF

```haskell
:: Pattern Double -> [Pattern a -> Pattern a] -> Pattern a -> Pattern a
```

Chooses between a list of functions, using a pattern of floats (from 0-1).

### _selectF

```haskell
:: Double -> [Pattern a -> Pattern a] -> Pattern a -> Pattern a
```

### pickF

```haskell
:: Pattern Int -> [Pattern a -> Pattern a] -> Pattern a -> Pattern a
```

Chooses between a list of functions, using a pattern of integers.

### _pickF

```haskell
:: Int -> [Pattern a -> Pattern a] -> Pattern a -> Pattern a
```

### contrast

```haskell
:: (ControlPattern -> ControlPattern)
-> (ControlPattern -> ControlPattern)
-> ControlPattern
-> ControlPattern
-> ControlPattern
```

`contrast p f f' p'` splits the control `pattern p'` in two, applying the function `f` to one and `f'` to the other. This depends on whether events in it contains values matching with those in `p`. For example, in

```haskell
contrast (# crush 3) (# vowel "a") (n "1") $ n "0 1" # s "bd sn" # speed 3
```

the first event will have the vowel effect applied, and the second will have the crush applied.

### contrastBy

```haskell
:: (a -> Value -> Bool) -> (ControlPattern -> Pattern b) -> (ControlPattern -> Pattern b) -> Pattern (Map String a) -> Pattern (Map String Value) -> Pattern b
```

### contrastRange

```haskell
:: (ControlPattern -> Pattern a) -> (ControlPattern -> Pattern a) -> Pattern (Map String (Value, Value)) -> ControlPattern -> Pattern a
```

### fix

```haskell
:: (ControlPattern -> ControlPattern) -> ControlPattern -> ControlPattern -> ControlPattern
```

Like `contrast`, but one function is given, and applied to events with matching controls.

### unfix

```haskell
:: (ControlPattern -> ControlPattern) -> ControlPattern -> ControlPattern -> ControlPattern
```

Like `contrast`, but one function is given, and applied to events with controls which don't match.

### fixRange

```haskell
:: (ControlPattern -> Pattern ValueMap) -> Pattern (Map String (Value, Value)) -> ControlPattern -> ControlPattern
```

### unfixRange

```haskell
:: (ControlPattern -> Pattern ValueMap) -> Pattern (Map String (Value, Value)) -> ControlPattern -> ControlPattern
```

### quantise

```haskell
:: (Functor f, RealFrac b) => b -> f b -> f b
```

Limits values in a `Pattern` (or other `Functor`) to `n` equally spaced divisions of 1.

### qfloor

```haskell
:: (Functor f, RealFrac b) => b -> f b -> f b
```

As `quantise`, but uses `floor` to calculate divisions.

### qceiling

```haskell
:: (Functor f, RealFrac b) => b -> f b -> f b
```

As `quantise`, but uses `ceiling` to calculate divisions.

### qround

```haskell
:: (Functor f, RealFrac b) => b -> f b -> f b
```

An alias for `quantise`.

### inv

```haskell
:: Functor f => f Bool -> f Bool
```

Inverts all the values in a boolean pattern

### mono

```haskell
:: Pattern a -> Pattern a
```

Serialises a pattern, so there's only one event playing at any one time, making it monophonic. Events which start/end earlier are given priority.

### smooth

```haskell
:: Fractional a => Pattern a -> Pattern a
```

`smooth` receives a pattern of numbers and linearly goes from one to the next, passing through all of them. As time is cycle-based, after reaching the last number in the pattern, it will smoothly go to the first one again.

```haskell
d1 $ sound "bd*4" # pan (slow 4 $ smooth "0 1 0.5 1")
```

This sound will pan gradually from left to right, then to the centre, then to the right again, and finally comes back to the left.

### swap

```haskell
:: Eq a => [(a, b)] -> Pattern a -> Pattern b
```

Looks up values from a list of tuples, in order to swap values in the given pattern

### snowball

```haskell
:: Int
-> (Pattern a -> Pattern a -> Pattern a)
-> (Pattern a -> Pattern a)
-> Pattern a
-> Pattern a
```

`snowball` takes a function that can combine patterns (like `+`), a function that transforms a pattern (like `slow`), a depth, and a starting pattern.
It will then transform the pattern and combine it with the last transformation until the depth is reached. This is like putting an effect (like a filter) in the feedback of a delay line; each echo is more affected.

```haskell
d1
  $ note
      ( scale "hexDorian"
      $ snowball 8 (+) (slow 2 . rev) "0 ~ . -1 . 5 3 4 . ~ -2"
      )
  # s "gtr"
```

### soak

```haskell
:: Int -> (Pattern a -> Pattern a) -> Pattern a -> Pattern a
```

### deconstruct

```haskell
:: Int -> Pattern String -> String
```

`construct n p` breaks `p` into pieces and then reassembles them so that it fits into `n` steps.

### bite

```haskell
:: Pattern Int -> Pattern Int -> Pattern a -> Pattern a
```

`bite n ipat pat` slices a pattern `pat` into `n` pieces, then uses the `ipat` pattern of integers to index into those slices. So

```haskell
bite 4 "0 2*2" (run 8)
```

is the same as `"[0 1] [4 5]*2"`.

### _bite

```haskell
:: Int -> Pattern Int -> Pattern a -> Pattern a
```

### squeeze

```haskell
:: Pattern Int -> [Pattern a] -> Pattern a
```

`squeeze` uses a pattern of integers to index into a list of patterns.

### squeezeJoinUp

```haskell
:: Pattern ControlPattern -> ControlPattern
```

### _chew

```haskell
:: Int -> Pattern Int -> ControlPattern -> ControlPattern
```

### chew

```haskell
:: Pattern Int -> Pattern Int -> ControlPattern -> ControlPattern
```

`chew` works the same as `bite`, but speeds up/slows down playback of sounds as well as squeezing/contracting the slices of the provided pattern.

### __binary

```haskell
:: Bits b => Int -> b -> [Bool]
```

### _binary

```haskell
:: Bits b => Int -> b -> Pattern Bool
```

### _binaryN

```haskell
:: Int -> Pattern Int -> Pattern Bool
```

### binaryN

```haskell
:: Pattern Int -> Pattern Int -> Pattern Bool
```

### binary

```haskell
:: Pattern Int -> Pattern Bool
```

### ascii

```haskell
:: Pattern String -> Pattern Bool
```

### grain

```haskell
:: Pattern Double -> Pattern Double -> ControlPattern
```

Given a start point and a duration (both specified in cycles), this generates a control pattern that makes a sound begin at the start point and last the duration.

```haskell
grain s d = begin s # end (s+d)
```

### necklace

```haskell
:: Rational -> [Int] -> Pattern Bool
```

For specifying a boolean pattern according to a list of offsets (aka inter-onset intervals). For example `necklace 12 [4,2]` is the same as `"t f f f t f t f f f t f"`. That is, 12 steps per cycle, with true values alternating between every 4 and every 2 steps.
