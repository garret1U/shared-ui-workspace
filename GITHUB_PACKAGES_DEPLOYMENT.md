# GitHub Packages Deployment Guide

**For deploying projects using @garret1u/ui from separate repositories**

This guide documents the complete workflow for using the shared UI library across **separate git repositories** with **independent deployments** (e.g., to Vercel, Netlify, etc.).

---

## Overview

This approach is for teams with:
- ✅ Multiple **separate repositories** (not a monorepo)
- ✅ Independent project deployments
- ✅ Need for standardized UI across projects
- ✅ GitHub-based workflows

**Key Benefits:**
- Standardized components across all projects
- Semantic versioning for controlled updates
- Works with any deployment platform
- Free GitHub Packages hosting
- No monorepo complexity

---

## Table of Contents

1. [Initial Setup (One-Time)](#initial-setup-one-time)
2. [Adding to New Projects](#adding-to-new-projects)
3. [Vercel Deployment Configuration](#vercel-deployment-configuration)
4. [Updating the Package](#updating-the-package)
5. [Troubleshooting](#troubleshooting)
6. [Example: ski-resorts Migration](#example-ski-resorts-migration)

---

## Initial Setup (One-Time)

### 1. Configure Package for GitHub Packages

In `shared-ui-workspace/packages/ui/package.json`:

```json
{
  "name": "@garret1u/ui",
  "version": "1.0.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/garret1U/shared-ui-workspace.git",
    "directory": "packages/ui"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

### 2. Create GitHub Token with Package Permissions

```bash
# Using GitHub CLI
gh auth refresh -h github.com -s write:packages,read:packages

# Or manually at: https://github.com/settings/tokens
# Required scopes:
# - write:packages
# - read:packages
# - repo (if repository is private)
```

### 3. Authenticate npm with GitHub

```bash
# Add to ~/.npmrc
echo "//npm.pkg.github.com/:_authToken=$(gh auth token)" >> ~/.npmrc
echo "@garret1u:registry=https://npm.pkg.github.com" >> ~/.npmrc
```

### 4. Publish Package

```bash
cd shared-ui-workspace/packages/ui
npm publish
```

**Expected Output:**
```
+ @garret1u/ui@1.0.0
npm notice Publishing to https://npm.pkg.github.com
```

✅ Package is now published to GitHub Packages!

---

## Adding to New Projects

### Step 1: Update Package Name References

In your project, replace `@workspace/ui` with `@garret1u/ui`:

**Find all references:**
```bash
cd your-project
grep -r "@workspace/ui" .
```

**Update imports:**
```typescript
// Before
import { Button, Card } from '@workspace/ui'
import uiConfig from '@workspace/ui/tailwind.config'

// After
import { Button, Card } from '@garret1u/ui'
import uiConfig from '@garret1u/ui/tailwind.config'
```

**Use find & replace:**
```bash
find . -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -not -path "./node_modules/*" \
  -exec sed -i "s|@workspace/ui|@garret1u/ui|g" {} \;
```

### Step 2: Update package.json

```json
{
  "dependencies": {
    "@garret1u/ui": "^1.0.0"
  }
}
```

Remove old file dependency:
```diff
- "@workspace/ui": "file:../shared-ui-workspace/packages/ui"
+ "@garret1u/ui": "^1.0.0"
```

### Step 3: Create .npmrc in Project Root

```bash
# your-project/.npmrc
@garret1u:registry=https://npm.pkg.github.com
```

⚠️ **Do NOT commit GitHub tokens to .npmrc!** Use environment variables (see Vercel section).

### Step 4: Configure Next.js (if applicable)

Add `transpilePackages` to `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@garret1u/ui'],
}

module.exports = nextConfig
```

This tells Next.js to compile the TypeScript source from the package.

### Step 5: Update Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import uiConfig from '@garret1u/ui/tailwind.config'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    // Include UI package source
    './node_modules/@garret1u/ui/src/**/*.{ts,tsx}',
  ],
  presets: [uiConfig],
}

export default config
```

### Step 6: Install and Test

```bash
# Install with GitHub authentication
npm install

# Test build
npm run build
```

---

## Vercel Deployment Configuration

Vercel deployments require special handling because environment variable substitution in `.npmrc` doesn't work as expected.

### Solution: Dynamic .npmrc Creation

#### 1. Create Setup Script

Create `setup-npmrc.sh` in project root:

```bash
#!/bin/bash
# Create .npmrc with GitHub token from environment
if [ -n "$GITHUB_TOKEN" ]; then
  echo "//npm.pkg.github.com/:_authToken=$GITHUB_TOKEN" >> .npmrc
  echo "✅ Added GitHub token to .npmrc"
else
  echo "⚠️  GITHUB_TOKEN not set"
fi
```

Make it executable:
```bash
chmod +x setup-npmrc.sh
```

#### 2. Create vercel.json

```json
{
  "buildCommand": "bash setup-npmrc.sh && npm run build",
  "installCommand": "bash setup-npmrc.sh && npm install"
}
```

This ensures the token is injected **before** npm tries to install packages.

#### 3. Add GITHUB_TOKEN to Vercel

**Option A: Via Vercel CLI**

```bash
# Link project (if not linked)
vercel link

# Add token to all environments
echo "your_github_token" | vercel env add GITHUB_TOKEN production
echo "your_github_token" | vercel env add GITHUB_TOKEN preview
echo "your_github_token" | vercel env add GITHUB_TOKEN development
```

**Option B: Via Vercel Dashboard**

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name**: `GITHUB_TOKEN`
   - **Value**: Your GitHub Personal Access Token
   - **Environments**: Select all three (Production, Preview, Development)
5. Click **Save**

#### 4. Deploy

```bash
git add -A
git commit -m "feat: migrate to GitHub Packages for UI library"
git push origin main
```

Vercel will automatically deploy with the new configuration.

### Files to Commit

✅ **DO commit:**
- `.npmrc` (with registry config only, NO token)
- `setup-npmrc.sh` (token injection script)
- `vercel.json` (build configuration)
- Updated `package.json`
- Updated component files

❌ **DO NOT commit:**
- GitHub tokens in `.npmrc`
- Personal access tokens anywhere
- `node_modules/`

**Example .npmrc for git:**
```
@garret1u:registry=https://npm.pkg.github.com
```

---

## Updating the Package

### Publishing Updates

1. **Update version** in `packages/ui/package.json`:
   ```json
   {
     "version": "1.0.1"
   }
   ```

2. **Publish new version:**
   ```bash
   cd shared-ui-workspace/packages/ui
   npm publish
   ```

3. **Update projects:**
   ```bash
   cd your-project
   npm update @garret1u/ui

   # Or specific version
   npm install @garret1u/ui@1.0.1
   ```

### Version Strategy

- **Patch (1.0.x)**: Bug fixes, minor tweaks
- **Minor (1.x.0)**: New components, new features
- **Major (x.0.0)**: Breaking changes

---

## Troubleshooting

### Error: "401 Unauthorized" when installing

**Cause**: GitHub token not available or invalid

**Solution:**
```bash
# Verify token is set
echo $GITHUB_TOKEN

# For local dev
export GITHUB_TOKEN=$(gh auth token)

# For Vercel
# Add GITHUB_TOKEN via dashboard or CLI (see above)
```

### Error: "Bearer [token] is not a legal HTTP header value"

**Cause**: Token being interpolated incorrectly in .npmrc

**Solution**: Use the setup script approach (see Vercel section)

### Error: "Module not found: Can't resolve '@garret1u/ui'"

**Cause**: Package not installed or build cache issue

**Solution:**
```bash
# Clean and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vercel build cache
vercel --force
```

### Error: "peer dependency" conflicts

**Cause**: Package requires Next.js 15 or 16

**Solution**: Update peer dependencies in `packages/ui/package.json`:
```json
{
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "^15.0.0 || ^16.0.0"
  }
}
```

Then republish the package.

### Build succeeds locally but fails on Vercel

**Checklist:**
1. ✅ GITHUB_TOKEN added to Vercel environment variables
2. ✅ `setup-npmrc.sh` script exists and is executable
3. ✅ `vercel.json` has custom install/build commands
4. ✅ `.npmrc` committed with registry (no token)
5. ✅ `transpilePackages` configured in next.config.js

### Styles not applying

**Solution**: Ensure Tailwind includes UI package:
```typescript
// tailwind.config.ts
content: [
  './app/**/*.{ts,tsx}',
  './node_modules/@garret1u/ui/src/**/*.{ts,tsx}', // Must include
]
```

---

## Example: ski-resorts Migration

Complete reference implementation.

### Files Changed

**package.json:**
```diff
{
  "dependencies": {
-   "@workspace/ui": "file:../shared-ui-workspace/packages/ui",
+   "@garret1u/ui": "^1.0.0"
  }
}
```

**next.config.js:**
```diff
const nextConfig = {
  reactStrictMode: true,
+ transpilePackages: ['@garret1u/ui'],
}
```

**tailwind.config.ts:**
```diff
- import uiConfig from '@workspace/ui/tailwind.config'
+ import uiConfig from '@garret1u/ui/tailwind.config'

content: [
  './app/**/*.{ts,tsx}',
- './node_modules/@workspace/ui/src/**/*.{ts,tsx}',
+ './node_modules/@garret1u/ui/src/**/*.{ts,tsx}',
]
```

**All component files (10 files):**
```diff
- import { Button, Card } from '@workspace/ui'
+ import { Button, Card } from '@garret1u/ui'
```

**New files:**
- `.npmrc` - Registry configuration
- `setup-npmrc.sh` - Token injection script
- `vercel.json` - Build configuration

### Deployment Result

✅ **Build Time**: 48 seconds
✅ **Status**: Successfully deployed
✅ **URL**: https://ski-resorts-19yhl95f2-invcg-projects.vercel.app

---

## Best Practices

### 1. Version Pinning

Use exact versions for stability:
```json
{
  "dependencies": {
    "@garret1u/ui": "1.0.0"  // Exact version
  }
}
```

Or allow patch updates:
```json
{
  "dependencies": {
    "@garret1u/ui": "~1.0.0"  // 1.0.x updates only
  }
}
```

### 2. Security

- 🔒 Never commit GitHub tokens
- 🔒 Use environment variables for sensitive data
- 🔒 Rotate tokens if exposed
- 🔒 Use minimal token scopes (read:packages for consumers)

### 3. Documentation

Document in your project README:
```markdown
## UI Library

This project uses [@garret1u/ui](https://github.com/garret1U/shared-ui-workspace)
from GitHub Packages.

### Setup

1. Ensure GITHUB_TOKEN is available
2. Run `npm install`
3. See [GitHub Packages Deployment Guide](link) for details
```

### 4. CI/CD

Add to CI workflows:
```yaml
# .github/workflows/deploy.yml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

steps:
  - name: Install dependencies
    run: npm install
```

---

## Migration Checklist

Use this checklist when migrating a project:

- [ ] Update package name from `@workspace/ui` to `@garret1u/ui`
- [ ] Update package.json dependency
- [ ] Create `.npmrc` with registry configuration
- [ ] Add `transpilePackages` to next.config.js
- [ ] Update Tailwind content paths
- [ ] Find and replace all imports (10+ files typical)
- [ ] Create `setup-npmrc.sh` script
- [ ] Create `vercel.json` configuration
- [ ] Add GITHUB_TOKEN to Vercel environment
- [ ] Test local build: `npm run build`
- [ ] Commit and push changes
- [ ] Verify Vercel deployment succeeds
- [ ] Update project documentation

---

## Summary

**Key Differences from Monorepo:**

| Aspect | Monorepo | GitHub Packages |
|--------|----------|-----------------|
| Repository | Single repo | Separate repos |
| Installation | Workspace link | npm install |
| Updates | Automatic | Manual (npm update) |
| Versioning | N/A | Semantic versioning |
| Deployment | Complex | Standard |
| Token needed | No | Yes |

**When to Use GitHub Packages:**
- ✅ Separate repositories per project
- ✅ Independent deployment schedules
- ✅ Need for version control
- ✅ Standard npm workflows

**When to Use Monorepo:**
- ✅ Shared deployment pipeline
- ✅ Synchronized updates
- ✅ Single version across all projects
- ✅ Complex build orchestration

---

**Last Updated**: 2025-11-18
**Package Version**: @garret1u/ui@1.0.1
**Tested With**: Next.js 16, Vercel, GitHub Packages
**Reference Implementation**: [ski-resorts](https://github.com/garret1U/ski-resorts)
