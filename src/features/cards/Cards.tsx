import { useReducer, useContext } from "react";
import { useEffect } from "react";
import {
  AUTO_PLAYER,
  CARD_FORMAT,
  INITIAL_DEAL_CARD,
  USER_PLAYER,
  AUTO_PLAY_WAIT_TIME,
  INITIAL_SELECTED_CARD,
} from "../../shared/appConfig";
import { Player } from "./player/Player";
import classes from "./Cards.module.scss";
import clubImg from "../../assets/img/club.png";
import heartImg from "../../assets/img/heart.png";
import diamondImg from "../../assets/img/diamond.png";
import spadeImg from "../../assets/img/spade.png";
import { ICard, IDealtCards } from "../../models/cards.model";
import { useState } from "react";
import { snapGameContext } from "../snap-game/SnapGame";
import { AutoPlayer } from "./auto-player/AutoPlayer";
import {
  cardCollectionsReducer,
  INITIAL_CARD_STATE,
} from "../../shared/reducers/cards-reducer";
import { useCards } from "../../shared/custom-hooks/useCards";

export const Cards: React.FC = (props) => {
  const { getDealCards } = useCards();
  const [isAutoPlayer, setIsAutoPlayer] = useState(false);
  const [callSnap, setCallSnap] = useState({
    isCheckMatchCard: false,
    playerType: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const snapGameContextObj = useContext(snapGameContext);
  const [dealAutoCards, setAutoDealCards] =
    useState<ICard[]>(INITIAL_DEAL_CARD);
  const [dealUserCards, setUserDealCards] =
    useState<ICard[]>(INITIAL_DEAL_CARD);

  const [cardState, dispatchCard] = useReducer(
    cardCollectionsReducer,
    INITIAL_CARD_STATE
  );
  const cards: IDealtCards = getDealCards();

  const [autoPlayer, setAutoPlayer] = useState<ICard>(INITIAL_SELECTED_CARD);
  const [userPlayer, setUserPlayer] = useState<ICard>(INITIAL_SELECTED_CARD);
  const [opencardStack, setOpencardStack] = useState<ICard>(
    INITIAL_SELECTED_CARD
  );

  useEffect(() => {
    if (snapGameContextObj.resetDeck) {
      setOpencardStack(INITIAL_SELECTED_CARD);
      dispatchCard({
        type: "default",
        autoPlayerDeck: cards.autoPlayerCards,
        userPlayerDeck: cards.userPlayerCards,
      });
    }
  }, [snapGameContextObj]);

  useEffect(() => {
    dispatchCard({
      type: "default",
      autoPlayerDeck: cards.autoPlayerCards,
      userPlayerDeck: cards.userPlayerCards,
    });
  }, []);

  useEffect(() => {
    setAutoDealCards(cardState.autoPlayerDeck);
    setUserDealCards(cardState.userPlayerDeck);
  }, [cardState]);

  /* TODO: Can move to custom hook and reuse it */
  const onPlayerClickHandler = () => {
    setOpencardStack(dealUserCards[0]);
    setUserPlayer(dealUserCards[0]);
    dispatchCard({
      type: USER_PLAYER,
      selectedCard: opencardStack,
      cardsInUserDeck: dealUserCards,
      userSelectedCard: dealUserCards,
    });
    checkMatchCards(USER_PLAYER);
    setIsAutoPlayer(true);
  };

  const onHandlerAutoPlayerMove = () => {
    if (dealAutoCards && dealAutoCards.length === 0) {
      snapGameContextObj.onRestartCB();
    } else {
      setTimeout(() => {
        setOpencardStack(dealAutoCards[0]);
        dispatchCard({
          type: AUTO_PLAYER,
          selectedCard: opencardStack,
          cardsInAutoDeck: dealAutoCards,
          centerPileCards: cardState.centerPileCards,
          userSelectedCard: dealAutoCards,
        });
        setAutoPlayer(dealAutoCards[0]);
        checkMatchCards(AUTO_PLAYER);
        setIsAutoPlayer(false);
      }, snapGameContextObj.snapWaitTime * AUTO_PLAY_WAIT_TIME);
    }
  };

  const checkMatchCards = (playerType: string) => {
    const str = "Snap call:";
    if (
      userPlayer?.cardRank &&
      autoPlayer?.cardRank &&
      userPlayer.cardRank === autoPlayer.cardRank
    ) {
      setSuccessMsg(`${str + playerType}`);
      setCallSnap({ isCheckMatchCard: true, playerType: playerType });
      dispatchCard({
        type: "snapTime",
        winner: playerType,
        cardsInUserDeck: dealUserCards,
        cardsInAutoDeck: dealAutoCards,
        centerPileCards: cardState.centerPileCards,
      });
      setOpencardStack(INITIAL_SELECTED_CARD);
    }
  };
  const getDynamicImg = (format: string) => {
    switch (format) {
      case CARD_FORMAT[0]:
        return heartImg;
      case CARD_FORMAT[1]:
        return spadeImg;
      case CARD_FORMAT[2]:
        return clubImg;
      case CARD_FORMAT[3]:
        return diamondImg;
      default:
        return "";
    }
  };

  return (
    <>
      <div className={classes["card-container"]}>
        <div
          aria-disabled={successMsg ? true : false}
          className={`${classes["card-container__auto-player-container"]} ${classes["card-container__col"]}`}
        >
          {isAutoPlayer && <i className="fas fa-user"></i>}
          <AutoPlayer
            isAutoPlayer={isAutoPlayer}
            autoPlayerCallBack={onHandlerAutoPlayerMove}
          />
        </div>
        <div
          className={`${classes["card-container__open-card-stack-container"]} ${classes["card-container__col"]}`}
        >
          {opencardStack &&
            CARD_FORMAT.map((index) => {
              return (
                <div
                  className={`${classes["card-container__open-card-stack-container__card-side-display"]}`}
                >
                  <p>{opencardStack.cardRank}</p>
                  <div
                    className={`${classes["card-container__open-card-stack-container__card-side-display__img"]}`}
                  >
                    {opencardStack.cardFormat && (
                      <img
                        src={getDynamicImg(opencardStack.cardFormat)}
                        alt={`${opencardStack.cardFormat}`}
                      />
                    )}
                  </div>
                </div>
              );
            })}
        </div>
        <div
          className={`${classes["card-container__user-player-container"]} ${classes["card-container__col"]}`}
        >
          {!isAutoPlayer && <i className="fas fa-user"></i>}
          <Player
            isAutoPlayer={isAutoPlayer}
            displayText={"User"}
            callSnapObj={callSnap}
            onCardClick={onPlayerClickHandler}
          />
        </div>
      </div>
      {successMsg && <div> {successMsg}</div>}
    </>
  );
};
