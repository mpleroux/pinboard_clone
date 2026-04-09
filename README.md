# README

An experiment to vibe-code a barebones, single user clone of the social bookmarking website Pinboard using Claude Code. All changes will be created using prompts to help me become more familiar with the process and the limitations of prompt engineering.

URL:

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
