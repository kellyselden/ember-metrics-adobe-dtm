ember-metrics-adobe-dtm
==============================================================================

[![Greenkeeper badge](https://badges.greenkeeper.io/kellyselden/ember-metrics-adobe-dtm.svg)](https://greenkeeper.io/)
[![npm version](https://badge.fury.io/js/ember-metrics-adobe-dtm.svg)](https://badge.fury.io/js/ember-metrics-adobe-dtm)
[![Build Status](https://travis-ci.org/kellyselden/ember-metrics-adobe-dtm.svg?branch=master)](https://travis-ci.org/kellyselden/ember-metrics-adobe-dtm)
[![Ember Version](https://img.shields.io/badge/ember-2.12%2B-brightgreen.svg)](https://www.emberjs.com/)

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


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd my-addon`
* `npm install`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
