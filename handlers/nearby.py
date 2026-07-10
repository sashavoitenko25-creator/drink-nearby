import json


from aiogram import Router, F

from aiogram.types import Message


from database.queries import (
    get_active_post,
    get_all_active_posts,
    create_profile_view,
    get_user_settings
)


from keyboards.menus import (
    user_actions
)


from utils.geo import (
    distance_km
)


from config import (
    POST_RADIUS_KM
)



router = Router()



# =====================================================
# PEOPLE NEARBY
# =====================================================


@router.message(
    F.text == "👀 Люди рядом"
)
async def nearby(
    message: Message
):


    user_id = message.from_user.id


    settings = get_user_settings(
        user_id
    )


    search_radius = settings.get(
        "radius_km",
        10
    )


    age_min = settings.get(
        "age_min",
        18
    )


    age_max = settings.get(
        "age_max",
        100
    )

    my_post = get_active_post(
        user_id
    )



    if not my_post:


        await message.answer(

            "❗ Сначала создай свою анкету"

        )

        return




    posts = get_all_active_posts()



    found = False




    for post in posts:



        # пропускаем себя

        if int(post.get("user_id")) == int(user_id):

            continue
            
            
        post_age = post.get(
            "age"
        )


        if post_age:

            try:

                post_age = int(post_age)

                if post_age < age_min or post_age > age_max:

                    continue

            except:

                pass




        # проверяем координаты

        if (

            post.get("lat") is None

            or

            post.get("lon") is None

        ):

            continue





        distance = distance_km(

            my_post["lat"],

            my_post["lon"],

            post["lat"],

            post["lon"]

        )





        if distance > search_radius:

            continue





        found = True



        # =====================================================
        # SAVE PROFILE VIEW
        # =====================================================


        try:

            create_profile_view(

                viewer_id=user_id,

                owner_id=post["user_id"],

                post_id=post["id"]

            )


        except Exception as e:

            print(
                "VIEW SAVE ERROR:",
                e
            )





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



            await message.answer_photo(

                photo=photos[0],

                caption=text,

                parse_mode="HTML",

                reply_markup=keyboard

            )



        else:



            await message.answer(

                text,

                parse_mode="HTML",

                reply_markup=keyboard

            )







    if not found:


        await message.answer(

            "📍 Никого рядом нет"

        )