function validateInput(value) {
    if (value === '') {
        return false;
    }

    const intValue = parseInt(value);
    if (isNaN(intValue) || intValue < 0 || !Number.isInteger(intValue)) {
        return false;
    }

    return true;
}
