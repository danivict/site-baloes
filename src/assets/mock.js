export const BalloonStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
}

let balloons = [
    {
        id: '00-B0-D0-63-C2-22',
        effect: 2,
        battery: 50, //0-100%
        status: BalloonStatus.ACTIVE,
        signal: -50
    },
    {
        id: '00-B0-D0-63-C2-16',
        effect: 2,
        battery: 50, //0-100%
        status: BalloonStatus.ACTIVE,
        signal: -50
    },
    {
        id: '10-B0-D0-64-C2-26',
        effect: 2,
        battery: 50, //0-100%
        status: BalloonStatus.ACTIVE,
        signal: -50
    },
    {
        id: '00-B2-D0-63-C2-26',
        effect: 2,
        battery: 20, //0-100%
        status: BalloonStatus.ACTIVE,
        signal: -50
    }
]

export const getBalloons = () => balloons

export const setBalloons = (newBalloons) => {
    balloons = newBalloons
}