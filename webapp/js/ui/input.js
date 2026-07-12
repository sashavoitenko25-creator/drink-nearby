// ============================================
// INPUT COMPONENT
// ============================================

export function createInput({

    label = "",

    placeholder = "",

    value = "",

    type = "text"

}) {

    const wrapper = document.createElement("div");

    wrapper.className = "input-group";

    const title = document.createElement("label");

    title.className = "input-label";

    title.textContent = label;

    const input = document.createElement("input");

    input.className = "input";

    input.type = type;

    input.placeholder = placeholder;

    input.value = value;

    wrapper.appendChild(title);

    wrapper.appendChild(input);

    return {

        element: wrapper,

        input

    };

}