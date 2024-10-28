export interface UrlParams{
    from_chat_id: string;
    from_room_id: string;
    from_group_mode: boolean;
    from_tg_user_id: number;
}

export interface GroupInfo {
    tg_group_id: string,
    tg_group_name: string,
    members_count: number,
    rounds: number,
    rewards: number,
    status: string,
}

export interface GameInfo {
    game_id: number;
    game_short_name: string;
    game_desc?: string;
    game_url: string;
    game_show_name: string;
    game_img: string;
    groups?: number;
    rounds?: number;
}

export interface UserProp{
    id: number;
    name: string;
    img?: string;
    price: number;
    desc?: string;
    valid_days?: number;
    type: number;
    btn_name?: string;
    jump_url?: string;
    // 前端使用字段
    has: boolean;
    expire_text?: string;
    valid_time?: string;
}

export interface UserTokenInfo {
    coin_name: string,
    icon?: string,
    balance: string,
    balance_usd?: string,
    income: string,
    outcome: string,
    memo?: string,
    history?: Array<UserTokenHistory>,
}

export interface UserTokenHistory {
    cost?: number;
    cost_type?: string;
    chat_id?: string;
    game_short_name?: string;
    create_time?: string;

    amount?: string;
    change_type?: string;
    detail?: string;
}