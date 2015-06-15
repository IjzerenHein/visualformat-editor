import View from 'famous/core/View';
import LayoutController from 'famous-flex/LayoutController';
import vflToLayout from '../vflToLayout';
import Surface from 'famous/core/Surface';
import CodeMirror from 'codemirror';
import VflMode from '../mode/vfl/vfl'; //eslint-disable-line no-unused-vars

function getParameterByName(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

var vfl = getParameterByName('vfl');
if (vfl === 'example') {
    vfl =
    'H:|-[child1(child3)]-[child3]-|\n' +
    'H:|-[child2(child4)]-[child4]-|\n' +
    'H:[child5(child4)]-|\n' +
    'V:|-[child1(child2)]-[child2]-|\n' +
    'V:|-[child3(child4,child5)]-[child4]-[child5]-|';
}
vfl = vfl || '|-[child(==child2/2)]-[child2]-|\nV:|-[child]-|\nV:|-[child2]-|';

class EditorView extends View {
    constructor(options) {
        super(options);

        this.elm = document.createElement('div');
        this.surface = new Surface({
            content: this.elm,
            classes: ['editor']
        });
        this.surface.on('deploy', () => {
            if (!this.editor) {
                this.editor = new CodeMirror(this.elm, {
                    lineNumbers: true,
                    theme: 'vfl'
                });
                this.editor.setValue(vfl);
                this.editor.on('change', this._onChange.bind(this));
            }
        });

        this.layout = new LayoutController({
            layout: vflToLayout([
                '|[content]|',
                'V:|[content]|'
            ]),
            dataSource: {
                content: this.surface
            }
        });
        this.add(this.layout);
    }

    _onChange() {
        var val = this.editor.getValue();
        if (val !== this._vfl) {
            this._vfl = val;
            this._eventOutput.emit('update');
        }
    }

    getVisualFormat() {
        return this.editor ? this.editor.getValue() : vfl;
    }
}

export {EditorView as default};