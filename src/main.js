/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2015
 */
define(function(require) {

    //<webpack>
    require('famous-polyfills');
    require('famous/core/famous.css');
    require('famous-flex/widgets/styles.css');
    require('./styles.css');
    require('./index.html');
    //</webpack>

    // Fast-click
    var FastClick = require('fastclick/lib/fastclick');
    FastClick.attach(document.body);

    // import dependencies
    var Engine = require('famous/core/Engine');
    var LayoutController = require('famous-flex/LayoutController');
    var Surface = require('famous/core/Surface');
    var TextareaSurface = require('famous/surfaces/TextareaSurface');
    var c = require('cassowary/bin/c');
    window.c = c;
    var AutoLayout = require('autolayout.js/dist/autolayout');

    // create the main context and layout
    var mainContext = Engine.createContext();
    var mainLC = new LayoutController({
        layout: function(context, options) {
            context.set('left', {
                size: [context.size[0] / 2, context.size[1]]
            });
            context.set('right', {
                size: [context.size[0] / 2, context.size[1]],
                translate: [context.size[0] / 2, 0, 0]
            });
        }
    });
    mainContext.add(mainLC);

    // Create input text-area for VFL
    var vflText = new TextareaSurface({
        placeholder: 'type your VFL here',
        value: '|[green]|\nV:|[green]|\n'
    });
    mainLC.insert('left', vflText);

    // Create output layout-controller for results
    var alView;
    var outputLC = new LayoutController({
        flow: true,
        dataSource: {
            yellow: new Surface({properties: {background: 'yellow'}}),
            orange: new Surface({properties: {background: 'orange'}}),
            purple: new Surface({properties: {background: 'purple'}}),
            black: new Surface({properties: {background: 'black'}}),
            white: new Surface({properties: {background: 'white'}}),
            pink: new Surface({properties: {background: 'pink'}}),
            green: new Surface({properties: {background: 'green'}}),
            blue: new Surface({properties: {background: 'blue'}}),
            red: new Surface({properties: {background: 'red'}}),
            brown: new Surface({properties: {background: 'brown'}})
        },
        layout: function(context, options) {
            if (alView) {
                alView.setSize(context.size[0], context.size[1]);
                var subView;
                for (var key in alView.subViews) {
                    subView = alView.subViews[key];
                    context.set(subView.name, {
                        size: [subView.width, subView.height],
                        translate: [subView.left, subView.top, 0]
                    });
                }
            }
        }
    });
    mainLC.insert('right', outputLC);

    // Update handling
    function _update() {
        var vfl = vflText.getValue();
        var view = new AutoLayout.View();
        try {
            view.addVisualFormat(vfl);
            alView = view;
            console.log('VFL compiled succesfully: ' + vfl); //eslint-disable-line no-console
            outputLC.reflowLayout();
        }
        catch (err) {
            console.log(err); //eslint-disable-line no-console
        }
    }
    vflText.on('change', _update);
    vflText.on('keyup', _update);
    _update();
});
