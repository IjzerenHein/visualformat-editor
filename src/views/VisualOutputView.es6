import View from 'famous/core/View';
import Surface from 'famous/core/Surface';
import LayoutController from 'famous-flex/LayoutController';
import Colors from 'colors.js';

class VisualOutputView extends View {
    constructor(options) {
        super(options);

        this._aspectRatio = 0;
        this._colors = {};
        this._shapes = {};

        this.content = new LayoutController({
            flow: true,
            flowOptions: {
                reflowOnResize: false
            },
            layout: (context) => {
                if (this.alView) {
                    var subView;
                    this.alView.setSize(context.size[0], context.size[1]);
                    for (var key in this.alView.subViews) {
                        subView = this.alView.subViews[key];
                        if ((subView.type !== 'stack') && (key.indexOf('_') !== 0)) {
                            const node = context.get(subView.name);
                            context.set(node, {
                                size: [subView.width, subView.height],
                                translate: [subView.left, subView.top, subView.zIndex * 5]
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
            }
        });
        this.layout = new LayoutController({
            layout: (context) => {
                var contentSize = [
                    Math.max(Math.min(context.size[0], this._maxWidth || context.size[0]), this._minWidth || 0),
                    Math.max(Math.min(context.size[1], this._maxHeight || context.size[1]), this._minHeight || 0)
                ];
                contentSize = this._aspectRatio ? [
                    Math.min(contentSize[0], contentSize[1] * this._aspectRatio),
                    Math.min(contentSize[1], contentSize[0] / this._aspectRatio)
                ] : contentSize;
                context.set('content', {
                    size: contentSize,
                    translate: [(context.size[0] - contentSize[0]) / 2, (context.size[1] - contentSize[1]) / 2, 0]
                });
            },
            dataSource: {
                content: this.content
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
        this.content.setDataSource(this.contentRenderables);
    }

    get view() {
        return this.alView;
    }

    get aspectRatio() {
        return this._aspectRatio;
    }

    set aspectRatio(value) {
        if (this._aspectRatio !== value) {
            this._aspectRatio = value;
            this.layout.reflowLayout();
        }
    }

    get maxHeight() {
        return this._maxHeight;
    }

    set maxHeight(value) {
        if (this._maxHeight !== value) {
            this._maxHeight = value;
            this.layout.reflowLayout();
        }
    }

    get minHeight() {
        return this._minHeight;
    }

    set minHeight(value) {
        if (this._minHeight !== value) {
            this._minHeight = value;
            this.layout.reflowLayout();
        }
    }

    get maxWidth() {
        return this._maxWidth;
    }

    set maxWidth(value) {
        if (this._maxWidth !== value) {
            this._maxWidth = value;
            this.layout.reflowLayout();
        }
    }

    get minWidth() {
        return this._minWidth;
    }

    set minWidth(value) {
        if (this._minWidth !== value) {
            this._minWidth = value;
            this.layout.reflowLayout();
        }
    }

    get colors() {
        return this._colors;
    }

    set colors(colors) {
        this._colors = colors || {};
        this.content.reflowLayout();
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
