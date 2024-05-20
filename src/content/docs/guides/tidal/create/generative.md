---
title: Use generative algorithms
---

## Lindenmayer sequences

### step

`step` acts as a kind of simple step-sequencer using strings. For example, `step "sn" "x x 12 "` is equivalent to the pattern of strings given by `"sn ~ sn ~ sn:1 sn:2 ~"`. `step` substitutes the given string for each x, for each number it substitutes the string followed by a colon and the number, and for everything else it puts in a rest.

In other words, `step` generates a pattern of strings in exactly the syntax you'd want for selecting samples and that can be fed directly into the s function.

```haskell
d1 $ s (step "sn" "x x 12 ")
```

If you want to use more than one sound, you can use `step'`, a more general function which uses the numbers in the step-sequencing string as indexes for the list of strings you give it:

```haskell
d1 $ s (step' ["superpiano","supermandolin"] "0 1 000 1") # sustain 4 # n 0
```
is equivalent to

```haskell
d1 $ s "superpiano ~ supermandolin ~ superpiano!3 ~ supermandolin" # sustain 4 # n 0
```

### lindenmayer

`lindenmayer` takes an integer `b`, a Lindenmayer system rule set and an initiating string as input in order to generate an L-system tree string of `b` iterations. It can be used in conjunction with a step function to convert the generated string into a playable pattern. For example:
```haskell
d1 $ slow 16 $ sound $ step' ["feel:0", "sn:1", "bd:0"]
(take 512 $ lindenmayer 5 "0:1~~~,1:0~~~2~~~~~0~~~2~,2:2~1~,~:~~1~"
"0")
```
... generates an L-system with initiating string "0" and maps it onto a list of samples.

Complex L-system trees with many rules and iterations can sometimes result in unwieldy strings. Using `take n` to only use the first `n` elements of the string, along with a `slow` function, can make the generated values more manageable.