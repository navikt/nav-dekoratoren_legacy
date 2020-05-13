const capitalizeFirstLetter = (word: string) => {
    const trimmed = word.trim();
    if (!trimmed) {
        return '';
    }
    const firstLetter = trimmed[0].toUpperCase();
    return trimmed.length > 1
        ? firstLetter + trimmed.slice(1).toLowerCase()
        : firstLetter;
};

export const formatName = (name: string) => {
    return name
        .split(' ')
        .map(capitalizeFirstLetter)
        .filter((word) => word.length > 0)
        .join(' ');
};
