# Change Log

All notable changes to the "syntax highlight" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]
### What I want ..
- Add more language support. Need your help.
- Make sure behavioral consistency for supported languages.

## [0.0.3] - 2019-07-15
### Fixed
- set highlight : `meta.function-call.arguments`, `variable.parameter.function`: `#d4d4d4ff`, because of the limitations of vscode parser (doesn't support now) 
### Changed
- change highlight : `keyword.other.unit` from `#F78C6C` to `#C792EA` , make sure behavioral consistency between python and cpp.

## [0.0.1] - 2019-07-14
### Added
- new highlight support: `constant.other.placeholder` `%s`: `#ce9178`