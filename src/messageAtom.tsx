import {atom} from 'recoil';

export const messageAtom = atom<[String,String][]>({
    key:'messageAtom',
    default:[]
})