/* Visual format language definition.
 */
/*eslint quotes:[2, "double"]*/
var CodeMirror = require("codemirror");
require("codemirror/addon/mode/simple");
CodeMirror.defineSimpleMode("vfl", {
    // The start state contains the rules that are intially used
    start: [
        {regex: /^(HV|H|V|Z|C)/, token: "meta", push: "orientation"},
        {regex: /\|/, token: "keyword"},
        {regex: /->/, token: "def"},
        {regex: /-/, token: "def", push: "connection"},
        {regex: /~/, token: "def", push: "connection"},
        {regex: /\[/, token: "bracket", push: "view"},
        {regex: /\(/, token: "atom", push: "predicates"},
        {regex: /\w+/, token: "variable"},
        {regex: /\./, token: "meta", push: "attribute"},
        {regex: /.*\/\/.*/, token: "comment"}
    ],
    orientation: [
        {regex: /:/, token: "def", pop: true}
    ],
    connection: [
        {regex: /\(/, token: "atom", push: "predicates"},
        {regex: /[0-9]+/, token: "number"},
        {regex: /\[/, token: "bracket", pop: true, push: "view"},
        {regex: /|/, token: "bracket", pop: true},
        {regex: /-/, token: "def", pop: true},
        {regex: /~/, token: "def", pop: true}
    ],
    view: [
        {regex: /\]/, token: "bracket", pop: true},
        {regex: /\(/, token: "atom", push: "predicates"},
        {regex: /\w(\.\.\d+)?/, token: "variable"}
    ],
    predicates: [
        {regex: /\)/, token: "atom", pop: true},
        {regex: /[0-9]+/, token: "number"},
        {regex: /[=><]=/, token: "operator"},
        {regex: /[\*\/]/, token: "operator", push: "operator"},
        {regex: /\./, token: "meta", push: "attribute"},
        {regex: /\w+/, token: "variable"}
    ],
    operator: [
        {regex: /\d+/, token: "number", pop: true}
    ],
    attribute: [
        {regex: /left/, token: "meta", pop: true},
        {regex: /top/, token: "meta", pop: true},
        {regex: /right/, token: "meta", pop: true},
        {regex: /bottom/, token: "meta", pop: true},
        {regex: /width/, token: "meta", pop: true},
        {regex: /height/, token: "meta", pop: true},
        {regex: /centerX/, token: "meta", pop: true},
        {regex: /centerY/, token: "meta", pop: true}
    ]
});

