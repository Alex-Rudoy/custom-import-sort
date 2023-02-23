# custom-import-sort README

Automatic import sorting extension

Supposed to be used together with Prettier to avoid nasty behavior

## Features

Can sort on save.

Can be customized. It is just quite hard to do so.

## Extension Settings

`customImportSort.sortOnSave`: check this to sort on save

`customImportSort.sortingSettings`: array of sorting groups

Each sorting group should have:

- `"regex": "\\.s?css$"` - regex to test import path.
  remember to have one group with `"regex": "."`
  to catch all imports that do not fall in any other group

- `"importance": 3` - groups with higher importance work first.
  If you have few rules that could target the same line,
  consider giving higher `importance` to more specific one

- `"lineafter": true` - to add extra empty line after block
