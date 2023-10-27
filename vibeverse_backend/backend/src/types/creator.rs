use candid::CandidType;

#[derive(Clone, CandidType, PartialEq, Debug)]
pub struct Creator {
    /// The display name of the creator.
    pub name: String,
    /// The avatar of the creator.
    pub avatar: String,
}
