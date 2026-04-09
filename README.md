# README

An experiment to vibe-code a barebones, single user clone of the social bookmarking website Pinboard using Claude Code. Bookmarking utilities are undoubtedly easy for LLMs to create given how much prior art already exists out there.

All updates will be created using prompts to help me become more familiar with the process of vibe-coding and its limitations. This is not intended to replace a more thorough AI workflow that utilizes context, skills, subagents, etc.

## Features

- Reverse-chronological list of bookmarks with title, URL, tags, and save date
- Tags are displayed in a sidebar (desktop) or tag strip (mobile)
    - Click any tag to filter
- Input field in header to search across titles, URLs, and tags
- Add/Edit modal with title, URL, and comma-separated tags
- Delete confirmation modal before removing anything
- localStorage persistence
- Seeded with 3 sample bookmarks
- Responsive layout, minimal aesthetic inspired by Pinboard
- Export bookmarks (HTML, JSON)
- Import bookmarks (HTML, JSON)
    - Two modes: Merge and replace

## Tech Stack

- HTML
- Tailwind CSS
- JavaScript
- Local storage

## Run locally

For now, open the file `bookmarks.html` directly in the browser.
