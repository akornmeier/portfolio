---
title: "Your Dev Environment Should Just Fit: Building the Dot Command"
description: How I built a single-command CLI to turn hours of machine setup into minutes—because life's too short to remember which scripts to run in which order.
date: 2025-11-15
image: https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1470&q=80
minRead: 7
author:
  name: Tony Kornmeier
  avatar:
    src: /assets/img/tk-002.jpg
    alt: Tony Kornmeier
---

You know that feeling when you put on a perfectly tailored jacket? Everything just fits. The shoulders sit right, the sleeves are the perfect length, you can move freely. That's how your development environment should feel.

Instead, most of us are working in the equivalent of borrowed clothes that almost fit. Close enough to get by, but never quite right. You switch machines and spend hours recreating your setup. You forget which scripts to run in which order. Your new laptop feels foreign for weeks.

It doesn't have to be this way.

## The Problem: Dotfiles Chaos

For years, my dotfiles repository was a graveyard of good intentions:
- `bootstrap.sh` for first-time setup
- `install.sh` for... something different?
- `update.sh` that I'd run every few months when I remembered
- A Brewfile that was probably out of sync
- Random scripts in `bin/` that did who-knows-what

Setting up a new machine meant running these scripts in a specific order I'd inevitably forget. Six months later, I'd be SSH'd into a fresh VM trying to remember: "Was it bootstrap then install? Or install then bootstrap? And do I need to source something first?"

Sound familiar?

## Good News, It Doesn't Have To Be This Way

I got tired of the guesswork. What I wanted was simple:

**On a fresh machine:**
```bash
curl -fsSL https://raw.githubusercontent.com/akornmeier/dotfiles/main/install.sh | bash
```

**For daily updates:**
```bash
dot
```

That's it. No flags to remember, no script order to memorize, no wondering if you ran the right thing.

## The Solution: One Binary to Rule Them All

I refactored the entire dotfiles setup into a single `dot` command with three subcommands:

### `dot bootstrap`
First-time setup. Installs Homebrew, clones the repo, symlinks everything. Run it once, forget about it.

### `dot install`
Installs all your tools, apps, and dependencies from the Brewfile. Idempotent, so running it twice doesn't break anything.

### `dot update`
Keeps everything current: pulls latest dotfiles, updates Homebrew packages, refreshes symlinks. This is the one you run regularly.

**The magic part?** Running `dot` with no arguments defaults to `update`. Because that's what you want 99% of the time.

## The Details That Matter

### Smart Automation
The refactor added Changesets for automated version management and release notes. Now when I push changes, GitHub Actions handles the versioning and creates releases automatically. Zero manual bumping of version numbers.

### Code Quality By Default
I added prettier and oxlint to the project (and all the others) because even shell scripts deserve consistent formatting. When your dotfiles are the foundation of your dev environment, quality matters.

### Backward Compatibility
The old scripts still work if you've got muscle memory. They just call the new `dot` command under the hood. No breaking changes for existing workflows.

## The Real Win: Onboarding Time

**Before the refactor:**
1. Clone repo
2. Read README to remember script order (10 minutes)
3. Run bootstrap.sh (20 minutes)
4. Realize I forgot to install Homebrew first (5 minutes of cursing)
5. Start over (another 20 minutes)
6. Install apps manually because Brewfile is out of date (30 minutes)
7. Configure everything (1 hour of copying settings)

**Total:** ~2.5 hours, plus frustration

**After the refactor:**
1. Run one-liner install script (automated, ~30 minutes unattended)
2. Make coffee while it runs
3. Come back to a fully configured machine

**Total:** 30 minutes, zero frustration

## The Philosophy: Tools Should Fade Into The Background

The best tools are the ones you don't think about. Your text editor should feel natural. Your terminal should anticipate your needs. Your dotfiles should just work.

When you switch machines, you shouldn't spend hours recreating your environment. You shouldn't need to remember incantations or consult documentation. You run one command, grab a coffee, and come back to a machine that feels like home.

## Real-World Impact

Since shipping this refactor:

**New machine setup:**
- Used it twice already (new Mac mini for my office, fresh VM for testing)
- Both times took under 30 minutes with zero manual intervention
- No "oh crap, I forgot to install X" moments

**Easy updates:**
- Run `dot` periodically with my morning coffee
- Takes ~10 seconds to check for updates
- When there are updates, they're applied automatically
- Never worry about drift between machines
- It's extendable, just add it to the Brewfile if you need something new

**Sharing with teammates:**
- Colleagues can bootstrap their own dotfiles using the same pattern
- The one-liner install makes it trivial to share
- People actually clone and customize it instead of copy-pasting snippets

## The Technical Bits

For those who care about implementation:

**Structure:**
```
dotfiles/
├── bin/
│   └── dot              # The CLI binary
├── script/
│   ├── bootstrap        # First-time setup
│   ├── install          # Package installation
│   └── update           # Keep things current
├── install.sh           # One-liner quick install
├── Brewfile             # All the things
└── README.md            # Actually kept up to date
```

**The `dot` command is just a shell script** that routes to the appropriate subscript:
```bash
dot bootstrap  # Calls script/bootstrap
dot install    # Calls script/install
dot update     # Calls script/update
dot            # Defaults to update
```

Simple. Obvious. Maintainable.

## Lessons Learned

### 1. **Optimize for the common case**
Most interactions are updates, not installs. Default behavior should match common usage.

### 2. **Idempotency matters**
Every command should be safe to run multiple times. No "only run this once" warnings.

### 3. **Automation > Documentation**
Don't document the steps—automate them. Documentation gets stale, automation doesn't.

### 4. **Make it obvious**
A new user should be able to figure out what to do without reading docs. If they can't, improve the tool.

### 5. **Your tools should reflect your values**
I care about developer experience. My dotfiles should demonstrate that, not contradict it.

## Why This Matters

You spend 8+ hours a day in your development environment. It should feel like a well-tailored suit, not borrowed clothes.

When you switch machines, you shouldn't lose productivity. When you onboard a new team member, they shouldn't spend their first week installing tools. When you try a new framework, you shouldn't worry about dependency conflicts.

Your dotfiles are the foundation of your productivity. Treat them accordingly.

## Try It Yourself

Want to see the setup? Check out the [my setup](https://github.com/akornmeier/dotfiles).

Or just steal the pattern for your own dotfiles:

```bash
# Quick install
curl -fsSL https://raw.githubusercontent.com/yourusername/dotfiles/main/install.sh | bash

# Daily driver
dot
```

Because your development environment should just fit: reliable, familiar, and ready when you need it. Not something you fight with every time you need it.

## What's Next?

Lately, I've been doing a lot of AI research and development. I've realized keeping my different machines sync'd with my custom Claude Agent skills and hooks I have developed is very tricky. I plan to automate the settings to be integrated into this setup. Stay tuned, I'll write a follow up article when I'm done.

---

*Interested in more content on developer tools, automation, and building better workflows? Check out my [open source projects](/projects) or [get in touch](/#contact).*
