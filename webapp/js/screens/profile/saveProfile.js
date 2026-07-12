// ============================================
// SAVE PROFILE
// ============================================

import { updateUser } from "../../api/users.js";

import { getCurrentUser } from "../../auth/auth.js";

// ============================================

export async function saveProfile(data) {

    const user = getCurrentUser();

    if (!user) {

        throw new Error("User not found.");

    }

    return await updateUser(

        user.id,

        {

            ...data,

            is_profile_completed: true

        }

    );

}