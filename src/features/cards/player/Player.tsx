import './player.scss';

export const Player: React.FC<{onCardClick: ()=>void, isAutoPlayer: boolean,  displayText: string, callSnapObj: {isCheckMatchCard:boolean, playerType: string}}> = (props) => {

    const onPlayerClick = () => {
        return props.onCardClick();
    }



    return(<><div data-testid="player-testid" className='player-container' onClick={() =>onPlayerClick()}><h2>{props.displayText}</h2></div></>)

}