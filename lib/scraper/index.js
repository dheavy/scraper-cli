var request = require('request'),
    _       = require('lodash'),
    logger  = require('../logger'),
    Parser  = require('./parser'),
    config  = require('../configuration');

function isURLValid(url) {
  return /\b(https?):\/\/[\-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[\-A-Za-z0-9+&@#\/%=~_|‌​]/gi.test(url);
}

function sanitizeURL(url) {
  return url.substr(0, url.lastIndexOf('?'));
}

function extractProviderFromURL(url) {

}

function getProvider(url) {

}

function done(err, payload) {
  this.setStatus(payload.id, payload.status, payload.message);
}

var Scraper = function(url, id, requester) {
  this.url = url;
  this.id = id;
  this.requester = requester;
  this.providers = config.get('providers:list');

  return this;
};

Scraper.prototype.scrape = function() {
  if (!this.url) {
    return logger.error('URL missing');
  }

  if (!this.isURLValid(this.url)) {
    return logger.error('URL not valid');
  }

  this.url = sanitizeURL(this.url);

  var provider = this.getProvider(this.url);
  if (!provider) {
    logger.error('Provider not supported');
    return done(new Error('Provider not supported'), { id: this.id, status: 'warning', 'missing provider' });
  }

  this.browse(provider, done);
};

Scraper.prototype.browse = function(provider, callback) {
  logger.debug('Browsing ' + this.url + '...');

  var self = this;

  request({ uri: self.url }, function analyze(err, res, body) {
    if (err || res.statusCode !== 200) {
      logger.error('Error when connecting to ' + self.url);
      logger.error(err);
      return callback(err, { id: self.id, status: 'error', message: 'could not connect to ' + self.url });
    }

    return new Parser(provider, self.url, body, callback);
  });
};

Scraper.prototype.setStatus = function(id, status, message) {

};