/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/bootstrap-show-toast
 * License: MIT, see file 'LICENSE'
 */

import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import "../src/bootstrap-show-toast.js"

const DEFAULT_CONTAINER_ID = "bootstrap-show-toast-container-top-0_end-0"

function container(id = DEFAULT_CONTAINER_ID) {
    return document.getElementById(id)
}

// hides a toast without animation and resolves after Bootstrap removed it
function hide(toast) {
    return new Promise((resolve) => {
        toast.element.addEventListener("hidden.bs.toast", () => setTimeout(resolve, 0))
        bootstrap.Toast.getInstance(toast.element).hide()
    })
}

function hideAll() {
    const toasts = [...document.querySelectorAll(".toast")]
    return Promise.all(toasts.map((element) => new Promise((resolve) => {
        element.addEventListener("hidden.bs.toast", () => setTimeout(resolve, 0))
        bootstrap.Toast.getInstance(element).hide()
    })))
}

const noAnimation = {animation: false, delay: Infinity}

describe("bootstrap.showToast()", () => {

    it("should be defined on the bootstrap namespace", () => {
        assert.equal(typeof bootstrap.showToast, "function")
    })

    it("should create a toast container and a toast with the body", async () => {
        const toast = bootstrap.showToast({body: "Hello Toast!", ...noAnimation})
        assert.true(container() !== null, "container exists")
        assert.true(container().classList.contains("toast-container"))
        assert.true(container().classList.contains("position-fixed"))
        assert.equal(container().children.length, 1)
        assert.equal(toast.element, container().firstElementChild)
        assert.true(toast.element.classList.contains("toast"))
        assert.equal(toast.element.querySelector(".toast-body").textContent.trim(), "Hello Toast!")
        await hide(toast)
    })

    it("should merge the props with the defaults", async () => {
        const toast = bootstrap.showToast({body: "x", toastClass: "text-bg-danger", ...noAnimation})
        assert.equal(toast.props.body, "x")
        assert.equal(toast.props.toastClass, "text-bg-danger")
        assert.equal(toast.props.position, "top-0 end-0")
        assert.equal(toast.props.direction, "append")
        assert.equal(toast.props.closeButton, true)
        assert.equal(toast.props.ariaLive, "assertive")
        await hide(toast)
    })

    it("should render body html", async () => {
        const toast = bootstrap.showToast({body: "<b>bold</b> text", ...noAnimation})
        assert.equal(toast.element.querySelector(".toast-body b").textContent, "bold")
        await hide(toast)
    })

    it("should set role, aria-live and aria-atomic", async () => {
        const toast = bootstrap.showToast({body: "x", ariaLive: "polite", ...noAnimation})
        assert.equal(toast.element.getAttribute("role"), "alert")
        assert.equal(toast.element.getAttribute("aria-live"), "polite")
        assert.equal(toast.element.getAttribute("aria-atomic"), "true")
        await hide(toast)
    })

    it("should apply toastClass", async () => {
        const toast = bootstrap.showToast({body: "x", toastClass: "text-bg-danger", ...noAnimation})
        assert.true(toast.element.classList.contains("toast"))
        assert.true(toast.element.classList.contains("text-bg-danger"))
        await hide(toast)
    })

    it("should be shown by Bootstrap", async () => {
        const toast = bootstrap.showToast({body: "x", ...noAnimation})
        assert.true(bootstrap.Toast.getInstance(toast.element) !== null, "bootstrap.Toast instance exists")
        assert.true(toast.element.classList.contains("show"), "has class show")
        await hide(toast)
    })
})

describe("header and close button", () => {

    it("should render no header by default", async () => {
        const toast = bootstrap.showToast({body: "x", ...noAnimation})
        assert.equal(toast.element.querySelector(".toast-header"), null)
        await hide(toast)
    })

    it("should render header and headerSmall", async () => {
        const toast = bootstrap.showToast({header: "Information", headerSmall: "just now", body: "x", ...noAnimation})
        const header = toast.element.querySelector(".toast-header")
        assert.true(header !== null, "header exists")
        assert.equal(header.querySelector("strong").textContent, "Information")
        assert.equal(header.querySelector("small").textContent, "just now")
        await hide(toast)
    })

    it("should render the header when only headerSmall is set", async () => {
        const toast = bootstrap.showToast({headerSmall: "just now", body: "x", ...noAnimation})
        assert.true(toast.element.querySelector(".toast-header") !== null)
        assert.equal(toast.element.querySelector(".toast-header small").textContent, "just now")
        await hide(toast)
    })

    it("should put the close button into the header when there is one", async () => {
        const toast = bootstrap.showToast({header: "h", body: "x", ...noAnimation})
        assert.equal(toast.element.querySelectorAll(".btn-close").length, 1)
        assert.true(toast.element.querySelector(".toast-header .btn-close") !== null)
        await hide(toast)
    })

    it("should put the close button next to the body when there is no header", async () => {
        const toast = bootstrap.showToast({body: "x", ...noAnimation})
        assert.equal(toast.element.querySelectorAll(".btn-close").length, 1)
        assert.true(toast.element.querySelector(".d-flex > .btn-close") !== null)
        await hide(toast)
    })

    it("should render no close button with closeButton: false", async () => {
        const toast = bootstrap.showToast({header: "h", body: "x", closeButton: false, ...noAnimation})
        assert.equal(toast.element.querySelector(".btn-close"), null)
        await hide(toast)
    })

    it("should apply closeButtonClass and closeButtonLabel", async () => {
        const toast = bootstrap.showToast({body: "x", closeButtonClass: "btn-close-white", closeButtonLabel: "Schließen", ...noAnimation})
        const button = toast.element.querySelector(".btn-close")
        assert.true(button.classList.contains("btn-close-white"))
        assert.equal(button.getAttribute("aria-label"), "Schließen")
        assert.equal(button.getAttribute("data-bs-dismiss"), "toast")
        await hide(toast)
    })

    it("should remove the toast when the close button is clicked", async () => {
        const toast = bootstrap.showToast({body: "x", ...noAnimation})
        const hidden = new Promise((resolve) => toast.element.addEventListener("hidden.bs.toast", () => setTimeout(resolve, 0)))
        toast.element.querySelector(".btn-close").click()
        await hidden
        assert.equal(document.body.contains(toast.element), false, "toast element removed")
    })
})

describe("position and stacking", () => {

    it("should share one container for toasts with the same position", async () => {
        const first = bootstrap.showToast({body: "1", ...noAnimation})
        const second = bootstrap.showToast({body: "2", ...noAnimation})
        assert.equal(first.container, second.container)
        assert.equal(container().children.length, 2)
        await hideAll()
    })

    it("should append by default and prepend with direction: prepend", async () => {
        const first = bootstrap.showToast({body: "1", ...noAnimation})
        const appended = bootstrap.showToast({body: "2", ...noAnimation})
        const prepended = bootstrap.showToast({body: "3", direction: "prepend", ...noAnimation})
        assert.equal(container().firstElementChild, prepended.element)
        assert.equal(container().children[1], first.element)
        assert.equal(container().lastElementChild, appended.element)
        await hideAll()
    })

    it("should create a separate container per position with the position classes", async () => {
        const toast = bootstrap.showToast({body: "x", position: "bottom-0 start-0", ...noAnimation})
        const bottomLeft = container("bootstrap-show-toast-container-bottom-0_start-0")
        assert.true(bottomLeft !== null, "container for bottom-0 start-0 exists")
        assert.equal(toast.container, bottomLeft)
        assert.true(bottomLeft.classList.contains("bottom-0"))
        assert.true(bottomLeft.classList.contains("start-0"))
        assert.equal(container(), null, "default container not created")
        await hide(toast)
    })

    it("should remove the container when its last toast is hidden", async () => {
        const first = bootstrap.showToast({body: "1", ...noAnimation})
        const second = bootstrap.showToast({body: "2", ...noAnimation})
        await hide(first)
        assert.true(container() !== null, "container stays while a toast is left")
        assert.equal(container().children.length, 1)
        await hide(second)
        assert.equal(container(), null, "container removed")
    })
})

describe("delay and animation", () => {

    it("should hide automatically after delay", () => {
        return new Promise((resolve, reject) => {
            const toast = bootstrap.showToast({body: "x", delay: 100, animation: false})
            setTimeout(() => {
                if (document.body.contains(toast.element)) {
                    reject("toast still in the document after delay")
                } else {
                    resolve()
                }
            }, 500)
        })
    })

    it("should not hide automatically with delay: Infinity", () => {
        return new Promise((resolve, reject) => {
            const toast = bootstrap.showToast({body: "x", delay: Infinity, animation: false})
            setTimeout(async () => {
                const stillThere = document.body.contains(toast.element)
                await hide(toast)
                stillThere ? resolve() : reject("sticky toast disappeared")
            }, 300)
        })
    })

    it("should add the fade class with animation (default) and not without", async () => {
        const fading = bootstrap.showToast({body: "x", delay: Infinity})
        const plain = bootstrap.showToast({body: "y", delay: Infinity, animation: false})
        assert.true(fading.element.classList.contains("fade"))
        assert.false(plain.element.classList.contains("fade"))
        await hideAll()
    })
})
