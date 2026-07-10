// ============================================
// DRINK NEARBY
// APPLICATION ENTRY POINT
// ============================================

import { CONFIG } from "./core/config.js";
import { initI18n } from "./core/i18n.js";

import { initMap } from "./map/map.js";
import { initLocation } from "./map/location.js";

import { initSupabase } from "./services/supabase.js";

import { initUI } from "./ui/ui.js";

// ============================================
// START APPLICATION
// ============================================

async function startApp() {

    console.log(
        `${CONFIG.app.name} v${CONFIG.app.version}`
    );

    try {

        // Load language

        await initI18n();

        // Connect database

        initSupabase();

        // Create interface

        initUI();

        // Create map

        initMap();

        // Start GPS

        initLocation();

        console.log(
            "Application started successfully."
        );

    }

    catch(error){

        console.error(
            "Application startup failed:",
            error
        );

    }

}

// ============================================

document.addEventListener(

    "DOMContentLoaded",

    startApp

);