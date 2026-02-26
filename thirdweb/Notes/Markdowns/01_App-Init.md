# [ThirdWeb Integration](https://portal.thirdweb.com/react/v5/getting-started)
# [Hardhat](https://hardhat.org/)
# [TurboRepo](https://turborepo.dev/)
# [Shadcn](https://ui.shadcn.com/)


## Steps

### 1. From the `thirdweb` root in this directory run `mkdir crowd-funding`.
### 2. Open up the above documentation to follow along.
### 3. cd `crowd-funding`
### 4. run `bunx create-turbo@latest`

```bash

mohammed khalander@LAPTOP-KA2LP4KT MINGW64 ~/Downloads/BlockChain/thirdweb/crowd-funding (main)
$ bunx create-turbo@latest
✔ Where would you like to create your Turborepo? .
✔ Which package manager do you want to use? bun

>>> Creating a new Turborepo with:

Application packages
 - apps\docs
 - apps\web
Library packages
 - packages\eslint-config
 - packages\typescript-config
 - packages\ui

>>> Success! Your new Turborepo is ready.

To get started:
- Enable Remote Caching (recommended): bunx turbo login
   - Learn more: https://turborepo.dev/remote-cache

- Run commands with Turborepo:
   - bun run build: Build all apps and packages
   - bun run dev: Develop all apps and packages
   - bun run lint: Lint all apps and packages
- Run a command twice to hit cache

mohammed khalander@LAPTOP-KA2LP4KT MINGW64 ~/Downloads/BlockChain/thirdweb/crowd-funding (main)
```
### 5. `mkdir apps/contracts` && `cd apps/contracts`
### 6. run `bunx hardhat --init`

```bash
mohammed khalander@LAPTOP-KA2LP4KT MINGW64 ~/Downloads/BlockChain/thirdweb/crowd-funding/apps/contracts (main)
$ bunx hardhat --init

 █████  █████                         ███  ███                  ███      ██████
░░███  ░░███                         ░███ ░███                 ░███     ███░░███
 ░███   ░███   ██████  ████████   ███████ ░███████    ██████  ███████  ░░░  ░███
 ░██████████  ░░░░░███░░███░░███ ███░░███ ░███░░███  ░░░░░███░░░███░      ████░
 ░███░░░░███   ███████ ░███ ░░░ ░███ ░███ ░███ ░███   ███████  ░███      ░░░░███
 ░███   ░███  ███░░███ ░███     ░███ ░███ ░███ ░███  ███░░███  ░███ ███ ███ ░███
 █████  █████░░███████ █████    ░░███████ ████ █████░░███████  ░░█████ ░░██████
░░░░░  ░░░░░  ░░░░░░░ ░░░░░      ░░░░░░░ ░░░░ ░░░░░  ░░░░░░░    ░░░░░   ░░░░░░
 
👷 Welcome to Hardhat v3.1.10 👷

√ Which version of Hardhat would you like to use? · hardhat-3
√ Where would you like to initialize the project?

Please provide either a relative or an absolute path: · .
√ What type of project would you like to initialize? · mocha-ethers
✨ Template files copied ✨
√ You need to install the necessary dependencies using the following command:
bun add --dev "hardhat@^3.1.10" "@nomicfoundation/hardhat-toolbox-mocha-ethers@^3.0.3" "@nomicfoundation/hardhat-ethers@^4.0.5" "@nomicfoundation/hardhat-ignition@^3.0.8" "@types/chai@^5.2.3" "@types/chai-as-promised@^8.0.1" "@types/mocha@>=10.0.10" "@types/node@^22.8.5" "chai@^6.2.2" "ethers@^6.14.0" "forge-std@foundry-rs/forge-std#v1.9.4" "mocha@^11.0.0" "typescript@~5.8.0"

Do you want to run it now? (Y/n) · true

bun add --dev "hardhat@^3.1.10" "@nomicfoundation/hardhat-toolbox-mocha-ethers@^3.0.3" "@nomicfoundation/hardhat-ethers@^4.0.5" "@nomicfoundation/hardhat-ignition@^3.0.8" "@types/chai@^5.2.3" "@types/chai-as-promised@^8.0.1" "@types/mocha@>=10.0.10" "@types/node@^22.8.5" "chai@^6.2.2" "ethers@^6.14.0" "forge-std@foundry-rs/forge-std#v1.9.4" "mocha@^11.0.0" "typescript@~5.8.0"
bun add v1.2.20 (6ad208bc)

installed hardhat@3.1.10 with binaries:
 - hardhat
installed @nomicfoundation/hardhat-toolbox-mocha-ethers@3.0.3
installed @nomicfoundation/hardhat-ethers@4.0.5
installed @nomicfoundation/hardhat-ignition@3.0.8
installed @types/chai@5.2.3
installed @types/chai-as-promised@8.0.2
installed @types/mocha@10.0.10
installed @types/node@22.19.12
installed chai@6.2.2
installed ethers@6.16.0
installed forge-std@github:foundry-rs/forge-std#1eea5ba
installed mocha@11.7.5 with binaries:
 - mocha
 - _mocha
installed typescript@5.8.3 with binaries:
 - tsc
 - tsserver

225 packages installed [52.07s]
✨ Dependencies installed ✨
Give Hardhat a star on Github if you're enjoying it! ⭐️✨

     https://github.com/NomicFoundation/hardhat
```


### 7. Once the contract is written then run `bunx hardhat build`
### 8. Then go to [Hardhat Test](https://hardhat.org/docs/guides/testing/using-ethers) 
  * Just to get the Idea of syntax of testing 
### 9. Once the Testing is written then run `bunx hardhat test`
### 10. Then follow [Hardhat Deploy Guid](https://hardhat.org/docs/guides/deployment) for deployment
### 10. `cd apps` && `rm -rf docs` && `rm -rf web`
### 11. Go to shadcn starter/create and create `nextjs/shadcn` project 

```bash
mohammed khalander@LAPTOP-KA2LP4KT MINGW64 ~/Downloads/BlockChain/thirdweb/crowd-funding/apps (main)
$ bunx --bun shadcn@latest create --preset "https://ui.shadcn.com/init?base=radix&style=mira&baseColor=gray&theme=emerald&iconLibrary=lucide&font=inter&menuAccent=subtle&menuColor=default&radius=default&template=next&rtl=false" --template next
√ What is your project named? ... web
✔ Creating a new Next.js project.
✔ Writing components.json.
✔ Checking registry.
✔ Updating CSS variables in app\globals.css
✔ Updating app\globals.css
✔ Installing dependencies.
✔ Updating fonts.
✔ Created 1 file:
  - lib\utils.ts

Success! Project initialization completed.
You may now add components.
```

### 12. Now Run `bun dev` from root (crowd-funding)