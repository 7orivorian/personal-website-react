function wrapPromise(promise: Promise<any>): { read: () => any } {
    let status: string = 'pending'
    let response: any

    const suspender: Promise<void> = promise.then(
        (res: any): void => {
            status = 'success'
            response = res
        },
        (err: any): void => {
            status = 'error'
            response = err
        },
    )
    const read: () => any = (): any => {
        switch (status) {
            case 'pending':
                throw suspender
            case 'error':
                throw response
            default:
                return response
        }
    }

    return {read}
}

export default wrapPromise;