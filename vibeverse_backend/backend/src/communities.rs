use candid::Nat;

use crate::{
    memory::COMMUNITIES,
    types::{Community, CommunityId, UserId},
};

pub fn add_communities(communities: Vec<Community>) -> Result<Nat, String> {
    let mut added = Nat::from(0);
    COMMUNITIES.with(|c| {
        for community in communities {
            if c.borrow().get(&community.slug).is_some() {
                return Err(format!("Community with slug {} already exists.", community.slug));
            }

            c.borrow_mut().insert(community.slug.clone(), community);

            added += Nat::from(1);
        }
        Ok(added)
    })
}

#[allow(dead_code)]
pub fn remove_communities(communities: Vec<CommunityId>) -> Result<Nat, String> {
    let mut removed = Nat::from(0);
    COMMUNITIES.with(|c| {
        for community in communities {
            if c.borrow().get(&community).is_none() {
                return Err(format!("Community with slug {} does not exist.", community));
            }

            c.borrow_mut().remove(&community);

            removed += Nat::from(1);
        }
        Ok(removed)
    })
}

pub fn create_community(
    slug: CommunityId,
    creator: UserId,
    name: String,
    description: String,
    logo: String,
) -> Result<(), String> {
    let community = Community::new(slug, creator, name, description, logo, false, vec![creator], vec![creator]);
    add_communities(vec![community]).unwrap();
    Ok(())
}

#[allow(dead_code)]
pub fn join_community(community: CommunityId, user: UserId, follow: bool) -> Result<(), String> {
    COMMUNITIES.with(|c| {
        let mut community = c
            .borrow_mut()
            .get(&community)
            .ok_or_else(|| format!("Community {} does not exist.", community))?;

        community.add_member(user)?;

        if follow && !community.is_follower(&user) {
            community.add_follower(user)?;
        }

        c.borrow_mut().insert(community.slug.clone(), community.clone());

        Ok(())
    })
}

#[allow(dead_code)]
pub fn leave_community(community: CommunityId, user: UserId, unfollow: bool) -> Result<(), String> {
    COMMUNITIES.with(|c| {
        let mut community = c
            .borrow_mut()
            .get(&community)
            .ok_or_else(|| format!("Community {} does not exist.", community))?;

        community.remove_member(user)?;

        if unfollow && community.is_follower(&user) {
            community.remove_follower(user)?;
        }

        c.borrow_mut().insert(community.slug.clone(), community.clone());

        Ok(())
    })
}

#[allow(dead_code)]
pub fn is_member(community: CommunityId, user: UserId) -> bool {
    COMMUNITIES.with(|c| {
        let community = c.borrow().get(&community).expect("Community does not exist.");

        community.is_member(&user)
    })
}

pub fn follow_community(community: CommunityId, user: UserId) -> Result<(), String> {
    COMMUNITIES.with(|c| {
        let mut community = c
            .borrow_mut()
            .get(&community)
            .ok_or_else(|| format!("Community {} does not exist.", community))?;

        community.add_follower(user)?;

        c.borrow_mut().insert(community.slug.clone(), community.clone());

        Ok(())
    })
}

pub fn unfollow_community(community: CommunityId, user: UserId) -> Result<(), String> {
    COMMUNITIES.with(|c| {
        let mut community = c
            .borrow_mut()
            .get(&community)
            .ok_or_else(|| format!("Community {} does not exist.", community))?;

        community.remove_follower(user)?;

        c.borrow_mut().insert(community.slug.clone(), community.clone());

        Ok(())
    })
}

pub fn is_follower(community: CommunityId, user: UserId) -> bool {
    COMMUNITIES.with(|c| {
        let community = c.borrow().get(&community).expect("Community does not exist.");

        community.is_follower(&user)
    })
}

pub fn get_communities_joinned(user: UserId) -> Vec<Community> {
    COMMUNITIES.with(|c| {
        let communities = c.borrow();
        let mut user_communities = Vec::new();
        for (_, community) in communities.iter() {
            if community.is_member(&user) {
                user_communities.push(community.clone());
            }
        }
        user_communities
    })
}

pub fn get_communities_created_by(user: UserId) -> Vec<Community> {
    COMMUNITIES.with(|c| {
        let communities = c.borrow();
        let mut user_communities = Vec::new();
        for (_, community) in communities.iter() {
            if community.is_creator(&user) {
                user_communities.push(community.clone());
            }
        }
        user_communities
    })
}

pub fn total_communities() -> u64 {
    COMMUNITIES.with(|c| {
        let communities = c.borrow();
        communities.len()
    })
}

pub fn get_communities(start_index: Option<u128>, count: Option<u128>) -> Vec<Community> {
    let start_index = start_index.unwrap_or_default();
    let count = count.unwrap_or(total_communities().into());

    let end = Into::<u128>::into(total_communities()).min(
        start_index
            .checked_add(count)
            .expect("adding `start_index` and `count` together overflowed."),
    );

    COMMUNITIES.with(|c| {
        let mut communities = Vec::new();

        for id in start_index..end {
            if let Some((_, community)) = c.borrow().iter().nth(id.try_into().unwrap()) {
                communities.push(community.clone());
            }
        }

        communities
    })
}

#[cfg(test)]
mod tests {
    use candid::Principal;

    use super::*;

    const ALI: Principal = Principal::from_slice(&[0; 24]);
    const BOB: Principal = Principal::from_slice(&[1; 24]);
    #[test]
    fn should_create_community() {
        let result = create_community(
            String::from("community"),
            ALI,
            String::from("name"),
            String::from("description"),
            String::from("logo"),
        );

        assert!(result.is_ok());

        let communities = get_communities_created_by(ALI);
        assert_eq!(communities.len(), 1);
        assert_eq!(communities[0].slug, String::from("community"));
    }

    #[test]
    fn should_join_community() {
        should_create_community();
        let result = join_community(String::from("community"), BOB, true);

        assert!(result.is_ok());

        let is_member_rs = is_member(String::from("community"), BOB);

        assert!(is_member_rs);

        let communities = get_communities_joinned(BOB);
        assert_eq!(communities.len(), 1);
    }

    #[test]
    fn should_follow_community() {
        should_create_community();
        let result = follow_community(String::from("community"), BOB);

        assert!(result.is_ok());

        let is_follower_rs = is_follower(String::from("community"), BOB);

        assert!(is_follower_rs);
    }
}
