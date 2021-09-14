import { ICard } from "../models/cards.model";

export const AUTO_PLAYER = 'Auto Player';
export const USER_PLAYER = 'Player';
export const STANDARD_DECK_SIZE = 52;
export const SUIT_LENGTH = 13;
export const TOTAL_CARDS_PER_PLAYER = STANDARD_DECK_SIZE / 2;
export const CARD_RANK = ['A', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
export const AUTO_SNAP_WAIT_TIME = 1000;
export const AUTO_PLAY_WAIT_TIME = 1000;


export const CARD_FORMAT  = ['hearts', 'pikes','clovers','tiles']

export const CARD_FORMAT_COLLECTIONS  = {hearts:'HEARTS', pikes: 'PIKES',clovers:'CLOVERS',tiles:'TILES'}

export const INITIAL_DEAL_CARD: ICard[] = [{
    cardFormat:'',
    cardRank: '',
}]

export const INITIAL_SELECTED_CARD: ICard  = {
    cardFormat: "",
    cardRank: "",
  }