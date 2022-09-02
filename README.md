# bootstrap-show-toast

A Bootstrap 5 plugin for [Bootstrap Toasts](https://getbootstrap.com/docs/5.2/components/toasts/), to show them with pure JS, no HTML needed.

## Try it

- [Demo Page](https://shaack.com/projekte/bootstrap-show-toast/)

## Installation

- [npm package](https://www.npmjs.com/package/bootstrap-show-toast)

```sh
npm install bootstrap-show-toast
```

## Usage

```js
// simple example
bootstrap.showToast({body: "Hello Toast!"})

// type danger
bootstrap.showToast({
    header: "Alert",
    body: "Red Alert!",
    toastClass: "text-bg-danger"
})

// more complex toast with header and buttons
const toast = bootstrap.showToast({
    header: "Information",
    headerSmall: "just now",
    body: "<p>This notification has a headline and more text than the previous one.</p><div><button class='btn btn-primary me-1 btn-sm'>Click me</button><button class='btn btn-secondary btn-sm' data-bs-dismiss='toast'>Close</button></div>",
    delay: 20000
})
toast.element.querySelector(".btn-primary").addEventListener("click", () => {
    bootstrap.showToast({
        body: "Thank you for clicking", direction: "append", 
        toastClass: "text-bg-success", closeButtonClass: "btn-close-white"
    })
})

// type secondary and sticky
bootstrap.showToast({
    body: "This notification will stay", 
    toastClass: "text-bg-secondary", closeButtonClass: "btn-close-white", 
    delay: Infinity // delay of `Infinity` to make it sticky
})
```

## Props (defaults)

```js
this.props = {
    header: "", // the header text
    headerSmall: "", // additional text in the header, aligns right
    body: "", // the body text of the toast
    closeButton: true, // show a close button
    closeButtonLabel: "close", // the label of the close button
    closeButtonClass: "", // set to "btn-close-white" for dark backgrounds
    toastClass: "", // the appearance
    animation: true, // apply a CSS fade transition to the toast
    delay: 5000, //	delay in milliseconds before hiding the toast, set delay to `Infinity` to make it sticky
    position: "top-0 end-0", // top right
    direction: "append", // or "prepend", the stack direction
    ariaLive: "assertive"
}
```

## Documentation

- [Repository and documentation](https://github.com/shaack/bootstrap-show-toast)

## More Bootstrap extensions

Check out my [further Bootstrap extensions](https://github.com/shaack?tab=repositories&q=bootstrap&type=&language=&sort=stargazers)
