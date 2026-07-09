from aiogram import Router, F

from aiogram.types import (
    CallbackQuery,
    InlineKeyboardMarkup,
    InlineKeyboardButton
)


from database.queries import (
    create_match,
    get_match,
    update_match,
    get_user,
    get_post_by_id
)


from keyboards.menus import (
    chat_button
)

from keyboards.menus import (
    contact_button
)



router = Router()



# =====================================================
# SEND MATCH REQUEST
# =====================================================


@router.callback_query(
    F.data.startswith("meet:")
)
async def send_match(
    call: CallbackQuery
):


    sender_id = call.from_user.id


    post_id = int(
        call.data.split(":")[1]
    )



    post = get_post_by_id(
        post_id
    )



    if not post:


        await call.answer(
            "Анкета не найдена"
        )

        return



    receiver_id = post.get(
        "user_id"
    )



    if not receiver_id:


        await call.answer(
            "Ошибка пользователя"
        )

        return



    if int(sender_id) == int(receiver_id):


        await call.answer(
            "Это твоя анкета"
        )

        return



    old_matches = get_match(

        sender_id,

        receiver_id

    )



    if old_matches:


        for match in old_matches:


            if match.get("status") in (

                "pending",

                "accepted"

            ):


                await call.answer(

                    "🍻 Запрос уже существует"

                )

                return




    result = create_match(

        sender_id,

        receiver_id

    )



    if result is None:


        await call.answer(

            "Ошибка отправки запроса"

        )

        return





    keyboard = InlineKeyboardMarkup(

        inline_keyboard=[

            [

                InlineKeyboardButton(

                    text="✅ Принять",

                    callback_data=f"accept:{sender_id}"

                ),

                InlineKeyboardButton(

                    text="❌ Отклонить",

                    callback_data=f"reject:{sender_id}"

                )

            ]

        ]

    )



    await call.bot.send_message(

        sender_id,

        "🎉 У вас совпадение!\n\n"

        f"👤 Пользователь:\n{sender_username}\n\n"

        "Теперь можете общаться 🍻",

        reply_markup=contact_button(

            receiver.get("username")

        )

    )



    await call.answer(

        "🍻 Запрос отправлен"

    )





# =====================================================
# ACCEPT MATCH
# =====================================================


@router.callback_query(
    F.data.startswith("accept:")
)
async def accept_match(
    call: CallbackQuery
):


    receiver_id = call.from_user.id


    sender_id = int(

        call.data.split(":")[1]

    )



    update_match(

        sender_id,

        receiver_id,

        "accepted"

    )



    sender = get_user(
        sender_id
    )


    receiver = get_user(
        receiver_id
    )



    if not sender or not receiver:


        await call.answer(

            "Ошибка пользователя"

        )

        return



    sender_username = sender.get(
        "username"
    )


    receiver_username = receiver.get(
        "username"
    )



    await call.bot.send_message(

        sender_id,

        "🎉 Вы совпали!\n\n"

        f"👤 {receiver.get('first_name')}\n\n"

        "Теперь можете пообщаться 🍻",

        reply_markup=chat_button(

            receiver_username

        )

    )



    await call.message.answer(

        "🎉 У вас совпадение!\n\n"

        f"👤 Пользователь:\n{receiver_username}\n\n"

        "Теперь можете общаться 🍻",

        reply_markup=contact_button(

            sender.get("username")

        )

)



    await call.answer()





# =====================================================
# REJECT MATCH
# =====================================================


@router.callback_query(
    F.data.startswith("reject:")
)
async def reject_match(
    call: CallbackQuery
):


    receiver_id = call.from_user.id


    sender_id = int(

        call.data.split(":")[1]

    )



    update_match(

        sender_id,

        receiver_id,

        "rejected"

    )



    await call.answer(

        "❌ Запрос отклонён"

    )