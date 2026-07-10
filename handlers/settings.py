from aiogram import Router, F

from aiogram.types import (
    Message,
    CallbackQuery
)

from aiogram.utils.keyboard import InlineKeyboardBuilder


from database.queries import (
    get_user_settings,
    update_radius,
    update_age_filter
)



router = Router()



# =====================================================
# OPEN SETTINGS
# =====================================================


@router.message(
    F.text == "⚙️ Настройки"
)
async def open_settings(
    message: Message
):


    user_id = message.from_user.id


    settings = get_user_settings(
        user_id
    )


    keyboard = InlineKeyboardBuilder()


    keyboard.button(
        text=f"📍 Радиус: {settings['radius_km']} км",
        callback_data="settings_radius"
    )


    keyboard.button(
        text=f"🎂 Возраст: {settings['age_min']}-{settings['age_max']}",
        callback_data="settings_age"
    )


    keyboard.adjust(1)



    await message.answer(

        "⚙️ <b>Настройки поиска</b>\n\n"

        f"📍 Радиус: {settings['radius_km']} км\n"

        f"🎂 Возраст: {settings['age_min']}-{settings['age_max']}\n\n"

        "Выбери что изменить:",

        parse_mode="HTML",

        reply_markup=keyboard.as_markup()

    )





# =====================================================
# CHANGE RADIUS
# =====================================================


@router.callback_query(
    F.data == "settings_radius"
)
async def change_radius(
    call: CallbackQuery
):


    keyboard = InlineKeyboardBuilder()


    for radius in [1,5,10,30,50]:

        keyboard.button(

            text=f"{radius} км",

            callback_data=f"radius:{radius}"

        )


    keyboard.adjust(2)



    await call.message.answer(

        "📍 Выбери радиус поиска:",

        reply_markup=keyboard.as_markup()

    )


    await call.answer()





@router.callback_query(
    F.data.startswith("radius:")
)
async def save_radius(
    call: CallbackQuery
):


    user_id = call.from_user.id


    radius = int(

        call.data.split(":")[1]

    )


    update_radius(

        user_id,

        radius

    )


    await call.message.answer(

        f"✅ Радиус изменён: {radius} км"

    )


    await call.answer()





# =====================================================
# CHANGE AGE
# =====================================================


@router.callback_query(
    F.data == "settings_age"
)
async def change_age(
    call: CallbackQuery
):


    keyboard = InlineKeyboardBuilder()


    ages = [

        ("18-25",18,25),

        ("25-35",25,35),

        ("35-50",35,50),

        ("50+",50,100)

    ]


    for text, amin, amax in ages:


        keyboard.button(

            text=text,

            callback_data=f"age:{amin}:{amax}"

        )


    keyboard.adjust(2)



    await call.message.answer(

        "🎂 Выбери возраст:",

        reply_markup=keyboard.as_markup()

    )


    await call.answer()





@router.callback_query(
    F.data.startswith("age:")
)
async def save_age(
    call: CallbackQuery
):


    user_id = call.from_user.id


    data = call.data.split(":")


    age_min = int(data[1])

    age_max = int(data[2])



    update_age_filter(

        user_id,

        age_min,

        age_max

    )



    await call.message.answer(

        f"✅ Возраст изменён: {age_min}-{age_max}"

    )


    await call.answer()