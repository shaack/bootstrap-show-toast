# bootstrap-show-toast

A Bootstrap 5 plugin to show [Bootstrap Toasts](https://getbootstrap.com/docs/5.3/components/toasts/) with pure JavaScript. No HTML markup needed, no jQuery, no dependencies besides Bootstrap itself.

```js
bootstrap.showToast({body: "Hello Toast!"})
```

The plugin creates the toast container and the toast markup for you, positions it, stacks multiple toasts and removes everything from the DOM again when the toast is hidden.

## References

- [Demo page](https://shaack.com/projekte/bootstrap-show-toast)
- [GitHub repository](https://github.com/shaack/bootstrap-show-toast)
- [npm package](https://www.npmjs.com/package/bootstrap-show-toast)

## Installation

```sh
npm install bootstrap-show-toast
```

Or load it from a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap-show-toast@1/src/bootstrap-show-toast.js"></script>
```

Or just copy `src/bootstrap-show-toast.js` into your project. It is a single file.

## Usage

The plugin extends the global `bootstrap` object, so Bootstrap's JavaScript bundle has to be loaded first. The script itself works as a classic script and as an ES module.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="node_modules/bootstrap-show-toast/src/bootstrap-show-toast.js"></script>
<script>
    bootstrap.showToast({body: "Hello Toast!"})
</script>
```

As an ES module:

```html
<script type="module">
    import "./node_modules/bootstrap-show-toast/src/bootstrap-show-toast.js"
    bootstrap.showToast({body: "Hello Toast!"})
</script>
```

### Examples

```js
// a toast with header and a small text on the right of the header
bootstrap.showToast({
    header: "Information",
    headerSmall: "just now",
    body: "The file was saved."
})

// colored, with a white close button
bootstrap.showToast({
    header: "Alert",
    body: "Red Alert!",
    toastClass: "text-bg-danger",
    closeButtonClass: "btn-close-white"
})

// sticky, stays until the user closes it
bootstrap.showToast({
    body: "This notification will stay",
    toastClass: "text-bg-secondary",
    closeButtonClass: "btn-close-white",
    delay: Infinity
})

// bottom center
bootstrap.showToast({
    body: "Down here",
    position: "bottom-0 start-50 translate-middle-x"
})
```

### Buttons in a toast

The body is HTML, so a toast can contain buttons. `showToast()` returns an object with the toast's DOM element, which you use to attach event listeners. A button with `data-bs-dismiss="toast"` closes the toast.

```js
const toast = bootstrap.showToast({
    header: "Update available",
    body: `<p>Version 2.0 is ready to install.</p>
           <button class="btn btn-primary btn-sm me-1">Install</button>
           <button class="btn btn-secondary btn-sm" data-bs-dismiss="toast">Later</button>`,
    delay: 20000
})
toast.element.querySelector(".btn-primary").addEventListener("click", () => {
    bootstrap.showToast({body: "Installing...", toastClass: "text-bg-success", closeButtonClass: "btn-close-white"})
})
```

### Hiding a toast programmatically

The plugin uses Bootstrap's own `Toast` component under the hood. Get its instance from the element to hide the toast before its delay is over.

```js
const toast = bootstrap.showToast({body: "Working...", delay: Infinity})
// later
bootstrap.Toast.getInstance(toast.element).hide()
```

The toast element is removed from the DOM after it was hidden, and the container is removed when it holds no more toasts.

## API

### bootstrap.showToast(props)

Creates and shows a toast. Returns an object with these properties:

| Property | Meaning |
|---|---|
| `element` | the `.toast` DOM element |
| `container` | the `.toast-container` element the toast was placed in |
| `props` | the props merged with the defaults |

### Props

All props are optional.

| Prop | Default | Meaning |
|---|---|---|
| `header` | `""` | header text, HTML allowed |
| `headerSmall` | `""` | additional small text in the header, aligned right, typically a time like "just now" |
| `body` | `""` | the body of the toast, HTML allowed |
| `closeButton` | `true` | show a close button, in the header if there is one, next to the body otherwise |
| `closeButtonLabel` | `"close"` | the `aria-label` of the close button, for translation |
| `closeButtonClass` | `""` | additional class for the close button, `"btn-close-white"` for dark backgrounds |
| `toastClass` | `""` | additional classes for the `.toast` element, for example `"text-bg-success"` or `"border-0"` |
| `animation` | `true` | fade the toast in and out |
| `delay` | `5000` | milliseconds until the toast hides itself, `Infinity` makes it sticky |
| `position` | `"top-0 end-0"` | where the toast container is placed, see below |
| `direction` | `"append"` | `"append"` adds new toasts below the existing ones, `"prepend"` above |
| `ariaLive` | `"assertive"` | the `aria-live` attribute, `"polite"` for less urgent messages |

The header is rendered when `header` or `headerSmall` is set.

### Positions

`position` takes Bootstrap's [position utility classes](https://getbootstrap.com/docs/5.3/utilities/position/). The container is `position: fixed` and padded with `p-3`. Common values:

| Position | Value |
|---|---|
| top right (default) | `"top-0 end-0"` |
| top left | `"top-0 start-0"` |
| top center | `"top-0 start-50 translate-middle-x"` |
| bottom right | `"bottom-0 end-0"` |
| bottom left | `"bottom-0 start-0"` |
| bottom center | `"bottom-0 start-50 translate-middle-x"` |
| middle center | `"top-50 start-50 translate-middle"` |

### Stacking

Toasts with the same `position` share one container and stack there, in the order given by `direction`. Each position gets its own container, so toasts at the top right and at the bottom left do not interfere. Containers have the id `bootstrap-show-toast-container-<position>` with spaces replaced by underscores, for example `bootstrap-show-toast-container-top-0_end-0`, in case you want to style them.

### Accessibility

The toast element has `role="alert"`, `aria-atomic="true"` and the `aria-live` value from `ariaLive`. Use `ariaLive: "polite"` for messages that should not interrupt screen reader users, and set `closeButtonLabel` to a label in the language of your page.

## Testing

The unit tests use [Teevi](https://github.com/shaack/teevi) and run in a real browser, because the plugin needs Bootstrap and the DOM.

- In the browser: serve the project folder over http and open `test/index.html`.
- Headless: `npm test` runs the suite in headless Chrome. It needs a globally installed [puppeteer](https://pptr.dev): `npm install -g puppeteer`.

## License

MIT, see [LICENSE](LICENSE). Author: [Stefan Haack](https://shaack.com)

---

Find more high quality modules from [shaack.com](https://shaack.com) on [our projects page](https://shaack.com/works).
