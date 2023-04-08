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
import { nanoid } from 'nanoid'

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
    const [teams, setActualTeams] = useState([])
    const [round, setActualRound] = useState(0)
    const [scores, setActualScores] = useState({})
    const [matches, setActualMatches] = useState([])

    const getRandomArray = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    const autoArrangeTeams = async (n, r) => {
        const arr = [];
        for (let i = 0; i < n; i++) {
            arr.push({
                id: i,
                icon: logos[i],
                score: 0,
                status: 0
            });
        }
        const team = getRandomArray(arr)
        const match = []
        for (let i = 0; i < 8; i++) {
            for (let j = i * 4; j < i * 4 + 3; j++) {
                for (let k = j + 1; k < i * 4 + 4; k++) {
                    match.push({
                        id: nanoid(),
                        round: 0,
                        team1: team[j].id,
                        team2: team[k].id,
                        result: null,
                        status: 0
                    })
                }
            }
        }
        await setTeams(team)
        await setMatches(match)
    }

    const setTeams = (arr) => {
        setActualTeams(arr)
    }

    const setMatches = (arr) => {
        setActualMatches(arr)
    }

    const setScores = (arr) => {
        setActualScores(arr)
    }

    const setRound = (r) => {
        setActualRound(r)
    }

    return (
        <AutomateContext.Provider value={{
            teams, setTeams,
            round, setRound,
            matches, setMatches,
            scores, setScores,
            autoArrangeTeams, getRandomArray
        }}>
            {children}
        </AutomateContext.Provider>
    )
}