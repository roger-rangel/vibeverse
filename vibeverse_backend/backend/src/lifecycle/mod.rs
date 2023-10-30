mod init;
mod post_upgrade;
mod pre_upgrade;

const UPGRADE_BUFFER_SIZE: usize = 1024 * 1024; // 1MB

// TODO
// fn init_state(env: Box<dyn Environment>, data: Data, wasm_version: BuildVersion) {
// }
