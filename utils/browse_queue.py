# =====================================================
# BROWSE QUEUE
# =====================================================


queues = {}



def set_queue(
    user_id: int,
    posts: list
):

    queues[user_id] = posts



def get_next(
    user_id: int
):

    if user_id not in queues:

        return None


    if not queues[user_id]:

        return None


    return queues[user_id].pop(0)



def clear_queue(
    user_id:int
):

    if user_id in queues:

        del queues[user_id]