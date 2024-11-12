class Deferred {
    promise;
    resolve;
    reject;
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.reject = reject;
            this.resolve = resolve;
        });
    }
}
class Modal {
    constructor(okButtonId, cancelButtonId, closeButtonId) {
        this.modal = document.createElement("div");
        this.modal.className = "modal"
        this.modal.innerHTML = `
        <div class="modal-content">
            <span id="closeModalBtn" class="close">&times;</span>
            <h2>Modal Title</h2>
            <div class="modal-actions">
                <button id="okBtn" class="modal-btn">OK</button>
                <button id="cancelBtn" class="modal-btn">Cancel</button>
            </div>
        </div>`;
        document.body.appendChild(this.modal)
        this.okButton = document.getElementById(okButtonId);
        this.cancelButton = document.getElementById(cancelButtonId);
        this.closeButton = document.getElementById(closeButtonId);

        // Bind event handlers
        this.closeButton.addEventListener("click", () => this.close());
        this.cancelButton.addEventListener("click", () => this.close());
        this.okButton.addEventListener("click", () => this.ok());
        window.addEventListener("click", (event) => this.outsideClick(event));

        this.deferred = null;
    }
    open() {
        this.deferred = new Deferred();
        this.modal.style.display = "flex";
        return this.deferred.promise;
    }
    close() {
        this.modal.style.display = "none";
        this.deferred.resolve(false)
    }
    ok() {
        this.modal.style.display = "none";
        this.deferred.resolve(true)
    }
    outsideClick(event) {
        if (event.target === this.modal) {
            this.close();
        }
    }
}
