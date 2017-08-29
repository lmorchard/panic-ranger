## Panic Ranger

![panic-space-11](https://cloud.githubusercontent.com/assets/21687/25076705/2a771772-22f1-11e7-83a9-0085634ba4b9.gif)

### A message from ops

Welcome to the Panic, Ranger 23.

This is the reason why portholes go dark on transition to hyperspace. Human
minds are prone to failure when confronted by this strange seething mass of
malevolence held just at bay.

Since you've beheld this reality and - for whatever reason - retained your
sanity, you've been recruited to patrol the repulsor lanes of the Panic.

Faster-than-light travel via hyperspace forms the spine of our civilization.
It's your job to ensure the safety of ships passing through. Rescue those in
trouble. Maintain elements of the lanes. Help expand our reach where possible.

And, if you happen to see anything weird out there - you know, weirder than
usual - let us know. The Panic is not amenable to exploration, so your eyes are
the best we have.

Good luck.

### TODO

* bugs
  * fatal err on collisions?

* player stats
  * anxiety level
  * ship energy
  * ship systems damage

* friendly entities
  * repulsors
  * gates
  * depots

* unfriendly entities
  * chitterers

* misc
  * horde spawn
    * avoid areas near entities, repulsor fields

* gameplay goals
  * gates linked by paths
  * ships safely traversed

* entity AI
  * pathfinding between stargates via repulsor roads

* powerups
  * booze
    * temporarily ignore anxiety level
    * general reduction in ability in cooldown period
  * charge
    * temporary repulsor in front
    * no steering forward speed boost

* graphics
  * GPU-only particle effects
  * CRT vector webgl fragment shader - soft-edged beam; trails
  * ship damage effects (more global?)
    * color drop out
    * vertical / horizontal collapse
    * waviness
    * glitched vectors
    * blooming
    * pincushion
  * anxiety effects (color & baddie specific?)
    * color smearing
    * blurriness
    * more random sprite jitter effects

* sound & music
  * theme song using 28 martian dialup?
    * http://www.websynths.com/
  * effects ala sfxr?
    * https://github.com/ttencate/jfxr
    * https://github.com/grumdrig/jsfxr

* input
  * Extract common mouse handling from viewport systems
  * Ensure mouse handling works in a non-fullscreen canvas
  * rotation follows mouse without need for thrust
