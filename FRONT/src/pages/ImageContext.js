import React, { createContext, useState } from 'react';

// Contextを作成
export const ImageContext = createContext();

// Context Providerを作成
export const ImageProvider = ({ children }) => {
    const [imageData, setImageData] = useState(null);

    return (
        <ImageContext.Provider value={{ imageData, setImageData }}>
            {children}
        </ImageContext.Provider>
    );
};
