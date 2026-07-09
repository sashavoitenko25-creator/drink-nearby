from aiogram.types import (
    ReplyKeyboardMarkup,
    KeyboardButton,
    InlineKeyboardMarkup,
    InlineKeyboardButton,
    WebAppInfo
)


from config import WEBAPP_URL



# =====================================================
# MAIN MENU
# =====================================================


def main_menu():

    return ReplyKeyboardMarkup(

        keyboard=[

            [
                KeyboardButton(
                    text="🍻 Создать анкету"
                )
            ],

            [
                KeyboardButton(
                    text="👤 Моя анкета"
                )
            ],

            [
                KeyboardButton(
                    text="👀 Люди рядом"
                )
            ],

            [
                KeyboardButton(
                    text="⚙️ Настройки"
                )
            ],

            [
                KeyboardButton(
                    text="🗺 Карта",
                    web_app=WebAppInfo(
                        url=WEBAPP_URL
                    )
                )
            ],

        ],

        resize_keyboard=True

    )



# =====================================================
# BACK MENU
# =====================================================


def back_menu():

    return ReplyKeyboardMarkup(

        keyboard=[

            [
                KeyboardButton(
                    text="⬅️ Назад"
                )
            ],

            [
                KeyboardButton(
                    text="🏠 Главное меню"
                )
            ]

        ],

        resize_keyboard=True

    )



# =====================================================
# PHOTO MENU
# =====================================================


def photo_menu():

    return ReplyKeyboardMarkup(

        keyboard=[

            [
                KeyboardButton(
                    text="📸 Добавить фото"
                )
            ],

            [
                KeyboardButton(
                    text="✅ Готово"
                )
            ],

            [
                KeyboardButton(
                    text="⬅️ Назад"
                )
            ]

        ],

        resize_keyboard=True

    )



# =====================================================
# TIME MENU
# =====================================================


def time_menu():

    return ReplyKeyboardMarkup(

        keyboard=[

            [
                KeyboardButton(
                    text="15 минут"
                )
            ],

            [
                KeyboardButton(
                    text="30 минут"
                )
            ],

            [
                KeyboardButton(
                    text="60 минут"
                )
            ],

            [
                KeyboardButton(
                    text="⬅️ Назад"
                )
            ]

        ],

        resize_keyboard=True

    )



# =====================================================
# LOCATION MENU
# =====================================================


def location_menu():

    return ReplyKeyboardMarkup(

        keyboard=[

            [
                KeyboardButton(
                    text="📍 Отправить геолокацию",
                    request_location=True
                )
            ],

            [
                KeyboardButton(
                    text="⬅️ Назад"
                )
            ]

        ],

        resize_keyboard=True

    )



# =====================================================
# PROFILE ACTIONS
# =====================================================


def profile_actions(
    post_id:int
):

    return InlineKeyboardMarkup(

        inline_keyboard=[

            [

                InlineKeyboardButton(

                    text="🗑 Удалить анкету",

                    callback_data=f"delete:{post_id}"

                )

            ]

        ]

    )



# =====================================================
# OTHER USER ACTIONS
# =====================================================


def user_actions(
    post_id: int
):

    return InlineKeyboardMarkup(

        inline_keyboard=[

            [
                InlineKeyboardButton(
                    text="🍻 Встретиться",
                    callback_data=f"meet:{post_id}"
                ),

                InlineKeyboardButton(
                    text="⏭ Следующая",
                    callback_data="next"
                )
            ],

            [

                InlineKeyboardButton(

                    text="📷 Фото",

                    callback_data=f"photos:{post_id}"

                ),

                InlineKeyboardButton(

                    text="🚨 Жалоба",

                    callback_data=f"report:{post_id}"

                )

            ],

            [

                InlineKeyboardButton(

                    text="➡️ Следующая",

                    callback_data=f"next:{post_id}"

                )

            ]

        ]

    )

def chat_button(
    username
):

    if not username:

        return None


    return InlineKeyboardMarkup(

        inline_keyboard=[

            [

                InlineKeyboardButton(

                    text="💬 Открыть чат",

                    url=f"https://t.me/{username}"

                )

            ]

        ]

    )

# =====================================================
# MATCH CONTACT BUTTON
# =====================================================


def contact_button(
    username: str
):

    from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup


    return InlineKeyboardMarkup(

        inline_keyboard=[

            [

                InlineKeyboardButton(

                    text="💬 Написать",

                    url=f"https://t.me/{username}"

                )

            ]

        ]

    )