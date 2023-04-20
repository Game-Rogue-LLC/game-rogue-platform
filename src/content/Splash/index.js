import Head from 'next/head'
// import styles from 'styles/Home.module.css'
import { InfinitySpin } from 'react-loader-spinner'
import { useTheme } from '@mui/material'

export default function Splash(props) {
  const { content } = props;
  const theme = useTheme();
  return (
    <div>
      <Head>
        <title>{content}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          zIndex: 90,
          transform: 'translate(-50%, -50%)'
        }}>
          <div>
            {/* <InfinitySpin
              width='200'
              color={theme.palette.primary.main}
            /> */}
            <img src="/loading.gif" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', fontSize: "23px", fontWeight: 100 }}>
            {content}
          </div>
        </div>
      </main>
    </div>
  )
}
