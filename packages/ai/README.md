
1) Change the name in package.json
  `"name": "@repo/<boilerplate>",`

2)  to add the package add as dependency in the other package/app:
    `"@repo/<boilerplate>": "workspace:*",`

3) Install `pnpm install`

4) Build `pnpm build`

5) delete this README.md