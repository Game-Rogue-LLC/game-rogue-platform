import { Dialog, DialogContent, DialogTitle, Typography, useTheme } from "@mui/material";

const PrivacyNoticeDialog = ({ open, onClose }) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose} sx={{ zIndex: 11000 }} disableScrollLock>
      <DialogTitle sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}>
        Privacy Policy
      </DialogTitle>
      <DialogContent sx={{ padding: 5 }}>
        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Introduction
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          GAME ROGUE, LLC(<b>"Company"</b> or <b>"We"</b>) respects your privacy and are committed
          to protecting it through our compliance with this policy.
          <br />
          This policy describes the types of information we may collect from you or that you may
          provide when you visit the website www.gamerogue.com (our <b>"Website"</b>) and our
          practices for collecting, using, maintaining, protecting, and disclosing that information.
          <br />
          This policy applies to information we collect:
          <ul>
            <li>On this Website.</li>
            <li>In email, text, and other electronic messages between you and this Website.</li>
          </ul>
          <br />
          It does not apply to information collected by:
          <ul>
            <li>
              Us offline or through any other means, including on any other website operated by
              Company or any third party; or
            </li>
            <li>
              Any third party, including through any application or content (including advertising)
              that may link to or be accessible from or through the Website.
            </li>
          </ul>
          Please read this policy carefully to understand our policies and practices regarding your
          information and how we will treat it. If you do not agree with our policies and practices,
          your choice is not to use our Website. By accessing or using this Website, you agree to
          this privacy policy.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Children Under the Age of 13
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          Our Website is not intended for children under 13 years of age. No one under age 13 may
          provide any personal information to or on the Website. We do not knowingly collect
          personal information from children under 13. If you are under 13, do not use or provide
          any information on this Website, register on the Website, make any purchases through the
          Website, use any of the interactive or public comment features of this Website, or provide
          any information about yourself to us, including your name, address, telephone number,
          email address, or any screen name or user name you may use. If we learn we have collected
          or received personal information from a child under 13 without verification of parental
          consent, we will delete that information.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Information We Collect About You and How We Collect It
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          We collect several types of information from and about users of our Website, including
          information:
          <ul>
            <li>
              By which you may be personally identified, such as name, postal address, email
              address, or telephone number (<b>"personal information"</b>);
            </li>
            <li>
              That is about you but individually does not identify you, such as usernames and games
              and/or leagues you participate in; and/or
            </li>
            <li>
              About your internet connection, the equipment you use to access our Website, and usage
              details.
            </li>
          </ul>
          We collect this information:
          <ul>
            <li>Directly from you when you provide it to us.</li>
            <li>
              Automatically as you navigate through the site. Information collected automatically
              may include usage details, IP addresses, and information collected through cookies.
            </li>
            <li>When you make a purchase of merchandise.</li>
            <li>
              When you communicate with us through the website, including completion of any online
              forms.
            </li>
            <li>When you subscribe to a mailing list.</li>
          </ul>
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Information You Provide to Us
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          The information we collect on or through our Website may include:
          <ul>
            <li>
              Information that you provide by filling in forms on our Website. This includes
              information provided at the time of registering to use our Website, posting material,
              or requesting further services. We may also ask you for information when you enter a
              contest or promotion sponsored by us, and when you report a problem with our Website.
            </li>
            <li>
              Information that you provide by filling in forms on our Website. This includes
              information provided at the time of registering to use our Website, posting material,
              or requesting further services. We may also ask you for information when you enter a
              contest or promotion sponsored by us, and when you report a problem with our Website.
            </li>
            <li>
              Details of transactions you carry out through our Website and of the fulfillment of
              your orders. You may be required to provide financial information before placing an
              order through our Website.
            </li>
          </ul>
          You also may provide information to be published or displayed (hereinafter,{" "}
          <b>"posted"</b>) on public areas of the Website, or transmitted to other users of the
          Website or third parties (collectively, <b>"User Contributions"</b>). Your User
          Contributions are posted on and transmitted to others at your own risk. We cannot control
          the actions of other users of the Website with whom you may choose to share your User
          Contributions. Therefore, we cannot and do not guarantee that your User Contributions will
          not be viewed by unauthorized persons.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Information We Collect Through Automatic Data Collection Technologies
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          As you navigate through and interact with our Website, we may use automatic data
          collection technologies to collect certain information about your equipment, browsing
          actions, and patterns. <br /> The technologies we use for this automatic data collection
          may include:
          <ul>
            <li>Cookies (or browser cookies).</li>
            <li>Web Beacons.</li>
            <li>Flash Cookies.</li>
          </ul>
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          How We Use Your Information
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          We use information that we collect about you or that you provide to us, including any
          personal information:
          <ul>
            <li>To present our Website and its contents to you.</li>
            <li>
              To provide you with information, products, or services that you request from us.
            </li>
            <li>To fulfill any other purpose for which you provide it.</li>
            <li>
              To provide you with notices about your account and/or subscription, including
              expiration and renewal notices.
            </li>
            <li>
              To carry out our obligations and enforce our rights arising from any contracts entered
              into between you and us, including for billing and collection.
            </li>
            <li>For any other purpose with your consent.</li>
          </ul>
          We may use the information we have collected from you to enable us to display
          advertisements to our advertisers' target audiences. Even though we do not disclose your
          personal information for these purposes without your consent, if you click on or otherwise
          interact with an advertisement, the advertiser may assume that you meet its target
          criteria.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Disclosure of Your Information
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          We may disclose aggregated information about our users without restriction. <br /> We may
          disclose personal information that we collect or you provide as described in this privacy
          policy:
          <ul>
            <li>To our subsidiaries and affiliates.</li>
            <li>
              To contractors, service providers, and other third parties we use to support our
              business.
            </li>
            <li>
              To a buyer or other successor in the event of a merger, divestiture, restructuring,
              reorganization, dissolution, or other sale or transfer of some or all of GAME ROGUE,
              LLC's assets, whether as a going concern or as part of bankruptcy, liquidation, or
              similar proceeding, in which personal information held by GAME ROGUE, LLC about our
              Website users is among the assets transferred.
            </li>
            <li>
              To third parties to market their products or services to you if you have not opted out
              of these disclosures.
            </li>
            <li>To fulfill the purpose for which you provide it.</li>
            <li>For any other purpose disclosed by us when you provide the information.</li>
            <li>With your consent.</li>
          </ul>
          We may also disclose your personal information:
          <ul>
            <li>
              To comply with any court order, law, or legal process, including to respond to any
              government or regulatory request.
            </li>
            <li>
              To enforce or apply our terms of use [INSERT AS LINK TO WEBSITE'S TERMS OF USE] and
              other agreements, including for billing and collection purposes.
            </li>
            <li>
              If we believe disclosure is necessary or appropriate to protect the rights, property,
              or safety of GAME ROGUE, LLC, our customers, or others.
            </li>
          </ul>
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Choices About How We Use and Disclose Your Information
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          We strive to provide you with choices regarding the personal information you provide to
          us. We have created mechanisms to provide you with the following control over your
          information:
          <ul>
            <li>
              <b>Tracking Technologies and Advertising.</b> You can set your browser to refuse all
              or some browser cookies, or to alert you when cookies are being sent. If you disable
              or refuse cookies, please note that some parts of this site may then be inaccessible
              or not function properly.
            </li>
            <li>
              <b>Disclosure of Your Information for Third-Party Advertising.</b> If you do not want
              us to share your personal information with unaffiliated or non-agent third parties for
              promotional purposes, you can opt-out by [OPT-OUT METHOD].
            </li>
            <li>
              <b>Promotional Offers from the Company.</b> If you do not wish to have your email
              address used by the Company to promote our own or third parties' products or services,
              you can opt-out by [OPT-OUT METHOD].
            </li>
          </ul>
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Your State Privacy Rights
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          State consumer privacy laws may provide their residents with additional rights regarding
          our use of their personal information. To learn more about California residents' privacy
          rights, visit [HYPERLINK TO CCPA AND CPRA PRIVACY NOTICE FOR CALIFORNIA RESIDENTS].
          California's "Shine the Light" law (Civil Code Section § 1798.83) permits users of our App
          that are California residents to request certain information regarding our disclosure of
          personal information to third parties for their direct marketing purposes. To make such a
          request, please send an email to [EMAIL ADDRESS] or write to us at: [MAILING ADDRESS].
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Changes to Our Privacy Policy
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          It is our policy to post any changes we make to our privacy policy on this page with a
          notice that the privacy policy has been updated on the Website home page. If we make
          material changes to how we treat our users' personal information, we will notify you
          through a notice on the Website home page. The date the privacy policy was last revised is
          identified at the top of the page. You are responsible for ensuring we have an up-to-date,
          active and deliverable email address for you, and for periodically visiting our Website
          and this privacy policy to check for any changes.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Contact Information
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          To ask questions or comment about this privacy policy and our privacy practices, contact
          us at: <br />
          [ADDRESS/EMAIL ADDRESS] <br />
          or via our toll-free number: <br />
          [TOLL-FREE NUMBER]
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyNoticeDialog;
