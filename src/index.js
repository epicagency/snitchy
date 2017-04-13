import Analytics from './Analytics'

/**
 * Snitchy, for GA tracking.
 *
 * @class Snitchy
 */
class Snitchy {
  /**
   * Creates an instance of Snitchy.
   * @param {string|Object} trackers single trackingId or trackerName.trackingId
   * @param {string} env environment: production, staging, dev, serve
   *
   * @memberOf Snitchy
   */
  constructor(trackers, env = 'dev') {
    // !DEV add tests to check/valid config
    // UA-NNNNNN-N
    // check if string -> base
    // if Object -> multiple
    if (!trackers || env === 'serve') {
      return false
    }

    return new Analytics(trackers)
  }
}

export default Snitchy

// !DEV
// Add more options support…
// base, multiple, autotrackPlugins
