# group-sort-imports README

Automatic import grouping and sorting extension for .jsx and .tsx files.
Use with Prettier to avoid nasty behavior.

## Features

Automatically groups import lines into blocks. Sorts the lines within each block alphabetically by import path.

Customize which imports go into which groups using regex.

## Extension Settings

`groupSortImports.sortOnSave`: check this to sort on save

`groupSortImports.sortingSettings`: array of sorting groups

Each sorting group should have:

_Required:_

- `"regex": "\\.s?css$"` - regex to test import path.
  Remember to have one group with `"regex": "."`
  to catch all imports that do not fall in any other group

- `"importance": 3` - groups with higher importance work first.
  If you have few rules that could target the same line,
  consider giving higher `importance` to more specific one

_Optional:_

- `"groupLabel": "Components"` - to add a comment above the block, in this case: `// Components`

- `"lineAfter": true` - to add extra empty line after block

An Example `settings.json`:

```json
"groupSortImports.sortOnSave": true,
  "groupSortImports.sortingSettings": [
    {
      "regex": "\\.s?css$",
      "importance": 3,
      "lineAfter": true,
    },
    {
      "groupLabel": "Components",
      "regex": "(components\/)|(views)|(@mui/material)",
      "importance": 2,
      "lineAfter": true,
    },
    {
      "groupLabel": "Utils",
      "regex": ".",
      "importance": 1,
      "lineAfter": true,
    }
```

## Development Instructions

1. Clone the repo and open it with VS Code.
2. Run `npm i`.
3. Install the VS Code extensions: [TypeScript + Webpack Problem Matchers](https://marketplace.visualstudio.com/items?itemName=amodio.tsl-problem-matcher).
4. Press F5 to run and debug the extension in a new VS Code window.
