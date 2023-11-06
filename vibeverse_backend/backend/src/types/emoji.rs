use std::collections::BTreeSet;

use super::UserId;

pub type Emoji = String;

pub type Reaction = (Emoji, BTreeSet<UserId>);

pub type Reactions = Vec<Reaction>;
