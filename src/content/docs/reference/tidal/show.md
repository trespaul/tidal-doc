---
title: Show
---

## `show`

```haskell
:: Show a => a -> String Source
```

A specialised variant of `showsPrec`, using precedence context zero, and returning an ordinary `String`.

## `showAll`

```haskell
:: Show a => Arc -> Pattern a -> String
```

## `draw`

```haskell
:: Pattern Char -> Render
```

## `drawLine`

```haskell
:: Pattern Char -> Render
```

## `drawLineSz`

```haskell
:: Int -> Pattern Char -> Render
```

## `stepcount`

```haskell
:: Pattern a -> Int
```

## `showStateful`

```haskell
:: ControlPattern -> String
```
