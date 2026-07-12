// ============================================
// AVATAR COMPONENT
// ============================================

export function createAvatar() {

    const avatar = document.createElement("div");

    avatar.className = "avatar";

    avatar.innerHTML = `
        <div class="avatar-icon">📷</div>
        <div class="avatar-text">Add photo</div>
    `;

    return avatar;

}