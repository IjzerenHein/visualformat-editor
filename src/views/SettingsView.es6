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

        this._extendedFormat = (getParameterByName('extended') !== '') ? (parseInt(getParameterByName('extended')) !== 0) : 1;

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
            }),
            extendedText: new Surface({
                content: '<div class="va">Extended format (EVFL):</div>',
                classes: ['setting', 'text']
            }),
            extendedInput: new InputSurface({
                type: 'checkbox',
                classes: ['setting', 'input']
            })
        };
        if (this._extendedFormat) {
            this.renderables.extendedInput.setAttributes({
                checked: true
            });
        }
        this.layout = new LayoutController({
            layout: vflToLayout(`
|[spacing:[spacingText(spacingInput)]-[spacingInput]]|
|[extended:[extendedText(extendedInput)]-[extendedInput]]|
V:|-[spacing(30)]-[extended(30)]
            `),
            dataSource: this.renderables
        });
        this.add(this.layout);
        this.renderables.spacingInput.on('change', this._updateSpacing.bind(this));
        this.renderables.spacingInput.on('keyup', this._updateSpacing.bind(this));

        this.renderables.extendedInput.on('change', this._updateExtended.bind(this));
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

    _updateExtended() {
        this._extendedFormat = this.renderables.extendedInput.getAttributes().checked;
        if (this.renderables.extendedInput._currentTarget) {
            this._extendedFormat = this.renderables.extendedInput._currentTarget.checked ? true : false;
        }
        this._eventOutput.emit('update', true);
    }

    updateAutoLayoutView(alView) {
        if (this._spacing !== undefined) {
            alView.setSpacing(this._spacing);
        }
    }

    getExtended() {
        return this._extendedFormat;
    }
}

export {SettingsView as default};
