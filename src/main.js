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
    var TextareaSurface = require('famous/surfaces/TextareaSurface');
    var Surface = require('famous/core/Surface');
    var c = require('cassowary/bin/c');
    window.c = c;
    var AutoLayout = require('autolayout.js/dist/autolayout');
    var OutputView = require('./views/OutputView.es6');

    // create the main context and layout
    var mainContext = Engine.createContext();
    var mainLC = new LayoutController({
        layout: function(context) {
            context.set('vfl', {
                size: [context.size[0] / 2, context.size[1] / 2]
            });
            context.set('constraints', {
                size: [context.size[0] / 2, context.size[1] / 2],
                translate: [0, context.size[1] / 2, 0]
            });
            context.set('output', {
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
    mainLC.insert('vfl', vflText);

    // Create constraints list
    var constraintsSur = new Surface({
        classes: ['constraints']
    });
    mainLC.insert('constraints', constraintsSur);

    // Create output layout-controller for results
    var outputView = new OutputView();
    mainLC.insert('output', outputView);

    // Update handling
    var constraints = [];
    function _update() {
        var vfl = vflText.getValue();

        var view = new AutoLayout.View();
        try {
            constraints = AutoLayout.VisualFormat.parse(vfl);
            //var raw = AutoLayout.VisualFormat.parse(vfl, undefined, {outFormat: 'raw'});
            //var out = raw;
            var out = constraints;
            var csLines = '<ul>';
            for (var i = 0; i < out.length; i++) {
                csLines += '<li><code>' + JSON.stringify(out[i], undefined, 2) + '</code></li>';
            }
            csLines += '</ul>';
            constraintsSur.setContent(csLines);
            view.addConstraint(constraints);
            outputView.setAutoLayoutView(view);
            console.log('VFL compiled succesfully: ' + vfl); //eslint-disable-line no-console
        }
        catch (err) {
            console.log(err); //eslint-disable-line no-console
        }
    }
    vflText.on('change', _update);
    vflText.on('keyup', _update);
    _update();
});
