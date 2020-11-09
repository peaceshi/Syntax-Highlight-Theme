<!-- markdownlint-disable MD024-->

# Change Log

All notable changes to the "syntax highlight" extension will be documented in this file.

Check [Keep a Changelog](https://keepachangelog.com/) for recommendations on how to structure this file.

[#65737e]: https://img.shields.io/badge/-%2365737E-65737E.svg
[#c3e88d]: https://img.shields.io/badge/-%23C3E88D-C3E88D.svg
[#c792ea]: https://img.shields.io/badge/-%23C792EA-C792EA.svg
[#ce9178]: https://img.shields.io/badge/-%23ce9178-ce9178.svg
[#d4d4d4ff]: https://img.shields.io/badge/-%23d4d4d4ff-d4d4d4.svg
[#eeffff]: https://img.shields.io/badge/-%23EEFFFF-EEFFFF.svg
[#f78c6c]: https://img.shields.io/badge/-%23F78C6C-F78C6C.svg
[#ff5370]: https://img.shields.io/badge/-%23FF5370-FF5370.svg
[#ffcb6b]: https://img.shields.io/badge/-%23FFCB6B-FFCB6B.svg

## 0.0.13 - 2020-11-09

### Added

- set default theme to beta version.
- (beta theme) add `meta.jsx.children` support for React and others.
  - set highlight : `meta.jsx.children` ![#d4d4d4ff].

## 0.0.12 - 2019-12-24

### Added

- (beta theme) HTML test file in `\Documents\html.html`.
- (beta theme) XML test file in `\Documents\xml.xml`.

### Fixed

- (beta theme) fix javascript and css highlight.

## 0.0.11 - 2019-12-24

### Added

- (beta theme) C++ test file in `\Documents\cpp.cpp`.
- (beta theme) Python test file in `\Documents\python.py`.

### Fixed

- (beta theme) fix javascript and typescript highlight.

### Changed

- (beta theme) Changed some color design.

## 0.0.10 - 2019-12-22

### Added

- (beta theme) Markdown test file in `\Documents\markdown.md`.

### Fixed

- (beta theme) Markdown highlighting fix.

## 0.0.9 - 2019-12-21

### Added

- A new theme  
  **Now you can choose a beta test theme `Syntax Material Dark Level 1 (beta)` directly. It supports most languages that VSCode supports now.**
- most languages support(with beta theme).
- A tool that generate language scopes.

## 0.0.8 - 2019-11-11

### Changed

- no feature update. rewrite some files.
- a new version with most language support(vsc official supports) will release soon.

## 0.0.7 - 2019-08-23

### Fixed

- `ms-vscode.cpptools` : `enhancedColorization` compatibility.

  - set highlight : `source.cpp variable` `source.c variable` ![#d4d4d4ff] , recognizable for all variables ,because of vsc parser issues.
  - set highlight : `variable.other.enummember` ![#ce9178] for better looking and color harmony.
  - set highlight : `meta.tail.enum` ![#FFCB6B] ,make sure behavioral consistency.

## 0.0.6 - 2019-07-19

### Added

- Lua support.

### Fixed

- set highlight : `variable.parameter.function.lua` ![#ce9178] for better looking, but vscode parser doesn't support this correctly now.

## 0.0.5 - 2019-07-16

### Added

- Python support.
  - add Python highlight `self` : `variable.parameter.function.language.special` ![#FF5370] ,make sure behavioral consistency(`self`) between `variable.parameter.function.language.special` and `variable.language.special` .

## 0.0.4 - 2019-07-15

### Fixed

- Markdown highlight bug.

### Changed

- change highlight : `text.html.markdown` from ![#EEFFFF] to ![#d4d4d4ff] , the default text color.
- change highlight : Markdown `punctuation.definition.raw` from ![#65737E] to ![#C3E88D] , more clearly.

## 0.0.3 - 2019-07-15

### Fixed

- set highlight : `meta.function-call.arguments`, `variable.parameter.function` ![#d4d4d4ff], because of the limitations of vscode parser (doesn't support now).

### Changed

- change highlight : `keyword.other.unit` from ![#F78C6C] to ![#C792EA] , make sure behavioral consistency between python and cpp.

## 0.0.1 - 2019-07-14

### Added

- new highlight support: `constant.other.placeholder` `%s` ![#ce9178]
