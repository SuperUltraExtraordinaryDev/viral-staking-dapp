import { Web3Provider } from "@ethersproject/providers";

export const getLibrary = (provider: any) => {
    return new Web3Provider(provider);
};
