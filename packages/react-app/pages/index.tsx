import PrimaryButton from "@/components/Button";
import { publicClient, useWeb3 } from "@/contexts/useWeb3";
import Image from "next/image";
import { useEffect, useState } from "react";
import StableTokenABI from "../contexts/cusd-abi.json";
import remittanceABI from "../abis/remittance.json";
import { celoAlfajores } from "viem/chains";
import { createWalletClient, custom, formatEther, parseEther } from 'viem'
import { Dropdown } from "flowbite";



export default function Home(props: any) {
    const {
        address,
        getUserAddress,
        sendUsdc,
    } = useWeb3();

    const [balance, setBalance] = useState<bigint | null>(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    //capture the userinputted amount of usd and recipint address
    const [usdAmount, setUsdAmount] = useState<number>(0);
    const [recipientAddress, setRecipientAddress] = useState<string>('');


    useEffect(() => {
        getUserAddress().then(async () => {

        });

        if (address) {
            publicClient.getBalance({ address }).then(b => setBalance(b));
        }

    }, [address]);



    const handleSendRemittance = async (to: string, amount: number) => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        let [address] = await walletClient.getAddresses();

        const amountInWei = parseEther(`${amount}`);

        // const tx = await walletClient.writeContract({
        //     address: 0xcd277ce9a5679eef25a1e622b64b75515c73ab85 as any, // USDC testnet
        //     abi: remittanceABI,
        //     functionName: "swap",
        //     account: address,
        //     args: [to, amountInWei],
        // });

        const tx = await walletClient.writeContract({
            address: 0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B,
            abi: StableTokenABI.abi,
            functionName: "transfer",
            account: address,
            args: [ amountInWei,to],
        });
    

        let receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return receipt;
    }


    


  



    return (


        <div className="p-4 flex flex-col items-center h-screen rounded-lg ">
            <h2 className="text-xl font-bold mb-4">Hey ! Welcome to Remlo</h2>

            <div className=" bg-emerald-200 px-6 py-8 pb-2 pt-2.5 rounded-lg p-4 text-center">
                <h2 className="text-2xl">  {balance ? Number(formatEther(balance)).toFixed(2) : ""} </h2>
                <p>   USDC</p>

            </div>

            <div className="flex flex-col justify-center items-center mb-2 rounded-lg p-7 ">
                <p className="my-5">
                    I want to send
                </p>
                <input type="number" value={usdAmount} onChange={(e) => setUsdAmount(parseFloat(e.target.value))} className="border border-gray-300 rounded-md p-2 w-full" />
            </div>
            {/* <div className="block mb-2 rounded-lg p-7 ">
                <div className="mb-10">
                    Choose currency:
                </div>

<div className="flex ">
<button type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Teal</button>

<button type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Teal</button>
</div>


            </div> */}
            <label className="block mb-2 rounded-lg mt-10">
                Enter Email Address:
                <input type="text" value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full" />
            </label>

            <div className="p-8">
                <button onClick={() => handleSendRemittance(recipientAddress, usdAmount)} className="bg-emerald-200 px-6 pb-2 pt-2.5 rounded-lg text-xs font-medium uppercase leading-normal text-black shadow">Send Remittance</button>

            </div>

            <div>
                <p className="text-center">Every token payment you make inside MiniPay will be swapped to CUSD</p>
            </div>


        </div>

    );
}