// ============================================
// PROFILE SCREEN
// ============================================

import { createButton } from "../../ui/button.js";
import { createInput } from "../../ui/input.js";
import { createTextarea } from "../../ui/textarea.js";
import { createSelect } from "../../ui/select.js";
import { createAvatar } from "../../ui/avatar.js";

import { saveProfile } from "./saveProfile.js";

export function createProfileScreen() {

    const screen = document.createElement("div");

    screen.className = "profile-screen";

    const container = document.createElement("div");

    container.className = "profile-container";

    // ============================================
    // HEADER
    // ============================================

    const header = document.createElement("div");

    header.className = "profile-header";

    header.innerHTML = `

        <div class="profile-title">
            Create profile
        </div>

        <div class="profile-subtitle">
            Tell people a little about yourself
        </div>

    `;

    // ============================================
    // PHOTO
    // ============================================

    const photo = document.createElement("div");

    photo.className = "profile-photo-area";

    photo.appendChild(createAvatar());

    // ============================================
    // FIELDS
    // ============================================

    const fields = document.createElement("div");

    fields.className = "profile-fields";

    const name = createInput({

        label: "Name",

        placeholder: "Your name"

    });

    const age = createInput({

        label: "Age",

        placeholder: "Your age",

        type: "number"

    });

    const gender = createSelect({

        label: "Gender",

        options: [

            { value: "", label: "Select gender" },

            { value: "male", label: "Male" },

            { value: "female", label: "Female" },

            { value: "other", label: "Other" }

        ]

    });

    const bio = createTextarea({

        label: "About me",

        placeholder: "Tell something about yourself..."

    });

    const duration = createSelect({

        label: "How long will you stay on the map?",

        options: [

            { value: 15, label: "15 minutes" },

            { value: 30, label: "30 minutes" },

            { value: 60, label: "1 hour" },

            { value: 120, label: "2 hours" }

        ]

    });

    fields.append(

        name.element,

        age.element,

        gender.element,

        bio.element,

        duration.element

    );

    // ============================================
    // BUTTON
    // ============================================

    const button = createButton({

        text: "Appear on map",

        onClick: async () => {

            try {

                await saveProfile({

                    first_name: name.input.value,

                    age: Number(age.input.value),

                    gender: gender.select.value,

                    bio: bio.textarea.value,

                    meeting_duration: Number(duration.select.value)

                });

                alert("✅ Profile saved!");

                console.log("Profile saved.");

            }

            catch (error) {

                console.error(error);

                alert("Failed to save profile.");

            }

        }

    });

    button.className += " profile-submit";

    // ============================================
    // BUILD
    // ============================================

    container.append(

        header,

        photo,

        fields,

        button

    );

    screen.append(container);

    return screen;

}