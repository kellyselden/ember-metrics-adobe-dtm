# ember-metrics-adobe-dtm

[![Greenkeeper badge](https://badges.greenkeeper.io/kellyselden/ember-metrics-adobe-dtm.svg)](https://greenkeeper.io/)
[![npm version](https://badge.fury.io/js/ember-metrics-adobe-dtm.svg)](https://badge.fury.io/js/ember-metrics-adobe-dtm)
[![Build Status](https://travis-ci.org/kellyselden/ember-metrics-adobe-dtm.svg?branch=master)](https://travis-ci.org/kellyselden/ember-metrics-adobe-dtm)
![Ember Version](https://embadge.io/v1/badge.svg?start=2.8.0)

[ember-metrics](https://github.com/poteto/ember-metrics) adapter for Adobe [Dynamic Tag Management](https://dtm.adobe.com/)

## Installation

```
ember install ember-metrics-adobe-dtm
```

## Usage

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
