// ============================================
// AUTH SERVICE
// ============================================

import { getTelegramUser } from "../services/telegram/telegram.js";

import {
    getUserByTelegramId,
    createUser
} from "../api/users.js";

import { setState } from "../core/state.js";

let currentUser = null;

// ============================================

export async function initAuth() {

    const telegramUser = getTelegramUser();

    if (!telegramUser) {

        console.warn("❌ Telegram user not found.");

        return null;

    }

    try {

        let user = await getUserByTelegramId(
            telegramUser.id
        );

        if (!user) {

            user = await createUser({

                telegram_id: telegramUser.id,

                username: telegramUser.username ?? "",

                first_name: telegramUser.first_name ?? "",

                last_name: telegramUser.last_name ?? "",

                language: telegramUser.language_code ?? "en"

            });

            console.log("✅ New user created.");

        } else {

            console.log("✅ Existing user loaded.");

        }

        currentUser = user;

        setState("user", user);

        return user;

    }

    catch (error) {

        console.error("❌ Auth error:", error);

        return null;

    }

}

// ============================================

export function getCurrentUser() {

    return currentUser;

}

// ============================================

export function isAuthorized() {

    return currentUser !== null;

}

// ============================================

export function logout() {

    currentUser = null;

    setState("user", null);

}