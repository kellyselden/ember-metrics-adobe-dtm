import { run } from '@ember/runloop';
import { moduleFor, test } from 'ember-qunit';
import { lookupWindow, mockWindow } from 'ember-window-mock';
import sinon from 'sinon';

let window;
let setDebugSpy;
let pageBottomSpy;
let trackSpy;

moduleFor('metrics-adapter:adobe-dtm', 'adobe-dtm adapter', {
  beforeEach() {
    mockWindow(this);
    window = lookupWindow(this);

    setDebugSpy = sinon.spy();
    pageBottomSpy = sinon.spy();
    trackSpy = sinon.spy();

    window._satellite = {
      initialized: true,
      setDebug: setDebugSpy,
      pageBottom: pageBottomSpy,
      track: trackSpy,
      pending: []
    };

    subject = _subject.bind(this);
  }
});

let subject;
function _subject(config, load) {
  let adapter = this.subject({
    config: Object.assign({
      src: '//assets.adobedtm.com/123.js'
    }, config)
  });

  let { document } = window;

  let script = document.querySelector('script[src*="assets.adobedtm.com"]');

  if (script) {
    let _load = () => script.dispatchEvent(new Event('load'));
    if (load) {
      load(_load);
    } else {
      _load();
    }
  }

  return adapter;
}

test('it initializes _satellite', async function(assert) {
  subject();

  assert.deepEqual(setDebugSpy.args, [[false]]);
  assert.ok(pageBottomSpy.calledOnce);
});

test('it marks script async', async function(assert) {
  subject();

  let script = document.querySelector('script[src*="assets.adobedtm.com"]');

  assert.equal(script.async, 1);
});

test('it doesn\'t initialize _satellite twice', async function(assert) {
  subject({}, load => {
    load();
    load();
  });

  assert.deepEqual(setDebugSpy.args, [[false]]);
  assert.ok(pageBottomSpy.calledOnce);
});

test('it sets debug flag', async function(assert) {
  subject({
    debug: true
  });

  assert.deepEqual(setDebugSpy.args, [[true]]);
});

test('it calls track from trackEvent', async function(assert) {
  let adapter = subject();

  adapter.trackEvent({ event: 'my test event' });

  assert.deepEqual(trackSpy.args, [['my test event']]);
});

test('it calls track from trackPage', async function(assert) {
  let adapter = subject();

  adapter.trackPage({ page: 'my test page' });

  assert.deepEqual(trackSpy.args, [['my test page']]);
});

test('it pushed pending from trackEvent if not initialized', async function(assert) {
  window._satellite.initialized = false;

  let adapter = subject();

  adapter.trackEvent({ event: 'my test event' });

  assert.deepEqual(window._satellite.pending, ['my test event']);
});

test('it pushed pending from trackPage if not initialized', async function(assert) {
  window._satellite.initialized = false;

  let adapter = subject();

  adapter.trackPage({ page: 'my test page' });

  assert.deepEqual(window._satellite.pending, ['my test page']);
});

test('it initializes pending from trackEvent if not loaded', async function(assert) {
  window._satellite = null;

  let adapter = subject({}, () => {});

  assert.notOk(window._satellite);

  adapter.trackEvent({ event: 'my test event' });

  assert.deepEqual(window._satellite.pending, ['my test event']);
});

test('it initializes pending from trackPage if not loaded', async function(assert) {
  window._satellite = null;

  let adapter = subject({}, () => {});

  assert.notOk(window._satellite);

  adapter.trackPage({ page: 'my test page' });

  assert.deepEqual(window._satellite.pending, ['my test page']);
});

test('it still deletes _satellite if no src', function(assert) {
  let adapter = subject({
    src: null
  });

  assert.ok(window._satellite);

  run(() => {
    adapter.destroy();
  });

  assert.notOk(window._satellite);
});

test('it removes script', function(assert) {
  let adapter = subject();

  assert.ok(document.querySelector('script[src*="assets.adobedtm.com"]'));

  run(() => {
    adapter.destroy();
  });

  assert.notOk(document.querySelector('script[src*="assets.adobedtm.com"]'));
});
