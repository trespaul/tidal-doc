---
title: Scales
---

## `scale`

```haskell
:: Fractional a => Pattern String -> Pattern Int -> Pattern a
```

Interprets a pattern of note numbers into a particular named scale. For example:

```haskell
d1
  $ jux rev
  $ chunk 4 (fast 2 . (|- n 12))
  $ off 0.25 (|+ 7)
  $ struct (iter 4 "t(5,8)")
  $ n (scale "ritusen" "0 .. 7")
  # sound "superpiano"
```

## `scaleList`

```haskell
:: String
```

Outputs this list of all the available scales:

```
minPent majPent ritusen egyptian kumai hirajoshi iwato chinese indian pelog
prometheus scriabin gong shang jiao zhi yu whole wholetone augmented augmented2
hexMajor7 hexDorian hexPhrygian hexSus hexMajor6 hexAeolian major ionian dorian
phrygian lydian mixolydian aeolian minor locrian harmonicMinor harmonicMajor
melodicMinor melodicMinorDesc melodicMajor bartok hindu todi purvi marva bhairav
ahirbhairav superLocrian romanianMinor hungarianMinor neapolitanMinor enigmatic
spanish leadingWhole lydianMinor neapolitanMajor locrianMajor diminished
octatonic diminished2 octatonic2 messiaen1 messiaen2 messiaen3 messiaen4
messiaen5 messiaen6 messiaen7 chromatic bayati hijaz sikah rast saba iraq
```

## `scaleTable`

```haskell
:: Fractional a => [(String, [a])]
```

Outputs a list of all available scales and their corresponding notes. For
example, its first entry is `("minPent",[0,3,5,7,10]`) which means that
a minor pentatonic scale is formed by the root (0), the minor third (3 semitones
above the root), the perfect fourth (5 semitones above the root), etc.

As the list is big, you can use the Haskell function lookup to look up a
specific scale: `lookup "phrygian" scaleTable`. This will output
`Just [0.0,1.0,3.0,5.0,7.0,8.0,10.0]`.

You can also do a reverse lookup into the scale table. For example:

```haskell
filter ( \(_, x) -> take 3 x == [0,2,4] ) scaleTable
```

The above example will output all scales of which the first three notes are
the root, the major second (2 semitones above the fundamental), and the major
third (4 semitones above the root).

## `getScale`

```haskell
:: Fractional a => [(String, [a])] -> Pattern String -> Pattern Int -> Pattern a
```

Build a scale function, with additional scales if you wish. For example:

```haskell
let myscale =
  getScale
    ( scaleTable ++
        [ ("techno", [0,2,3,5,7,8,10])
        , ("broken", [0,1,4,7,8,10])
        ]
    )
```

The above takes the standard `scaleTable` as a starting point and adds two custom scales to it. You’ll be able to use the new function in place of the normal one:

```haskell
d1 $ n (myscale "techno" "0 1 2 3 4 5 6 7") # sound "superpiano"
```
