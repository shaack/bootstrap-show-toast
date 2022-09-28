/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/bootstrap-show-toast
 * License: MIT, see file 'LICENSE'
 */
;(function (bootstrap) {
    "use strict"

    function createElement(html) {
        const template = document.createElement('template')
        template.innerHTML = html.trim()
        return template.content.firstChild
    }

    function Toast(props) {
        // see https://getbootstrap.com/docs/5.2/components/toasts/
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
            zIndex: 1030, // the z-index of the container
            ariaLive: "assertive"
        }
        this.containerId = "bootstrap-show-toast-container-" + this.props.position.replace(" ", "_")
        for (let prop in props) {
            // noinspection JSUnfilteredForInLoop
            this.props[prop] = props[prop]
        }
        const cssClass = ("toast " + this.props.toastClass).trim()
        let toastHeader = ""
        const showHeader = this.props.header || this.props.headerSmall
        if (showHeader) {
            toastHeader = `<div class="toast-header">
                            <strong class="me-auto">${this.props.header}</strong>
                            ${this.props.headerSmall ? `<small>${this.props.headerSmall}</small>` : ""}
                            ${this.props.closeButton ? `<button type="button" class="btn-close ${this.props.closeButtonClass}" data-bs-dismiss="toast" aria-label="${this.props.closeButtonLabel}"></button>` : ""}
                          </div>`
        }
        this.template =
            `<div class="${cssClass}" role="alert" aria-live="${this.props.ariaLive}" aria-atomic="true">
              ${toastHeader}
              <div class="d-flex">
                  <div class="toast-body">
                    ${this.props.body}
                  </div>
                  ${(!showHeader && this.props.closeButton) ? `<button type="button" class="btn-close me-2 mx-auto ${this.props.closeButtonClass}" style="margin-top: 0.69rem" data-bs-dismiss="toast" aria-label="${this.props.closeButtonLabel}"></button>` : ""}
              </div>
            </div>`
        this.container = document.getElementById(this.containerId)
        if (!this.container) {
            this.container = document.createElement("div")
            this.container.id = this.containerId
            this.container.setAttribute("class", "toast-container position-fixed p-3 " + this.props.position)
            this.container.style.zIndex = "" + this.props.zIndex
            document.body.appendChild(this.container)
        }
        this.element = createElement(this.template)
        this.toast = this.showToast(this.element)
    }

    Toast.prototype.showToast = function (toastElement) {
        if (this.props.direction === "prepend") {
            this.container.prepend(toastElement)
        } else {
            this.container.append(toastElement)
        }
        this.toast = new bootstrap.Toast(toastElement, {
            animation: this.props.animation,
            autohide: this.props.delay > 0 && this.props.delay !== Infinity, // TODO remove 0 for infinity 2022-09-02
            delay: this.props.delay

        })
        this.toast.show()

        return toastElement
    }

    bootstrap.showToast = function (props) {
        return new Toast(props)
    }

}(bootstrap))
