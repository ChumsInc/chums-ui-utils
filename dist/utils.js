export const commaFormatter = (n) => {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
