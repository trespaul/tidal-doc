---
title: Utils
---

## `writeError`

```haskell
:: String -> IO ()
```

## `mapBoth`

```haskell
:: (a -> a) -> (a, a) -> (a, a)
```

## `mapPartTimes`

```haskell
:: (a -> a) -> ((a, a), (a, a)) -> ((a, a), (a, a))
```

## `mapFst`

```haskell
:: (a -> b) -> (a, c) -> (b, c)
```

## `mapSnd`

```haskell
:: (a -> b) -> (c, a) -> (c, b)
```

## `delta`

```haskell
:: Num a => (a, a) -> a
```

## `mid`

```haskell
:: Fractional a => (a, a) -> a
```

The midpoint of two values

## `removeCommon`

```haskell
:: Eq a => [a] -> [a] -> ([a], [a])
```

## `readMaybe`

```haskell
:: Read a => String -> Maybe a
```

## `(!!!)`

```haskell
:: [a] -> Int -> a
```

like `!!` selects `n`th element from `xs`, but wraps over at the end of `xs`

```haskell
>>> map ((!!!) [1,3,5]) [0,1,2,3,4,5]
[1,3,5,1,3,5]
```

## `nth`

```haskell
:: Int -> [a] -> Maybe a
```

Safer version of `!!`

## `accumulate`

```haskell
:: Num t => [t] -> [t]
```

## `enumerate`

```haskell
:: [a] -> [(Int, a)]
```

enumerate a list of things

```haskell
>>> enumerate ["foo","bar","baz"]
[(1,"foo"), (2,"bar"), (3,"baz")]
```

## `wordsBy`

```haskell
:: (a -> Bool) -> [a] -> [[a]]
```

split given list of `a` by given single `a`, e.g.

```haskell
>>> wordsBy (== ':') "bd:3"
["bd", "3"]
```

## `matchMaybe`

```haskell
:: Maybe a -> Maybe a -> Maybe a
```

## `fromRight`

```haskell
:: b -> Either a b -> b
```
