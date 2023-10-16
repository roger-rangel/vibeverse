import mixpanel, { Dict } from 'mixpanel-browser';

const KEY = process.env.NEXT_PUBLIC_MIXPANEL;

if (KEY) {
  mixpanel.init(KEY);
}

export const Mixpanel = {
  track: (name: string, props?: Dict) => {
    if (KEY) {
      mixpanel.track(name, props);
    }
  },
};
