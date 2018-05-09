'use strict';

var BaseView = require('../../../src/views/base-view');
var constants = require('../../../src/constants');
var classlist = require('../../../src/lib/classlist');
var Promise = require('../../../src/lib/promise');

describe('BaseView', function () {
  describe('Constructor', function () {
    it('does not require options to be passed', function () {
      expect(function () {
        new BaseView(); // eslint-disable-line no-new
      }).not.to.throw();
    });

    it('takes properties from passed options', function () {
      var view = new BaseView({foo: 'boo', yas: 'gaga'});

      expect(view.foo).to.equal('boo');
      expect(view.yas).to.equal('gaga');
    });
  });

  describe('teardown', function () {
    it('returns a resolved promise', function () {
      var view = new BaseView();
      var promise = view.teardown();

      expect(promise).to.be.a.instanceof(Promise);
    });
  });

  describe('requestPaymentMethod', function () {
    it('returns a rejected promise', function () {
      var view = new BaseView();

      return view.requestPaymentMethod().then(function () {
        throw new Error('should not resolve');
      }).catch(function (err) {
        expect(err).to.be.an.instanceOf(Error);
        expect(err.message).to.equal(constants.errors.NO_PAYMENT_METHOD_ERROR);
      });
    });
  });

  describe('getPaymentMethod', function () {
    it('returns undefined if there is no activeMethodView on instance', function () {
      var view = new BaseView();

      expect(view.getPaymentMethod()).to.equal(undefined); // eslint-disable-line no-undefined
    });

    it('returns undefined if activeMethodView does not have a payment method', function () {
      var view = new BaseView();

      view.activeMethodView = {};

      expect(view.getPaymentMethod()).to.equal(undefined); // eslint-disable-line no-undefined
    });

    it('returns the payment method object if there is an activeMethodView with a payment method object', function () {
      var view = new BaseView();
      var paymentMethod = {};

      view.activeMethodView = {
        paymentMethod: paymentMethod
      };

      expect(view.getPaymentMethod()).to.equal(paymentMethod);
    });
  });

  describe('onSelection', function () {
    it('is a noop function', function () {
      var view = new BaseView();

      expect(view.onSelection).to.be.a('function');
    });
  });

  describe('preventUserAction', function () {
    beforeEach(function () {
      this.sandbox.stub(classlist, 'add');
    });

    it('adds a loading class to view element', function () {
      var element = global.document.createElement('div');
      var view = new BaseView({
        element: element
      });

      view.preventUserAction();

      expect(classlist.add).to.be.calledOnce;
      expect(classlist.add).to.be.calledWith(element, 'braintree-sheet--loading');
    });
  });

  describe('allowUserAction', function () {
    beforeEach(function () {
      this.sandbox.stub(classlist, 'remove');
    });

    it('adds a loading class to view element', function () {
      var element = global.document.createElement('div');
      var view = new BaseView({
        element: element
      });

      view.allowUserAction();

      expect(classlist.remove).to.be.calledOnce;
      expect(classlist.remove).to.be.calledWith(element, 'braintree-sheet--loading');
    });
  });
});
