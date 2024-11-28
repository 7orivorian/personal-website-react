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