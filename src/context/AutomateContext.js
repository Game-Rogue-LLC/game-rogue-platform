import { createContext, useEffect, useState, useContext } from 'react';
import {
    AcUnit,
    AccessAlarm,
    AccountBalance,
    Adb,
    Agriculture,
    AirplanemodeActive,
    Anchor,
    Android,
    Apple,
    AssistantPhoto,
    Attractions,
    AutoAwesome,
    BabyChangingStation,
    Badge,
    Balance,
    Bathtub,
    Bedtime,
    BikeScooter,
    Bloodtype,
    Bookmarks,
    Brightness7,
    Brush,
    BubbleChart,
    Camera,
    Cast,
    Casino,
    ChildCare,
    CleanHands,
    Face3,
    Favorite,
    Fireplace,
    FireTruck
} from '@mui/icons-material'

const initialState = {
    loading: true,
    user: null,
};

const logos = [
    <AcUnit></AcUnit>,
    <AccessAlarm></AccessAlarm>,
    <AccountBalance></AccountBalance>,
    <Adb></Adb>,
    <Agriculture></Agriculture>,
    <AirplanemodeActive></AirplanemodeActive>,
    <Anchor></Anchor>,
    <Android></Android>,
    <Apple></Apple>,
    <AssistantPhoto></AssistantPhoto>,
    <Attractions></Attractions>,
    <AutoAwesome></AutoAwesome>,
    <BabyChangingStation></BabyChangingStation>,
    <Badge></Badge>,
    <Balance></Balance>,
    <Bathtub></Bathtub>,
    <Bedtime></Bedtime>,
    <BikeScooter></BikeScooter>,
    <Bloodtype></Bloodtype>,
    <Bookmarks></Bookmarks>,
    <Brightness7></Brightness7>,
    <Brush></Brush>,
    <BubbleChart></BubbleChart>,
    <Camera></Camera>,
    <Cast></Cast>,
    <Casino></Casino>,
    <ChildCare></ChildCare>,
    <CleanHands></CleanHands>,
    <Face3></Face3>,
    <Favorite></Favorite>,
    <Fireplace></Fireplace>,
    <FireTruck></FireTruck>
]

export const AutomateContext = createContext(initialState);

export const useAutomateContext = () => useContext(AutomateContext);

export const AutomateProvider = ({ children }) => {
    const [teams, setTeams] = useState([])
    const [rounds, setRounds] = useState([])
    const [matches, setMatches] = useState([])

    const getRandomArray = (n) => {
        const arr = [];
        for (let i = 0; i < n; i++) {
            arr.push({
                id: i,
                icon: logos[i],
                score: 0
            });
        }
        for (let i = 0; i < n; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    const autoArrangeTeams = (n) => {
        const arr = getRandomArray(n)
        const temp = []
        setTeams([...arr])
        for (let i = 0; i < 8; i++) {
            for (let j = i * 4; j < i * 4 + 3; j++) {
                for (let k = j + 1; k < i * 4 + 4; k++) {
                    temp.push({
                        round: 0,
                        team1: arr[j].id,
                        team2: arr[k].id,
                        result: null
                    })
                }
            }
        }
        setMatches(temp)
    }

    return (
        <AutomateContext.Provider value={{ teams, setTeams, rounds, setRounds, autoArrangeTeams, getRandomArray, matches, setMatches }}>
            {children}
        </AutomateContext.Provider>
    )
}