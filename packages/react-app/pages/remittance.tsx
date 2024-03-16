import PrimaryButton from "@/components/Button";
import { useWeb3 } from "@/contexts/useWeb3";
import Image from "next/image";
import { useEffect, useState } from "react";
import abi from "../abis/RemittanceDapp.json"
import { celoAlfajores } from "viem/chains";
import {
    createPublicClient,
    createWalletClient,
    custom,
    getContract,
    http,
    parseEther,
    stringToHex,
} from "viem";



export default function Home() {
      const {
        address,
        getUserAddress,
        sendCUSD,
        mintMinipayNFT,
        getNFTs,
        signTransaction,
    } = useWeb3();

    useEffect(() => {
        getUserAddress().then(async () => {
            
        
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const [recipient, setRecipient] = useState("")
    const [amount, setAmount] = useState("")
    const [signer, setSigner] = useState("")

    const contractAddress = 0xb5a6b0f670355364ea1a2961b02f61bfa742c92c;
    const contractABI = abi;


    async function doSomething() {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });


        let [address] = await walletClient.getAddresses();

        // TODO: check if you have to parse the amount
        // const amountInWei = parseEther(amount);


        const tx = await walletClient.writeContract({
            address: contractAddress as any,
            abi,
            functionName: 'createRemittance',
            args: [recipient, amount, [address, signer], 2],
        });

        let receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return receipt;

    }


    return (
        <div>
            <button onClick={doSomething}>kasdkn</button>
        </div>
    );
}
