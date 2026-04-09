# Prompt Assignment

## Description

Write a prompt to generate a landing page using the principles we just covered. Pick any SaaS product idea you want - could be a productivity tool, a developer tool, whatever interests you.

Use the prompt structure and principles from the previous section. Think about:

- What specific sections and content do you need?
- What technical requirements should you include? Since it is claude.ai, I would suggest just HTML, CSS and JS for tech.
- What design direction or references can you provide?
- Are you being specific enough, or is the AI going to have to guess?

## Prompts

### 1

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

### 2

Add options to import and export bookmarks. Since the data is stored as JSON in local storage it makes sense to use that format, unless there are better options.

### 3

Add a header icon to control light/dark mode and adjust Tailwind styling to handle both color schemes for the entire page. Also honor the user's system color scheme.
