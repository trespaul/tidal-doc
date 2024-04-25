---
title: Add samples
---

Adding and using your own custom samples in **Tidal Cycles** is relatively easy. You don't actually add samples, but instead add them into **SuperCollider** and the **SuperDirt** quark. To do this, you will need to customize your **SuperDirt** startup code.

## SuperDirt

When you open **SuperCollider**, instead of the normal `SuperDirt.start`
code, you will need to write a longer script that tells **SuperDirt** where
to find your samples. The startup script will look like this:

``` c
(
s.waitForBoot {
    ~dirt = SuperDirt(2, s); // two output channels
    ~dirt.loadSoundFiles("/Users/myUserName/Dirt/samples/*"); // specify sample folder to load
    s.sync; // wait for supercollider to finish booting up
    ~dirt.start(57120, 0 ! 12); // start superdirt, listening on port 57120, create twelve orbits each sending audio to channel 0
};
);
```

To run the above code, place the cursor anywhere inside that code block,
then press `Ctrl+Enter` (or `Command+Enter` on MacOS) to evaluate the
whole block.

The above code will boot the SuperCollider server, then start up
**SuperDirt** with some samples located at `/Users/myUserName/Dirt/samples`. You can find a more complete [startup file](https://github.com/musikinformatik/SuperDirt/blob/develop/superdirt_startup.scd) in the SuperDirt code repository.

### Windows Paths

If you are running Windows, you will need to escape the backslash characters in Windows paths:

```c
~dirt.loadSoundFiles("c:\\Users\\myUserName\\Dirt\\samples\\*")
```

### Specifying Multiple Folders

If you have samples located in many folders, you can import them all:

``` c
(
s.waitForBoot {
    ~dirt = SuperDirt(2, s); // two output channels

        <!--T:20-->
// load samples from multiple folders:
    ~dirt.loadSoundFiles("/Users/myUserName/Dirt/samples/*"); 
    ~dirt.loadSoundFiles("/Users/myUserName/sounds/*"); 
    ~dirt.loadSoundFiles("/Users/myUserName/recordings/chaska-sessions/*");
    ~dirt.loadSoundFiles("/Users/myUserName/recordings/super-duper-experiments/*"); 

    <!--T:21-->
s.sync; // wait for supercollider to finish booting up
    ~dirt.start(57120, [0, 0]); // start superdirt, listening on port 57120, create two orbits each sending audio to channel 0
};
);
```


## Folder Structure

In the above example, we have imported a folder at the path `/Users/myUserName/Dirt/samples`. In order for SuperDirt to recognize the sound names that Tidal sends, the `/Users/myUserName/Dirt/samples` folder will need to have sub-folders for each sound name, and each sound name folder will need to have sample files:

```plaintext
Users/
|-- myUserName/
    |-- Dirt/
        |-- samples/
            |-- myBass/
            |   |-- bass1.wav
            |   |-- bass2.wav
            |   |-- bass3.wav
            |-- hits/
            |   |-- hit1.wav
            |   |-- hit2.wav
            |   |-- hit3.wav
            |-- field/
            |   |-- bridge.wav
            |   |-- mountains1.wav
            |   |-- mountains2.wav
            |   |-- plains.wav
            |   |-- river.wav
```


# Tidal Code

Given the folder structure above, you can now use the `myBass`, `hits`,
and `field` sounds in your Tidal patterns:

```c
d1 $ s "mybass hits*4" # n (slow 2 $ run 3)
d2 $ n "<0 2 1>" # s "field" # cut 1
```

## Where to find samples

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