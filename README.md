<div align="center">
     <img src="https://github.com/roger-rangel/vibeverse/blob/main/public/images/dashboard/magical_place.png" object-fit="cover" height="300px" style="border-radius: 10px;" alt="Vibeverse Intro">
    <h1>Vibeverse ✨</h1>
    <strong>AI Movies, Tools, and More 🌿</strong>
    <strong>Creative AI: NFTs as magic keys for AI-generated projects</strong>
</div>
<br>
<div align="center">
  
</div>
<div align="center">
    <br>
    <a href="https://h5fnl-4iaaa-aaaap-abddq-cai.icp0.io/"><b>vibeverse.xyz »</b></a>
    <br><br>
    <a href="https://twitter.com/vibeverse.xyz"><b>🪺 Twitter</b></a>
    •
    <a href="https://github.com/roger-rangel/vibeverse/issues/new"><b>🧞‍♂️ Issues</b></a>
</div>

## About Vibeverse 🍿

Welcome to Vibeverse, a vibrant ecosystem for sharing, discovering, and collaborating on AI-generated content in the Film Industry and beyond. Our platform provides users with the tools and resources to create new content using AI, while also enabling seamless collaboration and community building.

# Demo

Check out our platform in action by trying our demo on <a href="https://h5fnl-4iaaa-aaaap-abddq-cai.icp0.io/"><b>vibeverse.xyz</b></a>

To get started, you might want to explore the project directory structure and the default configuration file. Working with this project in your development environment will not affect any production deployment or identity tokens.

To learn more before you start working with vibeverse, see the following documentation available online:

- [Quick Start](https://internetcomputer.org/docs/quickstart/quickstart-intro)
- [SDK Developer Tools](https://internetcomputer.org/docs/developers-guide/sdk-guide)
- [Rust Canister Devlopment Guide](https://internetcomputer.org/docs/rust-guide/rust-intro)
- [ic-cdk](https://docs.rs/ic-cdk)
- [ic-cdk-macros](https://docs.rs/ic-cdk-macros)
- [Candid Introduction](https://internetcomputer.org/docs/candid-guide/candid-intro)
- [JavaScript API Reference](https://erxue-5aaaa-aaaab-qaagq-cai.raw.icp0.io)


## Features

### Content Sharing: 
Share your AI-generated content with the White Mirror community and receive feedback and collaboration opportunities.

### Content Discovery: 
Discover and explore a wide range of AI-generated content from other talented creators in the Film Industry and other creative industries that are integrating AI into their workflow.

### Collaboration: 
Connect with like-minded individuals, collaborate on projects, and create amazing content together.

### AI Tools: 
Access a rich selection of AI tools specifically designed for the Film Industry, empowering you to create new and innovative content. We are launching this feature in July-August 2023. [50+ tools]

### Community Building: 
Join various communities within Vibeverse, including our exclusive "White Mirror" community, to connect with fellow creators and enthusiasts.


## NPM Package - Token-Gating
We have developed an npm package called <a href="https://github.com/Szegoo/Segenie-Js"><b>Segenie-Js</b></a> that provides token-gating functionality for your applications. You can find the package on <a href="https://npmjs.com/package/segenie-js"><b>npm</b></a> as well. Follow the instructions in the package documentation to integrate it into your projects.
  • For more information about this feature, please visit <a href="https://github.com/roger-rangel/Segenie"><b>Segenie</b></a>

Vibe Token [new feature]
We have also created a token specifically for the ICP platform. This token allows you to access premium features and unlock additional functionalities within the platform. To learn more about the Vibe token and how to obtain it, please visit our <a href="https://github.com/roger-rangel/vibe-token#readme"><b>Token Documentation</b></a>.

Contributing
We welcome contributions from the community to make Vibeverse and the Internet Computer even better. If you have any ideas, bug reports, or feature requests, please open an issue or submit a pull request to our GitHub repository. We appreciate your feedback and participation in the development of Vibeverse.

Contact Us
If you have any questions, suggestions, or just want to say hello, feel free to reach out to our team. You can contact us at roger.rangel.ee@gmail.com or visit our website www.segenie.xyz for more information.

Connect with us on social media:

<div align="center">
    <a href="https://twitter.com/vibeverse.xyz"><b>🪺 Twitter: @vibeversexyz</b></a>
    •
    <a href="https://www.instagram.com/vibeverse.xyz/"><b>🎨 Instagram: @vibeverse.xyz</b></a>
</div>

We look forward to seeing you on the Vibeverse platform! Happy creating and collaborating!

<div align="center">
    <img src="https://github.com/roger-rangel/vibeverse/blob/main/public/images/dashboard/wizard.png" alt="Vibeverse Intro">
</div>

If you want to start working on your project right away, you might want to try the following commands:

```bash
cd vibeverse/
dfx help
dfx canister --help
```

## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:4943?canisterId={asset_canister_id}`.

If you have made changes to your backend canister, you can generate a new candid interface with

```bash
npm run generate
```

at any time. This is recommended before starting the frontend development server, and will be run automatically any time you run `dfx deploy`.

If you are making frontend changes, you can start a development server with

```bash
npm start
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 4943.

### Note on frontend environment variables

If you are hosting frontend code somewhere without using DFX, you may need to make one of the following adjustments to ensure your project does not fetch the root key in production:

- set`DFX_NETWORK` to `production` if you are using Webpack
- use your own preferred method to replace `process.env.DFX_NETWORK` in the autogenerated declarations
  - Setting `canisters -> {asset_canister_id} -> declarations -> env_override to a string` in `dfx.json` will replace `process.env.DFX_NETWORK` with the string in the autogenerated declarations
- Write your own `createActor` constructor
