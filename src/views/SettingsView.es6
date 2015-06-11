import View from 'famous/core/View';
import InputSurface from 'famous/surfaces/InputSurface';
import Surface from 'famous/core/Surface';
import LayoutController from 'famous-flex/LayoutController';
import vflToLayout from '../vflToLayout';

function getParameterByName(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

class SettingsView extends View {
    constructor(options) {
        super(options);

        this._spacing = 8;
        try {
            this._spacing = JSON.parse(getParameterByName('spacing'));
        }
        catch (err) {
            //
        }

        this.renderables = {
            widthText: new Surface({
                content: '<div class="va">Width:</div>'
            }),
            widthInput: new InputSurface({
                placeholder: 'auto'
            }),
            heightText: new Surface({
                content: '<div class="va">Height:</div>'
            }),
            heightInput: new InputSurface({
                placeholder: 'auto'
            }),
            spacingText: new Surface({
                content: '<div class="va">Spacing:</div>',
                classes: ['setting', 'text']
            }),
            spacingInput: new InputSurface({
                value: JSON.stringify(this._spacing),
                classes: ['setting', 'input']
            })
        };
        this.layout = new LayoutController({
            layout: vflToLayout([
                '|[spacingText(==spacingInput)]-[spacingInput]|',
                'V:|-[spacingText(==30,==spacingInput)]',
                'V:|-[spacingInput]'
            ]),
            dataSource: this.renderables
        });
        this.add(this.layout);
        this.renderables.spacingInput.on('change', this._updateSpacing.bind(this));
        this.renderables.spacingInput.on('keyup', this._updateSpacing.bind(this));
    }

    _updateSpacing() {
        try {
            const spacing = JSON.parse(this.renderables.spacingInput.getValue());
            if (spacing !== this._spacing) {
                this._spacing = spacing;
                this._eventOutput.emit('update');
            }
        }
        catch (err) {
            //
        }
    }

    updateAutoLayoutView(alView) {
        if (this._spacing !== undefined) {
            alView.setSpacing(this._spacing);
        }
    }
}

export {SettingsView as default};
