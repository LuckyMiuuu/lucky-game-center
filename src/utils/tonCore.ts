
import { Address } from '@ton/core';

export function toUserFriendlyAddress(originAddress: string) {
    if (!originAddress) {
        return ''
    }
    return Address.parse(originAddress).toString({
        urlSafe: true,
        bounceable: false,
        testOnly: false,
    });
}