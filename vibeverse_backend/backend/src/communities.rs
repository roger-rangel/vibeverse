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

pub fn join_community(community: CommunityId, user: UserId, follow: bool) -> Result<(), String> {
    COMMUNITIES.with(|c| {
        let mut community = c
            .borrow_mut()
            .get(&community)
            .ok_or_else(|| format!("Community {} does not exist.", community))?;

        community.add_member(user).unwrap();

        if follow && !community.is_follower(&user) {
            community.add_follower(user).unwrap();
        }

        Ok(())
    })
}

pub fn leave_community(community: CommunityId, user: UserId, unfollow: bool) -> Result<(), String> {
    COMMUNITIES.with(|c| {
        let mut community = c
            .borrow_mut()
            .get(&community)
            .ok_or_else(|| format!("Community {} does not exist.", community))?;

        community.remove_member(user).unwrap();
        if unfollow && community.is_follower(&user) {
            community.remove_follower(user).unwrap();
        }

        Ok(())
    })
}
