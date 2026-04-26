# Frappe UI Test - Yarn + TypeScript

## Main packages
```
yarn create vite
yarn add -D tailwindcss@^3 postcss autoprefixer
npx tailwindcss init -p
yarn add frappe-ui vue-router
```

## Frappe Site Setup

During development, add CSRF ignore to Frappe site in `/sites/[site_name]/site_config.json`: 
```json
{
  "ignore_csrf": 1
}
```

## Todo
- I also got `http://localhost:9000/socket.io/?EIO=4&transport=polling&t=nfjbap69` error in the console.

## Change Summary in the patched `frappe-ui` package
### Issue: Windows infinite loop fix for frappe proxy path traversal

- Added a persistent patch for frappe-ui to fix parent-directory traversal logic on Windows root paths.
- Replaced Unix-only stop conditions with root-safe termination checks that work on Windows, macOS, and Linux.
- Impact: prevents getCommonSiteConfig path traversal from looping indefinitely on Windows.

Files:
- [patches/frappe-ui+0.1.277.patch](patches/frappe-ui+0.1.277.patch)
- [node_modules/frappe-ui/vite/utils.js](node_modules/frappe-ui/vite/utils.js)

- Added patch-package support so the frappe-ui fix is automatically reapplied after dependency installs.
- Added a postinstall script to run patch-package.

Files:
- [package.json](package.json)