export const validateEmail = (email: string) => {
    const regextString = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regextString.test(email);
};