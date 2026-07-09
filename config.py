import os


from dotenv import load_dotenv


load_dotenv()



# =====================================================
# ENV SETTINGS
# =====================================================


BOT_TOKEN = os.getenv(
    "BOT_TOKEN"
)


SUPABASE_URL = os.getenv(
    "SUPABASE_URL"
)


SUPABASE_KEY = os.getenv(
    "SUPABASE_KEY"
)


WEBAPP_URL = os.getenv(
    "WEBAPP_URL"
)



# =====================================================
# ADMIN
# =====================================================


ADMIN_IDS = {

    6859689857

}



# =====================================================
# PROFILE SETTINGS
# =====================================================


MAX_PHOTOS = 3


POST_RADIUS_KM = 10



# =====================================================
# MATCH SETTINGS
# =====================================================


MATCH_PENDING = "pending"


MATCH_ACCEPTED = "accepted"


MATCH_REJECTED = "rejected"



# =====================================================
# VALIDATION
# =====================================================


if not BOT_TOKEN:

    raise ValueError(
        "BOT_TOKEN is missing in .env"
    )


if not SUPABASE_URL:

    raise ValueError(
        "SUPABASE_URL is missing in .env"
    )


if not SUPABASE_KEY:

    raise ValueError(
        "SUPABASE_KEY is missing in .env"
    )