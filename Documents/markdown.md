<!-- markdownlint-disable MD022 MD031 MD032 MD033 MD042 MD041-->

- [Header](#header1)
- [Table](#table)
- [Lists](#lists)
- [Blockquote](#blockquote)
- [Links](#links)
- [Code](#code)

# Header1
## Header2([Lists](#lists))
### Header3
#### ~~Header4~~
##### Header5
###### Header6

## Table

| Style               |         Example1          |       Example2        |
| :------------------ | :-----------------------: | :-------------------: |
| Bold                |         **Bold**          |       __Bold__        |
| Italic              |         *Italic*          |       _Italic_        |
| Strikethrough       |     ~~Strikethrough~~     |                       |
| Bold and italic     |   **Bold and _italic_**   | _Italic and **bold**_ |
| All bold and italic | ***All bold and italic*** |                       |

Footnotes are described in the MultiMarkdown Syntax Guide.[^footnote]
[^footnote]: Here is the text of the footnote itself.

## Lists

- nested list item
1. list item
2. list item
    2. 1.  nested list item
    - nested list item
    - nested list item
       2. 1. 1.  nested list item
- [ ]  task list item
- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported
  - [ ]  nested task list item
  - [x]  nested task list item
    - [ ]  nested task list item
    - [x]  nested task list item

## Blockquote

> Blockquote
>> *Blockquote*
> *Blockquote* **Blockquote**
> - Note: *MD002 has been deprecated and is disabled by default.*
> [MD041/-line-heading](#md041) offers an improved implementation.

## Links
``` markdown
(Incorrect link syntax)[https://www.example.com/]
```
To fix this, swap the `[]` and `()` around:

GFM is like regular Markdown with a few extra features. For example, <http://www.example.com/> will get auto-linked.
~~This is strike-through text, ==demarked== by the double tildes.~~
[example.com](http://www.example.com/ "example.com")
[example.com][link]

[link]: http://www.example.com/

## Code

``` bash
ls
cat foo
less bar
find . -name "*.js" | xargs rm -f
find . -name "*.map" | xargs rm -f
```
