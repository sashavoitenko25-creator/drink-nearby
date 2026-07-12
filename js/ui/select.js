// ============================================
// SELECT COMPONENT
// ============================================

export function createSelect({

    label = "",

    options = [],

    value = ""

}) {

    const wrapper = document.createElement("div");

    wrapper.className = "input-group";

    const title = document.createElement("label");

    title.className = "input-label";

    title.textContent = label;

    const select = document.createElement("select");

    select.className = "select";

    options.forEach(option => {

        const item = document.createElement("option");

        item.value = option.value;

        item.textContent = option.label;

        if (option.value === value) {

            item.selected = true;

        }

        select.appendChild(item);

    });

    wrapper.appendChild(title);

    wrapper.appendChild(select);

    return {

        element: wrapper,

        select

    };

}