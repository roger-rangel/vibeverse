use ic_cdk_macros::init;
use tracing::info;

#[init]
fn init() {
    info!("Initialization complete");
}
