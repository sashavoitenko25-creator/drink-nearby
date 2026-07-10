import json


from aiogram import Router, F

from aiogram.types import (
    CallbackQuery
)


from database.queries import (
    get_post_by_id,
    create_report,
    has_reported
)



router = Router()



# =====================================================
# SHOW PHOTOS
# =====================================================


@router.callback_query(
    F.data.startswith("photos:")
)
async def show_photos(
    call: CallbackQuery
):


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






    if len(photos) <= 1:


        await call.answer(

            "Дополнительных фото нет"

        )

        return





    for photo in photos[1:]:


        await call.bot.send_photo(

            chat_id=call.from_user.id,

            photo=photo

        )





    await call.answer(
        "📷 Фото отправлены"
    )





# =====================================================
# REPORT USER
# =====================================================


@router.callback_query(
    F.data.startswith("report:")
)
async def report_user(
    call: CallbackQuery
):


    reporter_id = call.from_user.id



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





    reported_id = post.get(
        "user_id"
    )



    if not reported_id:


        await call.answer(

            "Ошибка пользователя"

        )

        return





    if int(reporter_id) == int(reported_id):


        await call.answer(

            "Нельзя пожаловаться на себя"

        )

        return





    if has_reported(

        reporter_id,

        reported_id

    ):


        await call.answer(

            "Ты уже отправлял жалобу"

        )

        return






    result = create_report(

        reporter_id,

        reported_id

    )




    if result is None:


        await call.answer(

            "Ошибка отправки жалобы"

        )

        return





    await call.answer(

        "🚨 Жалоба отправлена"

    )