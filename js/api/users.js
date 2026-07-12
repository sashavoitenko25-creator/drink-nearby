// ============================================
// USERS API
// ============================================

import { db } from "../services/supabase/supabase.js";

// ============================================
// GET USER BY TELEGRAM ID
// ============================================

export async function getUserByTelegramId(telegramId) {

    const { data, error } = await db()
        .from("users")
        .select("*")
        .eq("telegram_id", telegramId)
        .maybeSingle();

    if (error) {

        throw error;

    }

    return data;

}

// ============================================
// CREATE USER
// ============================================

export async function createUser(user) {

    const { data, error } = await db()
        .from("users")
        .insert(user)
        .select()
        .single();

    if (error) {

        throw error;

    }

    return data;

}

// ============================================
// UPDATE USER
// ============================================

export async function updateUser(id, values) {

    const { data, error } = await db()
        .from("users")
        .update(values)
        .eq("id", id)
        .select()
        .single();

    if (error) {

        throw error;

    }

    return data;

}

// ============================================
// DELETE USER
// ============================================

export async function deleteUser(id) {

    const { error } = await db()
        .from("users")
        .delete()
        .eq("id", id);

    if (error) {

        throw error;

    }

}