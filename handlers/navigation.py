from aiogram import Router, F
from aiogram.types import Message

from keyboards.menus import main_menu

from utils.state import (
    user_step,
    user_data,
    reset_user
)


router = Router()


# =====================================================
# MAIN MENU
# =====================================================

@router.message(
    F.text == "🏠 Главное меню"
)
async def to_main_menu(
    message: Message
):

    reset_user(
        message.from_user.id
    )

    await message.answer(

        "🏠 Главное меню",

        reply_markup=main_menu()

    )


# =====================================================
# BACK
# =====================================================

@router.message(
    F.text == "⬅️ Назад"
)
async def back(
    message: Message
):

    user_id = message.from_user.id


    if user_id not in user_step:

        await message.answer(

            "Ты уже в главном меню.",

            reply_markup=main_menu()

        )

        return


    order = [

        "name",

        "age",

        "drinks",

        "photo",

        "time",

        "location"

    ]


    current = user_step[user_id]


    index = order.index(current)


    if index == 0:

        reset_user(user_id)

        await message.answer(

            "Создание анкеты отменено.",

            reply_markup=main_menu()

        )

        return


    previous = order[index - 1]


    user_step[user_id] = previous


    texts = {

        "name":
            "👤 Введи имя",

        "age":
            "🎂 Сколько тебе лет?",

        "drinks":
            "🍺 Что ты пьёшь?",

        "photo":
            "📸 Отправь фото",

        "time":
            "⏳ На сколько активна анкета?",

        "location":
            "📍 Отправь геолокацию"

    }


    await message.answer(
        texts[previous]
    )