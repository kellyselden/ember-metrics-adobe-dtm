ember-metrics-adobe-dtm
==============================================================================

[![Greenkeeper badge](https://badges.greenkeeper.io/kellyselden/ember-metrics-adobe-dtm.svg)](https://greenkeeper.io/)
[![npm version](https://badge.fury.io/js/ember-metrics-adobe-dtm.svg)](https://badge.fury.io/js/ember-metrics-adobe-dtm)
[![Build Status](https://travis-ci.org/kellyselden/ember-metrics-adobe-dtm.svg?branch=master)](https://travis-ci.org/kellyselden/ember-metrics-adobe-dtm)
[![Ember Version](https://img.shields.io/badge/ember-2.16%2B-brightgreen.svg)](https://www.emberjs.com/)

[ember-metrics](https://github.com/poteto/ember-metrics) adapter for Adobe [Dynamic Tag Management](https://dtm.adobe.com/)

Installation
------------------------------------------------------------------------------

```
ember install ember-metrics-adobe-dtm
```


Usage
------------------------------------------------------------------------------

```js
// config/environment.js
let ENV = {
  metricsAdapters: [
    {
      name: 'AdobeDTM',
      config: {
        // leave off `src` if the dtm script is already on the page
        src: '//assets.adobedtm.com/your-script-url.js',

        // turns on dtm debug logging
        debug: true
      }
    }
  ]
};
```

This comes with a test helper to mock the _satellite window object.

```js
import mock, { reset } from 'ember-metrics-adobe-dtm/test-support/mock';

mock();
reset();

// or

mock({
  // optional custom window mock
  window,

  // optional pageBottom callback
  pageBottom,

  // optional track callback
  track
});

reset({
  // optional custom window mock
  window
})
```


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
