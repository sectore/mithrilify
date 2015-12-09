/*
 * mithrilify
 * https://github.com/sectore/mithrilify
 *
 * Copyright (c) 2014 Jens Krause
 * Licensed under the MIT license.
 */

'use strict';

var msx = require('msx'),
  through = require('through');

function hasMithrilExtension(file) {
  return /\.(js|msx)$/.test(file);
}

function mithrilify(file, opts) {
  opts = opts || {};
  if (!mithrilify.hasMithrilExtension(file)) {
    return through();
  }

  var data = '';

  function write(buf) {
    data += buf;
  }

  function end() {
    try {
      var src = msx.transform(data, opts.msx_opts);
      this.queue(src);
    } catch (error) {
      this.emit('error', error);
    }

    this.queue(null);
  }

  return through(write, end);
}

mithrilify.hasMithrilExtension = hasMithrilExtension;

module.exports = mithrilify;
