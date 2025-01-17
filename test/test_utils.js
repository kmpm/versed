import assert from 'assert'
// assert = require('assert');
import * as util from '../util.js'
// const util = require('../util.js')

describe('Util', function () {
  describe('#mimetype()', function () {
    it('should return type image of format png for "testing.png"', function () {
      const res = util.mimetype("testing.png")
      assert.equal(res.type, "image")
      assert.equal(res.format, "png")
    });
  });
});