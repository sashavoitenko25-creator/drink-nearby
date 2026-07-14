import OnboardingScreen from "./OnboardingScreen.js";

import WelcomeStep from "./steps/WelcomeStep.js";
import PhotoStep from "./steps/PhotoStep.js";
import NameStep from "./steps/NameStep.js";
import AgeStep from "./steps/AgeStep.js";
import GenderStep from "./steps/GenderStep.js";
import AboutStep from "./steps/AboutStep.js";
import LocationStep from "./steps/LocationStep.js";

class OnboardingController {

    constructor() {

        this.screen = null;

        this.steps = [];

        this.currentStep = 0;

        this.profile = {

            photo: null,

            name: "",

            age: null,

            gender: null,

            about: "",

            locationAllowed: false

        };

    }

    init(container) {

        this.screen = new OnboardingScreen();

        this.screen.render(container);

        this.steps = [

            new WelcomeStep(this),
            new PhotoStep(this),
            new NameStep(this),
            new AgeStep(this),
            new GenderStep(this),
            new AboutStep(this),
            new LocationStep(this)

        ];

        this.showStep(0);

    }

    showStep(index) {

        this.currentStep = index;

        this.screen.setContent(
            this.steps[index].render()
        );

    }

    next() {

        if (this.currentStep >= this.steps.length - 1) {

            this.finish();

            return;

        }

        this.showStep(this.currentStep + 1);

    }

    previous() {

        if (this.currentStep <= 0) return;

        this.showStep(this.currentStep - 1);

    }

    updateProfile(data) {

        Object.assign(this.profile, data);

    }

    finish() {

        localStorage.setItem(

            "profile",

            JSON.stringify(this.profile)

        );

        localStorage.setItem(

            "profileCreated",

            "true"

        );

        location.reload();

    }

}

export default OnboardingController;