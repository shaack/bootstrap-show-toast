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
    body: "", // the text, shown
    type: "primary", // the appearance
    duration: 5500, // duration till auto-hide, set to `0` to disable auto-hide
    maxWidth: "520px" // the notification maxWidth
}
```

## Documentation

- [Repository and documentation](https://github.com/shaack/bootstrap-show-toast)

## More Bootstrap extensions

Check out my [further Bootstrap extensions](https://github.com/shaack?tab=repositories&q=bootstrap&type=&language=&sort=stargazers)
