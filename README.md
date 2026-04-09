# README

An experiment with Claude Code to vibe-code a barebones, single user clone of the social bookmarking website Pinboard. To become familiar with the process all changes will be created using prompts.

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

## Prompts

### Prompt 1

Build a webpage bookmarking site with the following requirements:

FEATURES:

- Add, edit, delete bookmarked websites
- Each bookmark should save and display the following:
    - Webpage title
    - Webpage URL
    - User-entered tags
    - The date it was last saved or edited
    - An Edit button
    - A Delete button
- The Edit button will bring up a modal dialog with a form of text fields that allow the user to edit the title, URL, and tags
- The Delete button will bring up a modal dialog asking the user to confirm the deletion before performing it

TECHNICAL:

- Responsive design
- Tailwind CSS for styling
- Save bookmarks to database? Suggest best options for free web services

UI:

- Clean, minimal interface similar to Pinboard.in or Delicious
- The front page should display:
    - A reverse chronological list of bookmarks
    - A complete list of tags used by all bookmarks
    - A search field

### Prompt 2

Add options to import and export bookmarks. Since the data is stored as JSON in local storage it makes sense to use that format, unless there are better options.

### Prompt 3

Add a header icon to control light/dark mode and adjust Tailwind styling to handle both color schemes for the entire page. Also honor the user's system color scheme.
