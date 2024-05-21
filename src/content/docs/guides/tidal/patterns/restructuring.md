---
title: Restructure your patterns using functions
---

In this guide, you will learn how to reshape your patterns using functions. These functions change the structure of the patterns, but don't modify the values themselves. They do that by repeating, reordering, and/or removing events.

## The basics: repeat, reorder and remove

### Repeat with `ply`

The `ply` function subdivides and repeats each event the given number of times. For example:

```haskell
d1 $ ply 3 $ s "bd ~ sn cp"
```
... is equivalent to ...

```haskell
d1 $ s "[bd bd bd] ~ [sn sn sn] [cp cp cp]"
```

:::tip
`ply` is equivalent to the `*` **mini-notation** symbol.
:::

The first parameter of `ply` may be given as a pattern, so that:

```haskell
d1 $ ply "2 3" $ s "bd ~ sn cp"
```
... is equivalent to ...

```haskell
d1 $ s "[bd bd] ~ [sn sn sn] [cp cp cp]"
```
Here is an example of it being used conditionally:

```haskell
d1 $ every 3 (ply 4) $ s "bd ~ sn cp"
```

#### Advanced repeating with `stutter` and `echo`

If you want to indicate the time that happens between the repetitions, you can use `stutter`. It is like `ply`, but it also takes that time between repetitions (in fractions of a cycle) as a parameter after the number of subdivisions. These lines are equivalent:

```haskell
d1 $ stutter 4 (1/8) $ s "bd cp"


d1 $ ply 4 $ s "bd cp"
```

Note that you can use negative time values:

```haskell
d1 $ spreadf [stutter 4 (1/16), stutter 4 (-1/16)] $ s "bd cp"

d2 $ s "arp"
```

If you want to reduce the volume each repetition, you can use `echo`, which takes the volume reduction as another parameter after the time between repetitions. These lines are equivalent:

```haskell
d1 $ stutter 4 (1/16) $ s "bd cp"

d1 $ echo 4 (1/16) 1 $ s "bd cp"
```

### Reorder with `rev` and `rot`

#### Reverse with `rev`

`rev` returns a 'reversed' version of the given pattern.

For example `rev "1 [~ 2] ~ 3"` is equivalent to rev `"3 ~ [2 ~] 1"`.

In practice, it is generally used with conditionals, for example, with `every`:

```haskell
d1 $ every 2 rev $ n "0 1 [~ 2] 3" # sound "arpy"
```

In fact, this is so common that there's a shorthand function for `every 2 rev`: `palindrome`. So the above example would be equivalent to the following:

```haskell
d1 $ palindrome $ n "0 1 [~ 2] 3" # sound "arpy"
```

#### Rotate with `rot`

The `rot` function 'rotates' the values in a pattern, while preserving its structure. For example in the following, each value will shift to its neighbour's position one step to the left, so that `b` takes the place of `a`, `a` of `c`, and `c` of `b`:

```haskell
rot 1 "a ~ b c"
```
The result is equivalent of:
```haskell
"b ~ c a"
```
The first parameter is the number of steps, and may be given as a pattern, for example:
```haskell
d1 $ rot "<0 0 1 3>" $ n "0 ~ 1 2 0 2 ~ 3*2" # sound "drum"
```
The above will not rotate the pattern for the first two cycles, will rotate it by one the third cycle, and by three the fourth cycle.


### Remove with `degrade` and `trunc`

#### Randomly remove events with `degrade`

`degrade` randomly removes events from a pattern, `50%` of the time. Example usage:

```haskell
d1 $ slow 2 $ degrade $ sound "[[[feel:5*8,feel*3] feel:3*8], feel*4]"
   # accelerate "-6"
   # speed "2"
```

If you want to control the percentage of events that are removed, you can use the function `degradeBy`. For example, to remove events `90%` of the time:

```haskell
d1 $ slow 2 $ degradeBy 0.9 $ sound "[[[feel:5*8,feel*3] feel:3*8], feel*4]"
   # accelerate "-6"
   # speed "2"
```

:::tip
`degrade` is equivalent to the `?` **mini-notation** symbol.
:::

#### Trim your patterns with `trunc`

`trunc` truncates a pattern so that only a fraction of the pattern is played. The following example plays only the first three quarters of the pattern:

```haskell
d1 $ trunc 0.75 $ sound "bd sn*2 cp hh*4 arpy bd*2 cp bd*2"
```

You can also pattern the first parameter, for example to cycle through three values, one per cycle:

```haskell
d1 $ trunc "<0.75 0.25 1>" $ sound "bd sn:2 [mt rs] hc"
```

#### Repeat your truncated fraction with `linger`

If you want the truncated fraction to repeat during the entire cycle, you can use `linger` instead of `trunc`. For example, this trims everything but the first quarter and repeats it, so you only hear a single repeating note, every fourth cycle:

```haskell
d1 $ every 4 (linger 0.25) $ n "0 2 [3 4] 2" # sound "arpy"
```

or to a chopped-up sample:

```haskell
d1 $ every 2 (linger 0.25) $ loopAt 2 $ chop 8 $ sound "breaks125"
```

You can also pattern the first parameter, for example to cycle through three values, one per cycle:
```haskell
d1 $ linger "<0.75 0.25 1>" $ sound "bd sn:2 [mt rs] hc"
```

## Pattern fragmenting and reordering

### Divide your pattern

If you want to divide your pattern into a given number of equal sized fragments, you just need to combine it with another pattern with equally spaced events. The following divides the pattern into three fragments, and then plays those fragments in turn:

``` haskell
d1 $ "t*3" |>| sound "sax sax:1" # cut 1
```

That is equivalent to the following:

``` haskell
d1 $ sound "sax [sax sax:1] sax:1" # cut 1
```

The functions presented next provide ways to change the order of these fragments.

### Pattern your fragmented pattern with `bite`

If you want to have maximum flexibility in reordering the fragments, you can use the `bite` function, which lets you pattern them by number. These two lines are equivalent:

``` haskell
d1 $ "t*3" |>| sound "sax sax:1" # cut 1

d1 $ bite 3 "0 1 2" $ s "sax sax:1" # cut 1
```

You can now, of course, reorder those fragments:

```haskell
d1 $ bite 3 "0 1 2 1 1*2" $ s "sax sax:1" # cut 1
```

Note how `bite` is similar to `slice`, but slices patterns rather than samples. Compare the difference between the two:

```haskell
d1 $ bite 4 "0 1 2 3" $ s "sax sax:1!2" # cut 1

d1 $ slice 4 "0 1 2 3" $ s "sax sax:1!2" # cut 1
``` 

If you want the slices to be automatically sped up or down for them to fit their 'slot', you can use `chew` instead of `bite`:

```haskell
d1 $ chew 4 "0 1*2 2*2 [~ 3]" $ n (run 8) # sound "drum"
```

### Randomly restructure the fragments with `scramble` and `shuffle`

If you want the fragments to be played randomly (also called "sampling with replacement"), you can use the following:

```haskell
d1 $ bite 4 (segment 4 $ irand 4) $ n (run 8) # sound "drum"
```

There's a more concise way of achieving the same using `scramble`:

```haskell
d1 $ shuffle 4 $ n (run 8) # sound "drum"
```

If instead you want the fragments to be rotated with a random rotation (also called "sampling without replacement"), use `scramble`:

```haskell
d1 $ sound $ scramble 3 "bd sn hh"
```

The above example will sometimes play `"sn bd hh"` or `"hh sn bd"`, but will never play `"bd sn bd"` or `"hh hh hh"`, because that isn't a permutation of the three parts.

### Sequentially rotate the fragments with `iter`

If instead of randomly scrambling the fragmented pattern in permutations, you want to sequentially rotate those fragments, you can use `iter`, which plays the fragments in order, but increments the starting one each cycle.

```haskell
d1 $ iter 4 $ sound "bd hh sn cp"
```

The previous example will produce the following over four cycles:

```haskell
bd hh sn cp
hh sn cp bd
sn cp bd hh
cp bd hh sn
```

If you want to go in the reverse direction, use `iter'`.


### Sequentially apply effects with `chunk`

If instead of rotating the fragments, you want to apply a function to a single fragment every cycle, you can use `chunk`:

```haskell
d1 $ chunk 4 (# speed 2) $ sound "bd hh sn cp"
```

The below highlights in uppercase which part of the above pattern has the (# speed 2) function applied to it over four cycles:
```plaintext
BD hh sn cp
bd HH sn cp
bd hh SN cp
bd hh sn CP
```

Another example:
```haskell
d1 $ chunk 4 (hurry 2) $ sound "bd sn:2 [~ bd] sn:2"
```

If you want to cycle in the reverse direction, use `chunk'`.

## Other options for restructuring the patterns

### loopFirst

`loopFirst` is a function that takes a pattern and loops only the first cycle of the pattern. For example, in the following code will only play the bass drum sample.
```haskell
d1 $ loopFirst $ s "<<bd*4 ht*8> cp*4>"
```

This function combines with sometimes to insert events from the first cycle randomly into subsequent cycles of the pattern:
```haskell
d1 $ sometimes loopFirst $ s "<<bd*4 ht*8> cp*4>"
```

### Sidechain gating with `mask`

`mask` takes a boolean pattern and 'masks' another pattern with it. That is, it works as a sidechained gate: events are only carried over if they match within a 'true' event in the binary pattern. For example, consider this kind of messy rhythm without any rests:

```haskell
d1 $ sound (cat ["sn*8", "[cp*4 bd*4, hc*5]"]) # n (run 8)
```
If we apply a mask to it:

```haskell
d1 $ mask "t t t ~ t t ~ t"
  $ s (cat ["sn*8", "[cp*4 bd*4, bass*5]"])
  # n (run 8)
```
Due to the use of `cat` here, the same mask is first applied to `"sn*8"` and in the next cycle to `"[cp4 bd4, hc*5]"`.

You could achieve the same effect by adding rests within the `cat` patterns, but mask allows you to do this more easily. It kind of keeps the rhythmic structure and you can change the used samples independently:

```haskell
d1 $ mask "1 ~ 1 ~ 1 1 ~ 1"
  $ s (cat ["can*8", "[cp*4 sn*4, jvbass*16]"])
  # n (run 8)
```

## Functions about speed... should go with related functions `slow` and `fast`

### stripe

The `stripe` function repeats a pattern at random speeds. The first parameter gives the number of cycles to operate over, for example `stripe 2` will repeat a pattern twice, over two cycles. Each cycle will be played at a random speed, but in such a way that the total duration will be the same.

For example in the following example, the start of every third repetition of the `d1` pattern will match with the clap on the d2 pattern.

```haskell
d1 $ stripe 3 $ sound "bd sd ~ [mt ht]"

d2 $ sound "cp"
```

### slowstripe

The `slowstripe` function is the same as `stripe` but the result is also slowed down by `n` time (where `n` is the first parameter of the function. This means that the mean average duration of the stripes is exactly one cycle, and every nth stripe starts on a cycle boundary (in indian classical terms, the sam). Usage:

```haskell
d1 $ slowstripe 3 $ sound "bd sd ~ [mt ht]"

d2 $ sound "cp"
```

## Functions about applying effects to patterns (spread and its friends)

### spread

The `spread` function allows you to take a pattern transformation which takes a parameter, such as `slow`, and provide several parameters which are switched between. In other words it 'spreads' a function across several values. Taking a simple high hat loop as an example:

```haskell
d1 $ sound "ho ho:2 ho:3 hc"
```
We can speed it up by different amounts, such as by 2x:
```haskell
d1 $ fast 2 $ sound "ho ho:2 ho:3 hc"
```
Or by 3x:

```haskell
d1 $ fast 3 $ sound "ho ho:2 ho:3 hc"
```

But if we use `spread`, we can make a pattern which alternates between the two speeds:
```haskell
d1 $ spread fast[2,3] $ sound "ho ho:2 ho:3 hc"
```

Note that many functions now allow pattern input. This is equivalent to the above:
```haskell
d1 $ fast "<2 3>" $ sound "ho ho:2 ho:3 hc"
```

Note that if you pass (`$`) as the function to spread values over, you can put different functions as the list of values. For example:
```haskell
d1 $ spread ($) [density 2, rev, slow 2, striate 3, (# speed "0.8")] $ sound "[bd*2 [~ bd]] [sn future]*2 cp jvbass*4"
```
Above, the pattern will have these transforms applied to it, one at a time, per cycle:

```plaintext
cycle 1: density 2 - pattern will increase in speed
cycle 2: rev - pattern will be reversed
cycle 3: slow 2 - pattern will decrease in speed
cycle 4: striate 3 - pattern will be granualized
cycle 5: (# speed "0.8") - pattern samples will be played back more slowly
```
After `(# speed "0.8")`, the transforms will repeat and start at `density 2` again.

(This is the same as `slowspread` in earlier versions of TidalCycles.)

### spreadf

A convenient shorthand for spread (`$`).

### fastspread

`fastspread` works the same as `spread`, but the result is squashed into a single cycle. If you gave four values to `spread`, then the result would seem to speed up by a factor of four. Compare these two:

```haskell
d1 $ spread ($) [gap 4, striate 4] $ sound "ho ho:2 ho:3 hc"
d1 $ fastspread ($) [gap 4, striate 4] $ sound "ho ho:2 ho:3 hc"
```

### spreadChoose

`spreadChoose` (alias `spreadr`) works the same as spread, but the values are selected at random, one cycle at a time. For example:

```haskell
d1 $ spreadChoose ($) [gap 4, striate 4] $ sound "ho ho:2 ho:3 hc"
```