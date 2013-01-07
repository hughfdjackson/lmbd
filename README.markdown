# lmbd

Sugar for your tinest of functions.

## Why

`function(){}` is a lot of noise, ya know?  Also, [i was reading a blog post, and got a little jelly of ruby](http://combinators.info/#string-to-proc).

## Example

```javascript
var λ = require('lmbd')

var people = [ 
  { name: 'super-bach' },
  { name: 'tele man'  },
  { name: 'mozart.. boy?'}
]

var names = people.map(λ('a.name'))
```

## API 

### λ(String) -> function

Accepts a single expression, in string form.  It'll add in parameters as needed for your variables; no worries!.

```javascript
var λ = require('lmbd')

var add = λ('a + b'),
    inc = λ('a + 1')
    wrap = λ('b + a + b')
    
add(1, 2) //= 3
add('foo', 'bar') //= 'foobar'
inc(1) //=2
wrap('"', 'foo') //= '"foo"'
```

## Install

```bash
npm install lmbd
```
