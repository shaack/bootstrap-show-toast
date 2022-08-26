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

```html
<script src="./node_modules/bootstrap-show-notification/src/bootstrap-show-toast.js"></script>
<script>
    // simple example
    $("#button-show-simple").click(function () {
        $.showNotification({body: "Hello Toast!"})
    })
    // type info and more complex body
    $("#button-show-info").click(function () {
        $.showNotification({
            body: "<h3>For your Info</h3>This notification has a title and a body and more text than the previous one.", type: "info"
        })
    })
    // type danger
    $("#button-show-danger").click(function () {
        $.showNotification({
            body: "Danger!", type: "danger"
        })
    })
    // type secondary and sticky
    $("#button-show-sticky").click(function () {
        $.showNotification({
            body: "This notification will stay", type: "secondary", duration: 0
        })
    })
</script>
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
