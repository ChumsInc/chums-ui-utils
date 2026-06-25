import {useEffect, useState} from 'react';

type ColorScheme = 'dark'|'light';

/**
 * <p>Returns the current color scheme of the document</p>
 * <p><code>type ColorScheme = 'dark'|'light';</code></p>
 * @returns ColorScheme
 */
export function useDocumentColorScheme() {
    const [theme, setTheme] = useState<ColorScheme>(window.document.documentElement.getAttribute('data-bs-theme') as ColorScheme ?? 'light');

    useEffect(() => {
        const root = window.document.documentElement;

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-bs-theme') {
                    const newTheme = root.getAttribute('data-bs-theme') as ColorScheme ?? 'light';
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
