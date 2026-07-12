// ============================================
// TEXTAREA
// ============================================

export function createTextarea({

    label = "",

    placeholder = "",

    value = ""

}) {

    const wrapper = document.createElement("div");

    wrapper.className = "input-group";

    const title = document.createElement("label");

    title.className = "input-label";

    title.textContent = label;

    const textarea = document.createElement("textarea");

    textarea.className = "textarea";

    textarea.placeholder = placeholder;

    textarea.value = value;

    wrapper.appendChild(title);

    wrapper.appendChild(textarea);

    return {

        element: wrapper,

        textarea

    };

}