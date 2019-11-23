const EXTRA_LOW = 9325;
const LOW = 37950;
const MEDIUM = 91900;
const LARGE = 191650;
const EXTRA_LARGE = 416700;

const countTaxRate = (incomeSum) => {
    if (incomeSum <= EXTRA_LOW) {
        return 10;
    } else if (incomeSum <= LOW) {
        return 15;
    } else if (incomeSum <= MEDIUM) {
        return 25;
    } else if (incomeSum <= LARGE) {
        return 29;
    } else if (incomeSum <= EXTRA_LARGE) {
        return 33;
    }
    return 35;
}

export default countTaxRate;