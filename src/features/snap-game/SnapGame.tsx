import _ from "lodash";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { USER_PLAYER, AUTO_PLAYER } from "../../shared/appConfig";
import { Cards } from "../cards/Cards"

// TODO: Move to context provider
export const snapGameContext = React.createContext({
    snapWaitTime: 0,
    nextPlayerToStart:'',
    resetDeck: false, 
    onRestartCB: () => {}
})

export const SnapGame:React.FC = () => {
    //TODO: Create useReducer to manage multiple states
    const [snapWaitTime, setsnapWaitTime] = useState(0);
    const [nextPlayerToStart, setNextPlayerToStart] = useState('');
    const [resetDeck, setResetDeck] = useState(false);

    const onSnapWaitTimeChange = (event: React.FormEvent<HTMLInputElement>)  => {
        setResetDeck(false);
        setsnapWaitTime(Number(event.currentTarget.value));
    }
    useEffect(() => {
        onRestartGameHandler();
    },[])
    const onRestartGameHandler =() => {
        setResetDeck(true);
        setNextPlayerToStart( _.shuffle([USER_PLAYER, AUTO_PLAYER])[0])
        
    }

    const onRestartCB = () => {
        onRestartGameHandler();
    }
    return(<div>
        <snapGameContext.Provider value={{snapWaitTime, nextPlayerToStart, resetDeck, onRestartCB }}>
        <Cards/>
        </snapGameContext.Provider>
        <div className="config-time">
            <label htmlFor="configTime">Adjust wait time</label>
            <input
              onChange={onSnapWaitTimeChange}
              value={snapWaitTime}
              type="range"
              id="reactionTimeInput"
              name="configTime"
              min="1" max="5" />
          </div>
          <button 
            name="reStartButton"
            className="btn restart-btn"
            type="button"
            onClick={onRestartGameHandler}
          >
            Restart
          </button>

    </div>)
}