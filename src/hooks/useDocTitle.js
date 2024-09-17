import { useEffect } from 'react';

const useDocTitle = (title) => {
    useEffect(() => {
        if (title) {
            document.title = `${title} - L & C`;
        } else {
            document.title = 'L & C | The Perfect Audio Store';
        }
    }, [title]);

    return null;
};

export default useDocTitle;
