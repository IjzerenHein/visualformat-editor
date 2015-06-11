import View from 'famous/core/View';
import Surface from 'famous/core/Surface';
import LayoutController from 'famous-flex/LayoutController';
import vflToLayout from '../vflToLayout';

class VisualOutputView extends View {
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
        this.layout = new LayoutController({
            layout: vflToLayout([
                '|[content]|',
                'V:|[content]|'
            ]),
            dataSource: {
                content: this.content
            }
        });
        this.add(this.layout);
    };

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
                this.contentRenderables[subView] = this.contentPool[subView] || new Surface({
                    content: '<div class="va">' + subView + '</div>',
                    classes: ['subView']
                });
            }
        }
        this.content.setDataSource(this.contentRenderables);
    }

    getAutoLayoutView() {
        return this.alView;
    }
}

export {VisualOutputView as default};
