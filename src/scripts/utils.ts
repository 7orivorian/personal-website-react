export const handleUrlClick = (url: string | undefined): void => {
    if (url) {
        const newWindow: Window | null = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) {
            newWindow.opener = null;
        }
    } else {
        console.error('url undefined');
    }
};

export function isMobileDevice(): boolean {
    return /(Mobi|Android|iPhone)/i.test(navigator.userAgent);
}

export function isTouchScreen(): boolean {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
}

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Checks if an array of strings should be considered "special empty."
 * A "special empty" array is one that either:
 * - Contains no elements, or
 * - Contains only empty string (`''`) elements.
 *
 * @param arr - An array of strings to check.
 * @returns `true` if the array is considered "special empty"; otherwise, `false`.
 *
 * @example
 * isSpecialEmpty(['']);       // true
 * isSpecialEmpty([]);         // true
 * isSpecialEmpty(['a']);      // false
 * isSpecialEmpty(['', '']);   // true
 * isSpecialEmpty(['', 'b']);  // false
 */
export function isSpecialEmpty(arr: string[]): boolean {
    return arr.filter(item => item !== '').length === 0;
}

export function formatDateToYYYYMMDD(dateString: string): string {
    const date = new Date(dateString);
    const year: number = date.getFullYear();
    const month: string = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day: string = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

// eslint-disable-next-line no-control-regex
export const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
