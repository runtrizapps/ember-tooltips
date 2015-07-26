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

  tooltipManualMode: Ember.computed.equal('event', 'manual'),

  setupOldEmberCompat: on('didInsertElement', function() {
    if (this.get('tooltipManualMode') && this.get('_isOldEmber')) {
      const observerFn = Ember.run.bind(this, 'send', 'showTooltip');
      this.addObserver('open', observerFn);
      // Must listen for parent destroy, because we remove this component from DOM
      this.get('parentView').on('willDestroyElement', () => {
        this.removeObserver('open', observerFn);
      });
    }
  }),

  actions: {
    showTooltip() {
      this.get('parentView').send('showTooltip', this.get('open'));
    }
  }

});
