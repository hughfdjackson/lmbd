var a = require('assert'),
    λ = require('../')

suite('lmbd')

suite('arguments')

test('infers letters are positional arguments', function(){
    var add1 = λ('a + b'),
        add2 = λ('a+B')

    a.equal(add1('foo', 'bar'), 'foobar')
    a.equal(add2('foo', 'bar'), 'foobar')
})

test('infers multiple letters are positional arguments', function(){
    var add = λ('first + second')
    a.equal(add('foo', 'bar'), 'foobar')
})

test('infers that strings aren\'t variables', function(){
    var prefixWithA1 =  λ('"a b " + l + \' d\''),
        prefixWithA2 =  λ("'a b ' + l + \" d\"")
    
    a.equal(prefixWithA1('c'), 'a b c d')
    a.equal(prefixWithA2('c'), 'a b c d')
})

;['do', 'instanceof', 'typeof', 'else', 'new', 'var', 'catch', 'finally',
  'return', 'void', 'continue', 'for', 'switch', 'while', 'debugger', 'function', 'this',
  'with', 'default', 'if', 'throw', 'delete', 'in', 'try']

test('infers that keywords aren\'t variables', function(){
    a.equal(λ('; switch(true) {case true: break; default: false}').length, 0)
    a.equal(λ('; do { } while (true)').length, 0)
})


test('infers that repeated characters aren\'t variables', function(){
    var doubleAndAdd = λ('a + b + a')
    a.equal(doubleAndAdd(3, 4), 10)
})

test('infers that object keys in literal form are not variables', function(){
    var makeObj = λ('{ a: b }')
    a.equal(makeObj.length, 1)
    a.deepEqual(makeObj(2), { a: 2 })
})

test('infers that nested functions aren\'t variables', function(){
    a.equal(λ('a; (function(b, c){ return b + c })()').length, 1)
})

test('infers that methods aren\'t variables', function(){
    a.equal(λ('a.reduce1Yea(function(a, b){ return a + b })').length, 1)
})

test('a single variable is the identity function', function(){
    a.equal(λ('a')(1), 1)
})

test('no chars is a no-op', function(){
    a.equal(λ('')(), undefined)
})


suite('closure')

test('doesn\'t gain closure over the implementation', function(){
    a.equal(λ('args')(), undefined)
})

test('doesn\'t gain closure over the current execution context (duh)', function(){
    var myVariable = 1
    a.equal(λ('myVariable')(), undefined)
})
