import Ember from 'ember';
import BaseAdapter from 'ember-metrics/metrics-adapters/base';
import canUseDOM from 'ember-metrics/utils/can-use-dom';

function track(event) {
  if (!canUseDOM) {
    return;
  }

  if (!window._satellite) {
    window._satellite = {
      pending: []
    };
  }

  let { _satellite } = window;

  if (_satellite.initialized) {
    _satellite.track(event);
  } else {
    _satellite.pending.push(event);
  }
}

export default BaseAdapter.extend({
  toStringExtension() {
    return 'AdobeDTM';
  },

  init() {
    if (!canUseDOM) {
      return;
    }

    let {
      src,
      debug = false
    } = this.get('config');

    Ember.assert(`[ember-metrics] You must pass a valid \`src\` to the ${this.toString()} adapter`, src);

    let reference = document.getElementsByTagName('script')[0];
    let script = document.createElement('script');
    script.async = 1;
    script.src = src;
    reference.parentNode.insertBefore(script, reference);

    script.addEventListener('load', () => {
      window._satellite.setDebug(debug);
      window._satellite.pageBottom();
    }, { once: true });
  },

  identify() {

  },

  trackEvent({ event }) {
    track(event);
  },

  trackPage({ page }) {
    track(page);
  },

  alias() {

  },

  willDestroy() {
    if (!canUseDOM) {
      return;
    }

    document.querySelector('script[src*="assets.adobedtm.com"]').remove();

    delete window._satellite;
  }
});
