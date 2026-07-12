// ============================================
// SUPABASE SERVICE
// ============================================

import { ENV } from "../../core/env.js";

let client = null;

// ============================================

export async function initSupabase() {

    if (client) {

        return client;

    }

    client = window.supabase.createClient(

        ENV.SUPABASE_URL,

        ENV.SUPABASE_ANON_KEY

    );

    console.log("✅ Supabase connected.");

    return client;

}

// ============================================

export function db() {

    if (!client) {

        throw new Error("Supabase is not initialized.");

    }

    return client;

}