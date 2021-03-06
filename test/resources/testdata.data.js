'use strict';

var fs = require('fs');
var utils = require('../util.js');

var McBopomofoDataConverter =
  require('../../build/mcbopomofo_data_converter.js');

var converter = new McBopomofoDataConverter();
converter.LONGEST_PHRASE_LENGTH = 3;
converter.convert(__dirname + '/testdata.txt', __dirname + '/testdata.data');

var buffer = fs.readFileSync(__dirname + '/testdata.data');
var arr = utils.bufferToNumberArray(buffer);
var text = '\'use strict\';\n\n' +
  '// This the simply the number representation of testdata.data,\n' +
  '// generated by testdata.data.js.\n' +
  'window.testdataResArray = [\n';

arr.forEach(function(num, i) {
  if (i % 8 === 0) {
    text += '  ';
  }

  var numStr = num.toString(16);
  while (numStr.length < 4) {
    numStr = '0' + numStr;
  }
  text += '0x' + numStr;

  if (i < arr.length - 1) {
    text += ', ';
  }

  if ((i + 1) % 8 === 0) {
    text += '\n';
  }
});

text += '];\n';

fs.writeFileSync(__dirname + '/testdata.data.arr.js', text);
