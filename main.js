import Snitchy from './lib'

// Set ga and/or sentry configurations.
const trackers = {
  test: 'UA-12345-1',
  prod: 'UA-12345-2',
}

const snitchy = new Snitchy(trackers, process.env.NODE_ENV)

// https://docs.hotjar.com/docs/does-hotjar-support-ajax--single-page-apps
// !DEV
snitchy.gaTest('send', 'pageview', location.pathname);

snitchy.addCustomDimension('HOME_ANIM_START')
snitchy.addCustomDimension('HOME_ANIM_END')
snitchy.addCustomMetric(['HOME_ANIM_END'])
console.info('snitchy!!!', snitchy.metrics);

snitchy.gaTest('send', 'event', {
  eventCategory: 'Home Anim Timing',
  eventAction: 'track',
  nonInteraction: true,
  [snitchy.metrics.HOME_ANIM_START]: 0,
  [snitchy.metrics.HOME_ANIM_END]: 666,
});
