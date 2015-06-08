import View from 'famous/core/View';
import InputSurface from 'famous/surfaces/InputSurface';
import Surface from 'famous/core/Surface';
import LayoutController from 'famous-flex/LayoutController';
import vflToLayout from '../vflToLayout';

class LayoutView extends View {
    constructor(options) {
        super(options);

        this.content = new LayoutController({
            flow: true,
            flowOptions: {
                reflowOnResize: false
            },
            layout: (context) => {
                if (this.alView) {
                    this.alView.setSize(context.size[0], context.size[1]);
                    var subView;
                    for (var key in this.alView.subViews) {
                        subView = this.alView.subViews[key];
                        context.set(subView.name, {
                            size: [subView.width, subView.height],
                            translate: [subView.left, subView.top, 0]
                        });
                    }
                }
            }
        });

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
                content: '<div class="va">Spacing:</div>'
            }),
            spacingInput: new InputSurface({
                value: '8'
            }),
            content: this.content
        };
        this.layout = new LayoutController({
            layout: vflToLayout([
                '|-[widthText(50)]-[widthInput(50)]-[heightText(50)]-[heightInput(50)]-[spacingText(60)]-[spacingInput(200)]',
                'V:[widthText(30,==widthInput,==heightText,==heightInput,==spacingText,==spacingInput)]',
                '|-[content]-|',
                'V:|-[widthText]-[content]-|',
                'V:|-[widthInput]',
                'V:|-[heightText]',
                'V:|-[heightInput]',
                'V:|-[spacingText]',
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
            if (this.alView) {
                this.alView.setSpacing(spacing);
                this.content.reflowLayout();
            }
        }
        catch (err) {
            //
        }
    }

    setAutoLayoutView(alView) {
        this.alView = alView;
        this.contentRenderables = this.contentRenderables || {};
        this.contentPool = this.contentPool || {};
        for (var key in this.contentRenderables) {
            this.contentPool[key] = this.contentRenderables[key];
        }
        this.contentRenderables = {};
        if (this.alView) {
            for (var subView in this.alView.subViews) {
                this.contentRenderables[subView] = this.contentPool[key] || new Surface({
                    content: '<div class="va">' + subView + '</div>',
                    classes: ['subView']
                });
            }
        }
        this._updateSpacing();
        this.content.setDataSource(this.contentRenderables);
    }
}

export {LayoutView as default};
