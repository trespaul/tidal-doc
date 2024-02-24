---
title: Haskell
---

## The language

![haskell](./assets/haskellicon.png)

TidalCycles is a domain-specific language embedded in (made with) the Haskell programming language. Haskell is a general-purpose, statically typed and purely functional programming language. Haskell had always been used, since its creation, by researchers/teachers, industrials, finance, etc... Haskell is renowned for some of its most distinctive features: type classes, insistance on the purely-functional programming paradigm, elegant syntax. 

Haskell can be compiled or interpreted. The Glasgow Haskell Compiler (a.k.a GHC) is the most widely used implementation. Tidal is using GHCI, the interpreted mode of GHC as a REPL to do *conversational programming* with the Tidal library. The text editor you are using when playing with Tidal acts as a "code-formatter" and "emitter", sending lines and statements directly to the Haskell interpreter.

Haskell is sometimes considered to be a difficult language for newcomers. In reality, the situation is more complex than it appears. Haskell can confuse some programmers that are accustomed to another programming paradigm: imperative, object-oriented, etc... However, if you don't know anything about programming yet, Haskell can be a wonderful language to learn.

### General resources

Many Haskell tutorials are focusing on lists. They are important to learn, but are not very often used in Tidal.

* [Haskell study plan](https://github.com/soupi/haskell-study-plan/blob/master/README.org)
* [Learn Haskell in Y minutes](https://learnxinyminutes.com/docs/haskell/)
* [Learn you a Haskell for great good](http://learnyouahaskell.com/)
* [Haskell school of expression](http://euterpea.com/haskell-school-of-music/) book ([.pdf of earlier version](http://haskell.cs.yale.edu/wp-content/uploads/2015/03/HSoM.pdf))
* [Functors, applicatives and monads in pictures](http://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html)
* [Haskell programming from first principles](http://haskellbook.com/) - an in-depth book for beginners
* [Programming in Haskell](http://www.cs.nott.ac.uk/~pszgmh/pih.html) - another nice book, by Graham Hutton
* [How to read Haskell](https://wiki.haskell.org/How_to_read_Haskell) - A primer for learning how to work out yourself 'what does this function do?'
* [Haskell programming from first principles](http://haskellbook.com/) - by Christopher Allen and Julie Moronuki

### Tidal-related resources

[NIL Haskell school](https://www.youtube.com/watch?v=kGbelVBCWDk&list=PLyEzdf4cdMMHGqVnAzLV8eDXn6Ajj46JA) - video lectures by David Ogborn (not tidal-specific but by David who among other things works on Tidal and related projects)

## Elements of the language seen in Tidal

### The dollar sign (`$`)

The dollar sign is a mysterious thing. It doesn't really do anything, but is super useful. It's easy to get it mixed up with other operators in Tidal, for example `#`, because in a way they both 'join things together'. But what is `$`, exactly?

The `$` is used a lot in Haskell (the language which Tidal lives inside). Like a lot of things in Haskell, `$` is a function. Like all operators (e.g. `+`), it has two inputs — the left side, and the right side, and has one output. The left input must be a function, and all that `$` does is pass what's on the right-hand side, and give it to that function. In other words, in this expression:
```haskell
rev $ "1 2 3"
```
... the dollar takes `"1 2 3"` and passes it to the function `rev`. So actually the above is the same as this:

```haskell
rev "1 2 3"
```

So if we can do without it, why is it useful? Lets look at a slightly more complex example:

```haskell
fast 2 $ rev "1 2 3"
```

Here the dollar takes care of passing `rev "1 2 3"` to `fast 2`. If we missed it out, then we'd get an error.

```haskell
-- this gives an error!
fast 2 rev "1 2 3"
```

That's because the computer will first read `fast 2`, then `rev`, and try to treat `rev` as a pattern to be speeded up. But on its own, `rev` isn't a pattern, but a function for transforming pattern.

To avoid this error, we could use parenthesis:

```haskell
fast 2 (rev "1 2 3")
```

Here the brackets make sure `rev "1 2 3"` is calculated first, before it is passed as a pattern to `fast 2`.

So, both `$` and parenthesis can be used to control which code is calculated first. The `$` is often used to avoid having to match opening and closing brackets, but sometimes parenthesis makes more sense.

Note that you can't use `$` with operators. For example:

```haskell
-- this doesn't work either!
4 * $ 2 + 3
-- but this does
4 * (2 + 3)
```

#### Comparing `$` and `#`;

So, `$` is used to join a parameter (on the right) with a function (on the left). `#` (and all its friends `|+|`, `|*|`, etc) are used to combine a pattern on the right with a pattern on the left. Check out the page `Pattern structure` in the `Basics` section.


### The dot (`.`)

The dot (`.`) is the Haskell operator for function composition. Function composition comes from mathematics - therefore it is really useful in making music. Haskell was originally designed by mathematicians and computer magicians. Its syntax borrowed quite a lot from mathematical notation. In some cases, Haskell is sometimes more precise and strict than other languages. The syntax is also much more compact. 

When you make music with Tidal, you are composing functions: feeding the output of a function to another function, etc... Your function will generally output a pattern that will be parsed and sent to SuperDirt to turn it into sound. `$` is another really useful function composition operator that you are using everytime you play with Tidal.

Tidal functions are small little programs that do very few things. The name is sometimes a good description of the purpose of any given function. `fast` will make things faster, `slow` will slow them down, `striate` will striate, etc.. By feeding the output of a function to another one, you transform your pattern more and more, until your "composed" and definitive function feels alright for you.

The dot is a `function composition` operator. Let's take an example:
```haskell
d1
  $ fast 2
  $ s "hh*4"
```
This small code snippet will play a fast uninteresting hi-hat pattern.

Now, look at the following example:
```haskell
-- with the dot operator
d1 
  $ every 2 (# speed 2) . fast 2
  $ s "bd hh bd hh"

-- without the dot operator
d1 
  $ every 2 (# speed 2) 
  $ fast 2
  $ s "bd hh bd hh"
```

We did the same thing using two different methods:
1. we "composed" a new function made of the output of `fast 2` fed to the `every 2 (# speed 2)` function.
2. we passed the result of `fast 2 $ s "bd hh bd hh"` to `every 2 (# speed 2)`.

Luckily for us, these two examples sound the same. But you might start to see that we haven't applied the same method to get to the same result. Actually, we used two different `function composition` operators.

The dot (`.`) will take many of your functions and "compose" them together to make one single function that you can feed to another one as if it had always been a single function the whole time. Let's take a look at a more complex example that will do just that:

```haskell
d1 
  $ superimpose ((# speed "2*12") . (# squiz (slow 2 $ range 1 16 $ sine)) . (striate
  "[4|2|3]") . (ply "[[1 1 2 4]|[1 1 2 2]]") . (# room "0 0.5") . (# sz "0.2 0.4"))
  $ fast 2
  $ s "bd hh bd hh" # amp 0.4

```

`superimpose` expects a modified version of a pattern and our regular pattern. I fed only one function to describe the modified version, but I used the `.` to chain together many functions that will now be counted as one. The isolated modified function looks like:
```haskell
((# speed "2*12") . (# squiz (slow 2 $ range 1 16 $ sine)) . (striate
  "[4|2|3]") . (ply "[[1 1 2 4]|[1 1 2 2]]") . (# room "0 0.5") . (# sz "0.2 0.4"))
```
Let's see the type of this function using `:t`:
```haskell
:: Pattern ControlMap -> Pattern ControlMap
```

Cool! As you can see, we are in fact dealing with a super simple object, made of many tiny parts chained together using `.`.


