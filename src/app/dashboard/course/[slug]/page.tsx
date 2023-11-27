import { anonymousActor } from '@/config';
import { Course as CourseView } from '@/views';
import { asCourse, Course } from '@/types';

export async function generateStaticParams() {
  const rawCourses = await anonymousActor.get_courses([], []);
  return rawCourses.map(asCourse).map((c) => ({ slug: c.slug }));
}

export default function Course({ params }: { params: Pick<Course, 'slug'> }) {
  return <CourseView slug={params.slug} />;
}
