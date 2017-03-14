import Analytics from './Analytics'
import Sentry from './Sentry'

/**
 * Snitchy, for EPIC tracking.
 *
 * @class Snitchy
 */
class Snitchy {
  /**
   * Creates an instance of Snitchy.
   * @param {Object} opts options for tools configuration
   * @param {string} env environment: production, staging, dev, serve
   *
   * @memberOf Snitchy
   */
  constructor(opts, env = 'dev') {
    console.info('Snitchy ready 🚀 !')

    if (opts.ga) {
      this.initAnalytics(opts.ga)
    }

    if (opts.sentry && env === 'production') {
      this.initSentry(opts.sentry)
    }
  }

  /**
   * Init Google Analytics.
   *
   * @param {Object} config GA config
   * @param {string} config.test GA test tracking id
   * @param {string} config.prod GA prod tracking id
   * @returns {undefined}
   *
   * @memberOf Snitchy
   */
  initAnalytics(config) {
    this.ga = new Analytics(config)
  }

  /**
   * Proxied ga() function that calls commands on all trackers.
   *
   * @param {string} command ga command
   * @param {any} args ga arguments
   * @returns {undefined}
   *
   * @memberOf Snitchy
   */
  gaAll(command, ...args) {
    this.gaAll.gaAll(command, ...args)
  }

  /**
   * Proxied ga() function that calls commands on all TEST trackers.
   *
   * @param {string} command ga command
   * @param {any} args ga arguments
   * @returns {undefined}
   *
   * @memberOf Snitchy
   */
  gaTest(command, ...args) {
    this.gaTest.gaAll(command, ...args)
  }

  /**
   * Init Sentry.
   *
   * @param {Object} config Sentry config
   * @param {string} config.key Sentry key
   * @param {string} config.project Sentry project
   * @returns {undefined}
   *
   * @memberOf Snitchy
   */
  initSentry(config) {
    this.sentry = new Sentry(config)
  }
}

export default Snitchy
