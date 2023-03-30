import Head from 'next/head'
// import styles from 'styles/Home.module.css'
import { InfinitySpin } from 'react-loader-spinner'

export default function Splash() {
  return (
    <div>
      <Head>
        <title>Signing In...</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div style={{paddingBottom:"30px"}}>
            <img src='/logo.svg' />
        </div>
        <div>
            <InfinitySpin 
            width='200'
            color="#0e8fe5"
            />
        </div>
        <div style={{fontSize: "23px", fontWeight: 100}}>
            Signing in. Please wait...
        </div>
      </main>
    </div>
  )
}
