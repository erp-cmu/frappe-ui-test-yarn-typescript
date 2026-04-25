# Frappe UI Test - Yarn + TypeScript

```
yarn create vite
yarn add -D tailwindcss@^3 postcss autoprefixer
npx tailwindcss init -p
yarn add frappe-ui
yarn add vue-router
```

# Todo
- I also got `http://localhost:9000/socket.io/?EIO=4&transport=polling&t=nfjbap69` error in the console.

# Change Summary
## 1. Windows infinite loop fix for frappe proxy path traversal

- Added a persistent patch for frappe-ui to fix parent-directory traversal logic on Windows root paths.
- Replaced Unix-only stop conditions with root-safe termination checks that work on Windows, macOS, and Linux.
- Impact: prevents getCommonSiteConfig path traversal from looping indefinitely on Windows.

Files:
- [patches/frappe-ui+0.1.277.patch](patches/frappe-ui+0.1.277.patch)
- [node_modules/frappe-ui/vite/utils.js](node_modules/frappe-ui/vite/utils.js)

## 2. Patch persistence across installs

- Added patch-package support so the frappe-ui fix is automatically reapplied after dependency installs.
- Added a postinstall script to run patch-package.

Files:
- [package.json](package.json)

## 3. Dependency updates

- Upgraded frappe-ui from 0.1.261 to ^0.1.277.
- Added patch-package to devDependencies.
- Added @meeg/vite-plugin-inspect-config to devDependencies.
- yarn.lock updated to reflect the new dependency tree.

Files:
- [package.json](package.json)
- [yarn.lock](yarn.lock)

## 4. Vite plugin configuration updates

- Added inspect-config plugin import and registration.
- Updated frappeui plugin options to explicitly enable:
  - lucideIcons
  - frappeProxy
  - frappeTypes
  - jinjaBootData
- Explicitly set buildConfig to false.
- Added vue plugin ordering/comments as currently configured.

Files:
- [vite.config.ts](vite.config.ts)

## 5. Generated Vite config artifact

- Generated inspect output was added under .vite-config.
- This appears to be tooling output (environment snapshot) rather than source code.

Files:
- [.vite-config/vite.config.json](.vite-config/vite.config.json)

## 6. Verification

- Dependency install completed successfully.
- patch-package successfully applied patch for frappe-ui 0.1.277 during postinstall.
