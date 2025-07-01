import { useEffect } from 'react';

export const usePageTitle = (title) => {
    useEffect(() => {
        const prevTitle = document.title;
        document.title = title ? `Winston Lin | ${title}` : 'Winston Lin';

        return () => {
            document.title = prevTitle;
        }
    }, [title]);
};