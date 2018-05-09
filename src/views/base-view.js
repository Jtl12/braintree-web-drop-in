'use strict';

var assign = require('../lib/assign').assign;
var classlist = require('../lib/classlist');
var DropinError = require('../lib/dropin-error');
var errors = require('../constants').errors;
var Promise = require('../lib/promise');

function BaseView(options) {
  options = options || {};

  assign(this, options);
}

BaseView.prototype.getElementById = function (id) {
  if (!this.element) { return null; }

  return this.element.querySelector('[data-braintree-id="' + id + '"]');
};

BaseView.prototype.requestPaymentMethod = function () {
  return Promise.reject(new DropinError(errors.NO_PAYMENT_METHOD_ERROR));
};

BaseView.prototype.getPaymentMethod = function () {
  return this.activeMethodView && this.activeMethodView.paymentMethod;
};

BaseView.prototype.onSelection = function () {};

BaseView.prototype.teardown = function () {
  return Promise.resolve();
};

BaseView.prototype.preventUserAction = function () {
  classlist.add(this.element, 'braintree-sheet--loading');
};

BaseView.prototype.allowUserAction = function () {
  classlist.remove(this.element, 'braintree-sheet--loading');
};

module.exports = BaseView;
