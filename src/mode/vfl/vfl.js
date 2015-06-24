/* Visual format language definition.
 */
/*eslint quotes:[2, "double"]*/
var CodeMirror = require("codemirror");
require("codemirror/addon/mode/simple");
CodeMirror.defineSimpleMode("vfl", {
    // The start state contains the rules that are intially used
    start: [
        {regex: /^[HVZ]/, token: "meta", push: "orientation"},
        {regex: /\|/, token: "keyword"},
        {regex: /-/, token: "def", push: "connection"},
        {regex: /\[/, token: "bracket", push: "view"},
        {regex: /.*\/\/.*/, token: "comment"}
    ],
    orientation: [
        {regex: /:/, token: "def", pop: true}
    ],
    connection: [
        {regex: /\(/, token: "bracket", push: "connectionPredicate"},
        {regex: /[0-9]+/, token: "number"},
        {regex: /\[/, token: "bracket", pop: true, push: "view"},
        {regex: /|/, token: "bracket", pop: true},
        {regex: /-/, token: "def", pop: true}
    ],
    connectionPredicate: [
        {regex: /[=><]=/, token: "operator"},
        {regex: /[0-9]+/, token: "number"},
        {regex: /\)/, token: "bracket", pop: true}
    ],
    view: [
        {regex: /\]/, token: "bracket", pop: true},
        {regex: /\(/, token: "bracket", push: "predicates"},
        {regex: /\w/, token: "variable"}
    ],
    predicates: [
        {regex: /\)/, token: "bracket", pop: true},
        {regex: /[0-9]+/, token: "number"},
        {regex: /[=><]=/, token: "operator"},
        {regex: /[\*\/]/, token: "operator", push: "operator"},
        {regex: /\w+/, token: "variable"}
    ],
    operator: [
        {regex: /\d+/, token: "number", pop: true}
    ]
});

