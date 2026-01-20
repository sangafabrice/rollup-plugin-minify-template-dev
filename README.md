## Project Setup

### 1. Clone the project and submodules:
```bash
git clone https://github.com/sangafabrice/rollup-plugin-minify-template-dev . --recurse-submodules
```
### 2. Install the packages:
```bash
npm install --global npm-check-updates
npm install
```
### 3. Install Live Preview on VS Code:
```bash
code --install-extension ms-vscode.live-server
```
### 4. Generate devtools config to open the project in browser Source pane:
```bash
npx --yes devtools-json-generator demo/w3c/
```
### 5. Download images for demo and build self-contained web component:
```bash
npm run dl:img
npm start
```

### 6. Start default server:
Open a file in the server root folder like `index.html` and press `Ctrl+Shift+P` and choose `Live Preview: Start Server Logging`.