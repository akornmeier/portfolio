---
title: "Modern Linting & Formatting: A Frictionless Developer Experience"
description: How switching to OXLint, Prettier, and automated pre-commit hooks transformed our code quality workflow—making it 50x faster and completely invisible to developers.
date: 2025-11-02
image: https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1470&q=80
minRead: 8
author:
  name: Tony Kornmeier
  avatar:
    src: /assets/img/tk-002.jpg
    alt: Tony Kornmeier
---

After years of battling slow ESLint builds and wrestling with formatting conflicts, I've found a setup that finally gets out of the way and lets developers focus on writing code. Here's how modern tooling transformed our approach to code quality.

## The Problem with Traditional Setups

Most projects start with good intentions: ESLint for linting, Prettier for formatting, maybe some pre-commit hooks if you're disciplined. But in practice, this setup often creates friction:

- **ESLint is slow**: On large codebases, waiting 10-15 seconds for linting feedback breaks flow state
- **Configuration complexity**: Managing eslint-config-prettier, plugin conflicts, and overlapping rules becomes a job in itself
- **Inconsistent enforcement**: Without automated hooks, code quality becomes a suggestion, not a standard

The result? Developers disable linters, skip formatting, or worse—spend time in code review arguing about style instead of discussing logic.

## The Modern Alternative: Speed + Simplicity

Here's our current stack and why each tool earned its place:

### OXLint: The 50x Speed Multiplier

We replaced ESLint with [OXLint](https://oxc-project.github.io/), a Rust-based linter that's 50-100x faster. Not 50% faster—**50 times faster**.

```bash
# Old ESLint setup
eslint . # ~12s on our codebase

# New OXLint setup
oxlint . # ~0.2s on the same codebase
```

**Why OXLint wins:**
- **Native TypeScript support**: No plugins needed, just works
- **Zero configuration needed**: Sensible defaults for Vue, React, and TypeScript
- **Focused on correctness**: Catches bugs and code quality issues, not formatting
- **Active development**: Built by the same team behind the Rust-based JavaScript toolchain

The speed difference isn't just a nice-to-have—it fundamentally changes how you interact with your linter. Instant feedback means you actually run it. Frequently.

### Prettier: The Formatting Authority

[Prettier](https://prettier.io/) remains the gold standard for code formatting, and for good reason:

```json
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "es5",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**Why Prettier is non-negotiable:**
- **Opinion over configuration**: Minimal options mean zero formatting debates
- **Universal support**: Works with every language and framework we use
- **Automatic Tailwind class sorting**: The `prettier-plugin-tailwindcss` plugin keeps utility classes organized
- **Proven reliability**: Years of battle-testing across millions of projects

The key insight: **Formatting isn't a code quality concern—it's an automation problem**. Let Prettier handle it and move on.

### The Perfect Marriage: OXLint + Prettier

Unlike ESLint + Prettier (which requires eslint-config-prettier to prevent conflicts), OXLint and Prettier work together naturally:

- **OXLint**: Focuses exclusively on code quality and correctness
- **Prettier**: Handles all formatting concerns

No overlap. No conflicts. No configuration needed to make them play nice.

## Automated Enforcement: Git Hooks Done Right

Having great tools is only half the battle—you need to ensure they actually run. Enter `simple-git-hooks` and `lint-staged`.

### Why simple-git-hooks?

We chose [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks) over alternatives like Husky because:

- **Zero dependencies**: Literally one lightweight package
- **Simple configuration**: Just a JSON object in package.json
- **No magic**: Plain git hooks with zero abstraction overhead
- **Works everywhere**: Including CI environments without special setup

```json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged"
  }
}
```

### Why lint-staged?

[lint-staged](https://github.com/okonet/lint-staged) ensures we only process changed files:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}": [
      "oxlint --fix",
      "prettier --write"
    ],
    "*.{json,yml,yaml,css,scss,md}": [
      "prettier --write"
    ]
  }
}
```

**The magic:**
1. Developer runs `git commit`
2. Hook triggers automatically
3. Only staged files are processed (subsecond performance)
4. Fixes are auto-applied and added to commit
5. Commit proceeds if no errors

This happens invisibly, every single time. No manual intervention required.

## The Value Proposition: Why This Matters

### For Individual Developers

- **Instant feedback**: OXLint runs in milliseconds, not seconds
- **Zero cognitive load**: Formatting happens automatically
- **Consistent quality**: Every commit is linted and formatted
- **No surprises in CI**: What passes locally will pass in review

### For Teams

- **End formatting debates**: Prettier's opinion is final
- **Faster code reviews**: Focus on logic, not style
- **Consistent codebase**: Every file follows the same standards
- **Onboarding simplified**: New developers get instant feedback on code quality

### For Projects

- **Reduced technical debt**: Issues caught before they merge
- **Improved maintainability**: Consistent patterns across the codebase
- **Better collaboration**: No "whose style do we use?" arguments
- **Faster builds**: OXLint's speed means linting can run more frequently

## The Complete Setup

Here's the full configuration for our stack:

**Install dependencies:**
```bash
pnpm add -D oxlint prettier prettier-plugin-tailwindcss
pnpm add -D simple-git-hooks lint-staged
```

**package.json:**
```json
{
  "scripts": {
    "lint": "oxlint .",
    "lint:fix": "oxlint --fix .",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "postinstall": "simple-git-hooks"
  },
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}": ["oxlint --fix", "prettier --write"],
    "*.{json,yml,yaml,css,scss,md}": ["prettier --write"]
  }
}
```

**.prettierrc:**
```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**Initialize hooks:**
```bash
pnpm exec simple-git-hooks
```

That's it. Under 100 lines of configuration for a complete, production-ready linting and formatting system.

## Real-World Impact

Since switching to this setup six months ago on our team:

- **Linting time reduced from 12s to 0.2s** (60x improvement)
- **Zero formatting-related PR comments** (down from ~15% of all comments)
- **100% pre-commit hook adoption** (was ~40% with slower tools)
- **Developer satisfaction up**: Devs report the tools "just work" and stay out of the way

## The Philosophy: Speed Enables Quality

The key insight from this setup isn't just about faster tools—it's about how **speed changes behavior**.

When linting takes 12 seconds, you run it reluctantly. When it takes 0.2 seconds, you run it constantly. When formatting requires manual intervention, it gets skipped. When it's automatic, it never fails.

Fast, invisible tooling doesn't just save time—it creates a culture where quality is the default, not an aspiration.

## Get Started Today

If you're still using ESLint + Prettier with manual formatting:

1. **Try OXLint**: Drop-in replacement, instant speed boost
2. **Keep Prettier**: It's perfect as-is
3. **Add pre-commit hooks**: Automation removes human error
4. **Remove friction**: The best tools are the ones you forget about

The future of developer tooling is fast, focused, and frictionless. This setup is available today.

---

*Interested in more content on developer tools, accessibility testing, and building better workflows? Check out my [open source projects](/projects) or [get in touch](/#contact).*
