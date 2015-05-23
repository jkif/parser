# jKif Parser

**jKif Parser** is a SUO-KIF to JavaScript parser, which allows you to easily parse SUO-KIF ontologies into JavaScript objects.

![#](https://img.shields.io/badge/version-1.0.0-blue.svg)

---

> **Created by [Clark Feusier](http://clarkfeusier.com/pages/about)** during tenure as a hacker in residence at [Hack Reactor](http://hackreactor.com)

---

1. [Overview](#overview)
1. [Dependencies](#dependencies)
1. [Installation](#installation)
1. [Documentation](#documentation)
1. [Usage Examples](#usage-examples)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing-to-jkif-parser)
1. [Development Requirements](#development-requirements)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Running Tests](#running-tests)
1. [License](#license)

---

## Overview

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi neque ipsa est accusantium accusamus necessitatibus ex ab nihil possimus sit!

#### SUO-KIF

[SUO-KIF] [1] was derived from [KIF] [2] by [Adam Pease] [3] for the construction of [SUMO] [4]. KIF, the Knowledge Interchange Format, is an Erlang-based language used for the formal representation of knowledge.

[1]: http://sigmakee.cvs.sourceforge.net/viewvc/sigmakee/sigma/suo-kif.pdf "SUO-KIF"
[2]: https://www.cs.auckland.ac.nz/courses/compsci367s2c/resources/kif.pdf "KIF"
[3]: http://www.adampease.org/professional/ "Adam Pease"
[4]: http://www.adampease.org/OP/ "SUMO"

#### Ontologies and SUMO

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, vitae, odit modi eaque pariatur quae provident. Dolorem odio officia numquam facilis nisi, doloremque eveniet ex voluptates minus. Iure iusto, voluptatibus ex, non soluta tempore recusandae doloremque rem dignissimos voluptas quos!

#### Jison and Parser Generators

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis sed omnis voluptate, error asperiores. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, repellendus.

Aliquam dignissimos ullam fugit. Inventore rem autem iure quibusdam cumque non quam, doloribus pariatur.

#### jKif Parser

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, sequi, facilis. Qui excepturi unde et tempore, aperiam esse consequatur commodi, fugit dolor ad eaque dignissimos ex ducimus id inventore magnam.

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

---

#### Dependencies

- [Jison](http://zaach.github.io/jison/docs/) &mdash; generates LALR(1) parser
- [Bluebird](https://github.com/petkaantonov/bluebird) &mdash; creates a Promise-interface for parser methods
- [JSONFile](https://www.npmjs.com/package/jsonfile) &mdash; writes parser output to file in formatted JSON

---

## Installation

**jKif Parser** is available as an npm package.

***Install module from command-line***

```sh
npm install jkif-parser
```

***Require module for use in desired file***

```js
var jkParser = require('jkif-parser');
```

---

## Documentation

- Parser
  - `#parse`: synchronous parsing with string input
  - `#parseFile`: async parsing of file, callback style
  - `#parseFileP`: async parsing of file, promise style
  - `#writeParsedToFile`: async write of parser output to file, callback style
  - `#writeParsedToFileP`: async parsing of parser output to file, promise style

---

## Usage Examples

---

## Roadmap

The future of jKif Parser is managed through this repository's **Issues** &mdash; [view the roadmap here](https://github.com/jkif/parser/issues).

## Contributing to jKif Parser

We welcome contributions, but please read our [contribution guidelines](CONTRIBUTING.md) before submitting your work. The development requirements and instructions are below.

## Development Requirements

- Node 0.10.x
- npm 2.x.x
- Mocha
- Chai
- Jison
- Bluebird
- JSONFile

### Installing Dependencies

Install Node (bundled with npm) using [Homebrew](http://brew.sh/):

```sh
brew install node
```

Install project and development dependencies using npm:

```sh
npm install
```

### Running Tests

After installing the above dependencies, tests can be run using the following command:

```sh
npm test
```

## License

jKif Parser - Lexical Analysis and Parsing of SUO-KIF into JavaScript Objects

Copyright (C) 2015 Clark Feusier <cfeusier@gmail.com> - All Rights Reserved

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
