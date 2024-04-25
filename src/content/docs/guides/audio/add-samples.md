---
title: Add samples
---

Adding and using your own custom samples in **Tidal Cycles** is relatively easy. You don't actually add samples to **Tidal**, but instead reference them into the **SuperDirt** startup file inside of **SuperCollider**.

## Where to find samples

If you don't have custom samples but would like to find some, this is the section for you.

You'll find tons of websites selling audio samples for music production, ranging from the less expensive to the most priciest thing you've ever seen. However, there are good ways to find free and high-quality audio samples for **Tidal**.

Here is a small list of websites for free samples you could check:

* [Freesound](https://freesound.org/): Free ... sounds.
* [BBC Sound Effects](https://sound-effects.bbcrewind.co.uk/): Direct from the BBC. Read the license!!
* [Legowelt Samples](http://legowelt.org/samples/): free samples from *Legowelt* by *Legowelt* himself.
* [Music Radar](https://www.musicradar.com/news/tech/free-music-samples-royalty-free-loops-hits-and-multis-to-download): a huge amount of free audio samples. Ranging from very good/high quality to meh-quality.
* [Reverb Drum Collection](https://reverb.com/software/samples-and-loops/reverb/3514-reverb-drum-machines-the-complete-collection): Reverb Drum machines collection.
* [We Sound Effects](https://wesoundeffects.com/we-sound-effects-bundle-2020/): a fairly large collection. Read the license.
* [Young Guru Breaks](https://mgthefuture.com/product/305630) : breakbeats handpicked by Young Guru.
* [Sounds from Space](http://www.svengrahn.pp.se/sounds/sounds.htm): sounds from space... For composing `Etudes Australes` or `Atlas Eclipticalis` V2.
* [VSCO Orchestra](https://vis.versilstudios.com/vsco-community.html): Yes, live-coding the orchestra. It works, sounds like Boulez.
* [Free samples for all](https://www.reddit.com/r/samplesforall/): a Reddit community.
* [Looperman](https://www.looperman.com/): community-made bank of loops, accapellas.
* [SampleSwap](https://sampleswap.org/) : 16-bit wav samples, huge library.
* [99 Sounds](https://99sounds.org/) : More than 99 samples.

## Folder structure

Once you have your samples, you need to organize them in a specific way. In order for SuperDirt to recognize the sound names that Tidal sends, your samples folder (e.g. `mySamples`) will need to have sub-folders for each sound name, and each sound name folder will need to have one or more sample files:

```plaintext
mySamples/
  |-- myBass/
  |   |-- bass1.wav
  |   |-- bass2.wav
  |   |-- bass3.wav
  |-- myHits/
  |   |-- hit1.wav
  |   |-- hit2.wav
  |   |-- hit3.wav
  |-- myField/
  |   |-- bridge.wav
  |   |-- mountains1.wav
  |   |-- mountains2.wav
  |   |-- plains.wav
  |   |-- river.wav
```

Given the folder structure above, after finishing this guide you will be able to use the samples in your Tidal code in the following way:

```haskell
once $ sound "myField:3" --will play 'plains.wav'
```

## Reference the samples in SuperDirt

In the [SuperDirt startup file](../../reference/config/superdirt/), you'll find a line for loading the default samples: `dirt.loadSoundFiles;`. Below it, you need to add a line with the `~dirt.loadSoundFiles()` function. Inside the parentheses will go the path of your custom samples folder, followed by `/*`, to refer to its contents. Were the path to be `/Users/myUserName/mySamples`, the code should look like this:

```c
// there will be more code above
~dirt.loadSoundFiles;
~dirt.loadSoundFiles("/Users/myUserName/mySamples/*")
// there will also be more code below
```

You can check whether everything is correct by placing the cursor anywhere inside that code block and then pressing `Ctrl+Enter` (or `Command+Enter` on MacOS) to evaluate the whole block. In the **SuperCollider** *Post window* it will appear information about the boot of the SuperCollider server, after which it will inform about the loading of the sound names (there called *sample banks*). You should see a number after each one, telling how many samples were loaded for the name.

Note that you can import more than one custom folder by using more import functions:

```c
// there will be more code above
~dirt.loadSoundFiles;
~dirt.loadSoundFiles("/Users/myUserName/mySamples/*")
~dirt.loadSoundFiles("/Users/myUserName/sounds/*"); 
~dirt.loadSoundFiles("/Users/myUserName/recordings/chaska-sessions/*");
~dirt.loadSoundFiles("/Users/myUserName/recordings/super-duper-experiments/*"); 
// there will also be more code below
```

:::caution
If you are running Windows, you will need to change the path address. You can either escape the backslash character with another backslash, or reemplace it with a forward slash. For example:
```c
~dirt.loadSoundFiles("c:\\Users\\myUserName\\mySamples\\*")
```
:::