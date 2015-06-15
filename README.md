[![Screenshot](screenshot.png)](https://rawgit.com/IjzerenHein/visualformat-editor/master/dist/index.html)

*Click on the image above to start Visual Formatting :D*

The Visual Format Editor allows you to parse and preview Apple's Visual Format Language. It is built using [Cassowary.js](https://github.com/slightlyoff/cassowary.js), [AutoLayout.js](https://github.com/IjzerenHein/autolayout.js), [famo.us](http://famous.org) and [famous-flex](https://github.com/IjzerenHein/famous-flex).


## Query arguments

The Visual Format Editor can be customized by specifying query-arguments:

|Argument|Type|Description
|---|---|---|
|`vfl`|`string`|The vfl definition to display.|
|`extended`|`0` / `1`|Enables or disabled extended vfl mode (default: enabled).|
|`spacing`|`array`,`number`|Spacing to use (default: 8).|
|`mode`|`string`|Appearence mode: `default`, `compact`, `nolog`, `preview`.|
|`settings`|`0` / `1`|Shows or hides the settings pane (default: 1).|

Example:

    visualformat-editor/.../index.html?spacing=[20,10]&extended=0


## Contribute

If you like this project and want to support it, show some love
and give it a star.


## Contact
-   @IjzerenHein
-   hrutjes@gmail.com

© 2015 Hein Rutjes
