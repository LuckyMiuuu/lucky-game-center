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
    {
      game_id: 13,
      game_short_name: 'LuckyThrower',
      game_show_name: 'Lucky Thrower',
      game_url: 'https://t.me/myweb3gamebot/LuckyThrower',
      game_img: new URL('@/assets/images/game_thrower.png', import.meta.url).href,
      groups: 0,
      rounds: 0,
    },
    {
      game_id: 14,
      game_short_name: 'LuckyClimber',
      game_show_name: 'Lucky Climber',
      game_url: 'https://t.me/myweb3gamebot/LuckyClimber',
      game_img: new URL('@/assets/images/game_climber.png', import.meta.url).href,
      groups: 0,
      rounds: 0,
    },
    {
      game_id: 15,
      game_short_name: 'LuckyBlast',
      game_show_name: 'Lucky Blast',
      game_url: 'https://t.me/myweb3gamebot/LuckyBlast',
      game_img: new URL('@/assets/images/game_blast.png', import.meta.url).href,
      groups: 0,
      rounds: 0,
    },
    {
      game_id: 16,
      game_short_name: 'LuckyWalk',
      game_show_name: 'Lucky Walk',
      game_url: 'https://t.me/myweb3gamebot/LuckyWalk',
      game_img: new URL('@/assets/images/game_walk.png', import.meta.url).href,
      groups: 0,
      rounds: 0,
    },
    {
      game_id: 17,
      game_short_name: 'LuckyStep',
      game_show_name: 'Lucky Step',
      game_url: 'https://t.me/myweb3gamebot/LuckyStep',
      game_img: new URL('@/assets/images/game_step.png', import.meta.url).href,
      groups: 0,
      rounds: 0,
    },
    {
      game_id: 18,
      game_short_name: 'LuckyFacai',
      game_show_name: 'Lucky Facai',
      game_url: 'https://t.me/myweb3gamebot/LuckyFacai',
      game_img: new URL('@/assets/images/game_facai.png', import.meta.url).href,
      groups: 0,
      rounds: 0,
    },
    {
      game_id: 19,
      game_short_name: 'LuckyCutter',
      game_show_name: 'Lucky Cutter',
      game_url: 'https://t.me/myweb3gamebot/LuckyCutter',
      game_img: new URL('@/assets/images/game_cutter.png', import.meta.url).href,
      groups: 0,
      rounds: 0,
    },
    {
      game_id: 20,
      game_short_name: 'LuckyAngler',
      game_show_name: 'Lucky Angler',
      game_url: 'https://t.me/myweb3gamebot/LuckyAngler',
      game_img: new URL('@/assets/images/game_angler.png', import.meta.url).href,
      groups: 0,
      rounds: 0,
    },
    {
      game_id: 21,
      game_short_name: 'LuckyKisser',
      game_show_name: 'Lucky Kisser',
      game_url: 'https://t.me/myweb3gamebot/LuckyKisser',
      game_img: new URL('@/assets/images/game_kisser.png', import.meta.url).href,
      groups: 0,
      rounds: 0,
    },
    {
      game_id: 22,
      game_short_name: 'LuckyPlumber',
      game_show_name: 'Lucky Plumber',
      game_url: 'https://t.me/myweb3gamebot/LuckyPlumber',
      game_img: new URL('@/assets/images/game_plumber.png', import.meta.url).href,
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
    {
      game_id: 13,
      game_short_name: 'LuckyThrower',
      game_show_name: 'Lucky Thrower',
      game_url: 'https://t.me/LuckyMiuuu_bot/LuckyThrower',
      game_img: new URL('@/assets/images/game_thrower.png', import.meta.url).href,
      groups: 0,
      rounds: 0,
    },
    {
      game_id: 14,
      game_short_name: 'LuckyClimber',
      game_show_name: 'Lucky Climber',
      game_url: 'https://t.me/LuckyMiuuu_bot/LuckyClimber',
      game_img: new URL('@/assets/images/game_climber.png', import.meta.url).href,
      groups: 0,
      rounds: 0,
    },
    {
      game_id: 15,
      game_short_name: 'LuckyBlast',
      game_show_name: 'Lucky Blast',
      game_url: 'https://t.me/LuckyMiuuu_bot/LuckyBlast',
      game_img: new URL('@/assets/images/game_blast.png', import.meta.url).href,
      groups: 0,
      rounds: 0,
    },
    {
      game_id: 16,
      game_short_name: 'LuckyWalk',
      game_show_name: 'Lucky Walk',
      game_url: 'https://t.me/LuckyMiuuu_bot/LuckyWalk',
      game_img: new URL('@/assets/images/game_walk.png', import.meta.url).href,
      groups: 0,
      rounds: 0,
    },
    {
      game_id: 17,
      game_short_name: 'LuckyStep',
      game_show_name: 'Lucky Step',
      game_url: 'https://t.me/LuckyMiuuu_bot/LuckyStep',
      game_img: new URL('@/assets/images/game_step.png', import.meta.url).href,
      groups: 0,
      rounds: 0,
    },
    {
      game_id: 18,
      game_short_name: 'LuckyFacai',
      game_show_name: 'Lucky Facai',
      game_url: 'https://t.me/LuckyMiuuu_bot/LuckyFacai',
      game_img: new URL('@/assets/images/game_facai.png', import.meta.url).href,
      groups: 0,
      rounds: 0,
    },
    {
      game_id: 19,
      game_short_name: 'LuckyCutter',
      game_show_name: 'Lucky Cutter',
      game_url: 'https://t.me/LuckyMiuuu_bot/LuckyCutter',
      game_img: new URL('@/assets/images/game_cutter.png', import.meta.url).href,
      groups: 0,
      rounds: 0,
    },
    {
      game_id: 20,
      game_short_name: 'LuckyAngler',
      game_show_name: 'Lucky Angler',
      game_url: 'https://t.me/LuckyMiuuu_bot/LuckyAngler',
      game_img: new URL('@/assets/images/game_angler.png', import.meta.url).href,
      groups: 0,
      rounds: 0,
    },
    {
      game_id: 21,
      game_short_name: 'LuckyKisser',
      game_show_name: 'Lucky Kisser',
      game_url: 'https://t.me/LuckyMiuuu_bot/LuckyKisser',
      game_img: new URL('@/assets/images/game_kisser.png', import.meta.url).href,
      groups: 0,
      rounds: 0,
    },
    {
      game_id: 22,
      game_short_name: 'LuckyPlumber',
      game_show_name: 'Lucky Plumber',
      game_url: 'https://t.me/LuckyMiuuu_bot/LuckyPlumber',
      game_img: new URL('@/assets/images/game_plumber.png', import.meta.url).href,
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