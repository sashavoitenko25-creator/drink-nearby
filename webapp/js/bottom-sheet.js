// =================================
// BOTTOM SHEET
// Drink Nearby
// =================================

const BottomSheet = {

    element: null,

    content: null,

    overlay: null,

    init() {

        this.overlay = document.getElementById("sheet-overlay");
        this.element = document.getElementById("bottom-sheet");
        this.content = document.getElementById("sheet-content");

        this.overlay.addEventListener("click", () => {

            this.close();

        });

    },

    open(html) {

        this.content.innerHTML = html;

        this.overlay.classList.add("active");
        this.element.classList.add("active");

    },

    close() {

        this.overlay.classList.remove("active");
        this.element.classList.remove("active");

    }

};