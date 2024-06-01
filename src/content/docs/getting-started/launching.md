---
title: Launching Tidal
---

As previously explained, TidalCycles works by sending instructions from an editor using the Tidal interpreter to SuperDirt, which runs in SuperCollider.
So, to start Tidal, you need to first start SuperCollider, start SuperDirt from within SuperCollider, and then start Tidal from your preferred text editor.

## Start SuperDirt

In SuperCollider, the most minimalistic command you could use to start SuperDirt is

```c
SuperDirt.start;
```

This command will start the engine using the default server options.
Depending on your needs, you might want to adapt to a specific audio configuration, load different samples, or fine-tune the memory or latency of the audio server. 

[This script](https://github.com/musikinformatik/SuperDirt/blob/develop/superdirt_startup.scd?plain=1) is a generic start-up script that you can customise.
Also refer to the [SuperDirt configuration reference page](/reference/config/superdirt) for an explanation of the various options.

To execute it, load the file in the SuperCollider editor and evaluate the script by selecting the text and pressing `Ctrl/Cmd+Enter`.
You should see the following line in the logs after a few seconds:

```
SuperDirt: listening to Tidal on port 57120
```

To load the SuperDirt server each time SuperCollider start, save the script as SuperCollider's start-up file.
In the SuperCollider interface, click on `File > Open startup file` and paste the start-up script there.

For more advanced users, a SuperCollider interpreter can also be launched on the command line using the `sclang` command.

## Start TidalCycles

The various extensions and plugins for different editors all automatically start a Tidal interpreter in your editor.
(The start-up script for this interpreter can also be customised, like the SuperDirt start-up script. See the [Tidal configuration reference](/reference/config/tidal))
For specific instructions concerning the text editor of your choice, see the [Get a text editor](/getting-started/installation#get-a-text-editor) section on the Installation page.

In Pulsar, for example, the process is as follows:

1. Start Pulsar
2. Create a new file and save it with a file name that ends in `.tidal`, (e.g. `test.tidal`).
3. Open the Packages menu and select `TidalCycles -> Boot TidalCycles`. A small window will open at the bottom of the Pulsar window containing the `t>` prompt (and hopefully no error messages).

Let's try it! Type the following line in the text editor and press `Shift+Enter` to evaluate it (`Ctrl+Enter` will evaluate multiple lines):

```haskell
d1 $ sound "bd sn"
```

If you hear sound, congratulations, it works! ⭐
