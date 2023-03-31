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
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <div>
            <InfinitySpin
              width='200'
              color="#0e8fe5"
            />
          </div>
          <div style={{ fontSize: "23px", fontWeight: 100 }}>
            Signing in. Please wait...
          </div>
        </div>
      </main>
    </div>
  )
}
