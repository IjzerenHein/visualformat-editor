var c = require('cassowary/bin/c');
window.c = c;
var AutoLayout = require('autolayout.js/dist/autolayout');

function _layout(view, context) {
    view.setSize(context.size[0], context.size[1]);
    var subView;
    for (var key in view.subViews) {
        subView = view.subViews[key];
        context.set(subView.name, {
            size: [subView.width, subView.height],
            translate: [subView.left, subView.top, 0]
        });
    }
}

module.exports = function(visualFormat) {
    var view = new AutoLayout.View();
    try {
        view.addVisualFormat(visualFormat);
        return _layout.bind(view, view);
    }
    catch (err) {
        console.log(err); //eslint-disable-line no-console
    }
};
