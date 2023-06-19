# vibeverse

Vibeverse is an app deployed to the  [Internet Computer](https://internetcomputer.org/).

An app where people can share their AI creations as a form of NFTs. The project is built on top of the [Segenie](https://github.com/roger-rangel/Segenie) platform.

### The official website url of the app: https://vibeverse.xyz


### Deployed canisters on the Internet Computer:
- frontend: [https://h5fnl-4iaaa-aaaap-abddq-cai.icp0.io/](https://h5fnl-4iaaa-aaaap-abddq-cai.icp0.io/ "https://h5fnl-4iaaa-aaaap-abddq-cai.icp0.io/")
- backend: [https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=gqljf-taaaa-aaaap-abdea-cai](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=gqljf-taaaa-aaaap-abdea-cai "https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=gqljf-taaaa-aaaap-abdea-cai")


### Prerequisets

Before following the instructions we recommend following  [this](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)  documentation to set up all the prerequisets. Since the backend is written in rust make sure you have all of the necessities that are described  [here](https://internetcomputer.org/docs/current/developer-docs/backend/rust/rust-quickstart)

### Local development

**Follow the following steps to locally deploy the frontend**:
```
npm i
```
```
npm run dev # The website will be accessible at http://localhost:3000/
# OR
dfx start --background
dfx deploy
```

**Follow the following steps to compile the backend and run all the tests**:

```
# To compile the backend code:
cargo build
```
```
# To run all the backend tests:
cargo test
```
