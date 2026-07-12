// ============================================
// ROUTER
// ============================================

let currentScreen = null;

const container = document.getElementById("screen");

// ============================================

export function openScreen(name, element) {

    if (!container) {

        console.error("Screen container not found.");

        return;

    }

    container.innerHTML = "";

    container.appendChild(element);

    currentScreen = {

        name,

        element

    };

    console.log("📄 Screen:", name);

}

// ============================================

export function closeScreen() {

    if (!container) return;

    container.innerHTML = "";

    currentScreen = null;

}

// ============================================

export function getCurrentScreen() {

    return currentScreen;

}