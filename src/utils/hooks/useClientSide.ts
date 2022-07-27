import { useState, useEffect } from 'react';

// Helper hook to ensure that logic in consuming components
// only fire at the client. This is a better solution than the
// previously used "typeof window !=== 'undefined'".
export const useClientSide = (): boolean => {
    const [isClientSide, setIsClientSide] = useState(false);

    useEffect(() => {
        setIsClientSide(true);
    }, []);

    return isClientSide;
};
