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