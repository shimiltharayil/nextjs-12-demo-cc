import Head from 'next/head'
import Image from 'next/image'

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title></title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

  <h1>Welcome to Next.js 12</h1>     
    </div>
  )
}

export default Home
