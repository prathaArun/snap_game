import _ from "lodash"
import { ICard, IDealtCards } from "../../models/cards.model"
import { SUIT_LENGTH, CARD_RANK,  TOTAL_CARDS_PER_PLAYER, STANDARD_DECK_SIZE, CARD_FORMAT_COLLECTIONS } from "../appConfig";

export const useCards = ():{
    getInitialDeck:() => void,
    getDealCards:() => IDealtCards
} => {
const getInitialDeck = (): ICard[] => {
     const collection: ICard[] = [];
    // const collections = [...prepareDeck(CARD_FORMAT.CLOVERS), ...prepareDeck(CARD_FORMAT.PIKES), ...prepareDeck(CARD_FORMAT.TILES), ...prepareDeck(CARD_FORMAT.hearts)]
    const [collections] = Object.keys(CARD_FORMAT_COLLECTIONS).map((name, val) => {
        for(let i = 0 ; i<SUIT_LENGTH; i++) {
        collection.push({ cardRank: CARD_RANK[i] , cardFormat: name });
    }
    return collection;
    })
     return [...collections];
}


const getDealCards = (): IDealtCards =>  { 
    const InitialDeck:ICard[] = getInitialDeck(); 
    const shuffleCards = _.shuffle(InitialDeck);  
    return {
      userPlayerCards: shuffleCards.slice(0, TOTAL_CARDS_PER_PLAYER),
      autoPlayerCards: shuffleCards.slice(26, STANDARD_DECK_SIZE),
    };  
  }

return {getInitialDeck, getDealCards}
}
