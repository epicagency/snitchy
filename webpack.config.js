/* eslint-disable global-require */
/**
 * Webpack config builder
 *
 * @param {string} env - Environment, dev or prod
 * @returns {Object} - Environment specific configuration
 */
function buildConfig(env) {
  return require(`./config/${env}.js`)({
    env,
  })
}

module.exports = buildConfig
