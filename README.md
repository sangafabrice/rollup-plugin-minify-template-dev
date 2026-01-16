## Project Setup

### 1. Clone the project and submodules:
```bash
git clone https://github.com/sangafabrice/rollup-plugin-minify-template-dev . --recurse-submodules
```
### 2. Set the library and source folders:
```bash
git -C src/ branch lib origin/lib
git -C src/ worktree add ../lib
git -C src/ switch main
```
### 3. Install the packages:
```bash
npm install
```
### 4. Disable JavaScript validation:
```bash
npm run disable
```