# Change Log

All notable changes to the "syntax highlight" extension will be documented in this file.  

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.  

## [Unreleased]

### What I want

- Add more language support. Need your help.  
- Make sure behavioral consistency for supported languages.  

## [0.0.4] - 2019-07-15

### Fixed

- Markdown highlight bug.

### Changed

- change highlight : `text.html.markdown` from ![#EEFFFF](https://img.shields.io/badge/-%23EEFFFF-EEFFFF.svg) to ![#d4d4d4](https://img.shields.io/badge/-%23d4d4d4-d4d4d4.svg) , the default text color.  
- change highlight : Markdown `punctuation.definition.raw` from ![#65737E](https://img.shields.io/badge/-%2365737E-65737E.svg) to ![#C3E88D](https://img.shields.io/badge/-%23C3E88D-C3E88D.svg) , more clearly.  
  
## [0.0.3] - 2019-07-15

### Fixed

- set highlight : `meta.function-call.arguments`, `variable.parameter.function` ![#d4d4d4ff](https://img.shields.io/badge/-%23d4d4d4ff-d4d4d4.svg) , because of the limitations of vscode parser (doesn't support now). 

### Changed

- change highlight : `keyword.other.unit` from ![#F78C6C](https://img.shields.io/badge/-%23F78C6C-F78C6C.svg) to ![#C792EA](https://img.shields.io/badge/-%23C792EA-C792EA.svg) , make sure behavioral consistency between python and cpp.  

## [0.0.1] - 2019-07-14

### Added

- new highlight support: `constant.other.placeholder` `%s` ![#ce9178](https://img.shields.io/badge/-%23ce9178-ce9178.svg)
  