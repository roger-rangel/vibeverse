import mixpanel, { Dict } from 'mixpanel-browser';

const KEY = process.env.NEXT_PUBLIC_MIXPANEL || '';

mixpanel.init(KEY);

export const Mixpanel = {
  track: (name: string, props?: Dict) => {
    mixpanel.track(name, props);
  },
};
