# =====================================================
# BROWSE STATE
# =====================================================


# какие анкеты пользователь уже видел

seen_posts = {}



# =====================================================
# ADD VIEWED POST
# =====================================================


def add_seen(
    user_id: int,
    post_id: int
):

    if user_id not in seen_posts:

        seen_posts[user_id] = set()


    seen_posts[user_id].add(
        post_id
    )



# =====================================================
# CHECK VIEWED
# =====================================================


def is_seen(
    user_id: int,
    post_id: int
):

    if user_id not in seen_posts:

        return False


    return post_id in seen_posts[user_id]



# =====================================================
# RESET VIEWS
# =====================================================


def reset_seen(
    user_id: int
):

    if user_id in seen_posts:

        del seen_posts[user_id]