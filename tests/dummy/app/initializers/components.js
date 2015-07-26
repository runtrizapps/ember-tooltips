import Ember from 'ember';

export function initialize(/* container, application */) {

  Ember.Component.reopen({
    attributeBindings: ['data-test'],
    'data-test': null,
  });

  // hasBlock polyfill for 1.12 tests
  //   https://github.com/emberjs/ember.js/issues/11430
  if (Ember.VERSION.match("1.12")) {
    Ember.Component.reopen({
      hasBlock: Ember.computed.alias('template')
    });
  }

}

export default {
  name: 'components',
  initialize: initialize
};
