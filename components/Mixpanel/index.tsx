// Remove { Dict, Query } if not using TypeScript
import mixpanel, { Dict } from 'mixpanel-browser';

//const isProd = process.env.NODE_ENV === "production";
const KEY = process.env.MIXPANEL || '';

console.log(KEY);
mixpanel.init(KEY);

export const Mixpanel = {
  track: (name: string, props?: Dict) => {
    setTimeout(() => {
      console.log(mixpanel);
      mixpanel.track(name, props);
    }, 2000);
  },
};
