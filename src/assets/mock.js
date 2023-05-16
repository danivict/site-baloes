export const BaloonStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
}


export const baloons = [
    {
        id: 1,
        effect: 1,
        battery: 50, //0-100%
        status: BaloonStatus.ACTIVE
    },
    {
        id: 2,
        effect: 2,
        battery: 50, //0-100%
        status: BaloonStatus.ACTIVE
    },
    {
        id: 3,
        effect: 3,
        battery: 50, //0-100%
        status: BaloonStatus.ACTIVE
    },
    {
        id: 4,
        effect: 4,
        battery: 20, //0-100%
        status: BaloonStatus.ACTIVE
    }
]

// GET baloons
// PUT baloons/{id}
// 9
// PUT baloons/all
// 12