# custom-import-sort README

POC of import sorting extension

## Features

Can sort on save.

Can be customized. It is just quite troublesome to do so.

## Extension Settings

`customImportSort.sortOnSave`: check this to sort on save

`customImportSort.sortOnSavePreservingComments`: check this to sort on save, while preserving comments in code. Note that in this case comments between imports are moved below imports block.

`customImportSort.sortingSettings`: array of sorting groups

Each sorting group should have:

- `"regex": "\\.s?css$"` - regex to test import path.
  remember to have one group with `"regex": "."`
  to catch all imports that do not fall in any other group

- `"importance": 3` - groups with higher importance work first.
  If you have few rules that could target the same line,
  consider giving higher `importance` to more specific one

- `"lineafter": true` - to add extra empty line after block

## Known Issues

This extension was created not so long ago and has all sorts of issues.
