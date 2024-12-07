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