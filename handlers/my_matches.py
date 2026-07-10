from aiogram import Router, F

from aiogram.types import Message

from database.queries import (
    get_user_matches,
    get_user
)


router = Router()



@router.message(
    F.text == "🤝 Мои встречи"
)
async def my_matches(
    message: Message
):


    user_id = message.from_user.id


    matches = get_user_matches(
        user_id
    )


    if not matches:


        await message.answer(
            "🤝 У тебя пока нет встреч"
        )

        return



    text = "🤝 <b>МОИ ВСТРЕЧИ</b>\n\n"



    for match in matches:


        if match["sender_id"] == user_id:

            other_id = match["receiver_id"]

        else:

            other_id = match["sender_id"]



        user = get_user(
            other_id
        )


        name = (
            user.get("first_name")
            if user
            else "Пользователь"
        )


        status = match["status"]


        if status == "pending":

            emoji = "⏳"

        elif status == "accepted":

            emoji = "✅"

        else:

            emoji = "❌"



        text += (

            f"{emoji} {name}\n"

            f"Статус: {status}\n\n"

        )



    await message.answer(

        text,

        parse_mode="HTML"

    )