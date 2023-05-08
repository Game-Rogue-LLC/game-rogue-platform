import RogueSocialSplash from "@/src/content/Splash/RogueSocialSplash"

const Page = (props) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
      className="rogue-social-splash"
    >
      {/* <InfinitySpin
          width='200'
          color={theme.palette.primary.main}
        /> */}
      <div style={{ position: 'relative', zIndex: 9999 }}>
        <img src="/rogue_social.gif" />
      </div>
    </div>
  )
}

// Page.transition = (page) => {
//   return <RogueSocialSplash content="Loading..." />
// }

export default Page;