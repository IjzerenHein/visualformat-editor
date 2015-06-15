import View from 'famous/core/View';
import Surface from 'famous/core/Surface';
import LayoutController from 'famous-flex/LayoutController';
import TabBarController from 'famous-flex/widgets/TabBarController';
import vflToLayout from '../vflToLayout';
import AutoLayout from 'autolayout.js';

class OutputView extends View {
    constructor(options) {
        super(options);

        this.tabBarController = new TabBarController({
            tabBarSize: 44,
            tabBarPosition: TabBarController.Position.TOP,
            tabBar: {
                createRenderables: {
                    selectedItemOverlay: true
                }
            }
        });

        this.constraints = new Surface({
            classes: ['constraints']
        });
        this.logContent = '';
        this.log = new Surface({
            classes: ['log']
        });
        this.log.commit = function() {
            const res = Surface.prototype.commit.apply(this.log, arguments);
            this.log._currentTarget.scrollTop = Math.max(0, this.log._currentTarget.scrollHeight - this.log._currentTarget.clientHeight);
            return res;
        }.bind(this);
        this.raw = new Surface({
            classes: ['raw']
        });
        this.tabBarController.setItems([
            {tabItem: 'Log', view: this.log},
            {tabItem: 'Constraints', view: this.constraints},
            {tabItem: 'Raw', view: this.raw}
        ]);

        this.layout = new LayoutController({
            layout: vflToLayout([
                '|[content]|',
                'V:|[content]|'
            ]),
            dataSource: {
                content: this.tabBarController
            }
        });
        this.add(this.layout);
    }

    _log(message) {
        this.logContent += message;
        this.log.setContent(this.logContent);
    }

    parse(visualFormat, extended) {
        visualFormat = visualFormat.replace(/[\\]/g, '\n');
        try {
            const json = visualFormat.replace(/["']/g, '\"');
            visualFormat = JSON.parse(json);
        } catch (err) {
            //
        }
        try {
            // update constraints
            const constraints = AutoLayout.VisualFormat.parse(visualFormat, {extended: extended});
            this.constraints.setContent('<pre>' + JSON.stringify(constraints, undefined, 2) + '</pre>');
            // update raw
            const raw = AutoLayout.VisualFormat.parse(visualFormat, {extended: extended, outFormat: 'raw'});
            this.raw.setContent('<pre>' + JSON.stringify(raw, undefined, 2) + '</pre>');
            // update log
            this._log('<code>Visual format parsed successfully.</code><br>');
            return constraints;
        }
        catch (err) {
            if ((err instanceof SyntaxError) || (err.name === 'SyntaxError')) {
                this.constraints.setContent('');
                this.raw.setContent('');
                let arrow = (err.column > 10) ? ' --->' : '';
                this._log('<pre style="color: red; margin: 0;">' +
                    'ERROR: ' +
                    '<span style="color: black;">' + err.source.substring(0, err.column - 1) + '</span>' +
                    err.source.substring(err.column - 1) + '\n' +
                    'line ' + err.line + arrow + (new Array(2 + err.column - arrow.length - ('' + err.line).length)).join(' ') + '^ ' + err.message +
                    '</pre>'
                );
            }
            else {
                this._log('<pre style="color: red; margin: 0;">ERROR: ' + err.toString() + '</pre>');
            }
        }
    }
}

export {OutputView as default};
