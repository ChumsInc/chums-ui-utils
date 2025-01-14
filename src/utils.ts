export const commaFormatter =(n:number):string => {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
