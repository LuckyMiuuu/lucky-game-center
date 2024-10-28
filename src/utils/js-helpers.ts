import { Decimal } from 'decimal.js'

export function isMobile() {
  const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  return mobileRegex.test(userAgent);
}

export function base64Encode(str: string) {
    return btoa(str);
}

export function base64Decode(str: string) {
    return atob(str);
}

export function checkAddress(address:string) {
    const walletRegex = /^[13][a-zA-Z\d]{25,34}$/;
    return walletRegex.test(address);
}

export const toThousands = (num: number | string, isInput: boolean = false) => {
    const numStr = num + '';
    if (!numStr) {
        return '';
    }

    const isMinus = numStr[0] === '-';
    const start = isMinus ? 1 : 0;
    const splitDecimal = numStr.substring(start).split('.');
    let newNum = splitDecimal[0];
    let result = '';
    while (newNum.length > 3) {
        result = `,${newNum.slice(-3)}${result}`;
        newNum = newNum.slice(0, newNum.length - 3);
    }
    if (newNum) {
        result = newNum + result;
    }

    if (isInput) {
        const hasDot = (numStr.indexOf('.') >= 0)
        return `${isMinus ? '-' : ''}${result}${splitDecimal[1] ? `.${splitDecimal[1]}` : `${hasDot ? '.' : ''}`}`;
    } else {
        return `${isMinus ? '-' : ''}${result}${splitDecimal[1]
            ? `.${splitDecimal[1].length === 1 ? `${splitDecimal[1]}0` : splitDecimal[1]}`
            : ''
            }`;
    }
};

export function toThousandsK(num: number, fixed: number = 2){
    if (num < 1000) {
        return num
    }

    return (num / 1000).toFixed(fixed) + 'k'
}

export function secondsToHMS(seconds?: number) {
    if (!seconds) {
        return {
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    }
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds - hours * 3600) / 60)
    const secs = seconds - hours * 3600 - mins * 60
    return {
        hours: hours,
        minutes: mins,
        seconds: secs
    }
}

export function decimalBalance(balance: string) {
    const decimal = new Decimal(balance)
    return decimal.toFixed(2)
}