---
title: Chords
---

## Chord definitions

### Major chords

#### `major`

```haskell
:: Num a => [a]
```

#### `aug`

```haskell
:: Num a => [a]
```

#### `six`

```haskell
:: Num a => [a]
```

#### `sixNine`

```haskell
:: Num a => [a]
```

#### `major7`

```haskell
:: Num a => [a]
```

#### `major9`

```haskell
:: Num a => [a]
```

#### `add9`

```haskell
:: Num a => [a]
```

#### `major11`

```haskell
:: Num a => [a]
```

#### `add11`

```haskell
:: Num a => [a]
```

#### `major13`

```haskell
:: Num a => [a]
```

#### `add13`

```haskell
:: Num a => [a]
```

### Dominant chords

#### `dom7`

```haskell
:: Num a => [a]
```

#### `dom9`

```haskell
:: Num a => [a]
```

#### `dom11`

```haskell
:: Num a => [a]
```

#### `dom13`

```haskell
:: Num a => [a]
```

#### `sevenFlat5`

```haskell
:: Num a => [a]
```

#### `sevenSharp5`

```haskell
:: Num a => [a]
```

#### `sevenFlat9`

```haskell
:: Num a => [a]
```

#### `nine`

```haskell
:: Num a => [a]
```

#### `eleven`

```haskell
:: Num a => [a]
```

#### `thirteen`

```haskell
:: Num a => [a]
```

### Minor chords

#### `minor`

```haskell
:: Num a => [a]
```

#### `diminished`

```haskell
:: Num a => [a]
```

#### `minorSharp5`

```haskell
:: Num a => [a]
```

#### `minor6`

```haskell
:: Num a => [a]
```

#### `minorSixNine`

```haskell
:: Num a => [a]
```

#### `minor7flat5`

```haskell
:: Num a => [a]
```

#### `minor7`

```haskell
:: Num a => [a]
```

#### `minor7sharp5`

```haskell
:: Num a => [a]
```

#### `minor7flat9`

```haskell
:: Num a => [a]
```

#### `minor7sharp9`

```haskell
:: Num a => [a]
```

#### `diminished7`

```haskell
:: Num a => [a]
```

#### `minor9`

```haskell
:: Num a => [a]
```

#### `minor11`

```haskell
:: Num a => [a]
```

#### `minor13`

```haskell
:: Num a => [a]
```

#### `minorMajor7`

```haskell
:: Num a => [a]
```

### Other chords

#### `one`

```haskell
:: Num a => [a]
```

#### `five`

```haskell
:: Num a => [a]
```

#### `sus2`

```haskell
:: Num a => [a]
```

#### `sus4`

```haskell
:: Num a => [a]
```

#### `sevenSus2`

```haskell
:: Num a => [a]
```

#### `sevenSus4`

```haskell
:: Num a => [a]
```

#### `nineSus4`

```haskell
:: Num a => [a]
```

### Questionable chords

#### `sevenFlat10`

```haskell
:: Num a => [a]
```

#### `nineSharp5`

```haskell
:: Num a => [a]
```

#### `minor9sharp5`

```haskell
:: Num a => [a]
```

#### `sevenSharp5flat9`

```haskell
:: Num a => [a]
```

#### `minor7sharp5flat9`

```haskell
:: Num a => [a]
```

#### `elevenSharp`

```haskell
:: Num a => [a]
```

#### `minor11sharp`

```haskell
:: Num a => [a]
```


## Chord functions

### `chordTable`

```haskell
:: Num a => [(String, [a])]
```

The `chordTable` function outputs a list of all available chords and their
corresponding notes. For example, its first entry is `("major",[0,4,7])` which
means that a major triad is formed by the root (0), the major third (4 semitones
above the root), and the perfect fifth (7 semitones above the root).

As the list is big, you can use the function `chordL`.

If you know the notes from a chord, but can’t find the name of it, you can use this Haskell code to do a reverse look up into the table:

```haskell
filter (\(_,x)->x==[0,4,7,10]) chordTable
```

This will output `[("dom7",[0,4,7,10])]`

(You’ll need to run `import Sound.Tidal.Chords` before using this function.)

### `chordate`

```haskell
:: Num b => [[b]] -> b -> Int -> [b]
```

`chordate cs m n` selects the `n`th "chord" (a chord is a list of `Int`s)
 from a list of chords `cs` and transposes it by `m`

```haskell
chordate cs m n = map (+m) $ cs!!n
```

### `enchord`

```haskell
:: Num a => [[a]] -> Pattern a -> Pattern Int -> Pattern a
```

`enchord chords pn pc` turns every note in the note pattern `pn` into
a chord, selecting from the chord lists `chords` using the index pattern
`pc`.  For example, `Chords.enchord [Chords.major Chords.minor] "c g" "0 1"`
will create a pattern of a C-major chord followed by a G-minor chord.

```haskell
enchord chords pn pc = flatpat $ (chordate chords) $ pn * pc
```

### `chordL`

```haskell
:: Num a => Pattern String -> Pattern [a]
```

Look up a specific chord: `chordL "minor7"` returns `(0>1)|[0,3,7,10]`.

### `chordList`

```haskell
:: String
```

Outputs all the available chords:

```
major maj M aug plus sharp5 six 6 sixNine six9 sixby9 6by9 major7 maj7
major9 maj9 add9 major11 maj11 add11 major13 maj13 add13 dom7 dom9 dom11
dom13 sevenFlat5 7f5 sevenSharp5 7s5 sevenFlat9 7f9 nine eleven 11 thirteen 13
minor min m diminished dim minorSharp5 msharp5 mS5 minor6 min6 m6 minorSixNine
minor69 min69 minSixNine m69 mSixNine m6by9 minor7flat5 minor7f5 min7flat5
min7f5 m7flat5 m7f5 minor7 min7 m7 minor7sharp5 minor7s5 min7sharp5 min7s5
m7sharp5 m7s5 minor7flat9 minor7f9 min7flat9 min7f9 m7flat9 m7f9 minor7sharp9
minor7s9 min7sharp9 min7s9 m7sharp9 m7s9 diminished7 dim7 minor9 min9 m9
minor11 min11 m11 minor13 min13 m13 minorMajor7 minMaj7 mmaj7 one 1 five 5
sus2 sus4 sevenSus2 7sus2 sevenSus4 7sus4 nineSus4 ninesus4 9sus4 sevenFlat10
7f10 nineSharp5 9sharp5 9s5 minor9sharp5 minor9s5 min9sharp5 min9s5 m9sharp5
m9s5 sevenSharp5flat9 7s5f9 minor7sharp5flat9 m7sharp5flat9 elevenSharp 11s
minor11sharp m11sharp m11s
```

(You’ll need to run `import Sound.Tidal.Chords` before using this function.)
