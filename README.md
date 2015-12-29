## Unisquirt [![Build Status](https://travis-ci.org/JoshuaKGoldberg/Unisquirt.svg?branch=master)](https://travis-ci.org/JoshuaKGoldberg/Unisquirt)

#### You're a rainbow-pooping unicorn. How long can you fly through the sky?


## How to Play

#### Newcomers (non-coders)

[Download the latest release](https://github.com/JoshuaKGoldberg/Unisquirt/releases) of this project, extract that onto your computer, and open **index.html** in a browser (preferably Google Chrome). That's it!

You gain points the more jumps you can do without touching the ground or dying.

#### In your own site

Upload the latest release of Unisquirt (or your built version) to your FTP server. 


## Developing

#### Build Process

Unisquirt uses [Grunt](http://gruntjs.com/) to automate building, which requires [Node.js](http://node.js.org). The process is straightforward; see [Grunt's help page](http://gruntjs.com/getting-started).

#### Coding

Unisquirt is built on a modular framework called GameStartr. The [FullScreenShenanigans](https://github.com/FullScreenShenanigans/) organization contains GameStartr, its parent class EightBittr, and the modules used by the GameStartr framework. These all (theoretically) have their own README files, which you should skim before developing for Unisquirt itself.

All source code is in the [Source](Source/) directory. The Unisquirt.ts class declaration contains class functions and some constants, while static settings to be added to the Unisquirt prototype, such as map layouts and object attributes, are stored in files under [Source/settings](Source/settings), such as audio.ts and collisions.ts.


## Legal

This is released under the [MIT License](http://mit-license.org/) (see [License.txt](LICENSE.txt)).

