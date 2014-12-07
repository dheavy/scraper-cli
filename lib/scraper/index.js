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
  var extracted = url.substr(url.indexOf('://') + 3);
  extracted = extracted.substr(0, extracted.indexOf('/'));
  if (extracted.substr(0, 4) === 'www.') {
    extracted = extracted.substr(4);
  }
  logger.debug('Scraper extracted "' + extracted + '" from "' + url + '".');
  return extracted;
}

function getProvider(url) {
  if (!this.providers) {
    logger.error('Could not load providers list');
    return done(new Error('Could not load providers list'), { id: this.id, status: 'error', messager: 'Could not load providers list' });
  }

  var providerName = this.extractProviderFromURL(url),
      provider = _where(this.providers, { name: providerName })[0];

  if (provider.basedOn) {
    var baseProvider = _.where(this.providers, { name: provider.basedOn })[0];
    this.url = this.url.replace(provider.name, baseProvider.name);
    provider = baseProvider;
  }

  logger.debug('Provider is ' + provider + '.');
  return provider;
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
    return done(new Error('URL missing for scraping'), { id: this.id, status: 'error', message: 'URL is missing' });
  }

  if (!this.isURLValid(this.url)) {
    return logger.error('URL not valid');
    return done(new Error('URL is invalid'), { id: this.id, status: 'error', message: 'URL is invalid' });
  }

  this.url = sanitizeURL(this.url);

  var provider = this.getProvider(this.url);
  if (!provider) {
    logger.error('Provider not supported');
    return done(new Error('Provider not supported'), { id: this.id, status: 'warning', message: 'missing provider' });
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

module.exports = Scraper;