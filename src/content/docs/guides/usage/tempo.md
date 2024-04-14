---
title: Set and convert tempos
---

Tempos are specified using the `setcps` function, e.g., `setcps 0.5625` (this is the default value).

To convert from BPM to CPS, you can do the maths right in the function. For example, to set the tempo at 130 BPM, use `setcps 130/60/4`.
We divide by 60 because we are converting from beats per *minute* to cycles per *second*, and we divide by 4 because we want 4 beats per cycle, i.e., we want one cycle to equal one traditional bar in 4/4 time.

These two values are equivalent:

- `setcps 0.5625`: Cycles per second, as a decimal.
- `setcps (135/60/4)`: Cycles per second, as a fraction.
