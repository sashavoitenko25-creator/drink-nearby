import json


from aiogram import Router, F

from aiogram.types import (
    Message,
    CallbackQuery
)


from database.queries import (
    get_active_post,
    get_profile_views_count,
    get_match_stats,
    delete_post_by_id
)


from keyboards.menus import (
    profile_actions,
    main_menu
)



router = Router()



# =====================================================
# MY PROFILE
# =====================================================


@router.message(
    F.text == "👤 Моя анкета"
)
async def my_profile(
    message: Message
):


    user_id = message.from_user.id



    views = get_profile_views_count(
        user_id
    )



    match_stats = get_match_stats(
        user_id
    )



    post = get_active_post(
        user_id
    )



    if not post:


        await message.answer(

            "❌ У тебя нет активной анкеты"

        )

        return




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





    text = (

        "🍻 <b>ТВОЯ АНКЕТА</b>\n\n"

        f"👤 Имя: <b>{post.get('name')}</b>\n"

        f"🎂 Возраст: <b>{post.get('age')}</b>\n"

        f"🍺 Напиток: <b>{post.get('drinks')}</b>\n"
        
        f"👀 Просмотров: <b>{views}</b>\n"

        f"🍻 Запросов встречи: <b>{match_stats['total']}</b>\n"

        f"✅ Принято: <b>{match_stats['accepted']}</b>\n"

        f"❌ Отклонено: <b>{match_stats['rejected']}</b>"

        )





    if photos:


        await message.answer_photo(

            photo=photos[0],

            caption=text,

            parse_mode="HTML",

            reply_markup=profile_actions(
                post["id"]
            )

        )


    else:


        await message.answer(

            text,

            parse_mode="HTML",

            reply_markup=profile_actions(
                post["id"]
            )

        )





# =====================================================
# DELETE PROFILE
# =====================================================


@router.callback_query(
    F.data.startswith("delete:")
)
async def delete_profile(
    call: CallbackQuery
):


    user_id = call.from_user.id



    post_id = int(

        call.data.split(":")[1]

    )




    post = get_active_post(
        user_id
    )



    if not post or post["id"] != post_id:


        await call.answer(

            "❌ Это не твоя анкета"

        )

        return




    result = delete_post_by_id(

        post_id,

        user_id

    )



    if result is None:


        await call.answer(

            "Ошибка удаления"

        )

        return




    await call.answer(

        "🗑 Анкета удалена"

    )



    await call.message.answer(

        "Анкета больше не активна",

        reply_markup=main_menu()

    )