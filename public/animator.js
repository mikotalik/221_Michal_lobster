function animateAnything(obj, func, milliseconds, delay, startValues, endValues) {
    const startTime = performance.now()
    const endTime = startTime + milliseconds
    const timeStep = 0.03 //HOW MANY MILLISECONDS PER ANIM STEP
    const steps = (endTime - startTime) / timeStep

    let startingValues = startValues
    let endingValues = endValues

    if (typeof (obj[func]) == "function") {
        for (let iTime = startTime; iTime <= endTime; iTime += timeStep) {
            let targetDelay = iTime - startTime

            let alpha = targetDelay / milliseconds

            let values = []

            for (let i = 0; i < startingValues.length; i++) {
                values.push(lerp(startingValues[i], endingValues[i], alpha / (steps*0.5)))
            }

            setTimeout(() => obj[func](...values), targetDelay + delay)
        }
    } else {
        for (let iTime = startTime; iTime <= endTime; iTime += timeStep) {
            let targetDelay = iTime - startTime

            let alpha = targetDelay / milliseconds

            let values = []

            for (let i = 0; i < startingValues.length; i++) {
                values.push(lerp(startingValues[i], endingValues[i], alpha))
            }

            setTimeout(() => obj[func] = values[0], targetDelay + delay)
        }
    }
}

function lerp(min, max, amount) {
    return Number(min + amount * (max - min));
}

export { animateAnything, lerp}