import { CARD_FORMAT } from "../shared/appConfig";

export interface ICard {
    cardFormat: string,
    cardRank: string | number,
  }
  
  export interface IDealtCards {
    userPlayerCards: ICard[],
    autoPlayerCards: ICard[],
  }
  
  export interface ICardState {
    autoPlayerDeck: ICard[],
    userPlayerDeck: ICard[],
    centerPileCards:ICard[]
  }