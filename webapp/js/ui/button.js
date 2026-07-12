// ============================================
// BUTTON COMPONENT
// ============================================

export function createButton({

    text = "Button",

    type = "primary",

    onClick = null,

    disabled = false

}) {

    const button = document.createElement("button");

    button.className = `btn btn-${type}`;

    button.textContent = text;

    button.disabled = disabled;

    if (onClick) {

        button.addEventListener("click", onClick);

    }

    return button;

}