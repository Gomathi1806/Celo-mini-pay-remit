import Link from "next/link";

export default function Send() {
    return <div>
        <p>Send</p>
        <Link href="/home"><p className="underline">Go to Home</p></Link>
    </div>
}