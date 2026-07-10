from telegram import (
    Update,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    WebAppInfo
)

from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes
)

TOKEN = "8806146438:AAGLQE6KJaoPk5TITgpo4k_ushrNL3Kn_hg"

WEB_APP_URL = "https://sashavoitenko25-creator.github.io/drink-nearby/"


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):

    keyboard = [
        [
            InlineKeyboardButton(
                text="🌍 Карта",
                web_app=WebAppInfo(
                    url=WEB_APP_URL
                )
            )
        ]
    ]

    await update.message.reply_text(
        "Добро пожаловать в Drink Nearby!",
        reply_markup=InlineKeyboardMarkup(keyboard)
    )


app = Application.builder().token(TOKEN).build()

app.add_handler(CommandHandler("start", start))

app.run_polling()