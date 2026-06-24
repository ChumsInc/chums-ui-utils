import {useEffect, useState} from 'react';

export function useDocumentColorScheme() {
    const [theme, setTheme] = useState(window.document.documentElement.getAttribute('data-bs-theme') ?? 'light');

    useEffect(() => {
        const root = window.document.documentElement;

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-bs-theme') {
                    const newTheme = root.getAttribute('data-bs-theme') ?? 'light';
                    setTheme(newTheme);
                }
            }
        });

        observer.observe(root, {
            attributes: true,
            attributeFilter: ['data-bs-theme'],
        });
        return () => {
            observer.disconnect()
        }
    }, []);

    return theme;
}
