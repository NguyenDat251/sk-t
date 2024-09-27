const getErrorMessage = (error: Error | string) => {
    if(typeof error === 'string') return error;

    return 'Something went wrong';
}

export { getErrorMessage };