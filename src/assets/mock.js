export const BalloonStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
}


export const balloons = [
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

// GET baloons
// PUT baloons/{id}
// 9
// PUT baloons/all
// 12