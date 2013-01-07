// util
'use strict'

var 
contains = function(a, v){ return a.indexOf(v) !== -1 },
uniq = function(a){
    var 
    pushNewOnly = function(arr, v){ 
        if ( !contains(arr, v) ) arr.push(v);
        return arr;
    }

    return a.reduce(pushNewOnly, []) 
},
stringRemove = function(str){
    var 
    removeOne = function(str, regex){ return str.replace(regex, '') },
    regexes = [].slice.call(arguments, 1)

    return regexes.reduce(removeOne, str)
}

// implementation
var 
dqStr    = /"[^"]*"/g,
snStr    = /'[^']*'/g,
fn       = /function\(.*\)\{.*\}/g,
method   = /\.[a-zA-Z]+[a-zA-Z0-9]*/g,
objProp  = /[a-zA-Z0-9]*[ ]*:/g,
variable = /[a-zA-Z]+/g,
keywords = ['break', 'do', 'instanceof', 'typeof', 'case', 'else', 'new', 'var', 'catch', 'finally',
            'return', 'void', 'continue', 'for', 'switch', 'while', 'debugger', 'function', 'this',
            'with', 'default', 'if', 'throw', 'delete', 'in', 'try'],
keywordsRE = new RegExp(keywords.join('|'), 'g'),
booleans = /true|false/g,
futurewords = ['class', 'enum', 'extends', 'super', 'const', 'export', 'import']


var argsFromStr = function(str){
    var 
    withoutNestedForms = stringRemove(str, dqStr, snStr, fn, method, objProp, keywordsRE, booleans),
    args               = withoutNestedForms.match(variable) || []

    return uniq(args)
}

var λ = function(str){
    var 
    args = argsFromStr(str),
    body = 'return ' + str

    return Function.apply(Function, args.concat([body]))
}

module.exports = λ
