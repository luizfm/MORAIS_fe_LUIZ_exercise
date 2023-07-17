import * as Sentry from '@sentry/react';

const createSentryConfig = () => Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DNS,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ['localhost'],
    }),
    new Sentry.Replay(),
  ],

  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1, 
  replaysOnErrorSampleRate: 1.0,
});

export default createSentryConfig;