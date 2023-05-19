// Remove { Dict, Query } if not using TypeScript
import mixpanel, { Dict } from 'mixpanel-browser';

const KEY = process.env.NEXT_PUBLIC_MIXPANEL || '';

console.log(KEY);
mixpanel.init(KEY);

export const Mixpanel = {
  track: (name: string, props?: Dict) => {
    mixpanel.track(name, props);
  },
};
