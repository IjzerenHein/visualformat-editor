var AutoLayout = require('autolayout.js');

function _layout(view, context) {
    view.setSize(context.size[0], context.size[1]);
    var subView;
    for (var key in view.subViews) {
        if (key.indexOf('_') !== 0) {
            subView = view.subViews[key];
            context.set(subView.name, {
                size: [subView.width, subView.height],
                translate: [subView.left, subView.top, 0]
            });
        }
    }
}

module.exports = function(visualFormat, options) {
    var view = new AutoLayout.View(options);
    try {
        var constraints = AutoLayout.VisualFormat.parse(visualFormat, {extended: true});
        view.addConstraints(constraints);
        return _layout.bind(view, view);
    }
    catch (err) {
        console.log(err); //eslint-disable-line no-console
    }
};
