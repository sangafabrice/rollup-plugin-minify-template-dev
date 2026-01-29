[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/sangafabrice/rollup-plugin-minify-template-dev)

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

### 3. Install Live Preview and Prettier on VS Code:

```bash
code --install-extension ms-vscode.live-server
code --install-extension esbenp.prettier-vscode
```

### 4. Generate devtools config to open the project in browser Source pane:

```bash
npm run devtools:gen
```

### 5. Download images for demo and build self-contained web component:

```bash
npm run download:images
npm start
```

### 6. Start default server:

Open a file in the server root folder like `index.html` and press `Ctrl+Shift+P` and choose `Live Preview: Start Server Logging`.

### 7. JSONC scripts file processing

Open the `package.scripts.json` and press `Ctrl+K M` to select the language of the file, then type `JSON with Comments (jsonc)` to disable comments validation. To make it permanent, run the command below:

```bash
npm run vscode:settings
```

To strip comments using breakpoint, start the script `setup/npmc.ps1` which inserts the scripts in the `package.json` file from the adjacent `package.scripts.json` when it exists:

```powershell
setup/npmc.ps1
```