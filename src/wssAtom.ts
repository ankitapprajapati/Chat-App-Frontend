import {atom} from 'recoil';

export const wssAtom = atom<WebSocket|undefined>({
    key:'wssAtom',
    default:undefined,
    dangerouslyAllowMutability:true
})