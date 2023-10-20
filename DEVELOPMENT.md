### Prerequisties

- Rust
- Node.js
- dfx

### Development

1. Start local node

   ```bash
   dfx start --background --clean
   ```

2. Build all canisters

   ```bash
   dfx build
   ```

3. Deploy all canisters

   ```bash
   dfx deploy
   ```

4. Run frontend

   ```bash
   npm run dev
   ```

#### Test file upload in local

```bash
dfx canister call vibeverse_assets authorize '(principal "<REPLACE_PRINCIPAL>")'
```

### Test

```bash
cargo test
```
