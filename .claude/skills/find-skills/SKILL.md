---
name: find-skills
description: Helps users discover and install agent skills when they ask questions like "how do I do X", "find a skill for X", "is there a skill that can...", or express interest in extending capabilities. This skill should be used when the user is looking for functionality that might exist as an installable skill.
---

## Overview

When a user asks for help with a specific task or wants to extend capabilities, search the open agent skills ecosystem using the Skills CLI.

## Key Commands

- `npx skills find [query]` - Interactive or keyword-based skill search
- `npx skills add <package>` - Install skills from GitHub or other sources
- `npx skills check` - Check for available updates
- `npx skills update` - Update all installed skills

Browse all skills at https://skills.sh/

## Process

1. **Identify the need** — determine the domain and specific task
2. **Search** using specific keywords (e.g. "react testing" not just "testing")
3. **Present matching skills** with install commands and links
4. **Facilitate installation** once the user approves

## Search Tips

- Use specific terms over generic ones
- Try alternative terminology if first search yields nothing
- Check `vercel-labs/agent-skills` for a broad collection

## Fallback

If no skill exists: offer direct help and suggest `npx skills init` to create a custom skill.
