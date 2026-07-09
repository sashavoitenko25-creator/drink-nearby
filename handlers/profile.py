from datetime import datetime, timedelta, timezone


from aiogram import Router, F

from aiogram.types import Message


from database.queries import (
    get_active_post,
    delete_post_by_id,
    create_post,
    update_post
)


from keyboards.menus import (
    back_menu,
    photo_menu,
    time_menu,
    location_menu,
    main_menu
)


from utils.state import (
    user_step,
    user_data,
    reset_user
)


from config import MAX_PHOTOS



router = Router()



# =====================================================
# START CREATE PROFILE
# =====================================================


@router.message(
    F.text == "🍻 Создать анкету"
)
async def create_profile_start(
    message: Message
):


    user_id = message.from_user.id


    existing = get_active_post(
        user_id
    )


    if existing:


        await message.answer(
            "❗ У тебя уже есть активная анкета"
        )

        return



    user_step[user_id] = "name"


    user_data[user_id] = {

        "photos": []

    }


    await message.answer(

        "👤 Введи имя:",

        reply_markup=back_menu()

    )



# =====================================================
# PROFILE CREATION STEPS
# =====================================================


@router.message(
    lambda m: m.from_user.id in user_step
)
async def profile_steps(
    message: Message
):


    user_id = message.from_user.id


    step = user_step.get(
        user_id
    )


    text = message.text or ""



    # =========================
    # NAME
    # =========================


    if step == "name":


        if not text.strip():


            await message.answer(
                "❌ Имя не может быть пустым"
            )

            return



        if any(
            char.isdigit()
            for char in text
        ):


            await message.answer(
                "❌ Имя не должно содержать цифры"
            )

            return



        user_data[user_id]["name"] = text.strip()


        user_step[user_id] = "age"



        await message.answer(
            "🎂 Сколько тебе лет?"
        )

        return



    # =========================
    # AGE
    # =========================


    if step == "age":


        if not text.isdigit():


            await message.answer(
                "❌ Введи число"
            )

            return



        age = int(text)



        if age < 18 or age > 99:


            await message.answer(
                "❌ Возраст должен быть от 18 до 99"
            )

            return



        user_data[user_id]["age"] = age


        user_step[user_id] = "drinks"



        await message.answer(
            "🍺 Что ты пьёшь?"
        )

        return



    # =========================
    # DRINKS
    # =========================


    if step == "drinks":


        if not text.strip():


            await message.answer(
                "❌ Напиши что-нибудь"
            )

            return



        user_data[user_id]["drinks"] = text.strip()


        user_step[user_id] = "photo"



        await message.answer(
            "📸 Отправь до 3 фото",
            reply_markup=photo_menu()
        )

        return



    # =========================
    # PHOTO
    # =========================


    if step == "photo":


        if message.photo:


            photos = user_data[user_id]["photos"]



            if len(photos) >= MAX_PHOTOS:


                await message.answer(
                    "❌ Максимум 3 фото"
                )

                return



            photos.append(

                message.photo[-1].file_id

            )


            await message.answer(

                f"📸 Добавлено {len(photos)}/3\n\n"
                "Нажми ✅ Готово",

                reply_markup=photo_menu()

            )

            return





        if text == "✅ Готово":


            if len(
                user_data[user_id]["photos"]
            ) == 0:


                await message.answer(
                    "❌ Добавь хотя бы одно фото"
                )

                return



            user_step[user_id] = "time"



            await message.answer(

                "⏳ На сколько активна анкета?",

                reply_markup=time_menu()

            )

            return





    # =========================
    # TIME
    # =========================


    if step == "time":


        times = {

            "15 минут":15,

            "30 минут":30,

            "60 минут":60

        }



        if text not in times:

            return



        user_data[user_id]["ttl"] = times[text]


        user_step[user_id] = "location"



        await message.answer(

            "📍 Отправь геолокацию",

            reply_markup=location_menu()

        )

        return




    # =========================
    # LOCATION
    # =========================


    if step == "location":


        if not message.location:


            await message.answer(
                "📍 Используй кнопку отправки геолокации"
            )

            return




        data = user_data[user_id]



        result = create_post(

            {

                "user_id": user_id,

                "name": data["name"],

                "age": data["age"],

                "drinks": data["drinks"],

                "photos": data["photos"],

                "lat": message.location.latitude,

                "lon": message.location.longitude,

                "active": True,

                "expires_at":

                (

                    datetime.now(
                        timezone.utc
                    )

                    +

                    timedelta(
                        minutes=data["ttl"]
                    )

                ).isoformat()

            }

        )



        if result is None:


            await message.answer(
                "❌ Ошибка создания анкеты"
            )

            return




        reset_user(
            user_id
        )



        await message.answer(

            "✅ Анкета создана!",

            reply_markup=main_menu()

        )

        return