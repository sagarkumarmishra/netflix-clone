import { CheckIcon } from "@heroicons/react/outline"
import { Product } from "@stripe/firestore-stripe-payments"
import Head from "next/head"
import Link from "next/link"
import { useState } from "react"
import useAuth from "../hooks/useAuth"
import { loadCheckout } from "../lib/stripe"
import Loader from "./Loader"
import Table from "./Table"

interface Props {
    products : Product[]
}

const Plans = ({products} :Props) => {
    const {user, logout} = useAuth()
    const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2])
    const [isBillingLoading, setisBillingLoading] = useState(false)

    const subscribeToPlan = () => {
        if(!user) return

        loadCheckout(selectedPlan?.prices[0].id!)
        setisBillingLoading(true)
    }

  return (
    <div>
        <Head>
            <title>Netflix</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className="border-b border-white/10 bg-[#141414]">
            <Link href="/">
                <img
                    src="https://rb.gy/ulxxee"
                    alt="Netflix"
                    width={150}
                    height={90}
                    className="cursor-pointer object-contain"
                />
            </Link>
            <button className="text-lg font-semibold hover:underline" onClick={logout}>
                Sign Out
            </button>
        </header>

        <main className="mx-auto max-w-5xl pt-28 px-5 pb-12 transition-all md:px-10">
            <h1 className="mb-3 text-3xl font-medium">Choose the plan that's right for you</h1>
            <ul>
                <li className="flex items-center gap-x-2 text-lg">
                    <CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want.
                    Ad-free.
                </li>
                <li className="flex items-center gap-x-2 text-lg">
                    <CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations
                    just for you.
                </li>
                <li className="flex items-center gap-x-2 text-lg">
                    <CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel
                    your plan anytime.
                </li>
            </ul>

            <div className="mt-4 flex flex-col space-y-4">
                <div className="flex w-full items-center justify-center self-end md:w-3/5">
                    {products.map((product)=>(
                        <div key={product.id} className={`planBox ${selectedPlan?.id === product.id ? "opacity-100" : "opacity-70"}`} onClick={()=>{setSelectedPlan(product)}}>
                            {product.name}
                        </div>
                    ))}
                </div>

                <Table products={products} selectedPlan={selectedPlan}/>

                <div>
                    <div className="text-[13px] mx-auto w-11/12 md:max-w-[80%] md:ml-0 md:pl-4">
                        HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our <a href="https://help.netflix.com/legal/termsofuse" className='text-[#0080ff] hover:underline'>Terms of Use</a> for more details.
                        <br />
                        <br />
                        Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard, and 1 with Basic.
                    </div>
                </div>

                <button
                    disabled={!selectedPlan || isBillingLoading}
                    className={`font-semibold mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
                    isBillingLoading && 'opacity-60'
                    }`}
                    onClick={subscribeToPlan}
                >
                    {isBillingLoading ? (
                    <Loader color="dark:fill-gray-300" />
                    ) : (
                    'Subscribe'
                    )}
                </button>
            </div>
        </main>
    </div>
  )
}

export default Plans