export function handleAge() {
    const date = new Date();

    return date.getDate() >= 9 && date.getUTCMonth() + 1 >= 10 ?
        date.getFullYear() - 2002 :
        date.getFullYear() - 2003
}