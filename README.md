## Carboard.js


![](./header.png)

Welcome to Carboard. A very simple, yet powerful "framework"/library to create web applications without the need to write any HTML.

NOTE: There's also a server-side companion to **Cardboard** I've written, called [**Hobo**](https://github.com/nombrekeff/hobo-js) in case you need to generate HTML as string in the server.

> **!NOTE!**: Cardboard is in early development, so use with caution! Any help is apreciated!

### Who's this for?

If you don't like writing HTML, or need a very basic framework for simple apps, Cardboard might be for you!

### What does it do?

It let's you write javascript code instead of HTML. It hass a simple API to do anything you want with the HTML elements, like adding styles, attributes, events...It also offers a simple state management solution alongside a kind of reactive way of conditionally doing stuff like: **Hiding/showing elements**, **Disabling/enabling elements**, and more. And all of this in a very small pacakage.

### Getting Started
Install package: 

```
npm install https://github.com/nombrekeff/cardboard-js
```

Then you can import the package. 

```ts
import { tag, init, allTags, state, attached, hinput, hstyle } from 'cardboard';
const { div, button, input, a, ul, li, hr, style } = allTags;

init({ root: 'body' }); // By calling init, any new tag added will be added to the "body" (passing root selector is optional, 'body' by default)
```

I recomend destructuring tags, for a cleaner code:

```ts
const { div, p, span, b, script, button, style, a, hr } = allTags;
```

### Docs

Check out the [Documentation](https://nombrekeff.github.io/cardboard-js/) for more details.

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
> Creates a state that can be listened to, globaly or per property: 
> ```ts 
> counterState.changed((newState) => handleStateChange());
> counterState.count.changed((newValue) => handleValueChange());
> ```  

----

```ts
button()
```
> `button()` or any other tag method for that matter, generate an HTMLElement. But it's not added directly to the DOM. 
> You can manually add children `div().append(p())`, or if there's a tag attached, you can simply do: `p.attach()`. Check the [Attaching](#attaching) section for more information.

----

```ts
.consume(counterState.count, (self, count) => self.text(`Clicked ${count} times`))
```
> the [`.consume`](https://nombrekeff.github.io/cardboard-js/classes/tag.CTag.html#consume) method, reacts to changes in the state, and triggers the **callback**.
> For example in the snippet above, whenever `counterState.count` changes, we set the **text** to `"Clicked ${count} times"`.
> That will automatically change the innerContent of the HTML element.

This can also be done in a simpler way by using [`template()`](https://nombrekeff.github.io/cardboard-js/classes/).
Instead of using consume, we can do it like this:

```ts
button(template(`Clicked $count times`, counterState))
```

Instead of:
```ts
button()
  .consume(counterState.count, (self, count) => self.text(`Clicked ${count} times`))
```

----

```ts
.clicked((_) => counterState.count++);
```
> the [`.clicked`](https://nombrekeff.github.io/cardboard-js/classes/tag.CTag.html#clicked) method will be called, whenever the element is clicked. Quite simple!
> it's a shortcut for [`.on('click', callback)`](https://nombrekeff.github.io/cardboard-js/classes/tag.CTag.html#on), a couple of shorthands are provided. 
> If the event you want to listen does not have a shorthand, you can either, leave an issue for me to add it, send a PR or just use `.on(evtName, callback);`.


#### Todo Example
```ts
const list = ul(
  p('There are no items').hideIf(todoState.length),
).addAttrs({ id: 'list' });

const itemInput = hinput({ 
  placeholder: 'Enter item content', 
  submit: (_) => addItem() 
});

const addItem = () => {
  if (itemInput.value) {
    list.append(
      li(itemInput.value)
        .clicked((self) => self.remove())
    );
    itemInput.clear();
  }
};

button.attach('Add item').clicked(addItem);
attached().append(list);
```

Let me explain:
```ts
const list = ul(
  p('There are no items')
    .hideIf(todoState.length),
).addAttrs({ id: 'list' });
```
> Create a **ul** list, with an id "list".
> Adds a **p** child with text _'There are no items'_, which will be hidden if there are items. 
> [`hideIf`](https://nombrekeff.github.io/cardboard-js/classes/tag.CTag.html#hideIf) will listen to changes in `todoState.length`, if there are items (length > 0), the tag `p` will be hidden, removed from the DOM basically. Whenever the length goes back to 0, it will be automatically added to the DOM again. It will even figure out exactly where to be added relative to it's siblings and parent (i.e. _If a sibling before is also hidden, it will figure that out, and calculate it's position based on that_) 

----

```ts
const itemInput = hinput({ placeholder: 'Enter item content', submit: (_) => addItem() });
```
> `hinput` is a custom component that makes working with inputs easier. It internally generates a input element, configured with the options provided.
> In this case we set the **placeholder** and sets the `submit` event, which will be triggered when the enter key is pressed.

```ts
const addItem = () => {
  if (itemInput.value) {
    list.append(li(itemInput.value).clicked((self) => self.remove()));
    itemInput.clear();
  }
};
```
> Little method to handle adding items to the list. It will also clear the input.
> To add an iten to the list, it's possible by calling [`.append()`](https://nombrekeff.github.io/cardboard-js/classes/tag.CTag.html#append) with the element we want.
> A `li` in this case, with the value of the input as it's text.

----

```ts
button.attach('Add item').clicked(addItem);
```
> Creates a button, which will add an item when it's clicked. calling [`.attach`](https://nombrekeff.github.io/cardboard-js/classes/tag.CTag.html#attach) will add button to the attached tag.

----

```ts
attached().append(list);
```
> `attached()` returns the currently attached element (body by default), read more about it i nthe [Attaching](#attaching) section below.
> `.append(list)` will add the list element created above to the attached element.

#### Component Example
You can also create reusable components, quite simply. Check this example out:

```ts
export type HInputOptions = {
  value?: string;
  placeholder?: string;
  tooltip?: string;
  attach?: boolean;
  change?: EventCallback<'change'>;
  submit?: (tag: HoboTag, evt: Event) => void;
};

export function hinput(options: HInputOptions = {}) {
  const el = options.attach == true ? input.attach() : input();

  el.config({
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

  return el;
}
```
> It basically simplifies the creation of an input element, and adds some logic.
> It can then be used as any other cardboard tag method.
> `hinput({...})`

### Attaching

Cardboard by default will not be attached to anything. So when you create elements nothing will appear in the page. If you want to be able to add items to some parent element, you must first initialize Carboard by calling the [`init()`](https://nombrekeff.github.io/cardboard-js/functions/tag.init.html) function.

If no arguments are passed to init, it will automatically attach to the body. You can also pass a selector of the element you want to attach to.

```ts
init();
init({ root: '#app-root' });
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

### 
