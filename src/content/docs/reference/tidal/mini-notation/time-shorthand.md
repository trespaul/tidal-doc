---
title: Time shorthand
---

When dealing with time functions, many times we need to specify times shorter than a cycle by using fractions or decimal numbers.

Alternately, we can use textual shorthands to refer to the most common durations.

For example, we can swap `0.25` or `1/4` for the shorthand `q`, which stands for a *q*uarter of a cycle.

These three examples are equivalent:

```haskell
d1 $ off 0.25 (|+ n 7) $ n "c e" # sound "supermandolin"
d1 $ off (1/4) (|+ n 7) $ n "c e" # sound "supermandolin"
d1 $ off "q" (|+ n 7) $ n "c e" # sound "supermandolin"
```

Here's the current list of shorthands available:

|       | Fraction | Decimal | Mnemonic      |
|:-----:|:---------|:--------|:--------------|
| **w** | 1        |         | **w**hole     |
| **h** | 1/2      | 0.5     | **h**alf      |
| **t** | 1/3      |         | **t**hird     |
| **q** | 1/4      | 0.25    | **q**uarter   |
| **f** | 1/5      | 0.2     | **f**ifth     |
| **x** | 1/6      |         | si**x**th     |
| **e** | 1/8      | 0.125   | **e**ighth    |
| **s** | 1/16     | 0.0624  | **s**ixteenth |

We can prefix these shorthand with a number to have multiples. These two examples sound the same:

```haskell
d1 $ stack [
        s "[bd,co sd bd sd]",
        pressBy "<0 0.25 0.5 0.75>" $ s "cp"
      ]

d1 $ stack [
        s "[bd,co sd bd sd]",
        pressBy "<0 q h 3q>" $ s "cp"
      ]
```

For a 32nd, you could do `0.5s`:

```haskell
d1 $ echo 4 "0.5s" 0.9 $ sound "hh"
```

You can only use these shorthands on any function that receives a `Pattern`. This will work:

```haskell
d1 $ s "bd" # delaytime "x" # delay 0.8 # delayfb 0.4
```

But this won't (as `compress` needs a `Time`, not a `Pattern Time`):

```haskell
d1 $ compress ("q", "3q") $ s "[bd sn]!" -- ERROR
```
