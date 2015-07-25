var AutoLayout = require('autolayout.js');

function vflToLayout(visualFormat, options) {
    var view = new AutoLayout.View(options);
    try {
        var constraints = AutoLayout.VisualFormat.parse(visualFormat, {extended: true, strict: false});
        view.addConstraints(constraints);
        return function(context) {
            view.setSize(context.size[0], context.size[1]);
            var subView;
            for (var key in view.subViews) {
                if (key.indexOf('_') !== 0) {
                    subView = view.subViews[key];
                    context.set(subView.name, {
                        size: [subView.width, subView.height],
                        translate: [subView.left, subView.top, subView.zIndex * 5]
                    });
                }
            }
        };
    }
    catch (err) {
        console.log(err); //eslint-disable-line no-console
    }
}

module.exports = vflToLayout;
