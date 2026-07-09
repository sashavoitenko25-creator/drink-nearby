from datetime import datetime, timezone


from database.supabase import sb



# =====================================================
# USERS
# =====================================================


def create_or_update_user(
    user_id: int,
    username: str | None,
    first_name: str | None
):

    try:

        result = (
            sb.table("users")
            .upsert(
                {
                    "id": user_id,
                    "username": username,
                    "first_name": first_name
                }
            )
            .execute()
        )

        return result.data


    except Exception as e:

        print(
            "create_or_update_user error:",
            e
        )

        return None



def get_user(
    user_id: int
):

    try:

        result = (
            sb.table("users")
            .select("*")
            .eq(
                "id",
                user_id
            )
            .execute()
        )


        if result.data:

            return result.data[0]


        return None


    except Exception as e:

        print(
            "get_user error:",
            e
        )

        return None





# =====================================================
# POSTS
# =====================================================


def create_post(
    data: dict
):

    try:

        result = (
            sb.table("posts")
            .insert(data)
            .execute()
        )


        return result.data


    except Exception as e:

        print(
            "create_post error:",
            e
        )

        return None





def get_active_post(
    user_id: int
):

    try:

        result = (
            sb.table("posts")
            .select("*")
            .eq(
                "user_id",
                user_id
            )
            .eq(
                "active",
                True
            )
            .execute()
        )


        if result.data:

            return result.data[0]


        return None


    except Exception as e:

        print(
            "get_active_post error:",
            e
        )

        return None





def get_post_by_id(
    post_id: int
):

    try:

        result = (
            sb.table("posts")
            .select("*")
            .eq(
                "id",
                post_id
            )
            .execute()
        )


        if result.data:

            return result.data[0]


        return None


    except Exception as e:

        print(
            "get_post_by_id error:",
            e
        )

        return None





def get_all_active_posts():

    try:

        result = (
            sb.table("posts")
            .select("*")
            .eq(
                "active",
                True
            )
            .execute()
        )


        return result.data


    except Exception as e:

        print(
            "get_all_active_posts error:",
            e
        )

        return []





def delete_post_by_id(
    post_id: int,
    user_id: int
):

    try:

        result = (
            sb.table("posts")
            .update(
                {
                    "active": False
                }
            )
            .eq(
                "id",
                post_id
            )
            .eq(
                "user_id",
                user_id
            )
            .execute()
        )


        return result.data


    except Exception as e:

        print(
            "delete_post_by_id error:",
            e
        )

        return None





def delete_expired_posts():

    try:

        now = datetime.now(
            timezone.utc
        ).isoformat()


        result = (
            sb.table("posts")
            .update(
                {
                    "active": False
                }
            )
            .lt(
                "expires_at",
                now
            )
            .eq(
                "active",
                True
            )
            .execute()
        )


        return result.data


    except Exception as e:

        print(
            "delete_expired_posts error:",
            e
        )

        return None





# =====================================================
# MATCH SYSTEM
# =====================================================


def create_match(
    sender_id: int,
    receiver_id: int
):

    try:

        result = (
            sb.table("matches")
            .insert(
                {
                    "sender_id": sender_id,

                    "receiver_id": receiver_id,

                    "status": "pending",

                    "created_at":
                    datetime.now(
                        timezone.utc
                    ).isoformat()
                }
            )
            .execute()
        )


        return result.data


    except Exception as e:

        print(
            "create_match error:",
            e
        )

        return None





def get_match(
    sender_id: int,
    receiver_id: int
):

    try:

        result = (
            sb.table("matches")
            .select("*")
            .or_(
                f"and(sender_id.eq.{sender_id},receiver_id.eq.{receiver_id}),"
                f"and(sender_id.eq.{receiver_id},receiver_id.eq.{sender_id})"
            )
            .execute()
        )


        return result.data


    except Exception as e:

        print(
            "get_match error:",
            e
        )

        return []





def update_match(
    sender_id: int,
    receiver_id: int,
    status: str
):

    try:

        result = (
            sb.table("matches")
            .update(
                {
                    "status": status
                }
            )
            .or_(
                f"and(sender_id.eq.{sender_id},receiver_id.eq.{receiver_id}),"
                f"and(sender_id.eq.{receiver_id},receiver_id.eq.{sender_id})"
            )
            .execute()
        )


        return result.data


    except Exception as e:

        print(
            "update_match error:",
            e
        )

        return None
        
        
        
        
        
def get_user_matches(
    user_id:int
):

    try:

        result = (

            sb.table("matches")
            .select("*")
            .or_(
                f"sender_id.eq.{user_id},receiver_id.eq.{user_id}"
            )
            .order(
                "created_at",
                desc=True
            )
            .execute()

        )


        return result.data


    except Exception as e:

        print(
            "get_user_matches error:",
            e
        )

        return []





# =====================================================
# REPORT SYSTEM
# =====================================================


def create_report(
    reporter_id: int,
    reported_id: int,
    reason: str = "user_report"
):

    try:

        result = (
            sb.table("reports")
            .insert(
                {
                    "reporter_id": reporter_id,

                    "reported_id": reported_id,

                    "reason": reason
                }
            )
            .execute()
        )


        return result.data


    except Exception as e:

        print(
            "create_report error:",
            e
        )

        return None





def has_reported(
    reporter_id: int,
    reported_id: int
):

    try:

        result = (
            sb.table("reports")
            .select("id")
            .eq(
                "reporter_id",
                reporter_id
            )
            .eq(
                "reported_id",
                reported_id
            )
            .execute()
        )


        return bool(
            result.data
        )


    except Exception as e:

        print(
            "has_reported error:",
            e
        )

        return False

# =====================================================
# BAN SYSTEM
# =====================================================


def is_banned(
    user_id:int
):

    try:

        result = (

            sb.table("banned_users")
            .select("id")
            .eq(
                "user_id",
                user_id
            )
            .execute()

        )


        return bool(
            result.data
        )


    except Exception as e:

        print(
            "is_banned error:",
            e
        )

        return False





def ban_user(
    user_id:int,
    reason:str="admin_ban"
):

    try:

        result = (

            sb.table("banned_users")
            .insert(

                {

                "user_id": user_id,

                "reason": reason

                }

            )
            .execute()

        )


        return result.data


    except Exception as e:

        print(
            "ban_user error:",
            e
        )

        return None





def get_reports():


    try:

        result = (

            sb.table("reports")
            .select("*")
            .order(
                "id",
                desc=True
            )
            .execute()

        )


        return result.data


    except Exception as e:

        print(
            "get_reports error:",
            e
        )

        return []

# =====================================================
# UNBAN SYSTEM
# =====================================================


def unban_user(
    user_id:int
):

    try:

        result = (

            sb.table("banned_users")
            .delete()
            .eq(
                "user_id",
                user_id
            )
            .execute()

        )


        return result.data


    except Exception as e:

        print(
            "unban_user error:",
            e
        )

        return None

# =====================================================
# PROFILE VIEWS
# =====================================================


def add_profile_view(
    viewer_id:int,
    post_id:int
):

    try:

        result = (

            sb.table("profile_views")
            .insert(
                {
                    "viewer_id": viewer_id,

                    "viewed_post_id": post_id

                }
            )
            .execute()

        )


        return result.data


    except Exception as e:

        print(
            "add_profile_view error:",
            e
        )

        return None





def get_viewed_posts(
    viewer_id:int
):

    try:

        result = (

            sb.table("profile_views")
            .select(
                "viewed_post_id"
            )
            .eq(
                "viewer_id",
                viewer_id
            )
            .execute()

        )


        return [

            x["viewed_post_id"]

            for x in result.data

        ]


    except Exception as e:

        print(
            "get_viewed_posts error:",
            e
        )

        return []

# =====================================================
# PROFILE VIEWS
# =====================================================


def create_profile_view(
    viewer_id: int,
    owner_id: int,
    post_id: int
):

    try:

        result = (

            sb.table("profile_views")

            .insert(
                {
                    "viewer_id": viewer_id,

                    "owner_id": owner_id,

                    "post_id": post_id

                }
            )

            .execute()

        )


        return result.data


    except Exception as e:

        print(
            "create_profile_view error:",
            e
        )

        return None




def get_profile_views_count(
    user_id: int
):

    try:

        result = (

            sb.table("profile_views")

            .select(
                "id",
                count="exact"
            )

            .eq(
                "owner_id",
                user_id
            )

            .execute()

        )


        return result.count or 0


    except Exception as e:

        print(
            "get_profile_views_count error:",
            e
        )

        return 0

# =====================================================
# PROFILE VIEWS COUNT
# =====================================================


def get_profile_views_count(
    user_id: int
):

    try:

        result = (

            sb.table("profile_views")

            .select(
                "id",
                count="exact"
            )

            .eq(
                "owner_id",
                user_id
            )

            .execute()

        )


        return result.count or 0



    except Exception as e:


        print(

            "get_profile_views_count error:",

            e

        )


        return 0

# =====================================================
# MATCH STATISTICS
# =====================================================


def get_match_stats(
    user_id: int
):

    try:

        result = (

            sb.table("matches")

            .select("*")

            .or_(
                f"sender_id.eq.{user_id},receiver_id.eq.{user_id}"
            )

            .execute()

        )


        matches = result.data or []


        total = len(matches)


        accepted = 0

        rejected = 0



        for match in matches:

            if match.get("status") == "accepted":

                accepted += 1


            elif match.get("status") == "rejected":

                rejected += 1



        return {

            "total": total,

            "accepted": accepted,

            "rejected": rejected

        }



    except Exception as e:


        print(

            "get_match_stats error:",

            e

        )


        return {

            "total": 0,

            "accepted": 0,

            "rejected": 0

        }

# =====================================================
# USER SETTINGS
# =====================================================


def create_default_settings(
    user_id: int
):

    try:

        result = (

            sb.table("user_settings")

            .upsert(
                {
                    "user_id": user_id,

                    "radius_km": 10,

                    "age_min": 18,

                    "age_max": 100
                }
            )

            .execute()

        )


        return result.data


    except Exception as e:

        print(
            "create_default_settings error:",
            e
        )

        return None




def get_user_settings(
    user_id: int
):

    try:

        result = (

            sb.table("user_settings")

            .select("*")

            .eq(
                "user_id",
                user_id
            )

            .execute()

        )


        if result.data:

            return result.data[0]


        # если настроек нет — создаём

        create_default_settings(
            user_id
        )


        return get_user_settings(
            user_id
        )


    except Exception as e:

        print(
            "get_user_settings error:",
            e
        )

        return {

            "radius_km": 10,

            "age_min": 18,

            "age_max": 100

        }





def update_radius(
    user_id: int,
    radius_km: int
):

    try:

        result = (

            sb.table("user_settings")

            .update(
                {
                    "radius_km": radius_km
                }
            )

            .eq(
                "user_id",
                user_id
            )

            .execute()

        )


        return result.data


    except Exception as e:

        print(
            "update_radius error:",
            e
        )

        return None





def update_age_filter(
    user_id: int,
    age_min: int,
    age_max: int
):

    try:

        result = (

            sb.table("user_settings")

            .update(
                {
                    "age_min": age_min,

                    "age_max": age_max
                }
            )

            .eq(
                "user_id",
                user_id
            )

            .execute()

        )


        return result.data


    except Exception as e:

        print(
            "update_age_filter error:",
            e
        )

        return None

def update_post(
    post_id: int,
    data: dict
):

    try:

        result = (
            sb.table("posts")
            .update(data)
            .eq(
                "id",
                post_id
            )
            .execute()
        )

        return result.data

    except Exception as e:

        print(
            "update_post error:",
            e
        )

        return None