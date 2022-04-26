import Head from 'next/head'
// import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const home = () => {
  const router = useRouter()

  return (
    <div
      style={{
        background:
          'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://rb.gy/p2hphi)',
      }}
    >
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Image
        // src="https://rb.gy/p2hphi"
        // src="https://assets.nflxext.com/ffe/siteui/vlv3/8459cea4-79ab-4f27-9ef0-a7c92a30a9bb/6defa446-a465-465d-9975-d2ec35582ebe/IN-en-20220411-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        src="https://res.cloudinary.com/debanjan/image/upload/v1650920983/bg_mro8xb.jpg"
        layout="fill"
        className="-z-10 opacity-100"
        objectFit="cover"
      /> */}

      <header>
        <img
          src="https://rb.gy/ulxxee"
          width={120}
          height={120}
          className="cursor-pointer object-contain"
        />
        <Link href="/login">
          <button className=" rounded bg-[#e50910] px-[14px] py-[4px] md:px-[17px] md:py-[7px]">
            Sign In
          </button>
        </Link>
      </header>

      <main>
        <div className="flex min-h-screen flex-1 flex-col items-center justify-center">
          <h1 className=" max-w-lg px-8 text-center text-3xl font-bold tracking-wide md:px-0 md:text-5xl">
            Unlimited movies, TV shows and more.
          </h1>
          <h2 className="mt-2 mb-2 text-lg md:mt-4 md:mb-8 md:text-[27px]">
            Watch anywhere. Cancel anytime.
          </h2>
          <p className="px-3 text-center text-base leading-5 md:px-0 md:text-xl">
            Ready to watch? Enter your email to create or restart your
            membership
          </p>

          <div className="mt-2 flex md:mt-4">
            <input
              type="email"
              placeholder="Email address"
              className="rounded-tl rounded-bl bg-white py-2 px-2 text-black outline-none md:min-w-[450px] md:py-4 md:pl-2 md:pr-6"
            />

            <button
              className="flex !cursor-pointer items-center justify-center rounded-tr rounded-br bg-[#e50914] px-4 text-base md:px-8 md:text-2xl"
              onClick={() => router.push('/login')}
            >
              Get Started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-4 w-4 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default home
