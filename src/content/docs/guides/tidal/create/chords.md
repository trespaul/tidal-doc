---
title: Write chords
---

To see the list of available chords, run `import Sound.Tidal.Chords`. This command will import the internal list of chords. Running `chordList` will output the list of the available chords registered by Tidal. Here is the list:

```
major maj aug plus sharp5 six 6 sixNine six9 sixby9 6by9 major7 maj7 major9
maj9 add9 major11 maj11 add11 major13 maj13  add13 dom7 dom9 dom11 dom13
sevenFlat5 7f5 sevenSharp5 7s5 sevenFlat9 7f9 nine eleven 11 thirteen 13 minor
min diminish ed dim minorSharp5 msharp5 mS5 minor6 min6 m6 minorSixNine minor69
min69 minSixNine m69 mSixNine m6by9 minor7flat5 min7f lat5 m7flat5 m7f5 minor7
min7 m7 minor7sharp5 min7sharp5 m7sharp5 m7s5 minor7flat9 min7flat9 m7flat9 m7f9
minor7sharp9 m in7sharp9 m7sharp9 m7s9 diminished7 dim7 minor9 min9 m9 minor11
min11 m11 minor13 min13 m13 one 1 five 5 sus2 sus4 seven Sus2 7sus2 sevenSus4
7sus4 nineSus4 ninesus4 9sus4 sevenFlat10 7f10 nineSharp5 9s5 m9sharp5 m9s5
sevenSharp5flat9 7s5f9  m7sharp5flat9 elevenSharp 11s m11sharp m11s
```

The list above can be combined with a root note using the `'` to use with the synths in Super Dirt like this:

```haskell
d1 $ n "c'maj e'min" # s "supermandolin"
```

Samples tuned to concert C can also be used:
```haskell
d1 $ note "c'maj e'min" # s "gtr"
```

Chord inversions can be achieved by appending the `'` to a chord, along with one or more `i` characters.
The default state, without an `i`, indicates the root position.
A single `i` is the first inversion. A second inversion looks like this:

```haskell
d1 $ n "c'major7'ii" # s "supermandolin"
```

The number of notes in a chord can be modified by appending the `'` to a chord, along with an integer. 6 notes can be played in the above chord inversion like this:

```haskell
d1 $ n "c'major7'6" # s "supermandolin"
```

An Open Voicing for a chord can be created by appending `'o` to a chord. This will move the 1st and 3rd note in a chord 1 octave lower (usually Root and Fifth):

```haskell
d1 $ n "c'major7'o" # s "superpiano"
```

The root can be set as `sharp` or `flat` with `s` or `f` respectively:

```haskell
d1 $ n "cf'maj c'maj cs'maj" # s "supermandolin"
```

The octave can be set with a number. The default is 5:
```haskell
d1 $ n("c4'maj c5'maj c6'maj") # s "supermandolin"
```

The chords can be patterned using the `|+` operator:
```haskell
d1 $ n ("c e f" |+ "<'maj 'min>") # s "supermandolin"
```
This will give a pattern equivalent to:

```haskell
d1 $ n "<[c'maj e'maj f'maj] [c'min e'min f'min]>" # s "supermandolin"
```

## Voicings

<!-- TODO: structure page around specific "issue" (I just copied this section here from the old "harmony and melody" "reference" page) -->

There are a variety of different chord modifiers available, designed to change the way a chord is "voiced" (note ordering, octave choices, etc). A significant amount of discussion on what these should be and how they should work was covered in this [forum thread](https://club.tidalcycles.org/t/rfc-working-on-making-chord-naming-chordlist-more-consistent/2717/52), and (largely) implemented by [polymorphic.engine](https://github.com/tidalcycles/Tidal/pull/931).

All of the different modifiers can be patterned together.

### Number of Chord tones

You can set the number of chord tones in a chord. Extra tones are created by working through the existing list of tones and either duplicating them an octave higher; reducing tones subtracts items from the chord tone list starting from the highest notes. This can also be patterned.

By default, `c'min9` has 5 chord tones `[0,3,7,10,14]` - we can increase that to 8, ie `[0,3,7,10,14,12,15,19]`:

```haskell
d1 $ n "c'min9'8" # sound "superpiano"
```

We can reduce it to 4 chord tones (ie take away the 9th), `[0,3,7,10]`:
```haskell
d1 $ n "c'min9'4" # sound "superpiano"
```

### Open voicing

This emulates an "Open" Piano voicing, where the first and third note of a chord are dropped down an octave/12 semitones, spreading the range of the chord tones by an extra octave.

```haskell
d1 $ n "c'min9'o" # sound "superpiano"
```

### Drop N voicings

Drop voicings are similar to Open voicings, dropping the Nth highest note in the chord down by an octave/12 semitones. This is a "drop 3" voicing:

```haskell
d1 $ n "c'min9'd3" # sound "superpiano"
```

### Chord Inversions

A chord is inverted by taking the lowest N notes in a chord, and raising them by an octave/12 semitones. This is the 2nd inversion for `c'min9`:

```haskell
d1 $ n "c'min9'i2" # sound "superpiano"
```
