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

    function getParameterByName(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

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
    var c = require('cassowary/bin/c');
    window.c = c;
    var AutoLayout = require('autolayout.js/dist/autolayout');
    var VflView = require('./views/VflView.es6');
    var LayoutView = require('./views/LayoutView.es6');
    var ParseView = require('./views/ParseView.es6');
    var vflToLayout = require('./vflToLayout');
    var Surface = require('famous/core/Surface');

    // create the main context and layout
    var mainContext = Engine.createContext();
    var fullLayout = vflToLayout([
        '|[banner]|\nV:[banner(124)]',
        'V:|[banner][vfl(parse)][parse]|',
        'V:[banner][layout]|',
        '|[vfl(parse,layout)][layout]|'
    ]);
    var previewLayout = vflToLayout([
        '|[banner]|\nV:[banner(124)]',
        'V:[banner][layout]|',
        '|[layout]|'
    ]);
    var mainLC = new LayoutController({
        layout: parseInt(getParameterByName('preview')) ? previewLayout : fullLayout
    });
    mainContext.add(mainLC);

    // Create banner
    var banner = new Surface({
        classes: ['banner'],
        content: '<div class="va">AUTOLAYOUT.JS<div class="subTitle">Visual Format Viewer</div></div>' +
        //'<iframe src="https://ghbtns.com/github-btn.html?user=ijzerenhein&repo=autolayout.js&type=star&count=true&size=small" frameborder="0" scrolling="0" width="170px" height="30px"></iframe>'
        '<a href="https://github.com/ijzerenhein/autolayout.js"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"></a>'
    });
    mainLC.insert('banner', banner);

    // Create vfl view
    var vflView = new VflView();
    mainLC.insert('vfl', vflView);
    vflView.on('update', _update); //eslint-disable-line no-use-before-define

    // Create parse view
    var parseView = new ParseView();
    mainLC.insert('parse', parseView);

    // Create output layout-controller for results
    var layoutView = new LayoutView();
    mainLC.insert('layout', layoutView);

    // Update handling
    function _update() {
        var vfl = vflView.getVisualFormat();
        var constraints = parseView.parse(vfl);
        if (constraints) {
            var view = new AutoLayout.View();
            view.addConstraints(constraints);
            layoutView.setAutoLayoutView(view);
        }
    }
    _update();
});
