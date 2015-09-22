/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2015
 */

// import dependencies
var AutoLayout = require('autolayout');

function _setSpacing(view, spacing) {
    view.setSpacing(spacing);
}

function _setIntrinsicWidths(context, view, widths) {
    for (var key in widths) {
        var subView = view.subViews[key];
        if (subView) {
            subView.intrinsicWidth = (widths[key] === true) ? context.resolveSize(key, context.size)[0] : widths[key];
        }
    }
}

function _setIntrinsicHeights(context, view, heights) {
    for (var key in heights) {
        var subView = view.subViews[key];
        if (subView) {
            subView.intrinsicHeight = (heights[key] === true) ? context.resolveSize(key, context.size)[1] : heights[key];
        }
    }
}

function _setViewPortSize(context, view, vp) {
    var size = [
        ((vp.width !== undefined) && (vp.width !== true)) ? vp.width : Math.max(Math.min(context.size[0], vp['max-width'] || context.size[0]), vp['min-width'] || 0),
        ((vp.height !== undefined) && (vp.height !== true)) ? vp.height : Math.max(Math.min(context.size[1], vp['max-height'] || context.size[1]), vp['min-height'] || 0)
    ];
    if ((vp.width === true) && (vp.height === true)) {
        size[0] = view.fittingWidth;
        size[1] = view.fittingHeight;
    }
    else if (vp.width === true) {
        view.setSize(undefined, size[1]);
        size[0] = view.fittingWidth;
        // TODO ASPECT RATIO?
    }
    else if (vp.height === true) {
        view.setSize(size[0], undefined);
        size[1] = view.fittingHeight;
        // TODO ASPECT RATIO?
    }
    else {
        size = vp['aspect-ratio'] ? [
            Math.min(size[0], size[1] * vp['aspect-ratio']),
            Math.min(size[1], size[0] / vp['aspect-ratio'])
        ] : size;
        view.setSize(size[0], size[1]);
    }
    return size;
}

function vflToLayout(visualFormat, viewOptions) {
    var view = new AutoLayout.View(viewOptions);
    try {
        var constraints = AutoLayout.VisualFormat.parse(visualFormat, {extended: true, strict: false});
        var metaInfo = AutoLayout.VisualFormat.parseMetaInfo ? AutoLayout.VisualFormat.parseMetaInfo(visualFormat) : {};
        view.addConstraints(constraints);
        var dummyOptions = {};
        return function(context, options) {
            options = options || dummyOptions;
            var key;
            var subView;
            var x;
            var y;
            var zIndex = options.zIndex || 0;
            if (options.spacing || metaInfo.spacing) {
                _setSpacing(view, options.spacing || metaInfo.spacing);
            }
            if (options.widths || metaInfo.widths) {
                _setIntrinsicWidths(context, view, options.widths || metaInfo.widths);
            }
            if (options.heights || metaInfo.heights) {
                _setIntrinsicHeights(context, view, options.heights || metaInfo.heights);
            }
            if (options.viewport || metaInfo.viewport) {
                var size = _setViewPortSize(context, view, options.viewport || metaInfo.viewport);
                x = (context.size[0] - size[0]) / 2;
                y = (context.size[1] - size[1]) / 2;
            }
            else {
                view.setSize(context.size[0], context.size[1]);
                x = 0;
                y = 0;
            }
            for (key in view.subViews) {
                subView = view.subViews[key];
                if ((key.indexOf('_') !== 0) && (subView.type !== 'stack')) {
                    context.set(subView.name, {
                        size: [subView.width, subView.height],
                        translate: [x + subView.left, y + subView.top, zIndex + (subView.zIndex * 5)]
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
