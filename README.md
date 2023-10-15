## Carboard.js


![](./header-img.png)

Welcome to Carboard. A very simple, yet powerful reactive framework, to create web applications without the need to write any **HTML**.  
You don't need to build, use JSX, or compile. It works out of the box, and it's plain JS. 

NOTE: There's also a server-side version of **Cardboard** I've written, called [**Hobo**](https://github.com/nombrekeff/hobo-js) in case you need to generate HTML as string in the server.

> **!NOTE!**: Cardboard is in early development, so use with caution! Any help is apreciated!

- [Carboard.js](#carboardjs)
  - [What does it do?](#what-does-it-do)
  - [Who's this for?](#whos-this-for)
  - [Getting Started](#getting-started)
    - [Install](#install)
    - [Importing](#importing)
    - [Sneek peek](#sneek-peek)
  - [Examples](#examples)
    - [Clicker Example](#clicker-example)
    - [Todo Example](#todo-example)
    - [Component Example](#component-example)
- [Concepts](#concepts)
  - [CTag aka tag](#ctag-aka-tag)
  - [Attaching](#attaching)
  - [State](#state)
    - [Manually listening to state changes](#manually-listening-to-state-changes)
    - [Reacting](#reacting)
  - [Reusable Components](#reusable-components)
  - [Lifecycle events](#lifecycle-events)


### What does it do?

Cardboard allows you to create reactive web apps without needing to write any **HTML**. It works without using **JSX** or having a build/compile process (_unless you use TS_). **Everything is plain JS**. It's very lightweight and performant. By design, there's very little additional computation on top of interacting directly with JS. As you interact with the elements directly, without needing complex stuff like diffing virtual doms and such. 

The idea is that instead of writing **HTML** and then creating JS that interacts with the **HTML**. You directly write JS that represents both the **HTML** and the logic.
It also offers a **[state](#state) management** solution to make reactive apps. The concept is similar to react. You create a state, then use the state as a value, and whenever the state changes it automatically updates that value. 

Here is a list of some of the features it offers (_there more though_):
* **[showing/hiding elements](#reacting)**: You can conditionally add and remove items from the DOM whenever a state changes.
* **[enabling/disabling elements](#reacting)**:  enable and disable elements manually, or based on a state.
* **[add/remove classes](#reacting)**:  add an remove classes from elements manually, or based on a state.
* **[add/remove attributes](#reacting)**:  add an remove classes from elementsmanually, or  based on a state.
* **[templates](#reacting)**: It allows you to create text templates that interpolate some state values, and update whenever the state changes.
* **[custom reactions](#reacting)**: If there isn't a built-in method that handles some reaction for you, there are methods that allow you to build your own.
* **[reusable components](#reusable-components)**: You can create reusable components, like in any other framework.
* **[CSS in JS](#css-in-js)**: You can create `style` tags, and write the CSS directly as a JS obejct.
* **Typed**: Cardboard aims to be 100% typed, meaning it will suggest any suggestable properties, methods, etc...(i.e. style `properties`, etc...)

Cardboard offers all of this in a very small package with a very simple API. As it is plain JS it's possible to learn in a very short amount of time. And you can build apps very fast when you get the hang of it. It can be used both in JavaScript and TypeScript.

> It's similar in philosphy to [VanJS](https://vanjs.org/) but with another flavor and with a few differences. 
> If you need a more stable framework similar to this, go check them out. But remeber to come back in a while when Cardboard is more stable :P

### Who's this for?

If you don't like writing HTML, like me. Or need a simple and lightweight framework that can do most things that bigger frameworks can do with a smaller footprint, Cardboard might be for you!
Cardboard can be used to build anything from a static page, to more advanced apps like dashboards.

It's perfect for when you want to create a very small page where you need a reactive framework and you need to create it fast. But it should be able to create anything.


### Getting Started

#### Install

```
npm install https://github.com/nombrekeff/cardboard-js
```

#### Importing
Then you can import the package. 

```ts
import { tag, init, allTags, state, attached, hinput, hstyle } from 'cardboard-js';
const { div, button, input, a, ul, li, hr, style } = allTags;

init({ root: 'body' }); // By calling init, any new tag added will be added to the "body" (passing root selector is optional, 'body' by default)
```

I recomend destructuring [tags](#ctag-aka-tag), for cleaner code:

```ts
const { div, p, span, b, script, button, style, a, hr } = allTags;
```

* **Check the [Examples](#examples) section to view more examples**
* **Check the [Concepts](#concepts) section to learn the basic concepts**
* **Check the [Documentation](https://nombrekeff.github.io/cardboard-js/)**

#### Sneek peek

```ts
const Counter = () => {
  let counterState = state({ count: 0 });

  return button(
    text(`Clicked $count times`, counterState)
  ).clicked((_) => counterState.count++);
};

// Counter will be added to the body, as it's the attached tag.
attached().append(Counter());
```

### Examples

Check out the [`examples`](/examples) folder for a variety of examples on how to use Cardboard. 
But here are a couple of examples that highlight what Cardboard can do:

#### Clicker Example

```ts
let counterState = state({ count: 0 });

button()
  .consume(counterState.count, (self, count) => self.text(`Clicked ${count} times`))
  .clicked((_) => counterState.count++);
```

Let me explain:

```ts
let counterState = state({ count: 0 });
```
Creates a [state](#state) that can be listened to, globaly or per property: 
```ts 
counterState.changed((newState) => handleStateChange());
counterState.count.changed((newValue) => handleValueChange());
```  

They can also be used to make tags react to state changes, as is explained below, where I explain `consume`.

----

```ts
button()
```
Cardboard offers a list of `allTags`, which allow you to create [tags](#ctag-aka-tag) by calling the tagName as a function: i.e. `div()`, `p()`, `ul()`, etc...
In the above snippet, `button()`, or any other tag method for that matter, generate an HTMLElement. But it's **not added directly** to the DOM. 
You can manually add children `div().append(p())`, or if there's a tag attached, you can simply do: `p.attach()`. Check the [Attaching](#attaching) section for more information.

----

```ts
button()
  .consume(counterState.count, (self, count) => self.text(`Clicked ${count} times`))
```
the [`.consume`](https://nombrekeff.github.io/cardboard-js/classes/tag.CTag.html#consume) method, reacts to changes in the state, and triggers the **callback**.
For example in the snippet above, whenever `counterState.count` changes, we set the **text** to `"Clicked ${count} times"`.
The callback will automatically change the **innerContent** of the HTMLElement by using `.text()`.

This can also be done in a simpler way by using [`text()`](https://nombrekeff.github.io/cardboard-js/functions/text.text.html) as seen in the sneek peek.
Instead of using [`.consume`](https://nombrekeff.github.io/cardboard-js/classes/tag.CTag.html#consume), we can do it like this:

```ts
button(
  text(`Clicked $count times`, counterState)
);
```
> `text` will interpolate the variables (i.e. `$count`) in the string template, with the values in `counterState`. Whenever the property changes, it will update the text with the newly interpolated string. So, for better performance, if a property in the state is not referenced in the template and it changes, it will not update the template.
> passing in a state is optional, you can also create text nodes for later modifying.

```ts
const tnode = text(`I will not react to anything!`);
div(tnode);
tnode.nodeValue = 'But I can be later changed';
```

Additionally this can also be done by using the `.text` method of the tag:
```ts
button().text(`Clicked $count times`, counterState);
```
> It's up to you to decide when to use each option!

----

```ts
button()
  .clicked((_) => counterState.count++);
```
The [`.clicked`](https://nombrekeff.github.io/cardboard-js/classes/tag.CTag.html#clicked) method will be called whenever the element is clicked. Quite straight forwards!
It's a shortcut for [`.on('click', callback)`](https://nombrekeff.github.io/cardboard-js/classes/tag.CTag.html#on), a couple of shorthands are provided. 
If the event you want to listen does not have a shorthand, you can either, leave an issue for me to add it, send a PR or just use `.on(evtName, callback);`.

```ts
button('Not clicked')
  .on('click', (self, evt) => self.text('Clicked'));
```

#### Todo Example
```ts
const todos = state([]);
const Todo = (value) => 
  li(value)
    .clicked(
      (self) => self.remove() && removeFromList(value, todos)
    ); 

const list = ul(
  p('There are no to-dos')
    .hideIf(todos.length),
).addAttrs({ id: 'list' });

const addItem = (input) => {
  const value = input.consumeValue;

  if (value) {
    list.append(Todo(value));
    todos.push(value);
  }
};

const itemInput = hinput({ 
  placeholder: 'Enter item content', 
  submit: (self) => addItem(self),
});

attached().append(
  itemInput, button('Add item').clicked(_ => addItem(itemInput)),
  list,
);
```

Let me explain:
```ts
const list = ul(
  p('There are no items')
    .hideIf(todos.length),
).addAttrs({ id: 'list' });
```
Creates a `ul` list, with an id of **"list"**. To that list a `p` tag is added as a child with the text _'There are no items'_. 
The `p` tag will be hidden if there are items in the todos [`state`](https://nombrekeff.github.io/cardboard-js/functions/state.state.html). 

[`hideIf`](https://nombrekeff.github.io/cardboard-js/classes/tag.CTag.html#hideIf) will listen to changes in `todos.length`.  
If there are items (_`length > 0`_), the tag `p` will be hidden, removed from the DOM basically.  
Whenever the length goes back to 0, it will be automatically added again to the DOM. It will even figure out exactly where to be added relative to it's siblings and parent (i.e. _If a sibling before is also hidden, it will figure that out, and calculate it's position based on that_). So you can show/hide without fear, and please let me know if you encounter any issues with this.

----

```ts
const addItem = (input: CTag) => {
  const value = input.consumeValue;

  if (value) {
    list.append(Todo(value));
    todos.push(value);
  }
};
```
The `addItem` function will add a new `Todo` with the value of the passed **input**, if the input has a value. It will also add the value to the state.

```ts
const itemInput = Input({ 
  placeholder: 'Enter item content', 
  submit: (self) => addItem(self),
});
```
`Input` is a custom component (code showed further down) that makes working with inputs easier. It internally generates an `input` element, configured with the options provided.
In this case we set the **placeholder** and set the `submit` event, which will be triggered when the enter key is pressed.

----

```ts
attached().append(
  itemInput, button('Add item').clicked(_ => addItem(itemInput)),
  list,
);
```

`attached()` returns the currently attached element (body by default), read more about it i nthe [Attaching](#attaching) section below.
`.append()` adds items as children of the attached tag. You can append on any tag.
`button` creates a new button, which will add an item when it's clicked.

#### Component Example
You can also create reusable components very easily, as you've seen previoulsy with the `Todo` item, or the `Counter` in the [Getting Started](#getting-started) section.
But here is a more complex example, it's the component `Input` used in the todo example above.

```ts
export type Options = {
  value?: string;
  placeholder?: string;
  tooltip?: string;
  attach?: boolean;
  change?: EventCallback<'change'>;
  submit?: (tag: HoboTag, evt: Event) => void;
};

export function Input(options: Options = {}) {
  const inputTag = options.attach == true ? input.attach() : input();

  return inputTag.config({
    attr: { tooltip: options.tooltip, placeholder: options.placeholder },
    on: {
      change: options.change,
      submit: options.submit,
      keypress: (tag, evt) => {
        if (evt.key == 'Enter') {
          options.submit(tag, evt);
        }
      },
    },
    value: options.value ?? '',
  });
}
```
> It basically simplifies the creation of an input element, and adds some logic. 

## Concepts
Next I will explain a few concepts that will make using cardboard a lot easier.

### CTag aka tag

The base concept for Cardboard is the class `CTag`. It's designed so you don't need to use this class directly. 
But you might need to type something if you write with TS, so it's good to now it exists. 

To create a CTag you can use the [`tag`](https://nombrekeff.github.io/cardboard-js/functions/tag.tag.html) function
```ts
tag('div', tag('p', 'Hello!'));
```

While you can use the tag function directly, normally you will use the built-in tag function and no the `tag` function directly:
```ts
import { allTags } from 'cardboard-js';
const { div, p } = allTags;
div(p('Hello!'));
```

A tag represents a element in the page. They can be a new element, or a wrapper over existing elements in the page.
When you create a tag, it will not be added to the DOM unless you manually add them. This can be done in a few ways.

* Adding as a children:
```ts
div(
  p('Hello!')
);
```
* Adding with `append` or `prepend`
```ts
div().append(
  p('Hello!')
);
div().prepend(
  p('Hello!')
);
```
* Attaching to attached tags. By calling `.attach`, the element will be added as a child of `div`. Read more about [Attaching](#attaching).
```ts
attach(div());

p.attach('Hello!');
p.attach('Hello!');
```



### Attaching
Cardboard by default will not be attached to anything. So when you create elements nothing will appear in the page. If you want to be able to add items to some parent element, you must first initialize Carboard by calling the [`init()`](https://nombrekeff.github.io/cardboard-js/functions/tag.init.html) function.

If no arguments are passed to init, it will automatically attach to the body. You can also pass a selector of the element you want to attach to.

```ts
init();
init({ root: '#app-root' });
```

Init returns the attached tag. So you can append items directly like this:
```ts
init().append(
  div(),
  p(),
  img(), 
);
```

You can also manually attach to any element by calling the [`attach()`](https://nombrekeff.github.io/cardboard-js/functions/tag.attach.html) function:
```ts
init();
const wrapper = div();
attach(wrapper);

p.attach();
span.attach();
```
> `p()` and `span()` will be added as children of wrapper.

It's also possible to attach multiple times:
```ts
init();
const wrapper = div.attach();

attach(wrapper);
const childDiv = div.attach("I'm inside wrapper");

attach(childDiv);
p.attach("I'm inside child div!");
detach();

p.attach("I'm now inside wrapper!");
```

### State
Another key aspect of Cardboard is the state. States hold data, and offer a way of reacting to it. It works mostly like any other state you might've used. It might be different to use but it does the same thing. 

To create a state you just need to call the `state` function, and pass in an object or an array.
```ts
const list = state([]);
const data = state({ count: 0, nested: { name: 'hey' }});
```

#### Manually listening to state changes

You can manually listen to the whole state changes:
```ts
data.changed((newData) => {...});
```
Or to individual values:
```ts
data.count.changed((newCount) => {...});
data.nested.name.changed((newName) => {...});
```

#### Reacting

Tags can also use states for things such as: 
* **disabling** an element based on some state
* **removing** or adding elements (from the DOM) based on some state
* **toggling classes** based on some state
* **modifying attributes** based on some state
* **text templates** with some state values interpolated that will change when the state changes

Here are some examples:
```ts
const data = state({ count: 0, hide: false, disable: false });

// Hides/shows based on data.hide, item is removed from DOM if hidden
div().hideIf(data.hide);

// Set classes and disabled based on data.disabled state
input()
  .classIf(data.disable, 'disabled', () => 'strike')
  .disableId(data.disable);

// Text will update with the new state values interpolated into the template
p(text('Count is: $count', data));
p().text('Count is: $count', data);

// Create a custom reaction to a state change, you can do modify the element inside the callback.
div().consume(data.hide, (self, hide) => {});
```

### Reusable Components

You can create reusable components very easily:
```ts
const Counter = () => {
  let counterState = state({ count: 0 });

  return button(
    text(`Clicked $count times`, counterState)
  ).clicked((_) => counterState.count++);
};
```

The use as any other tag:
```ts
div(Counter());
```

### Lifecycle events

In some cases you might want to do stuff when the element is added to the page, or when it's removed. For that Cardboard offers 2 functions for handling that.
`withLifecycle(tag, { start, removed })` or `onLifecycle(tag, start, removed)`, both do the same thing, just different arguments.

```ts
const Clock = () => {
  const st = state({
    seconds: '00',
    minutes: '00',
    hours: '00',
  });

  const setTime = () => {
    const currentDate = new Date();
    st.seconds = currentDate.getSeconds().toString().padStart(2, '0');
    st.minutes = currentDate.getMinutes().toString().padStart(2, '0');
    st.hours = currentDate.getHours().toString().padStart(2, '0');
  };

  let interval: number;
  
  return withLifecycle(
    div(
      span().text('$hours', st),
      ':',
      span().text('$minutes', st),
      ':',
      span().text('$seconds', st),
    ),
    {
      start() {
        // Add the interval when the element is added
        setTime();
        clearInterval(interval);
        interval = setInterval(setTime, 500);
      },
      removed() {
        // Clear the interval when the element is removed
        clearInterval(interval);
      },
    },
  );
};
``` 
It's handy to do this, as you don't want the interval to keep going if the element is not in the page.


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