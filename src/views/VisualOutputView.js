import View from 'famous/core/View';
import Surface from 'famous/core/Surface';
import LayoutController from 'famous-flex/LayoutController';
import Colors from 'colors.js';

class VisualOutputView extends View {
    constructor(options) {
        super(options);

        this._spacing = undefined;
        this._viewPort = {};
        this._colors = {};
        this._shapes = {};
        this._intrinsicWidths = {};
        this._intrinsicHeight = {};

        this.layout = new LayoutController({
            flow: true,
            flowOptions: {
                reflowOnResize: false
            },
            layout: (context) => {
                if (!this.alView) {
                    return;
                }
                if (this._spacing) {
                    this.alView.setSpacing(this._spacing);
                }
                const iw = this._widths;
                var key;
                for (key in iw) {
                    const subView = this.alView.subViews[key];
                    if (subView) {
                        subView.intrinsicWidth = iw[key];
                    }
                }
                const ih = this._heights;
                for (key in ih) {
                    const subView = this.alView.subViews[key];
                    if (subView) {
                        subView.intrinsicHeight = ih[key];
                    }
                }
                const vp = this._viewPort;
                var contentSize = [
                    ((vp.width !== undefined) && (vp.width !== true)) ? vp.width : Math.max(Math.min(context.size[0], vp['max-width'] || context.size[0]), vp['min-width'] || 0),
                    ((vp.height !== undefined) && (vp.height !== true)) ? vp.height : Math.max(Math.min(context.size[1], vp['max-height'] || context.size[1]), vp['min-height'] || 0)
                ];
                if ((vp.width === true) && (vp.height === true)) {
                    contentSize[0] = this.alView.fittingWidth;
                    contentSize[1] = this.alView.fittingHeight;
                }
                else if (vp.width === true) {
                    this.alView.setSize(undefined, contentSize[1]);
                    contentSize[0] = this.alView.fittingWidth;
                    // TODO ASPECT RATIO?
                }
                else if (vp.height === true) {
                    this.alView.setSize(contentSize[0], undefined);
                    contentSize[1] = this.alView.fittingHeight;
                    // TODO ASPECT RATIO?
                }
                else {
                    contentSize = vp['aspect-ratio'] ? [
                        Math.min(contentSize[0], contentSize[1] * vp['aspect-ratio']),
                        Math.min(contentSize[1], contentSize[0] / vp['aspect-ratio'])
                    ] : contentSize;
                    this.alView.setSize(contentSize[0], contentSize[1]);
                }
                var left = (context.size[0] - contentSize[0]) / 2;
                var top = (context.size[1] - contentSize[1]) / 2;
                for (key in this.alView.subViews) {
                    const subView = this.alView.subViews[key];
                    if ((subView.type !== 'stack') && (key.indexOf('_') !== 0)) {
                        const node = context.get(subView.name);
                        context.set(node, {
                            size: [subView.width, subView.height],
                            translate: [left + subView.left, top + subView.top, subView.zIndex * 5]
                        });
                        var color = 204 - (subView.zIndex * 20);
                        var backgroundColor = this._colors[key] || Colors.rgb2hex(color, color, color);
                        var textColor = Colors.complement(backgroundColor);
                        node.renderNode.setProperties({
                            backgroundColor: backgroundColor,
                            color: textColor
                        });
                    }
                }
            }
        });
        this.add(this.layout);
    };

    set view(alView) {
        this.alView = alView;
        this.contentRenderables = this.contentRenderables || {};
        this.contentPool = this.contentPool || {};
        for (var key in this.contentRenderables) {
            this.contentPool[key] = this.contentRenderables[key];
        }
        this.contentRenderables = {};
        if (this.alView) {
            for (var subView in this.alView.subViews) {
                if (subView.indexOf('_') !== 0) {
                    this.contentRenderables[subView] = this.contentPool[subView] || new Surface({
                        content: '<div class="va">' + subView + '</div>',
                        classes: ['subView']
                    });
                }
            }
        }
        this.layout.setDataSource(this.contentRenderables);
    }

    get view() {
        return this.alView;
    }

    get viewPort() {
        return this._viewPort;
    }

    set viewPort(value) {
        this._viewPort = value || {};
        this.layout.reflowLayout();
    }

    get spacing() {
        return this._spacing;
    }

    set spacing(value) {
        this._spacing = value;
        this.layout.reflowLayout();
    }

    get widths() {
        return this._widths;
    }

    set widths(value) {
        this._widths = value || {};
        this.layout.reflowLayout();
    }

    get heights() {
        return this._heights;
    }

    set heights(value) {
        this._heights = value || {};
        this.layout.reflowLayout();
    }

    get colors() {
        return this._colors;
    }

    set colors(colors) {
        this._colors = colors || {};
        this.layout.reflowLayout();
    }

    get shapes() {
        return this._shapes;
    }

    set shapes(shapes) {
        this._shapes = shapes || {};
        for (var key in this.contentRenderables) {
            if (this._shapes[key] === 'circle') {
                this.contentRenderables[key].addClass('circle');
            }
            else {
                this.contentRenderables[key].removeClass('circle');
            }
        }
    }
}

export {VisualOutputView as default};
