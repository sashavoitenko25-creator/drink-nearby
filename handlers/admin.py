from aiogram import Router, F

from aiogram.types import (
    Message,
    CallbackQuery,
    InlineKeyboardMarkup,
    InlineKeyboardButton
)


from config import ADMIN_IDS


from database.queries import (
    get_reports,
    ban_user,
    unban_user
)



router = Router()



# =====================================
# ADMIN PANEL
# =====================================


@router.message(
    F.text == "/admin"
)
async def admin_panel(
    message: Message
):


    if message.from_user.id not in ADMIN_IDS:

        await message.answer(
            "⛔ Нет доступа"
        )

        return



    reports = get_reports()



    if not reports:

        await message.answer(
            "✅ Жалоб нет"
        )

        return




    for report in reports:


        keyboard = InlineKeyboardMarkup(

            inline_keyboard=[

                [

                InlineKeyboardButton(

                    text="🚫 Заблокировать",

                    callback_data=
                    f"ban:{report['reported_id']}"

                )

                ]

            ]

        )



        await message.answer(

            "🚨 <b>Жалоба</b>\n\n"

            f"От: {report['reporter_id']}\n"

            f"На: {report['reported_id']}\n"

            f"Причина: {report.get('reason')}",

            parse_mode="HTML",

            reply_markup=keyboard

        )





# =====================================
# BAN USER
# =====================================


@router.callback_query(
    F.data.startswith("ban:")
)
async def ban_callback(
    call: CallbackQuery
):


    if call.from_user.id not in ADMIN_IDS:

        await call.answer(
            "Нет доступа"
        )

        return



    user_id = int(

        call.data.split(":")[1]

    )



    ban_user(
        user_id
    )



    await call.answer(

        "Пользователь заблокирован"

    )
    
# =====================================
# UNBAN USER
# =====================================


@router.message(
    F.text.startswith("/unban")
)
async def unban_command(
    message: Message
):


    if message.from_user.id not in ADMIN_IDS:


        await message.answer(
            "⛔ Нет доступа"
        )

        return



    parts = message.text.split()



    if len(parts) != 2:


        await message.answer(

            "Используй:\n"
            "/unban USER_ID"

        )

        return



    try:

        user_id = int(
            parts[1]
        )


    except:


        await message.answer(

            "❌ ID должен быть числом"

        )

        return




    result = unban_user(
        user_id
    )



    if result is None:


        await message.answer(

            "❌ Ошибка разблокировки"

        )

        return



    await message.answer(

        f"✅ Пользователь {user_id} разблокирован"

    )