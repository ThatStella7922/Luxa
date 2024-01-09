# Using Luxa

For end users, the best way to experience Luxa is to visit [luxa.thatstel.la](https://luxa.thatstel.la) on your device.

The instructions that follow are intended for people who want to modify Luxa and its components.

## Luxa Home

TODO docs

## Luxa Player

### Basic usage

Luxa Player is designed to be combined with Luxa Home, but if you want to use Luxa Player standalone you can provide the following query arguments:

- swfurl
  - Path to an SWF file
  - Mandatory, can be any string
- title
  - Title text to show on the page
  - Recommended, can be any string
- debug
  - Logging level (see the Logging section below to see what changes)
  - Optional, can be full, minimal or disabled

For example, if you want to load Luxa Player with an SWF file named `MyGame.swf`, the title `My Game` and minimal logging, you would load the page like this:

```shell
player.html?swfurl=MyGame.swf&title=My%20Game&debug=minimal
```

### Logging

Luxa Player defaults to no logging, but it supports minimal or 'full' logging as well.

Full logging will display debug messages on the webpage itself *and* your browser's JavaScript console. Minimal logging will display debug messages only in your browser's JavaScript console.
