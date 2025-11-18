# Deployment Options for Shared UI Library

This document helps you choose the right deployment strategy for your project.

---

## Option 1: Monorepo (Workspace Links)

**Best for:**
- Single repository with multiple projects
- Synchronized updates across all projects
- Shared build and deployment pipelines
- Local development with instant changes

**Package name:** `@workspace/ui`

**Installation:**
```bash
npm install @workspace/ui
```

**Pros:**
- ✅ Instant updates across projects
- ✅ Single version of truth
- ✅ No publishing required
- ✅ Simpler local development

**Cons:**
- ❌ Complex monorepo setup
- ❌ All projects in one repo
- ❌ Shared deployment complexity

**See:** [USAGE_GUIDE.md](./USAGE_GUIDE.md)

---

## Option 2: GitHub Packages (Separate Repos)

**Best for:**
- Separate repositories per project
- Independent deployment schedules
- Standardized UI across distinct applications
- Version-controlled UI updates

**Package name:** `@garret1u/ui`

**Installation:**
```bash
npm install @garret1u/ui
```

**Pros:**
- ✅ Separate repositories
- ✅ Independent deployments
- ✅ Semantic versioning
- ✅ Works with any deployment platform
- ✅ Standard npm workflows

**Cons:**
- ❌ Requires GitHub token
- ❌ Manual version updates
- ❌ Publishing workflow needed

**See:** [GITHUB_PACKAGES_DEPLOYMENT.md](./GITHUB_PACKAGES_DEPLOYMENT.md) ⭐ **Recommended for most teams**

---

## Comparison Table

| Feature | Monorepo | GitHub Packages |
|---------|----------|-----------------|
| **Repository Structure** | Single repo | Separate repos |
| **Installation** | Workspace link | npm install |
| **Updates** | Automatic | Manual (npm update) |
| **Versioning** | N/A | Semantic versioning |
| **Token Required** | No | Yes (GitHub PAT) |
| **Deployment** | Complex | Standard |
| **Build Time** | Slower (builds all) | Faster (pre-built) |
| **Local Dev** | Instant changes | Requires republish |
| **CI/CD Setup** | Complex | Simple |
| **Team Size** | Small-Medium | Any |

---

## Quick Decision Tree

```
Do you have multiple repositories?
├─ Yes → Use GitHub Packages
│         └─ See GITHUB_PACKAGES_DEPLOYMENT.md
│
└─ No → Do you plan to keep everything in one repo?
    ├─ Yes → Use Monorepo
    │         └─ See USAGE_GUIDE.md
    │
    └─ No → Use GitHub Packages
              └─ See GITHUB_PACKAGES_DEPLOYMENT.md
```

---

## Migration Paths

### From Monorepo to GitHub Packages

1. Publish package to GitHub Packages
2. Update import names (`@workspace/ui` → `@garret1u/ui`)
3. Follow GitHub Packages deployment guide
4. Split repositories if desired

### From GitHub Packages to Monorepo

1. Create monorepo structure
2. Move UI package to `packages/ui`
3. Update import names (`@garret1u/ui` → `@workspace/ui`)
4. Configure workspace dependencies
5. Remove npm registry configuration

---

## Example Projects

### GitHub Packages (Separate Repos)
- **ski-resorts** - Next.js 16 + Vercel
  - Repository: https://github.com/garret1U/ski-resorts
  - Deployment: Vercel
  - Uses: `@garret1u/ui@1.0.1`

### Monorepo (Coming Soon)
- TBD

---

## Getting Started

### For New Projects

**Starting fresh?** → Use **GitHub Packages**
- Simpler setup
- Standard workflows
- Easy to understand
- See: [GITHUB_PACKAGES_DEPLOYMENT.md](./GITHUB_PACKAGES_DEPLOYMENT.md)

### For Existing Projects

**Already have projects?** → Use **GitHub Packages**
- No repository restructuring
- Gradual migration
- Independent timelines
- See: [GITHUB_PACKAGES_DEPLOYMENT.md](./GITHUB_PACKAGES_DEPLOYMENT.md)

---

## Support

- **GitHub Packages Issues**: See troubleshooting in [GITHUB_PACKAGES_DEPLOYMENT.md](./GITHUB_PACKAGES_DEPLOYMENT.md#troubleshooting)
- **Component Usage**: See [USAGE_GUIDE.md](./USAGE_GUIDE.md)
- **Component Catalog**: See [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md)

---

**Last Updated**: 2025-11-18
