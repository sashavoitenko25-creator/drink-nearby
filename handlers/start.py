from aiogram import Router
from aiogram.types import Message
from aiogram.filters import CommandStart


from database.queries import (
    create_or_update_user,
    is_banned
)


from keyboards.menus import (
    main_menu
)



router = Router()



# =====================================================
# /START
# =====================================================


@router.message(
    CommandStart()
)
async def start_handler(
    message: Message
):


    user_id = message.from_user.id



    # ================================
    # CHECK BAN
    # ================================

    if is_banned(
        user_id
    ):


        await message.answer(

            "⛔ Доступ к боту ограничен."

        )

        return





    username = message.from_user.username


    first_name = message.from_user.first_name





    # ================================
    # SAVE USER
    # ================================

    try:

        create_or_update_user(

            user_id,

            username,

            first_name

        )


    except Exception as e:


        print(

            "USER SAVE ERROR:",

            e

        )





    # ================================
    # GREETING
    # ================================


    await message.answer(

        "🍻 Добро пожаловать в Drink!\n\n"

        "Здесь можно найти людей рядом, "

        "с кем можно выпить, пообщаться "

        "или встретиться.\n\n"

        "Создай свою анкету и "

        "посмотри кто рядом 👇",


        reply_markup=main_menu()

    )