import stakingContractInfo from "../contracts/staking_contract.json";
import satsTokenContractInfo from "../contracts/sats_token_contract.json";

export const stakingContract: {
    ABI: any;
    address: string;
} = {
    ABI: stakingContractInfo.abi,
    address: "0xA97488451A512983930621aD09fB9D9Dd360DD27",
};

export const satsTokenContract: {
    ABI: any;
    address: string;
} = {
    ABI: satsTokenContractInfo.abi,
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
};
