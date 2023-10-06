## Carboard.js


![](./header.png)



Welcome to Carboard. A very simple, yet powerful "framework"/library to create web applications without the need to write any HTML.

NOTE: There's also a server-side companion to **Cardboard** I've written, called [**Hobo**](https://github.com/nombrekeff/hobo-js) in case you need to generate HTML as string in the server.

### Who's this for?

If you don't like writing HTML, or need a very basic framework for simple apps, Cardboard might be for you!

### What does it do?

It let's you write javascript code instead of HTML. It hass a simple API to do anything you want with the HTML elements, like adding styles, attributes, events...
It's lightweight, and very simple.

### Getting Started
Install package: 

```
npm install https://github.com/nombrekeff/cardboard-js
npm install cardboard-js
```

Then you  can import the package. 

```ts
import { tag, init, allTags, state, attached, hinput, hstyle } from '../dist/hobo-rt.js';
const { div, button, input, a, ul, li, hr, style } = allTags;

init({ root: 'body' }); // By calling init, any new tag added will be added to the "body" (passing root selector is optional, 'body' by default)
```

I recomend destructuring tags, for a cleaner code:

```ts
const { div, p, span, b, script, button, style, a, hr } = allTags;
```

### Examples

Check out the [`examples`](/examples) folder for a variety of examples on how to use Cardboard.

#### Clicker Example
TODO
#### Todo Example
TODO
#### Component Example
TODO