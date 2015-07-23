var categories = [
    'viewport',
    'colors',
    'shapes'
];

function parseMetaInfo(visualFormat) {
    var metaInfo = {};
    var lines = visualFormat.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        for (var c = 0; c < categories.length; c++) {
            var category = categories[c];
            if (line.indexOf('//' + category + ' ') === 0) {
                var items = line.substring(3 + category.length).split(' ');
                for (var j = 0; j < items.length; j++) {
                    var item = items[j].split(':');
                    metaInfo[category] = metaInfo[category] || {};
                    metaInfo[category][item[0]] = (item.length > 1) ? item[1] : '';
                }
            }
        }
    }
    return metaInfo;
}

export default parseMetaInfo;
