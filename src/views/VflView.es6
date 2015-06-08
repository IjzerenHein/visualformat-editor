import View from 'famous/core/View';
import Surface from 'famous/core/Surface';
import LayoutController from 'famous-flex/LayoutController';
import vflToLayout from '../vflToLayout';
import TextareaSurface from 'famous/surfaces/TextareaSurface';
import TabBarController from 'famous-flex/widgets/TabBarController';

class VflView extends View {
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

        this.textArea = new TextareaSurface({
            value: '|-[child(==child2/2)]-[child2]-|\nV:|-[child]-|\nV:|-[child2]-|\n'
        });
        this.textArea.on('change', this._onChange.bind(this));
        this.textArea.on('keyup', this._onChange.bind(this));

        this.examples = new Surface();

        this.tabBarController.setItems([
            {tabItem: 'Visual Format', view: this.textArea},
            {tabItem: 'Examples', view: this.examples}
        ]);

        this.layout = new LayoutController({
            layout: vflToLayout([
                '|-[content]-|',
                'V:|-[content]-|'
            ]),
            dataSource: {
                content: this.tabBarController
            }
        });
        this.add(this.layout);
    }

    _onChange() {
        var vfl = this.textArea.getValue();
        if (vfl !== this._vfl) {
            this._vfl = vfl;
            this._eventOutput.emit('update');
        }
    }

    getVisualFormat() {
        return this.textArea.getValue();
    }
}

export {VflView as default};
