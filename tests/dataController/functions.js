'use strict';

const { FtpServer } = require('ftpd');
const fs = require('fs-extra');
const path = require('path');

let model = require('../../lib/es5/dataController');

const ftpOptions = {
  host: '127.0.0.1',
  port: '3005',
  tls: null
}

module.exports = function () {
  let ftpServer = null;

  before(function(done) {
    ftpServer = new FtpServer(ftpOptions.host, {
      getInitialCwd: function() {
        return '/';
      },
      getRoot: function() {
        return path.join(__dirname, '../mocks/ftp');
      },
      pasvPortRangeStart: 1025,
      pasvPortRangeEnd: 1050,
      tlsOptions: ftpOptions.tls,
      allowUnauthorizedTls: true,
      useWriteFile: false,
      useReadFile: false,
      uploadMaxSlurpSize: 7000, // N/A unless 'useWriteFile' is true.
    });

    ftpServer.on('error', (error) => {
      console.log('FTP Server error:', error);
    });

    ftpServer.on('client:connected', (connection) => {
      var username = null;
      console.log('client connected:', connection.remoteAddress);
      connection.on('command:user', (user, success, failure) => {
        if (user) {
          username = user;
          success();
        } else {
          failure();
        }
      });
    
      connection.on('command:pass', (pass, success, failure) => {
        if (pass) {
          success(username);
        } else {
          failure();
        }
      });
    });
    
    ftpServer.debugging = 4;
    ftpServer.listen(ftpOptions.port);

    setTimeout(done, 30000);
  });

  describe('Functional suite', function () {
    it('dummy test', function() {
      expect(true).to.be.equal(true);
    });
  });
};
