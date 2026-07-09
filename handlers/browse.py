import json


from aiogram import Router, F

from aiogram.types import (
    CallbackQuery
)


from utils.browse_queue import (
    get_next
)


from utils.browse_state import (
    add_seen
)


from keyboards.menus import (
    user_actions
)



router = Router()



# =====================================================
# SHOW NEXT PROFILE
# =====================================================


@router.callback_query(
    F.data.startswith("next:")
)
async def next_profile(
    call: CallbackQuery
):


    user_id = call.from_user.id


    item = get_next(
        user_id
    )



    if not item:


        await call.answer(
            "📍 Больше анкет нет"
        )

        return



    post = item["post"]


    distance = item["distance"]



    photos = post.get(
        "photos",
        []
    )



    if isinstance(
        photos,
        str
    ):

        try:

            photos = json.loads(
                photos
            )

        except:

            photos = []



    add_seen(
        user_id,
        post["id"]
    )



    text = (

        "🍻 <b>АНКЕТА</b>\n\n"

        f"👤 {post.get('name','Без имени')}\n"

        f"🎂 {post.get('age','?')}\n"

        f"🍺 {post.get('drinks','?')}\n\n"

        f"📍 {round(distance,1)} км"

    )



    keyboard = user_actions(
        post["id"]
    )



    if photos:


        await call.message.answer_photo(

            photo=photos[0],

            caption=text,

            parse_mode="HTML",

            reply_markup=keyboard

        )


    else:


        await call.message.answer(

            text,

            parse_mode="HTML",

            reply_markup=keyboard

        )



    await call.answer()