'use strict';

var mithrilify = require('../lib/mithrilify.js'),
  should = require('should'),
  assert = require('assert'),
  browserify = require('browserify'),
  vm = require('vm'),
  fs = require("fs");

describe('mithrilify', function () {

  /**
   * Helper method to bundle code using browserify
   * @param file {string}
   * @param cb {function} Callback
   * @returns {*} Content of bundled file
   */
  function bundle(file, cb) {
    return browserify(file, {basedir: __dirname})
      .transform(mithrilify)
      .bundle(cb);
  };

  /**
   * Helper method to remove linebreaks from string
   * to compare code loaded from files
   * @param value {string}
   * @returns {string} Cleaned string
   */
  function cleanUpString(value) {
    // remove linebreaks
    value = value.replace(/\r?\n|\r/g, '');
    return value;
  }

  it('should compile Mithril view', function (done) {

    var expectedView = 'function (ctrl) {'
      + '  return m("div", ["Hello ", ctrl.name()])'
      + '}';

    bundle('./mock/example.js', function (err, src) {
      if (err) {
        done(err);
      } else {
        var sandbox = {
          console: {
            log: function (value) {
              value = cleanUpString(String(value));
              value.should.equal(expectedView);
            }
          }
        };

        vm.runInNewContext(src, sandbox);
        done();
      }
    });
  });

  it('should detect Mithril view files using .js file extension', function (done) {
    var f = "folder/any-view.js",
      result = mithrilify.hasMithrilExtension(f);
    result.should.be.ok;
    done();
  });


  it('should detect Mithril view files using .msx file extension', function (done) {
    var file = "folder/another-view.msx",
      result = mithrilify.hasMithrilExtension(file);
    result.should.be.ok;
    done();
  });

});
