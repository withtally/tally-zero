![hero](/public/og.png)

<p align="center">
	<h1 align="center"><b>TallyZero</b></h1>
<p align="center">
    Decentralized Voting Made Simple
    <br />
    <br />
    <a href="https://go.findmalek.com/anPiuRx">Documentation</a>
    .
    <a href="https://tally-zero-preview.vercel.app/">Website</a>
    ·
    <a href="https://github.com/function03-labs/tally-zero/issues">Issues</a>
  </p>
</p>

# What is TallyZero

> A robust, open-source platform for onchain voting, Tally Zero ensures accessibility and transparency, leveraging React and IPFS for true decentralization.


# App Architecture

- Yarn
- React
- TypeScript
- Nextjs
- TailwindCSS


### Hosting

- Fleek (IPFS Hosting, deployment, build)
- Github (Codebase, issues, PRs, actions)

### Services

- LogSnag (Events)
- Nodemailer (Email)
- Github Actions (CI/CD)
- Web3Modal (Wallet connection)
- Ethers (Fetching proposals)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=function03-labs/tally-zero&type=Date)](https://star-history.com/#function03-labs/tally-zero&Date)

# Essential Guidelines

For hosting options other than the ones provided, such as [IPFS Deployment](https://ipfs.thirdwebcdn.com/ipfs/QmfGUuMzLqHyAybnUsPG6aMwQ241V6Q69AmPxCWsVsTDcD) or [Vercel Deployment](https://tally-zero-preview.vercel.app/), we suggest visiting [Web3Modal](https://cloud.walletconnect.com/sign-in) to establish a new project. Subsequently, create a `.env` or `.env.local` file, or input it as an environment variable in your hosting provider. Ensure the naming convention is `NEXT_PUBLIC_WEB3STORAGE_PROJECT_ID`.

The project's pages are located in the `/app` directory, with components organized as follows:

- `container`: Components related to the interface
- `form`: All forms are housed here
- `navigation`: Components associated with the layout
- `section`: Components for the marketing page
- `table`: Self explanatory
- `ui`: Components from [Shadcn UI](https://ui.shadcn.com/)

The `/config` folder is crucial for maintenance purposes:

- `chains.ts`: Contains all chains for Web3Modal connection
- `data.ts`: Lists the chains supported by Tally Zero (refer to the image). You can add as many as required.

![Supported Chains](/public/readme/chain.png)

Lastly, the `/data` folder contains the ABI for TallyZero.