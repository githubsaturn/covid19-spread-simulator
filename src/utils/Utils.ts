export default {
    copyObject<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj)) as T
    },

    isMobile() {
        return window.innerWidth < 768
    },

    getDelayedPromise(time: number) {
        if (!time) {
            return Promise.resolve()
        }

        return new Promise<void>((res, rej) => {
            setTimeout(() => {
                res()
            }, time)
        })
    }
}
