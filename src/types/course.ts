/* eslint-disable indent */
import {
  Badge as RawBadge,
  Course as RawCourse,
  CourseLevel as RawCourseLevel,
} from '@/declarations/vibeverse_backend/vibeverse_backend.did';

export type CourseId = string;

export interface Badge {
  name: string;
  image: string;
}

export const asBadge = (raw: RawBadge): Badge => {
  return {
    name: raw.n,
    image: raw.i,
  };
};

export type CourseLevel = 'Beginner' | 'Advanced' | 'Intermediate';

export const asCourseLevel = (raw: RawCourseLevel): CourseLevel => {
  if ('Beginner' in raw) {
    return 'Beginner';
  }
  if ('Advanced' in raw) {
    return 'Advanced';
  }
  return 'Intermediate';
};

export const asRawCourseLevel = (level: CourseLevel): RawCourseLevel => {
  switch (level) {
    case 'Beginner':
      return { Beginner: null };
    case 'Advanced':
      return { Advanced: null };
    case 'Intermediate':
      return { Intermediate: null };
    default:
      return { Beginner: null };
  }
};

export interface Course {
  slug: string;
  title: string;
  description: string;
  level: CourseLevel;
  logo: string;
  content: string;
  badge: Badge;
}

export const asCourse = (raw: RawCourse): Course => {
  return {
    slug: raw.s,
    title: raw.t,
    description: raw.d,
    level: asCourseLevel(raw.lv),
    logo: raw.l,
    content: raw.c,
    badge: asBadge(raw.b),
  };
};
