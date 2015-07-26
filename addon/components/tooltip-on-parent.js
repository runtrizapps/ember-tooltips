import Ember from 'ember';
import layout from '../templates/components/tooltip-on-parent';

const { on } = Ember;

export default Ember.Component.extend({
  attributeBindings: ['style'],
  layout: layout,

  style: Ember.computed(function() {
    return Ember.String.htmlSafe('display:none;');
  }),

  registerOnParent: Ember.on('didInsertElement', function() {
    const parentView = this.get('parentView');

    if (parentView.renderTooltip) {
      parentView.renderTooltip(this);
    } else {
      Ember.warn('No renderTooltip method found on the parent view of the {{tooltip-on-parent}} component');
    }

    this.remove();
  }),

  notifyParent: on('didUpdateAttrs', function() {
    this.get('parentView').send('childDidUpdate', this);
  }),
  tooltipManualMode: Ember.computed.equal('event', 'manual'),

  actions: {
    showTooltip() {
      this.get('parentView').send('showTooltip', this.get('open'));
    }
  }

});
