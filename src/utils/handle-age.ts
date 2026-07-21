const BIRTH_YEAR = 2002;
const BIRTH_MONTH = 9;
const BIRTH_DAY = 9;
const BIRTH_HOUR = 8;

export function handleAge(currentDate = new Date()) {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const currentHour = currentDate.getHours();

    const isAfterBirthMonth = currentMonth > BIRTH_MONTH;
    const isBirthMonth = currentMonth === BIRTH_MONTH;

    const isAfterBirthDay = currentDay > BIRTH_DAY;
    const isBirthDay = currentDay === BIRTH_DAY;

    const hasReachedBirthHour = currentHour >= BIRTH_HOUR;
    const hasReachedBirthday = isAfterBirthDay || (isBirthDay && hasReachedBirthHour);
    const hasHadBirthday = isAfterBirthMonth || (isBirthMonth && hasReachedBirthday);

    const ageBeforeBirthday = currentYear - BIRTH_YEAR - 1;
    const ageAfterBirthday = currentYear - BIRTH_YEAR;

    return hasHadBirthday ? ageAfterBirthday : ageBeforeBirthday;
}
