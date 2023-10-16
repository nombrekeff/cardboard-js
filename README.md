## 📦 Carboard.js


![](./header-img.png)

Welcome to Cardboard. A very simple, yet powerful reactive framework, to create web applications. 
All of this with, **no HTML**, **no build** (_unless you use TS or decide to build_), **no compile**, **no JSX**. 
It works out of the box, it's extremely lightweight and very performant. 

It's similar in philosophy to [VanJS](https://vanjs.org/), if that rings a bell, but with another flavour and with a few differences. If you need a more stable framework similar to this, go check them out. But remember to come back in a while when Cardboard is more stable :P

> **!NOTE!**: Cardboard is in early development, so use it with caution. You can check the project for a vision of what's coming for v1.0.0 - help is much appreciated! 


```ts
const Counter = () => {
  let counter = state({ count: 0 });

  return button()
    .text(`Clicked $count times`, counter)
    .addStyle('color', 'red')
    .clicked((_) => counter.count++);
};

// Counter will be added to the body
tag('(body)').append(Counter());
```


### Getting Started
#### Install

```
npm install https://github.com/nombrekeff/cardboard-js
```

#### [Getting Started](https://github.com/nombrekeff/cardboard-js/wiki/Getting-Started), for a basic guide.
#### [Wiki Examples](https://github.com/nombrekeff/cardboard-js/wiki/Examples), for more examples.
#### [Documentation](https://nombrekeff.github.io/cardboard-js/), for technical docs.

### What does it do?

Cardboard allows you to create reactive web apps without needing to write any **HTML**. It works without using **JSX** or having a build/compile process (_unless you use TS_). **Everything is plain JS**. It's very lightweight and performant. By design, there's very little additional computation on top of interacting directly with JS. As you interact with the elements directly, without needing complex stuff like diffing virtual doms and such. 

The idea is that instead of writing **HTML** and then creating JS that interacts with the **HTML**. You directly write JS that represents both the **HTML** and the logic.
It also offers a **[state](#state) management** solution to make reactive apps. The concept is similar to react. You create a state, then use the state as a value, and whenever the state changes it automatically updates that value. 

Here is a list of some of the features it offers (_there are more though_):
* **[showing/hiding elements](#reacting)**: You can conditionally add and remove items from the DOM whenever a state changes.
* **[enabling/disabling elements](#reacting)**:  enable and disable elements manually, or based on a state.
* **[add/remove classes](#reacting)**:  add and remove classes from elements manually, or based on a state.
* **[add/remove attributes](#reacting)**:  add and remove classes from elements manually, or  based on a state.
* **[templates](#reacting)**: It allows you to create text templates that interpolate some state values, and update whenever the state changes.
* **[custom reactions](#reacting)**: If there isn't a built-in method that handles some reactions for you, there are methods that allow you to build your own.
* **[reusable components](#reusable-components)**: You can create reusable components, like in any other framework.
* **[CSS in JS](#css-in-js)**: You can create `style` tags, and write the CSS directly as a JS object.
* **Typed**: Cardboard aims to be 100% typed, meaning it will suggest any suggestable properties, methods, etc...(i.e. style `properties`, etc...)

Cardboard offers all of this in a very small package with a very simple API. As it is plain JS it's possible to learn in a very short amount of time. And you can build apps very fast when you get the hang of it. It can be used both in JavaScript and TypeScript.


----
> NOTE: There's also a server-side alternative to **Cardboard** I've also written, called [**Hobo**](https://github.com/nombrekeff/hobo-js). In case you need something similar to Cardboard that works server-side!
> I'm planning to make Cardboard work server-side as well in v2.0.0. So you can look forward to that, or help out!
----

### Who's this for?

If you don't like writing HTML, like me. Or need a simple and lightweight framework that can do most things that bigger frameworks can do with a smaller footprint, Cardboard might be for you!
Cardboard can be used to build anything from a static page to more advanced apps like dashboards.

It's perfect for when you want to create a very small page where you need a reactive framework and you need to create it fast. But it should be able to create anything.

### Contributing

Well, hello! I'm always open for help on projects, and this one in particular! If you find the project interesting, useful, fun, or you feel some other kind of emotion, and that emotion inclines you to maybe consider helping out, that'd be great! 

You can help with the Wiki, using and testing the project, reporting bugs, fixing bugs, adding features, etc... Just remember to leave an issue if the change is big or changes some core concept of cardboard.

Take a look at these guides:
* [Development Project Setup](https://github.com/nombrekeff/cardboard-js/wiki/Development-Guide)
* [Contributing Guide](https://github.com/nombrekeff/cardboard-js/wiki/Contributing-Guide)

<!-- TODO: CSS in JS -->

<!-- 
TODO: Add section comparing performance against other alternatives,  

* It's 170% faster than svelte
* It's ? faster than react
* It's ? faster than preact
* It's ? faster than angular
* It's ? faster than VanJS
* It scores 100% 100% 100% on lighthouse
-->
