/* global ga */

// !TODO
// Add comments
// Add more options/config (e.g. plugins)
// test gaAll and gaTest via Snitchy
import 'autotrack/lib/plugins/clean-url-tracker'
import 'autotrack/lib/plugins/max-scroll-tracker'
import 'autotrack/lib/plugins/outbound-link-tracker'
import 'autotrack/lib/plugins/page-visibility-tracker'
// !DEV
// import 'autotrack/lib/plugins/url-change-tracker'

/**
 * Creates a ga() proxy function that calls commands on all passed trackers.
 * @param {Array} trackers an array or objects containing the `name` and
 *     `trackingId` fields.
 * @return {Function} The proxied ga() function.
 */
/* eslint-disable */
const createGaProxy = (trackers) => {
  return (command, ...args) => {
    for (const { name } of trackers) {
      if (typeof command === 'function') {
        ga(() => {
          command(ga.getByName(name))
        });
      } else {
        ga(`${name}.${command}`, ...args)
      }
    }
  }
}
/* eslint-disable */

/**
 * Generates a UUID.
 * https://gist.github.com/jed/982883
 * @param {string|undefined=} a placeholder
 * @return {string} UUID
 */
const uuid = function b(a) {
  return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) :
      ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b)
}

/**
 * Accepts a custom dimension or metric and returns it's numerical index.
 * @param {string} definition The definition string (e.g. 'dimension1').
 * @return {number} The definition index.
 */
const getDefinitionIndex = (definition) => +/\d+$/.exec(definition)[0]


/**
 * Analytics, for EPIC analytics.
 * https://github.com/philipwalton/analyticsjs-boilerplate
 *
 * @class Analytics
 */
class Analytics {
  /**
   * Creates an instance of Analytics.
   * @param {string|Object} trackers single trackingId or trackerName.trackingId
   * @param {string} env environment: production, staging, dev, serve
   *
   * @memberOf Analytics
   */
  constructor(trackers) {
    /**
     * Bump this when making backwards incompatible changes to the tracking
     * implementation. This allows you to create a segment or view filter
     * that isolates only data captured with the most recent tracking changes.
     */
    this.TRACKING_VERSION = '1'

    /**
     * A global list of tracker object, including the name and tracking ID.
     * https://support.google.com/analytics/answer/1032385
     */
    this.ALL_TRACKERS = []

    Object.keys(trackers).forEach((key) => {
      const tracker = {
        name: key,
        trackingId: trackers[key],
      }

      this.ALL_TRACKERS.push(tracker)
    })

    /**
     * Just the trackers with a name matching `test`. Using an array filter
     * allows you to have more than one test tracker if needed.
     */
    this.TEST_TRACKERS = this.ALL_TRACKERS.filter(({name}) =>
      (/test/).test(name))

    /**
     * A default value for dimensions so unset values always are reported as
     * something. This is needed since Google Analytics will drop empty dimension
     * values in reports.
     */
    this.NULL_VALUE = '(not set)'

    /**
     * A mapping between custom dimension names and their indexes.
     */
    this.dimensions = {
      TRACKING_VERSION: 'dimension1',
      CLIENT_ID: 'dimension2',
      WINDOW_ID: 'dimension3',
      HIT_ID: 'dimension4',
      HIT_TIME: 'dimension5',
      HIT_TYPE: 'dimension6',
      HIT_SOURCE: 'dimension7',
      VISIBILITY_STATE: 'dimension8',
      URL_QUERY_PARAMS: 'dimension9',
    }

    /**
     * A mapping between custom metric names and their indexes.
     */
    this.metrics = {
      RESPONSE_END_TIME: 'metric1',
      DOM_LOAD_TIME: 'metric2',
      WINDOW_LOAD_TIME: 'metric3',
      PAGE_VISIBLE: 'metric4',
      MAX_SCROLL_PERCENTAGE: 'metric5',
    }

    /**
     * Command queue proxies
     * (can be called by other modules if needed).
     */
    this.gaAll = createGaProxy(this.ALL_TRACKERS)
    this.gaTest = createGaProxy(this.TEST_TRACKERS)

    this.init()
  }

  /**
   * Initializes all the analytics setup. Creates trackers and sets initial
   * values on the trackers.
   *
   * @param {Object} config test and prod tracking id
   * @returns {undefined}
   *
   * @memberOf Analytics
   */
  init() {
    // Initialize the command queue in case analytics.js hasn't loaded yet.
    window.ga = window.ga || ((...args) => (ga.q = ga.q || []).push(args))

    this.createTrackers()
    this.trackCustomDimensions()
    this.requireAutotrackPlugins()
    this.sendInitialPageview()
    this.sendNavigationTimingMetrics()
  }

  /**
   * Creates the trackers and sets the default transport and tracking
   * version fields. In non-production environments it also logs hits.
   */
  createTrackers() {
    for (const tracker of this.ALL_TRACKERS) {
      window.ga('create', tracker.trackingId, 'auto', tracker.name)
    }

    // Ensures all hits are sent via `navigator.sendBeacon()`.
    this.gaAll('set', 'transport', 'beacon')
  }

  /**
   * Sets a default dimension value for all custom dimensions on all trackers.
   */
  trackCustomDimensions() {
    // Sets a default dimension value for all custom dimensions to ensure
    // that every dimension in every hit has *some* value. This is necessary
    // because Google Analytics will drop rows with empty dimension values
    // in your reports.
    Object.keys(this.dimensions).forEach((key) => {
      this.gaAll('set', this.dimensions[key], this.NULL_VALUE)
    })

    // Adds tracking of dimensions known at page load time.
    this.gaAll((tracker) => {
      tracker.set({
        [this.dimensions.TRACKING_VERSION]: this.TRACKING_VERSION,
        [this.dimensions.CLIENT_ID]: tracker.get('clientId'),
        [this.dimensions.WINDOW_ID]: uuid(),
      })
    })

    // Adds tracking to record each the type, time, uuid, and visibility state
    // of each hit immediately before it's sent.
    this.gaAll((tracker) => {
      const originalBuildHitTask = tracker.get('buildHitTask')
      tracker.set('buildHitTask', (model) => {
        const qt = model.get('queueTime') || 0
        model.set(this.dimensions.HIT_TIME, String(new Date - qt), true)
        model.set(this.dimensions.HIT_ID, uuid(), true)
        model.set(this.dimensions.HIT_TYPE, model.get('hitType'), true)
        model.set(this.dimensions.VISIBILITY_STATE, document.visibilityState, true)

        originalBuildHitTask(model)
      })
    })
  }

  /**
   * Add a custom dimension on all trackers.
   */
  addCustomDimension(index) {
    const name = `dimension${Object.keys(this.dimensions).length + 1}`
    this.dimensions[index] = name
    this.gaAll('set', this.dimensions[index], this.NULL_VALUE)
  }

  /**
   * Add a custom dimensions on all trackers.
   */
  addCustomDimensions(indexes) {
    indexes.forEach((index) => {
      this.addCustomDimension(index)
    })
  }

  /**
   * Add a custom metric.
   */
  addCustomMetric(index) {
    const name = `metric${Object.keys(this.metrics).length + 1}`
    this.metrics[index] = name
  }

  /**
   * Add a custom metrics.
   */
  addCustomMetrics(indexes) {
    indexes.forEach((index) => {
      this.addCustomMetric(index)
    })
  }

  /**
   * Requires select autotrack plugins and initializes each one with its
   * respective configuration options. As an example of using multiple
   * trackers, this function only requires the `maxScrollTracker` and
   * `pageVisibilityTracker` plugins on the test trackers, so you can ensure the
   * data collected is relevant prior to sending it to your production property.
   */
  requireAutotrackPlugins() {
    this.gaAll('require', 'cleanUrlTracker', {
      stripQuery: true,
      queryDimensionIndex: getDefinitionIndex(this.dimensions.URL_QUERY_PARAMS),
      trailingSlash: 'remove',
    })
    this.gaTest('require', 'maxScrollTracker', {
      sessionTimeout: 30,
      timeZone: 'Europe/Brussels',
      maxScrollMetricIndex: getDefinitionIndex(this.metrics.MAX_SCROLL_PERCENTAGE),
    })
    this.gaAll('require', 'outboundLinkTracker', {
      events: ['click', 'contextmenu'],
    })
    this.gaTest('require', 'pageVisibilityTracker', {
      visibleMetricIndex: getDefinitionIndex(this.metrics.PAGE_VISIBLE),
      sessionTimeout: 30,
      timeZone: 'Europe/Brussels',
      fieldsObj: {[this.dimensions.HIT_SOURCE]: 'pageVisibilityTracker'},
    })
    // !DEV
    // this.gaAll('require', 'urlChangeTracker', {
    //   fieldsObj: {[this.dimensions.HIT_SOURCE]: 'urlChangeTracker'},
    // });
  }

  /**
   * Sends the initial pageview to Google Analytics.
   */
  sendInitialPageview() {
    this.gaAll('send', 'pageview', {[this.dimensions.HIT_SOURCE]: 'pageload'})
  }

  /**
   * Gets the DOM and window load times and sends them as custom metrics to
   * Google Analytics via an event hit.
   */
  sendNavigationTimingMetrics() {
    // Only track performance in supporting browsers.
    if (!(window.performance && window.performance.timing)) return;

    // If the window hasn't loaded, run this function after the `load` event.
    if (document.readyState != 'complete') {
      window.addEventListener('load', this.sendNavigationTimingMetrics.bind(this));
      return;
    }

    const nt = performance.timing;
    const navStart = nt.navigationStart;

    const responseEnd = Math.round(nt.responseEnd - navStart);
    const domLoaded = Math.round(nt.domContentLoadedEventStart - navStart);
    const windowLoaded = Math.round(nt.loadEventStart - navStart);

    // In some edge cases browsers return very obviously incorrect NT values,
    // e.g. 0, negative, or future times. This validates values before sending.
    const allValuesAreValid = (...values) => {
      return values.every((value) => value > 0 && value < 6e6);
    };

    if (allValuesAreValid(responseEnd, domLoaded, windowLoaded)) {
      this.gaTest('send', 'event', {
        eventCategory: 'Navigation Timing',
        eventAction: 'track',
        nonInteraction: true,
        [this.metrics.RESPONSE_END_TIME]: responseEnd,
        [this.metrics.DOM_LOAD_TIME]: domLoaded,
        [this.metrics.WINDOW_LOAD_TIME]: windowLoaded,
      });
    }
  }
}

export default Analytics
