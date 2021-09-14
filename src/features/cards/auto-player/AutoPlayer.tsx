import { useEffect } from "react";

export const AutoPlayer: React.FC<{isAutoPlayer: boolean, autoPlayerCallBack:()=>void}> = (props) => {
    useEffect(()=> {
        if(props.isAutoPlayer) {
            props.autoPlayerCallBack();
        }
    },[props.isAutoPlayer])

    return(<><div data-testid="auto-player-testid" className='player-container'><h2>Computer</h2></div></>)

}