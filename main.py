import asyncio


from aiogram import (
    Bot,
    Dispatcher
)


from config import (
    BOT_TOKEN
)


from database.queries import (
    delete_expired_posts
)



# =====================================================
# BOT / DISPATCHER
# =====================================================


bot = Bot(
    token=BOT_TOKEN
)


dp = Dispatcher()



# =====================================================
# IMPORT HANDLERS
# =====================================================


from handlers.start import router as start_router
from handlers.navigation import router as navigation_router
from handlers.profile import router as profile_router
from handlers.profile_view import router as profile_view_router
from handlers.nearby import router as nearby_router
from handlers.browse import router as browse_router
from handlers.match import router as match_router
from handlers.my_matches import router as my_matches_router
from handlers.actions import router as actions_router
from handlers.admin import router as admin_router
from handlers import settings




# =====================================================
# REGISTER ROUTERS
# =====================================================


dp.include_router(
    start_router
)


dp.include_router(
    navigation_router
)


dp.include_router(
    profile_router
)


dp.include_router(
    profile_view_router
)


dp.include_router(
    nearby_router
)


dp.include_router(
    browse_router
)


dp.include_router(
    match_router
)


dp.include_router(
    my_matches_router
)


dp.include_router(
    actions_router
)


dp.include_router(
    admin_router
)


dp.include_router(
    settings.router
)



# =====================================================
# CLEANUP LOOP
# =====================================================


async def cleanup_loop():

    while True:

        try:

            result = delete_expired_posts()

            if result:

                print(
                    f"🧹 Закрыто анкет: {len(result)}"
                )


        except Exception as e:

            print(
                "Cleanup error:",
                e
            )


        await asyncio.sleep(60)



# =====================================================
# START BOT
# =====================================================


async def main():

    print(
        "🚀 BOT STARTING..."
    )


    await bot.delete_webhook(
        drop_pending_updates=True
    )


    asyncio.create_task(
        cleanup_loop()
    )


    print(
        "✅ BOT STARTED"
    )


    await dp.start_polling(
        bot
    )



# =====================================================
# RUN
# =====================================================


if __name__ == "__main__":

    asyncio.run(
        main()
    )