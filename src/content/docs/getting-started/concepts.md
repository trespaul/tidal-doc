---
title: The basic concepts
---

The fundamental concepts in TidalCycles are cycles and patterns.
This page explains these and how they are used in Tidal, and also explains "mini-notation", the shorthand for patternmaking.
Feel free to read this page as closely as you like;
if you prefer a more practical introduction, skim this page and move on to the next, which is where you'll make your first decent sounds.

## Cycles

Time in traditional European music notation and modern sequencers is generally linear.
This means that playing a piece of music involves going from a clear start through to a clear end, and that's it.

In TidalCycles, by contrast, time is *cyclical*. In other words, time is tracked as going around and around a circle, continuing infinitely (theoretically speaking).
Sound is programmed to happen at specific times in relation to a cycle — usually by subdividing the cycle into fractions — by using *patterns*.

![cycle](./assets/cycles.svg)

If you have used a looper before, the idea of cyclical time might sound familiar.
In Tidal, however, you'll find that this idea is at the core of how everything is put together.
This means that Tidal can backtrack or fast-forward in time, because you can actually predict what will happen `x` cycles into the future, or, sometimes, what happened `x` cycles ago.

This also means that Tidal does not measure tempo using beats per minute (BPM), but rather *cycles per second* (CPS).
Tempos are specified using the `setcps` function, e.g., `setcps 0.5625`.
For more, including how to convert from BPM, see the [tempo guide page](/guides/usage/tempo/).

### Dividing the cycle 

Enter the following pattern in your text editor and evaluate it:

```haskell
d1 $ s "bd hh bd hh"
```

(Don't worry about the specific meaning of all the characters for now, they'll be explained later.)

By specifying four sounds — `bd`, `hh`, `bd`, and `hh` — you just divided a cycle in four equal parts. Compare that with:

```haskell
d1 $ s "bd hh hh"
```

Now, the cycle is being divided into three equal parts, so you might have noticed that it slowed down a little.

You can superimpose patterns that will divide the cycle in different subdivisions. It means that Tidal is a rather good tool to explore polyrhythm and rhythmic intricacies:

```haskell
d1 $ s "bd hh hh"

d2 $ s "hh:2 ~ hh:3 cp"
```

### Visualising cycles

Tidal has some built-in features to help visualise the output of a given pattern.

(For a more in-depth overview of different methods of visualisation, see the [visualisation guide page](/guides/connections/visualisation/).)

Evaluate the following:

```haskell
"1 2 3"
```

You should see this result in the logs (the `ghci` window): 

```
(0>⅓)|"1"
(⅓>⅔)|"2"
(⅔>1)|"3"
```

This indicates that, in the `"1 2 3"` pattern, the `"1"`, `"2"`, and `"3"` events take place in the fraction of the cycle ranging from 0 to ⅓, ⅓ to ⅔, and ⅔ to 1, respectively.

To show patterns more visually, you can use the `drawLine` function:

```haskell
drawLine "a b*2 d"
```

You might get something that looks like this:
```
[11 cycles]
|a-bbd-|a-bbd-|a-bbd-|a-bbd-|a-bbd-|a-bbd-|a-bbd-|a-bbd-|a-bbd-|a-bbd-|a-bbd-
```


## Patterns

### Declaring patterns

Patterns are always declared using `p` (for "pattern") and a specific name or identifier, followed by the content of the pattern.
These patterns are "connections" to the SuperDirt synthesiser that you can use to play audio samples, synthesisers, and so on.
Each pattern is associated with an `orbit`, a track for effects and audio output.

Patterns can be numbered:

```haskell
p 1234 $ s "bd bd"

p 4321 $ s "hh hh"
```

or named:

```haskell
p "romeo" $ s "bd bd"

p "juliet" $ s "hh*4"
```

`d1` to `d16` are considered, historically, to be the classic pattern names, and are kept for convenience.

The following example uses four different patterns:

```haskell
-- a bass drum
d1 $ s "bd ~ bd ~"

-- high-hat pattern
d2 $ s "[~ hh]*2"

-- 1.. 1.. 1.. 1..
d3 $ s "numbers:1"

-- clap
d4 $ s "cp cp cp"
```

Sometimes, you don't really want a pattern but something that will only play `once`.
Use the `once` function to make a special "once" pattern:

```haskell
once $ s "trump"
```

### Stopping patterns

There are some very convenient commands you can use to stop patterns.

To stop a specific pattern at the next cycle, you can use the `silence` function:

```haskell
p "loudpattern" $ silence
```

You can also control whether a pattern makes sound by muting or soloing them:

```haskell
d1 $ sound "arpy cp arpy:2"
d2 $ sound "sn sn:2 bd sn"

solo 2
-- now only the second pattern will be playing

unsolo 2
-- now both will be playing, again

mute 2
-- now only the first pattern will be playing

unmute 2 -- (or unmuteAll)
-- now both will be playing
```

:::tip
The Pulsar plugin adds some key shortcuts for this common operations, like `Ctrl+1` to toggle mute for the first pattern, or `Ctrl+0` to unmute all. You can see the complete list of keybindings inside Pulsar, by going to `Edit > Preferences > Packages`, selecting tidalcycles, and scrolling down to the `Keybindings` section.
:::

`hush` will stop all the patterns currently running:

```haskell
hush
```

Sometimes, things can go a little bit crazy. For instance, you can end up with numerous synthesisers stacking on the top of each other, leading a gradual loss of control.
To get back in control, use `panic`:

```haskell
panic
```

It behaves just like `hush`, but will also stop all the synthesisers and audio samples currently running on the SuperDirt side.
You should be back to total silence in no time.


### Control patterns

Control functions are used to turn patterns of strings (words) or numbers into control patterns.
A control pattern is a pattern that will determine how sounds are made in SuperDirt.
This includes audio control functions such as `gain` and `pan`, sample manipulation functions such as `begin` and `end`, and effect functions such as `delay` and `shape`.

Everything is patternable!

The default synthesisers, or any SuperDirt synthesiser, can be activated using the `sound` control pattern. Below, `sound` is used to assign a piano synth to a pattern of notes:

```haskell
d1 $ note "c d e f g a"
   # sound "superpiano"
```

Most of the time, however, you will use control patterns to use effects on your patterns. For instance, this drum pattern will be filtered:

```haskell
d1 $ s "bd hh bd hh*2"
   # lpf "500 1000 1500"
   # lpq 0.5
```

You'll see more advanced use of control patterns as you go.


## Writing Tidal code

### Syntax

By now, you've probably wondered how exactly these patterns are composed, and what do `$` and `#` and so on mean anyway?

Firstly, in Haskell, function application is indicated by a space. Consider this pattern definition from before:

```haskell
d1 $ s "bd hh bd hh*2"
   # lpf "500 1000 1500"
   # lpq 0.5
```

Here, the number `0.5` is passed to the `lpq` function, the string (list of characters between quotation marks) `"500 1000 1500"` is passed to the `lpf` function, and the string `"bd hh bd hh*2"` is passed to the `s` function.

These patterns are then combined with the `#` operator, which is exactly what its purpose is (for more, see the [combining patterns guide](/guides/usage/combining-patterns)).

The `$` is similar to `#` ([here's a comparison](/guides/usage/dollarsign/#comparing--and-)) but comes from Haskell itself, and isn't unique to Tidal, which means it works everywhere, not just on patterns.
You can think of it as a "pipe": it indicates that everything to its right should be evaluated first, and then passed ("piped") to the left.
It's mainly used to avoid a bunch of parentheses piling up.
See the [function chaining guide](/guides/usage/dollarsign/) for more.

To make a comment — to tell the interpreter to ignore something — prefix the text with `--` (two dashes) or enclose the text with `{-` and `-}`, like so:

```haskell
{-
   I'm leaving a note for myself in this comment block.
   In the commented line below, I want to keep the text
   for some reason, but I want the interpreter to ignore it.
-}

d1 $ s "bd hh bd hh*2"
   -- # lpf "500 1000 1500"
   # lpf "1000"
   # lpq 0.5
```

### Mini-notation

All the patterns in quotation marks thusfar have been using "mini-notation" syntax.
Mini-notation was created as a way to write patterns much more conveniently than straightforwardly composing functions together.

For example, in `"bd hh bd hh*2"`, the `*` means that the element should be repeated.
On this page, we have also encountered `~`, used to indicate a rest, and `:`, used to select a specific sample from a folder.

On the next page, the notation syntax will be introduced bit-by-bit, but you can also check out the [mini-notation reference page](/reference/mini-notation/mini-notation) for a complete outline of what it can do.
