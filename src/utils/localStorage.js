export const setLocalStorageItem = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.log('Error setting localStorage item:', e);
    }
}


export const getLocalStorageItem = (key) => {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return value;
    } catch (e) {
        console.log('Error getting localStorage item:', e);
        return null;
    }
}


export const removeLocalStorageItem = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.log('Error removing localStorage item:', e);
    }
}