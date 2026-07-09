// =================================
// CREATE MEETING
// Drink Nearby
// =================================

const CreateMeeting = {

    data: {

        duration:30,

        drink:null,

        text:""

    },

    open(){

        this.stepDuration();

    },

    stepDuration(){

        BottomSheet.open(`

            <div class="meeting-create">

                <h2>Сколько времени?</h2>

                <div class="segment">

                    <button
                        class="btn btn-secondary"
                        onclick="CreateMeeting.selectDuration(15)"
                    >

                        15 мин

                    </button>

                    <button
                        class="btn btn-primary"
                        onclick="CreateMeeting.selectDuration(30)"
                    >

                        30 мин

                    </button>

                    <button
                        class="btn btn-secondary"
                        onclick="CreateMeeting.selectDuration(60)"
                    >

                        60 мин

                    </button>

                </div>

                <button
                    class="btn btn-primary"
                    onclick="CreateMeeting.stepDrink()"
                >

                    Далее

                </button>

            </div>

        `);

    },

    selectDuration(value){

        this.data.duration=value;

        this.stepDuration();

    },

    stepDrink(){

        BottomSheet.open(`

            <div class="meeting-create">

                <h2>Что хотите?</h2>

                <div class="drink-grid">

                    <button onclick="CreateMeeting.selectDrink('🍺 Beer')">🍺</button>

                    <button onclick="CreateMeeting.selectDrink('🍷 Wine')">🍷</button>

                    <button onclick="CreateMeeting.selectDrink('☕ Coffee')">☕</button>

                    <button onclick="CreateMeeting.selectDrink('🍽 Food')">🍽</button>

                </div>

            </div>

        `);

    },

    selectDrink(drink){

        this.data.drink=drink;

        this.stepComment();

    },

    stepComment(){

        BottomSheet.open(`

            <div class="meeting-create">

                <h2>Комментарий</h2>

                <textarea
                    id="meeting-comment"
                    placeholder="Например: Жду возле входа."
                ></textarea>

                <button
                    class="btn btn-primary"
                    onclick="CreateMeeting.finish()"
                >

                    Опубликовать

                </button>

            </div>

        `);

    },

    finish(){

        this.data.text=

            document.getElementById("meeting-comment").value;

        console.log(this.data);

        BottomSheet.close();

    }

};