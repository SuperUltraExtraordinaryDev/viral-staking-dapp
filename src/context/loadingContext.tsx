// node_modules
import React, { useState } from "react";

interface LoadingContextObj {
    loading: boolean[];
    setLoading: () => void;
    finishLoading: () => void;
    isLoading: () => boolean;
}

const LoadingContext = React.createContext<LoadingContextObj>({
    loading: [],
    setLoading: () => {},
    finishLoading: () => {},
    isLoading: () => true,
});

export const LoadingProvider: React.FC = (props) => {
    const [loading, setLoading] = useState<boolean[]>([]);

    const LoadingValue: LoadingContextObj = {
        loading: loading,
        setLoading: () => {
            console.log("setLoading");
            setLoading([...loading, true]);
        },
        finishLoading: () => {
            console.log("finishLoading");
            setLoading([...loading].slice(1));
        },
        isLoading: (): boolean => {
            console.log("loading:", loading);
            return loading.length > 0;
        },
    };

    return (
        <LoadingContext.Provider value={LoadingValue}>
            {props.children}
        </LoadingContext.Provider>
    );
};

export default LoadingContext;
