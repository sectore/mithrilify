# mithrilify

[Browserify](http://browserify.org/) [transform](https://github.com/substack/node-browserify#btransformopts-tr)
for converting [Mithril](http://lhorie.github.io/mithril/) view templates
using [MSX](https://github.com/insin/msx)

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]


## Install

```bash
$ npm install --save-dev mithrilify
```


## Usage

### Example of a Mithril view template.

It can be defined within a `*.js` or `*.msx` file and
should include `/** @jsx m */` at the top.


```javascript
'use strict';

var View = function (ctrl) {
  return <div>
      hello
    </div>;
};

module.exports = View;
```

### Command line:

```bash
$ browserify -t mithrilify ./view.js > ./bundle.js
```

### [Gulp](http://gulpjs.com/) and [gulp-browserify](https://github.com/deepak1556/gulp-browserify)

```javascript
var gulp = require('gulp');
  browserify = require('gulp-browserify'),
  rename = require('gulp-rename');

gulp.task('bundle', function() {
  gulp.src('app/scripts/view.js')
    .pipe(browserify({
      transform: ['mithrilify']
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('build/'))
});
```


### [Grunt](http://gruntjs.com/) and [grunt-browserify](https://github.com/jmreidy/grunt-browserify)

```javascript

browserify: {
  dist: {
    files: {
      'build/bundle.js': 'app/scripts/view.js',
    },
    options: {
      transform: ['mithrilify']
    }
  }
}
```


### Output:


```javascript
'use strict';

var View = function (ctrl) {
  return {tag: "div", attrs: {}, children: [
      "hello"
    ]};
};
module.exports = View;
```

## Test

Clone project:

```bash
$ git clone https://github.com/sectore/mithrilify.git && cd $_
```

Install dependencies (only once):

```bash
$ npm install
```

Run tests:

```bash
$ gulp test
```

## Credits:

* [MSX](https://github.com/insin/msx) for supporting JSX to Mithril  
* [generator-node-gulp](https://github.com/youngmountain/generator-node-gulp) to create a Node.js module with yo, including gulp and Mocha unit tests.


## Contributors

* [magnetised](https://github.com/magnetised)
* [mkautzmann ](https://github.com/mkautzmann)
* [Naddiseo](https://github.com/Naddiseo)
* [shigi](https://github.com/shigi)
* [sibsibsib](https://github.com/sibsibsib)


## Release History

[History](./HISTORY.md)


## License

Copyright (c) 2015 Jens Krause. Licensed under the [MIT license](./LICENSE.md).



[npm-url]: https://npmjs.org/package/mithrilify
[npm-image]: https://badge.fury.io/js/mithrilify.svg
[travis-url]: https://travis-ci.org/sectore/mithrilify
[travis-image]: https://travis-ci.org/sectore/mithrilify.svg?branch=master
[daviddm-url]: https://david-dm.org/sectore/mithrilify.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/sectore/mithrilify
