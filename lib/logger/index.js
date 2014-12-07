var log4js  = require('log4js'),
    morgan  = require('morgan'),
    config  = require('../configuration'),
    logFile = 'logs/' + config.get('logger:filename'),
    appName = config.get('application:name');

// Log into file by default.
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file(logFile), appName);

/**
 * Logger for the application.
 *
 * @type {Object}
 */
var logger = {
  morgan: morgan(
    config.get('logger:format'),
    {
      'stream': {
        write: function(str) { log4js.getLogger(appName).debug(str);
      }
    }
  }),
  trace: function(str) {
    log4js.getLogger(appName).trace(str);
  },
  debug: function(str) {
    log4js.getLogger(appName).debug(str);
  },
  info: function(str) {
    log4js.getLogger(appName).info(str);
  },
  warn: function(str) {
    log4js.getLogger(appName).warn(str);
  },
  error: function(str) {
    log4js.getLogger(appName).error(str);
  },
  fatal: function(str) {
    log4js.getLogger(appName).fatal(str);
  }
};

module.exports = logger;