from dotenv import load_dotenv

load_dotenv()

from telegram import (
    Update,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    WebAppInfo,
)

from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
)

from config import BOT_TOKEN, WEBAPP_URL


# ==========================================
# /start
# ==========================================

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):

    keyboard = InlineKeyboardMarkup(
        [
            [
                InlineKeyboardButton(
                    text="🌍 Открыть карту",
                    web_app=WebAppInfo(url=WEBAPP_URL),
                )
            ]
        ]
    )

    text = (
        "🍻 <b>Drink Nearby</b>\n\n"
        "Находите людей рядом для:\n\n"
        "☕ Кофе\n"
        "🍺 Напитков\n"
        "🚶 Прогулки\n"
        "🍷 Приятного общения\n\n"
        "Нажмите кнопку ниже, чтобы открыть карту."
    )

    await update.message.reply_text(
        text=text,
        parse_mode="HTML",
        reply_markup=keyboard,
    )


# ==========================================
# MAIN
# ==========================================

def main():

    app = Application.builder().token(BOT_TOKEN).build()

    app.add_handler(
        CommandHandler("start", start)
    )

    print("===================================")
    print(" Drink Nearby Bot started")
    print("===================================")

    app.run_polling()


if __name__ == "__main__":
    main()