declare global {
    interface Window {
        analytics: {
          track: (eventName: string, data: string) => void
        };
    }
}

export const trackEvent = (eventName: string, data: any) => {
  window.analytics.track(eventName, data);
};