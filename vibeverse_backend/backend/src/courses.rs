use crate::{
    creators,
    memory::COURSES,
    types::{Badge, Course, CourseId, CourseLevel, UserId},
};

pub fn create_course(
    slug: CourseId,
    title: String,
    description: String,
    level: CourseLevel,
    logo: String,
    content: String,
    author: UserId,
    badge: Badge,
) -> Result<CourseId, String> {
    let course = Course::new(slug.clone(), title, description, level, logo, content, author, badge);
    COURSES.with(|courses| {
        courses.borrow_mut().insert(slug.clone(), course);
    });

    let mut binding = creators::creator_metadata(author);
    let author_profile = binding.as_mut().expect("Not exist creator");
    author_profile.add_created_course_now(slug.clone());
    creators::set_creator_metadata(author, author_profile.clone())?;

    Ok(slug)
}

pub fn total_courses() -> u64 {
    COURSES.with(|c| {
        let courses = c.borrow();
        courses.len()
    })
}

pub fn get_courses(start_index: Option<u128>, count: Option<u128>) -> Vec<Course> {
    let start_index = start_index.unwrap_or_default();
    let count = count.unwrap_or(total_courses().into());

    let end = Into::<u128>::into(total_courses()).min(
        start_index
            .checked_add(count)
            .expect("adding `start_index` and `count` together overflowed."),
    );

    COURSES.with(|c| {
        let mut communities = Vec::new();

        for id in start_index..end {
            if let Some((_, community)) = c.borrow().iter().nth(id.try_into().unwrap()) {
                communities.push(community.clone());
            }
        }

        communities
    })
}
