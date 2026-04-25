# README

An experiment to vibecode a barebones, single user clone of the social bookmarking website Pinboard using Claude Code. Bookmarking utilities are undoubtedly easy for LLMs to create given how much prior art already exists out there.

All updates were created [using prompts](docs/prompt-history.md) to help me become more familiar with the process of vibe-coding and its limitations. Claude did an impressive job at first, creating a functional single page bookmarking app after the first detailed prompt. Using additional prompts to add features like import/export and light/dark mode also went smoothly.

Claude stumbled when I asked it to convert the HTML page to a local project built with `npm` and run with `Vite`. The page appeared broken in the browser because it didn't recognize Tailwind classes. After several unsuccessful attempts to generate the necessary project configuration with Claude I decided to end this brief vibe-coding experiment and continue the project on my own at a later date. I would like to use what Claude created as a starting point for a more customized bookmarking app and solve any problems myself with Claude's assistance, as opposed to letting it make all the changes.

I am in the process of learning a more professional AI workflow which utilizes skills, subagents, etc. in Traversy Media's [Coding with AI](https://www.traversymedia.com/coding-with-ai) course.

## Features

- Reverse-chronological list of bookmarks with title, URL, tags, and save date
- Responsive layout, minimal aesthetic inspired by Pinboard
- Tags are displayed in a sidebar (desktop) or tag strip (mobile)
    - Click any tag to filter
- Input field in header to search across titles, URLs, and tags
- Add/Edit modal with title, URL, and comma-separated tags
- Delete confirmation modal before removing anything
- Export bookmarks (HTML, JSON)
- Import bookmarks (HTML, JSON)
    - Two modes: Merge and replace
- Bookmarks are persisted in localStorage
- Seeded with 3 sample bookmarks

## Tech Stack

- HTML
- Tailwind CSS
- JavaScript
- Local storage

## Run locally

Open the file `bookmarks.html` directly in the browser, no server required.

## Screenshot

<img src="./public/screenshot.png" width="400" alt="Screenshot of Pinboard Vibecode">
