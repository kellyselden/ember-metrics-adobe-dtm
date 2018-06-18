import BaseAdapter from 'ember-metrics/metrics-adapters/base';
import canUseDOM from 'ember-metrics/utils/can-use-dom';
import window from 'ember-window-mock';

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
    _satellite.pending = _satellite.pending || [];
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

    // Ember.assert(`[ember-metrics] You must pass a valid \`src\` to the ${this.toString()} adapter`, src);

    if (!src) {
      return;
    }

    let { document } = window;

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

  trackEvent({ event }) {
    track.call(this, event);
  },

  trackPage({ page }) {
    track.call(this, page);
  },

  willDestroy() {
    let { document } = window;

    let script = document.querySelector('script[src*="assets.adobedtm.com"]');
    if (script) {
      script.remove();
    }

    delete window._satellite;
  }
});
