// ============================================
// DRINK NEARBY
// APPLICATION
// ============================================

import { initTelegram } from "./services/telegram/telegram.js";
import { initSupabase } from "./services/supabase/supabase.js";
import { initI18n } from "./core/i18n.js";
import { initAuth } from "./auth/auth.js";

import { openScreen } from "./router/router.js";

import { createMapScreen } from "./screens/map/index.js";

// ============================================

async function startApp() {

    console.clear();

    console.log("====================================");
    console.log("🍻 Drink Nearby");
    console.log("Version 1.0");
    console.log("====================================");

    try {

        // Telegram

        initTelegram();

        // Language

        await initI18n();

        // Database

        await initSupabase();

        // Authorization

        await initAuth();

        // ============================================
        // TEMPORARY
        // Always open map
        // ============================================

        openScreen(
            "map",
            createMapScreen()
        );

        console.log("====================================");
        console.log("✅ Application started");
        console.log("====================================");

    }

    catch (error) {

        console.error("====================================");
        console.error("❌ STARTUP ERROR");
        console.error(error);
        console.error("====================================");

    }

}

// ============================================

window.addEventListener(

    "DOMContentLoaded",

    startApp

);