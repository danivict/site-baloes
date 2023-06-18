export const BalloonStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
}

let balloons = [
    {
        id: 1,
        effect: 2,
        battery: 50, //0-100%
        status: BalloonStatus.ACTIVE
    },
    {
        id: 2,
        effect: 2,
        battery: 50, //0-100%
        status: BalloonStatus.ACTIVE
    },
    {
        id: 3,
        effect: 2,
        battery: 50, //0-100%
        status: BalloonStatus.ACTIVE
    },
    {
        id: 4,
        effect: 2,
        battery: 20, //0-100%
        status: BalloonStatus.ACTIVE
    }
]

export const getBalloons = () => balloons

export const setBalloons = (newBalloons) => {
    balloons = newBalloons
}