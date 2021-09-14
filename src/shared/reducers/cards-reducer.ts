import { ICard, ICardState } from "../../models/cards.model";
import { AUTO_PLAYER,  INITIAL_DEAL_CARD,  INITIAL_SELECTED_CARD,  USER_PLAYER } from "../appConfig";



const updateDeck = (cardsInDeck: ICard[], gameStatus?:string, centerPileCards?:ICard[]) => {
    if(cardsInDeck && cardsInDeck.length>0) {        
        if(gameStatus && centerPileCards) {
           
            return cardsInDeck.push(...centerPileCards)
        }
        return [...cardsInDeck,cardsInDeck.shift()]
    }
    
    return INITIAL_SELECTED_CARD
}

export const INITIAL_CARD_STATE: ICardState= {
    autoPlayerDeck: INITIAL_DEAL_CARD,
    userPlayerDeck: INITIAL_DEAL_CARD,
    centerPileCards:INITIAL_DEAL_CARD
}

/* TODO: Create interface and typecheck. Move static vals to const */

export const cardCollectionsReducer = (state: any, action: any): ICardState => {
    if(action.type === 'default') {
        return {
            ...state,
            autoPlayerDeck: action.autoPlayerDeck,
            userPlayerDeck: action.userPlayerDeck
        }
    } else if (action.type === AUTO_PLAYER) {
        return {
            ...state,
            autoPlayerDeck: updateDeck(action.cardsInAutoDeck),
            centerPileCards: [...state.centerPileCards, action.selectedCard]
        }
    } else if (action.type === USER_PLAYER) {
        return {
            ...state,
            userPlayerDeck: updateDeck(action.cardsInUserDeck),
            centerPileCards: [...state.centerPileCards,action.selectedCard]
        }
    } else if ( action.type === 'snapTime' && action.winner === USER_PLAYER) {
        return {
            ...state,
            userPlayerDeck: updateDeck(action.cardsInUserDeck, 'snapTime', state.centerPileCards),
        }
    } else if ( action.type === 'snapTime' && action.winner === AUTO_PLAYER) {
        return {
            ...state,
            autoPlayerDeck: updateDeck(action.cardsInAutoDeck, 'snapTime', state.centerPileCards),
        }
    } else {
        return {...INITIAL_CARD_STATE}
    }
}