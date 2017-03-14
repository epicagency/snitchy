import Raven from 'raven-js';

/**
 * Sentry with raven-js
 *
 * @class Sentry
 */
class Sentry {
  /**
   * Creates an instance of Sentry.
   * @param {Object} config Sentry config
   * @param {string} config.key Sentry key
   * @param {string} config.project Sentry project
   *
   * @memberOf Sentry
   */
  constructor(config) {
    // !DEV add tests to check/valid config
    const { key } = config
    const { project } = config

    Sentry.init(key, project)
  }

  /**
   * Init Sentry tracking
   *
   * @param {string} key Sentry key
   * @param {string} project Sentry project
   * @returns {undefined}
   *
   * @memberOf Sentry
   */
  static init(key, project) {
    Raven.config(`https://${key}@sentry.io/${project}`, {
      environment: 'production',
    }).install()
  }
}

export default Sentry
