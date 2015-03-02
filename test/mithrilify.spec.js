'use strict';

var mithrilify = require('../lib/mithrilify.js'),
  should = require('should'),
  assert = require('assert'),
  browserify = require('browserify'),
  sinon = require('sinon'),
  vm = require('vm'),
  fs = require("fs"),
  through = require('through'),
  path = require('path'),
  transformTools = require('browserify-transform-tools');

describe('mithrilify', function () {

  /**
   * Helper method to bundle code using browserify
   * @param file {string}
   * @param cb {function} Callback
   * @returns {*} Content of bundled file
   */
  function bundle(file, cb) {
    return browserify(file, {basedir: __dirname})
      .transform(mithrilify, {msx_opts: {precompile:false}})
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
      + '  return m("div", ["Hello ",ctrl.name()])'
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

  it('should throw an error trying to parse an invalid view', function (done) {

    var invalid_file = path.resolve(__dirname, "./mock/view_invalid.js");

    transformTools.runTransform(
      mithrilify,
      invalid_file,
      {},
      function (error, result) {
        // test messge of error object to check parse error
        (error !== null).should.be.true;
        var hasParseErrorMessage = error.message.indexOf('Parse Error:') > -1;
        hasParseErrorMessage.should.be.true;
        done();
      })

  });

});
