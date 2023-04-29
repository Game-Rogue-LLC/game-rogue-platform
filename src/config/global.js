export const DEFAULT_CONTENTBLOCK_IMAGE = '/Game_Rogue_Text_2_copy.png';
export const DEFAULT_LOGO = '/LOGO.png';
export const STAFF_ROLES = [
    {
        id: 0,
        name: "Event Director"
    },
    {
        id: 1,
        name: "Event Assistant Director"
    },
    {
        id: 2,
        name: "Event Manager"
    },
    {
        id: 3,
        name: "Event Admin"
    },
    {
        id: 4,
        name: "Producer"
    },
    {
        id: 5,
        name: "Broadcaster"
    },
    {
        id: 6,
        name: "Commentator"
    }
]

export const EVENT_FORMATS = [
    {
        key: 'single-elimination',
        value: 0,
        name: 'Single Elimination'
    },
    {
        key: 'double-elimination',
        value: 1,
        name: 'Double Elimination'
    },
    {
        key: 'ladder-elimination',
        value: 2,
        name: 'Ladder Elimination'
    },
    {
        key: 'pyramid-elimination',
        value: 3,
        name: 'Pyramid Elimination'
    },
    {
        key: 'straight-round-robin',
        value: 4,
        name: 'Straight Round Robin'
    },
    {
        key: 'round-robin-double-split',
        value: 5,
        name: 'Round Robin Double Split'
    },
    {
        key: 'round-robin-triple-split',
        value: 6,
        name: 'Round Robin Triple Split'
    },
    {
        key: 'round-robin-quadruple-split',
        value: 7,
        name: 'Round Robin Quadruple split'
    },
    {
        key: 'round-robin-semi-split',
        value: 8,
        name: 'Semi Round Robin'
    },
]

export const EVENT_STATES = {
    'CREATING': {
        value: 0,
        name: 'CREATING',
    },
    'SCHEDULING': {
        value: 1,
        name: 'SCHEDULING'
    },
    'SCHEDULED': {
        value: 2,
        name: 'SCHEDULED'
    },
    'STARTED': {
        value: 3,
        name: 'STARTED'
    },
    'FINISHED': {
        value: 4,
        name: 'FINISHED'
    }
}

export const MATCH_STATES = {
    'NOT_STARTED_SCHEDULING': {
        value: 0,
        name: 'NOT_STARTED_SCHEDULING'
    },
    'SCHEDULING': {
        value: 1,
        name: 'SCHEDULING'
    },
    'SCHEDULED': {
        value: 2,
        name: 'SCHEDULED'
    },
    'STARTED': {
        value: 3,
        name: 'STARTED'
    },
    'FINISHED': {
        value: 4,
        name: 'FINISHED'
    }
}

export const NULL_FUNCTION = () => {
}

export default {
    DEFAULT_CONTENTBLOCK_IMAGE,
    DEFAULT_LOGO,
    STAFF_ROLES,
    EVENT_FORMATS,
    EVENT_STATES,
    NULL_FUNCTION
}