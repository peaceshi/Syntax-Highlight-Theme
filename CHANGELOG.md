# Change Log

All notable changes to the "syntax highlight" extension will be documented in this file.  

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.  

## [Unreleased]

### What I want

- Add more language support. Need your help.  
- Make sure behavioral consistency for supported languages.  

[#65737E]:https://img.shields.io/badge/-%2365737E-65737E.svg  
[#C3E88D]:https://img.shields.io/badge/-%23C3E88D-C3E88D.svg  
[#C792EA]:https://img.shields.io/badge/-%23C792EA-C792EA.svg  
[#ce9178]:https://img.shields.io/badge/-%23ce9178-ce9178.svg  
[#d4d4d4ff]:https://img.shields.io/badge/-%23d4d4d4ff-d4d4d4.svg  
[#EEFFFF]:https://img.shields.io/badge/-%23EEFFFF-EEFFFF.svg  
[#F78C6C]:https://img.shields.io/badge/-%23F78C6C-F78C6C.svg  
[#FF5370]:https://img.shields.io/badge/-%23FF5370-FF5370.svg  

## [0.0.6] - 2019-07-19

### Added

- Lua support.  

### Fixed

- set highlight : `variable.parameter.function.lua` ![#ce9178][#ce9178] for better looking, but vscode parser doesn't support this correctly now.  

## [0.0.5] - 2019-07-16

### Added

- Python support.  
  - add Python highlight `self` : `variable.parameter.function.language.special` ![#FF5370][#FF5370] ,make sure behavioral consistency(`self`) between `variable.parameter.function.language.special` and `variable.language.special` .  

## [0.0.4] - 2019-07-15

### Fixed

- Markdown highlight bug.  

### Changed

- change highlight : `text.html.markdown` from ![#EEFFFF][#EEFFFF] to ![#d4d4d4ff][#d4d4d4ff] , the default text color.  
- change highlight : Markdown `punctuation.definition.raw` from ![#65737E][#65737E] to ![#C3E88D][#C3E88D] , more clearly.  

## [0.0.3] - 2019-07-15

### Fixed

- set highlight : `meta.function-call.arguments`, `variable.parameter.function` ![#d4d4d4ff][#d4d4d4ff], because of the limitations of vscode parser (doesn't support now).  

### Changed

- change highlight : `keyword.other.unit` from ![#F78C6C][#F78C6C] to ![#C792EA][#C792EA] , make sure behavioral consistency between python and cpp.  

## [0.0.1] - 2019-07-14

### Added

- new highlight support: `constant.other.placeholder` `%s` ![#ce9178][#ce9178]  
  