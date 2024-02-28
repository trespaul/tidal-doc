---
title: Run SuperDirt in another host
---

If you're running SuperDirt on another host (perhaps, in a multi-user setup), you need to define this in a similar fashion as with the latency, except in this case the keyname is `oAddress`, giving the IP address or hostname. For example if you are running SuperDirt on another computer that has the IP adress 192.168.0.23, you would do:

```haskell
tidal <- startTidal (superdirtTarget {oAddress = "192.168.0.23", oPort = 57120}) (defaultConfig {cCtrlAddr = "0.0.0.0"})
```

Note that `cCtrlAddr` also needs to be set to `0.0.0.0`, as shown above, otherwise Tidal will not be able to send messages across a network. To explain; the `cCtrlAddr` control address is used both for receiving and sending network messages (using the Open Sound Control protocol). Setting it to `0.0.0.0` means that Tidal will be able to send and receive messages on any network that your computer is connected to (by default it will only send/receive to other programs running on your local computer and not across the a local network or the wider internet).

In case you need to alter multiple settings for `superdirtTarget`, just separate them by a comma:
```haskell
{oAddress = "1.2.3.4", oLatency = 0.04}
```

Note that in Emacs (and possibly other editor) configuration files, you'll need to escape the quotation marks.

You will also need to configure SuperDirt to accept messages coming from another host. For example, starting Dirt like this will tell listen for OSC messages on all network interfaces:

```haskell
~dirt.start(57120, [0, 0], NetAddr("0.0.0.0"));
```
