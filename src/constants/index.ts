import { randomNumberBetween } from '@/utils/general'

export const SHARE_TEXT = `Find the wildest TON PVP game with Lucky Miuuu! 😼

Hilarious mini-games that’ll have you in stitches! 😂

24-hour non-stop USDT & Points giveaway! Maybe the next big meme, or nothing.💸💰

Join the battle and win prizes! `

export const TOKEN_NAME = 'MIUUU'

export const GAME_TEST_LIST = [
    {
        game_id: 1,
        game_short_name: 'LuckyTrump',
        game_show_name: 'Lucky Trump',
        game_url: 'https://t.me/myweb3gamebot/LuckyTrump',
        game_img: new URL('@/assets/images/game_trump.png', import.meta.url).href,
        groups: 0,
        rounds: 0,
    },
    {
        game_id: 2,
        game_short_name: 'LuckyJump',
        game_show_name: 'Lucky Jump',
        game_url: 'https://t.me/myweb3gamebot/LuckyJump',
        game_img: new URL('@/assets/images/game_jump.png', import.meta.url).href,
        groups: 0,
        rounds: 0,
    },
    {
        game_id: 3,
        game_short_name: 'LuckyPile',
        game_show_name: 'Lucky Pile',
        game_url: 'https://t.me/myweb3gamebot/LuckyPile',
        game_img: new URL('@/assets/images/game_pile.png', import.meta.url).href,
        groups: 0,
        rounds: 0,
    },
    {
        game_id: 4,
        game_short_name: 'LuckyEater',
        game_show_name: 'Lucky Eater',
        game_url: 'https://t.me/myweb3gamebot/LuckyEater',
        game_img: new URL('@/assets/images/game_eater.png', import.meta.url).href,
        groups: 0,
        rounds: 0,
    },
    {
        game_id: 5,
        game_short_name: 'LuckyCombine',
        game_show_name: 'Lucky Combine',
        game_url: 'https://t.me/myweb3gamebot/LuckyCombine',
        game_img: new URL('@/assets/images/game_combine.png', import.meta.url).href,
        groups: 0,
        rounds: 0,
    },
    {
        game_id: 6,
        game_short_name: 'LuckyShooter',
        game_show_name: 'Lucky Shooter',
        game_url: 'https://t.me/myweb3gamebot/LuckyShooter',
        game_img: new URL('@/assets/images/game_shooter.png', import.meta.url).href,
        groups: 0,
        rounds: 0,
    },
    {
        game_id: 7,
        game_short_name: 'LuckyStacker',
        game_show_name: 'Lucky Stacker',
        game_url: 'https://t.me/myweb3gamebot/LuckyStacker',
        game_img: new URL('@/assets/images/game_stacker.png', import.meta.url).href,
        groups: 0,
        rounds: 0,
    },
    {
        game_id: 8,
        game_short_name: 'LuckyTap',
        game_show_name: 'Lucky Tap',
        game_url: 'https://t.me/myweb3gamebot/LuckyTap',
        game_img: new URL('@/assets/images/game_tap.png', import.meta.url).href,
        groups: 0,
        rounds: 0,
    },
    {
        game_id: 9,
        game_short_name: 'LuckyRunner',
        game_show_name: 'Lucky Runner',
        game_url: 'https://t.me/myweb3gamebot/LuckyRunner',
        game_img: new URL('@/assets/images/game_runner.png', import.meta.url).href,
        groups: 0,
        rounds: 0,
    },
    {
        game_id: 10,
        game_short_name: 'LuckySlide',
        game_show_name: 'Lucky Slide',
        game_url: 'https://t.me/myweb3gamebot/LuckySlide',
        game_img: new URL('@/assets/images/game_slide.png', import.meta.url).href,
        groups: 0,
        rounds: 0,
    },
    {
        game_id: 11,
        game_short_name: 'LuckyPacman',
        game_show_name: 'Lucky Pacman',
        game_url: 'https://t.me/myweb3gamebot/LuckyPacman',
        game_img: new URL('@/assets/images/game_pacman.png', import.meta.url).href,
        groups: 0,
        rounds: 0,
    },
    {
      game_id: 12,
      game_short_name: 'LuckyCrosser',
      game_show_name: 'Lucky Crosser',
      game_url: 'https://t.me/myweb3gamebot/LuckyCrosser',
      game_img: new URL('@/assets/images/game_crosser.png', import.meta.url).href,
      groups: 0,
      rounds: 0,
    },
]
export const GAME_PROD_LIST = [
    {
        game_id: 1,
        game_short_name: 'LuckyTrump',
        game_show_name: 'Lucky Trump',
        game_url: 'https://t.me/LuckyMiuuu_bot/LuckyTrump',
        game_img: new URL('@/assets/images/game_trump.png', import.meta.url).href,
        groups: 0,
        rounds: 0,
    },
    {
        game_id: 2,
        game_short_name: 'LuckyJump',
        game_show_name: 'Lucky Jump',
        game_url: 'https://t.me/LuckyMiuuu_bot/LuckyJump',
        game_img: new URL('@/assets/images/game_jump.png', import.meta.url).href,
        groups: 0,
        rounds: 0,
    },
    {
        game_id: 3,
        game_short_name: 'LuckyPile',
        game_show_name: 'Lucky Pile',
        game_url: 'https://t.me/LuckyMiuuu_bot/LuckyPile',
        game_img: new URL('@/assets/images/game_pile.png', import.meta.url).href,
        groups: 0,
        rounds: 0,
    },
    {
        game_id: 4,
        game_short_name: 'LuckyEater',
        game_show_name: 'Lucky Eater',
        game_url: 'https://t.me/LuckyMiuuu_bot/LuckyEater',
        game_img: new URL('@/assets/images/game_eater.png', import.meta.url).href,
        groups: 0,
        rounds: 0,
    },
    {
        game_id: 5,
        game_short_name: 'LuckyCombine',
        game_show_name: 'Lucky Combine',
        game_url: 'https://t.me/LuckyMiuuu_bot/LuckyCombine',
        game_img: new URL('@/assets/images/game_combine.png', import.meta.url).href,
        groups: 0,
        rounds: 0,
    },
    {
        game_id: 6,
        game_short_name: 'LuckyShooter',
        game_show_name: 'Lucky Shooter',
        game_url: 'https://t.me/LuckyMiuuu_bot/LuckyShooter',
        game_img: new URL('@/assets/images/game_shooter.png', import.meta.url).href,
        groups: 0,
        rounds: 0,
    },
    {
        game_id: 7,
        game_short_name: 'LuckyStacker',
        game_show_name: 'Lucky Stacker',
        game_url: 'https://t.me/LuckyMiuuu_bot/LuckyStacker',
        game_img: new URL('@/assets/images/game_stacker.png', import.meta.url).href,
        groups: 0,
        rounds: 0,
    },
    {
        game_id: 8,
        game_short_name: 'LuckyTap',
        game_show_name: 'Lucky Tap',
        game_url: 'https://t.me/LuckyMiuuu_bot/LuckyTap',
        game_img: new URL('@/assets/images/game_tap.png', import.meta.url).href,
        groups: 0,
        rounds: 0,
    },
    {
        game_id: 9,
        game_short_name: 'LuckyRunner',
        game_show_name: 'Lucky Runner',
        game_url: 'https://t.me/LuckyMiuuu_bot/LuckyRunner',
        game_img: new URL('@/assets/images/game_runner.png', import.meta.url).href,
        groups: 0,
        rounds: 0,
    },
    {
        game_id: 10,
        game_short_name: 'LuckySlide',
        game_show_name: 'Lucky Slide',
        game_url: 'https://t.me/LuckyMiuuu_bot/LuckySlide',
        game_img: new URL('@/assets/images/game_slide.png', import.meta.url).href,
        groups: 0,
        rounds: 0,
    },
    {
        game_id: 11,
        game_short_name: 'LuckyPacman',
        game_show_name: 'Lucky Pacman',
        game_url: 'https://t.me/LuckyMiuuu_bot/LuckyPacman',
        game_img: new URL('@/assets/images/game_pacman.png', import.meta.url).href,
        groups: 0,
        rounds: 0,
    },
    {
      game_id: 12,
      game_short_name: 'LuckyCrosser',
      game_show_name: 'Lucky Crosser',
      game_url: 'https://t.me/LuckyMiuuu_bot/LuckyCrosser',
      game_img: new URL('@/assets/images/game_crosser.png', import.meta.url).href,
      groups: 0,
      rounds: 0,
    },
]

export const INVITE_FRIEND_TO_BOOST_TEXT = `🐱Play Lucky Miuuu game and earn up to 💰100 USDT!

🧑‍🤝‍🧑Invite more friends, earn more USDT!

🎁Plus, you can get $Miuuu token points while you play!

🎆Join Lucky Miuuu Community for exclusive airdrops!`

export function getInviteFriendToBootGameLink() {
    let gameList = []
    if (import.meta.env.VITE_NODE_ENV == 'prod') {
        gameList = GAME_PROD_LIST
    } else {
        gameList = GAME_TEST_LIST
    }

    const index = randomNumberBetween(0, gameList.length - 1)
    return gameList[index].game_url
}

export function onInviteFriendToBoost(inviteLink: string) {
    let shareUrl = 'https://t.me/share/url'
    shareUrl += `?url=${encodeURIComponent(inviteLink)}`;
    shareUrl += `&text=${encodeURIComponent(INVITE_FRIEND_TO_BOOST_TEXT)}`;
    window.open(shareUrl, '_blank');
}