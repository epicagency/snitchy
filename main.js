import Snitchy from './lib'

// Set ga and/or sentry configurations.
const opts = {
  ga: {
    test: 'UA-12345-1',
    prod: 'UA-12345-2',
  },
}

const snitchy = new Snitchy(opts, process.env.NODE_ENV)

// https://docs.hotjar.com/docs/does-hotjar-support-ajax--single-page-apps
console.info('snitchy!!!', snitchy);
snitchy.ga.gaTest('send', 'pageview', location.pathname);
