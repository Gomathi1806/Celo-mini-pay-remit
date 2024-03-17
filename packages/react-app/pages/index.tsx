import PrimaryButton from "@/components/Button";
import { publicClient, useWeb3 } from "@/contexts/useWeb3";
import Image from "next/image";
import { useEffect, useState } from "react";
import abi from "@/contexts/remittanceDapp.json";
import { celoAlfajores } from "viem/chains";
import { formatEther } from 'viem'


export default function Home() {
    const {
        address,
        getUserAddress,
        sendUsdc,
    } = useWeb3();

    const [balance, setBalance] = useState<bigint | null>(null);

    useEffect( () => {
        getUserAddress().then(async () => {

        });

        if(address){
            publicClient.getBalance({address}).then(b => setBalance(b));
        }

    }, [address]);

    const handleSendRemittance = async ()=> {
        
    }



    //capture the userinputted amount of usd and recipint address
      const [usdAmount, setUsdAmount] = useState<number>(0);
      const [recipientAddress, setRecipientAddress] = useState<string>('');
      


    return (


        <div className="p-4 flex flex-col items-center h-screen rounded-lg ">
        <h2 className="text-xl font-bold mb-4">Hey ! Welcome to Remlo</h2>

      <div className=" bg-emerald-200 px-6 py-8 pb-2 pt-2.5 rounded-lg p-4 text-center">
        <h2> Your Balance: {balance ? formatEther(balance) : ""} USDC</h2>
        
        </div>

      <label className="block mb-2 rounded-lg p-7 ">
        Enter USDC Amount:
        <input type="number" value={usdAmount} onChange={(e) => setUsdAmount(parseFloat(e.target.value))} className="border border-gray-300 rounded-md p-2 w-full" />
      </label>
      <label className="block mb-2 rounded-lg">
        Enter Address:
        <input type="text" value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full" />
      </label>
    
<div className="p-8">
<button onClick={handleSendRemittance} className="bg-emerald-200 px-6 pb-2 pt-2.5 rounded-lg text-xs font-medium uppercase leading-normal text-black shadow">Send Remittance</button>

</div>

<div>
<p className="text-center">Every token payment you make inside MiniPay will be swapped to CUSD</p>
</div>

  
    </div>

    );
}
