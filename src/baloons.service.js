
export function getBalloonQuantity() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(10)
        }, 300)
    })
}

export function getBalloonEffect() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("2")
        }, 300)
    })
}

export function setBaloonEffect() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 300)
    })
}