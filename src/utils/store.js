export function makeMutations(state) {
    const isObject = item => item && typeof item === 'object' && !Array.isArray(item)
    const mutation = field => (state, payload) => {
        if (isObject(state[field]) && isObject(payload)) {
            state[field] = updateObject(state[field], payload)
        } else {
            state[field] = payload
        }
    }
    return Object.fromEntries(generateFields(state).map(field => [field, mutation(field)]))
}

function generateFields(state) {
    return Array.isArray(state) ? state : Object.keys(typeof state === 'function' ? state() : state)
}

function updateObject(object, data) {
    return Object.assign(new object.constructor(), object, data)
}

export class Payload {
    constructor(data) {
        this.status = null
        Object.assign(this, data)
    }

    get loading() {
        return this.status === 'loading'
    }

    get success() {
        return this.status === 'success'
    }

    get failed() {
        return this.status === 'failed'
    }
}


export async function asyncRequest(asyncAction, statusSetter = (...args) => {}) {
    statusSetter('loading')
    try {
        const result = await asyncAction()
        setTimeout(() => statusSetter('success'), 1000)

        return result
    } catch (error) {
        console.log(error)
        statusSetter('failed')
    }
}
