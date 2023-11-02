import { Dialog, DialogContent, DialogTitle, Typography, useTheme } from "@mui/material";

const TermsOfUseDialog = ({ open, onClose }) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose} sx={{ zIndex: 11000 }} disableScrollLock>
      <DialogTitle sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}>
        Terms of Use
      </DialogTitle>
      <DialogContent sx={{ padding: 5 }}>
        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Acceptance of the Terms of Use
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          These terms of use are entered into by and between You and GAME ROGUE, LLC (
          <b>"Company"</b>,<b>"we"</b> or <b>"us"</b>). The following terms and conditions (
          <b>"Terms of Use"</b>) govern your access to and use of https://www.game-rogue.com/,
          including any content, functionality, and services offered on or through
          https://www.gamerogue.com/ (the <b>"Website"</b>).
          <br />
          Please read the Terms of Use carefully before you start to use the Website.{" "}
          <b>
            By using the Website, you accept and agree to be bound and abide by these Terms of Use
            and our Privacy Policy, found at [PRIVACY POLICY URL], incorporated herein by reference.
          </b>{" "}
          If you do not want to agree to these Terms of Use or the Privacy Policy, you must not
          access or use the Website.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Changes to the Terms of Use
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          We may revise and update these Terms of Use from time to time in our sole discretion. All
          changes are effective immediately when we post them.
          <br />
          Your continued use of the Website following the posting of revised Terms of Use means that
          you accept and agree to the changes. You are expected to check this page so you are aware
          of any changes, as they are binding on you.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Accessing the Website and Account Security
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          We reserve the right to withdraw or amend this Website, and any service or material we
          provide on the Website, in our sole discretion without notice. We will not be liable if
          for any reason all or any part of the Website is unavailable at any time or for any
          period. From time to time, we may restrict access to some parts of the Website, or the
          entire Website, to users, including registered users.
          <br />
          You are responsible for both:
          <ul>
            <li>Making all arrangements necessary for you to have access to the Website.</li>
            <li>
              Ensuring that all persons who access the Website through your internet connection are
              aware of these Terms of Use and comply with them.
            </li>
          </ul>
          To access the Website or some of the resources it offers, you may be asked to provide
          certain registration details or other information. It is a condition of your use of the
          Website that all the information you provide on the Website is correct, current, and
          complete. You agree that all information you provide to register with this Website or
          otherwise, including, but not limited to, through the use of any interactive features on
          the Website, is governed by our Privacy Policy [LINK TO PRIVACY POLICY], and you consent
          to all actions we take with respect to your information consistent with our Privacy
          Policy.
          <br />
          We have the right to disable any user name, password, or other identifier, whether chosen
          by you or provided by us, at any time in our sole discretion for any or no reason,
          including if, in our opinion, you have violated any provision of these Terms of Use.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Intellectual Property Rights
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          The Website and its entire contents, features, and functionality (including but not
          limited to all information, software, text, displays, images, video, and audio, and the
          design, selection, and arrangement thereof) are owned by the Company, its licensors, or
          other providers of such material and are protected by United States and international
          copyright, trademark, patent, trade secret, and other intellectual property or proprietary
          rights laws.
          <br />
          These Terms of Use permit you to use the Website for your personal, non-commercial use
          only. You must not reproduce, distribute, modify, create derivative works of, publicly
          display, publicly perform, republish, download, store, or transmit any of the material on
          our Website, except as follows:
          <ul>
            <li>
              Your computer may temporarily store copies of such materials in RAM incidental to your
              accessing and viewing those materials.
            </li>
            <li>
              You may store files that are automatically cached by your Web browser for display
              enhancement purposes.
            </li>
            <li>
              You may print or download one copy of a reasonable number of pages of the Website for
              your own personal, non-commercial use and not for further reproduction, publication,
              or distribution.
            </li>
            <li>
              If we provide desktop, mobile, or other applications for download, you may download a
              single copy to your computer or mobile device solely for your own personal,
              non-commercial use, provided you agree to be bound by our end user license agreement
              for such applications.
            </li>
            <li>
              If we provide social media features [LINK TO THE WEBSITE AND SOCIAL MEDIA FEATURES]
              with certain content, you may take such actions as are enabled by such features.
            </li>
          </ul>
          You must not:
          <ul>
            <li>Modify copies of any materials from this site.</li>
            <li>
              Use any illustrations, photographs, video or audio sequences, or any graphics
              separately from the accompanying text.
            </li>
            <li>
              Delete or alter any copyright, trademark, or other proprietary rights notices from
              copies of materials from this site.
            </li>
          </ul>
          You must not access or use for any commercial purposes any part of the Website or any
          services or materials available through the Website. <br />
          If you print, copy, modify, download, or otherwise use or provide any other person with
          access to any part of the Website in breach of the Terms of Use, your right to use the
          Website will stop immediately and you must, at our option, return or destroy any copies of
          the materials you have made. No right, title, or interest in or to the Website or any
          content on the Website is transferred to you, and all rights not expressly granted are
          reserved by the Company. Any use of the Website not expressly permitted by these Terms of
          Use is a breach of these Terms of Use and may violate copyright, trademark, and other
          laws.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Trademarks
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          The Company name, the terms [COMPANY TRADEMARKS], the Company logo, and all related names,
          logos, product and service names, designs, and slogans are trademarks of the Company or
          its affiliates or licensors. You must not use such marks without the prior written
          permission of the Company. All other names, logos, product and service names, designs, and
          slogans on this Website are the trademarks of their respective owners.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Prohibited Uses
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          You may use the Website only for lawful purposes and in accordance with these Terms of
          Use. You agree not to use the Website:
          <ul>
            <li>
              In any way that violates any applicable federal, state, local, or international law or
              regulation (including, without limitation, any laws regarding the export of data or
              software to and from the US or other countries).
            </li>
            <li>
              For the purpose of exploiting, harming, or attempting to exploit or harm minors in any
              way by exposing them to inappropriate content, asking for personally identifiable
              information, or otherwise.
            </li>
            <li>
              To send, knowingly receive, upload, download, use, or re-use any material that does
              not comply with the Content Standards [LINK TO CONTENT STANDARDS] set out in these
              Terms of Use.
            </li>
            <li>
              To impersonate or attempt to impersonate the Company, a Company employee, another
              user, or any other person or entity (including, without limitation, by using email
              addresses or screen names associated with any of the foregoing).
            </li>
            <li>
              To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of
              the Website, or which, as determined by us, may harm the Company or users of the
              Website, or expose them to liability.
            </li>
          </ul>
          Additionally, you agree not to:
          <ul>
            <li>
              Use the Website in any manner that could disable, overburden, damage, or impair the
              site or interfere with any other party's use of the Website, including their ability
              to engage in real time activities through the Website.
            </li>
            <li>
              Use any robot, spider, or other automatic device, process, or means to access the
              Website for any purpose, including monitoring or copying any of the material on the
              Website.
            </li>
            <li>
              Use any manual process to monitor or copy any of the material on the Website, or for
              any other purpose not expressly authorized in these Terms of Use, without our prior
              written consent.
            </li>
            <li>
              Use any device, software, or routine that interferes with the proper working of the
              Website.
            </li>
            <li>
              Introduce any viruses, Trojan horses, worms, logic bombs, or other material that is
              malicious or technologically harmful.
            </li>
            <li>
              Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts
              of the Website, the server on which the Website is stored, or any server, computer, or
              database connected to the Website.
            </li>
            <li>
              Attack the Website via a denial-of-service attack or a distributed denial-of-service
              attack.
            </li>
            <li>Otherwise attempt to interfere with the proper working of the Website.</li>
          </ul>
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          User Contributions
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          The Website may contain message boards, chat rooms, personal web pages or profiles,
          forums, bulletin boards, and other interactive features (collectively,{" "}
          <b>"Interactive Services"</b>) that allow users to post, submit, publish, display, or
          transmit to other users or other persons (hereinafter, <b>"Post"</b>) content or materials
          (collectively, <b>"User Contributions"</b>) on or through the Website.
          <br />
          All User Contributions must comply with the Content Standards set out in these Terms of
          Use.
          <br />
          Any User Contribution you post to the site will be considered non-confidential and
          non-proprietary. By providing any User Contribution on the Website, you grant us and our
          affiliates and service providers, and each of their and our respective licensees,
          successors, and assigns the right to use, reproduce, modify, perform, display, distribute,
          and otherwise disclose to third parties any such material for any purpose. <br />
          You represent and warrant that:
          <ul>
            <li>
              You own or control all rights in and to the User Contributions and have the right to
              grant the license granted above to us and our affiliates and service providers, and
              each of their and our respective licensees, successors, and assigns.
            </li>
            <li>x All of your User Contributions do and will comply with these Terms of Use.</li>
          </ul>
          You understand and acknowledge that you are responsible for any User Contributions you
          submit or contribute, and you, not the Company, have full responsibility for such content,
          including its legality, reliability, accuracy, and appropriateness.
          <br />
          We are not responsible or liable to any third party for the content or accuracy of any
          User Contributions posted by you or any other user of the Website.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Monitoring and Enforcement; Termination
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          We have the right to:
          <ul>
            <li>
              Remove or refuse to post any User Contributions for any or no reason at our sole
              discretion.
            </li>
            <li>
              Take any action with respect to any User Contribution that we deem necessary or
              appropriate in our sole discretion, including if we believe that such User
              Contribution violates the Terms of Use, including the Content Standards, infringes any
              intellectual property right or other right of any person or entity, threatens the
              personal safety of users of the Website or the public, or could create liability for
              the Company.
            </li>
            <li>
              Disclose your identity or other information about you to any third party who claims
              that material posted by you violates their rights, including their intellectual
              property rights or their right to privacy.
            </li>
            <li>
              Take appropriate legal action, including without limitation, referral to law
              enforcement, for any illegal or unauthorized use of the Website.
            </li>
            <li>
              Terminate or suspend your access to all or part of the Website for any or no reason,
              including without limitation, any violation of these Terms of Use.
            </li>
          </ul>
          Without limiting the foregoing, we have the right to cooperate fully with any law
          enforcement authorities or court order requesting or directing us to disclose the identity
          or other information of anyone posting any materials on or through the Website. YOU WAIVE
          AND HOLD HARMLESS THE COMPANY AND ITS AFFILIATES, LICENSEES, AND SERVICE PROVIDERS FROM
          ANY CLAIMS RESULTING FROM ANY ACTION TAKEN BY ANY OF THE FOREGOING PARTIES DURING, OR
          TAKEN AS A CONSEQUENCE OF, INVESTIGATIONS BY EITHER SUCH PARTIES OR LAW ENFORCEMENT
          AUTHORITIES.
          <br />
          However, we do not undertake to review material before it is posted on the Website, and
          cannot ensure prompt removal of objectionable material after it has been posted.
          Accordingly, we assume no liability for any action or inaction regarding transmissions,
          communications, or content provided by any user or third party. We have no liability or
          responsibility to anyone for performance or nonperformance of the activities described in
          this section. <br />
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Content Standards
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          These content standards apply to any and all User Contributions and use of Interactive
          Services. User Contributions must in their entirety comply with all applicable federal,
          state, local, and international laws and regulations. Without limiting the foregoing, User
          Contributions must not:
          <ul>
            <li>
              Contain any material that is defamatory, obscene, indecent, abusive, offensive,
              harassing, violent, hateful, inflammatory, or otherwise objectionable.
            </li>
            <li>
              Promote sexually explicit or pornographic material, violence, or discrimination based
              on race, sex, religion, nationality, disability, sexual orientation, or age.
            </li>
            <li>
              Infringe any patent, trademark, trade secret, copyright, or other intellectual
              property or other rights of any other person.
            </li>
            <li>
              Violate the legal rights (including the rights of publicity and privacy) of others or
              contain any material that could give rise to any civil or criminal liability under
              applicable laws or regulations or that otherwise may be in conflict with these Terms
              of Use and our Privacy Policy [LINK TO PRIVACY POLICY].
            </li>
            <li>Be likely to deceive any person.</li>
            <li>Promote any illegal activity, or advocate, promote, or assist any unlawful act.</li>
            <li>
              Cause annoyance, inconvenience, or needless anxiety or be likely to upset, embarrass,
              alarm, or annoy any other person.
            </li>
            <li>
              Impersonate any person, or misrepresent your identity or affiliation with any person
              or organizer.
            </li>
            <li>
              Involve commercial activities or sales, such as contests, sweepstakes, and other sales
              promotions, barter, or advertising.
            </li>
            <li>
              Give the impression that they emanate from or are endorsed by us or any other person
              or entity, if this is not the case.
            </li>
          </ul>
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Copyright Infringement
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          If you believe that any User Contributions violate your copyright, please see our
          Copyright Policy [LINK TO COPYRIGHT POLICY] for instructions on sending us a notice of
          copyright infringement. It is the policy of the Company to terminate the user accounts of
          repeat infringers.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Reliance on Information Posted
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          The information presented on or through the Website is made available solely for general
          information purposes. We do not warrant the accuracy, completeness, or usefulness of this
          information. Any reliance you place on such information is strictly at your own risk. We
          disclaim all liability and responsibility arising from any reliance placed on such
          materials by you or any other visitor to the Website, or by anyone who may be informed of
          any of its contents.
          <br />
          This Website may include content provided by third parties, including materials provided
          by other users, bloggers, and third-party licensors, syndicators, aggregators, and/or
          reporting services. All statements and/or opinions expressed in these materials, and all
          articles and responses to questions and other content, other than the content provided by
          the Company, are solely the opinions and the responsibility of the person or entity
          providing those materials. These materials do not necessarily reflect the opinion of the
          Company. We are not responsible, or liable to you or any third party, for the content or
          accuracy of any materials provided by any third parties.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Changes to the Website
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          We may update the content on this Website from time to time, but its content is not
          necessarily complete or up-to-date. Any of the material on the Website may be out of date
          at any given time, and we are under no obligation to update such material.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Information About You and Your Visits to the Website
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          All information we collect on this Website is subject to our Privacy Policy [LINK TO
          PRIVACY POLICY]. By using the Website, you consent to all actions taken by us with respect
          to your information in compliance with the Privacy Policy.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Plan Terms, Payment and Termination
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          AUTOMATIC BILLING. By subscribing to any offerings or services (the “Services”) on the
          Website and electing to utilize a recurring payment plan, you authorize Game Rogue, LLC to
          automatically charge your credit card on file on a monthly basis until you terminate your
          plan as described in these Terms of Use. You are responsible for providing Game Rogue, LLC
          with your most current billing information.
          <br />
          1. Plan Term – Your Cancellation. You may access and use the Services beginning on the
          date you subscribe, and continuing until canceled or terminated in accordance with the
          terms of these Terms of Use. You may cancel your plan at any time. You must call us at
          1-800-xxx-xxxx or send us an email at [EMAIL] to cancel your plan subscription. If you
          call us, you must do so between the hours of X and Y, ET. All hours of operation are
          subject to change without notice. Your cancellation will be effective on the date we
          receive your notification or on a later date that you request. You may also cancel your
          plan subscription by visiting the billing portal website at *INSERT LINK* and selecting
          “Cancel My Subscription”. Your cancellation will be effective at the end of the current
          period. UNINSTALLING OUR APP FROM YOUR DEVICES DOES NOT CANCEL YOUR PLAN SUBSCRIPTION.
          <br />
          2. Automatic Renewal. A paid subscription plan will automatically renew monthly, unless
          you cancel prior to that renewal, your plan is canceled by us, or you select a different
          plan. Payments are processed by a third-party service provider, [INSERT THIRD PARTY
          PROVIDER], Game Rogue, LLC may change the price for the Service from time to time and will
          communicate any price changes to you in advance and, if applicable, how to accept those
          changes. Your account will automatically be charged at the rates in effect at the time of
          each renewal, plus fees and taxes. If you do not accept the change in pricing, you have
          the right to reject the change by canceling your plan prior to the change taking effect.
          Changes in pricing will take effect at the start of the next month following the date of
          the price change.
          <br />
          3. Termination. We may cancel your plan if you fail to pay for your plan, breach this
          Agreement, or for any other reason at our sole discretion. IF YOUR PLAN IS CANCELED, YOU
          ARE RESPONSIBLE FOR PAYMENT OF ANY OUTSTANDING BALANCES ON YOUR ACCOUNT, INCLUDING ANY
          FEES YOU MAY INCUR OR MAY HAVE INCURRED. In addition, we may deny, suspend, terminate or
          restrict your access to all or part of the Services without notice if we determine in our
          reasonable discretion that you have used the Services in breach of these Terms of Use.
          <br />
          4. Post-Termination Obligations. Following cancellation or termination, you shall
          immediately cease use of the Services and any license granted to you under any agreement
          related to your use of the Services shall immediately terminate. Upon termination, we may
          delete all of your data, and other information stored on our servers.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Linking to the Website and Social Media Features
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          You may link to our homepage, provided you do so in a way that is fair and legal and does
          not damage our reputation or take advantage of it, but you must not establish a link in
          such a way as to suggest any form of association, approval, or endorsement on our part
          without our express written consent. <br />
          This Website may provide certain social media features that enable you to:
          <ul>
            <li>
              Link from your own or certain third-party websites to certain content on this Website.
            </li>
            <li>
              Send emails or other communications with certain content, or links to certain content,
              on this Website.
            </li>
            <li>
              Cause limited portions of content on this Website to be displayed or appear to be
              displayed on your own or certain third-party websites.
            </li>
          </ul>
          You may use these features solely as they are provided by us, solely with respect to the
          content they are displayed with, and otherwise in accordance with any additional terms and
          conditions we provide with respect to such features. Subject to the foregoing, you must
          not:
          <ul>
            <li>Establish a link from any website that is not owned by you.</li>
            <li>
              Cause the Website or portions of it to be displayed on, or appear to be displayed by,
              any other site, for example, framing, deep linking, or in-line linking.
            </li>
            <li>Link to any part of the Website other than the homepage.</li>
            <li>
              Otherwise take any action with respect to the materials on this Website that is
              inconsistent with any other provision of these Terms of Use.
            </li>
          </ul>
          You agree to cooperate with us in causing any unauthorized framing or linking immediately
          to stop. We reserve the right to withdraw linking permission without notice.
          <br />
          We may disable all or any social media features and any links at any time without notice
          at our discretion.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Links from the Website
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          If the Website contains links to other sites and resources provided by third parties,
          these links are provided for your convenience only. This includes links contained in
          advertisements, including banner advertisements and sponsored links. We have no control
          over the contents of those sites or resources, and accept no responsibility for them or
          for any loss or damage that may arise from your use of them. If you decide to access any
          of the third-party websites linked to this Website, you do so entirely at your own risk
          and subject to the terms and conditions of use for such websites.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Geographic Restrictions
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          The owner of the Website is based in the Commonwealth of Pennsylvania in the United
          States. We provide this Website for use only by persons located in the United States. We
          make no claims that the Website or any of its content is accessible or appropriate outside
          of the United States. Access to the Website may not be legal by certain persons or in
          certain countries. If you access the Website from outside the United States, you do so on
          your own initiative and are responsible for compliance with local laws.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Disclaimer of Warranties
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          You understand that we cannot and do not guarantee or warrant that files available for
          downloading from the internet or the Website will be free of viruses or other destructive
          code. You are responsible for implementing sufficient procedures and checkpoints to
          satisfy your particular requirements for anti-virus protection and accuracy of data input
          and output, and for maintaining a means external to our site for any reconstruction of any
          lost data. TO THE FULLEST EXTENT PROVIDED BY LAW, WE WILL NOT BE LIABLE FOR ANY LOSS OR
          DAMAGE CAUSED BY A DISTRIBUTED DENIAL-OF-SERVICE ATTACK, VIRUSES, OR OTHER TECHNOLOGICALLY
          HARMFUL MATERIAL THAT MAY INFECT YOUR COMPUTER EQUIPMENT, COMPUTER PROGRAMS, DATA, OR
          OTHER PROPRIETARY MATERIAL DUE TO YOUR USE OF THE WEBSITE OR ANY SERVICES OR ITEMS
          OBTAINED THROUGH THE WEBSITE OR TO YOUR DOWNLOADING OF ANY MATERIAL POSTED ON IT, OR ON
          ANY WEBSITE LINKED TO IT.
          <br />
          YOUR USE OF THE WEBSITE, ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE
          WEBSITE IS AT YOUR OWN RISK. THE WEBSITE, ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED
          THROUGH THE WEBSITE ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY
          WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. NEITHER THE COMPANY NOR ANY PERSON
          ASSOCIATED WITH THE COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE
          COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE WEBSITE.
          WITHOUT LIMITING THE FOREGOING, NEITHER THE COMPANY NOR ANYONE ASSOCIATED WITH THE COMPANY
          REPRESENTS OR WARRANTS THAT THE WEBSITE, ITS CONTENT, OR ANY SERVICES OR ITEMS OBTAINED
          THROUGH THE WEBSITE WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS
          WILL BE CORRECTED, THAT OUR SITE OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES
          OR OTHER HARMFUL COMPONENTS, OR THAT THE WEBSITE OR ANY SERVICES OR ITEMS OBTAINED THROUGH
          THE WEBSITE WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS. <br />
          TO THE FULLEST EXTENT PROVIDED BY LAW, THE COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY
          KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO
          ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.
          <br />
          THE FOREGOING DOES NOT AFFECT ANY WARRANTIES THAT CANNOT BE EXCLUDED OR LIMITED UNDER
          APPLICABLE LAW.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Limitation on Liability
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE COMPANY, ITS AFFILIATES, OR
          THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE
          FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR
          USE, OR INABILITY TO USE, THE WEBSITE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE
          WEBSITE OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN
          AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR
          ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY
          TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE. <br />
          The limitation of liability set out above does not apply to liability resulting from our
          gross negligence or willful misconduct.
          <br />
          THE FOREGOING DOES NOT AFFECT ANY LIABILITY THAT CANNOT BE EXCLUDED OR LIMITED UNDER
          APPLICABLE LAW.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Indemnification
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          You agree to defend, indemnify, and hold harmless the Company, its affiliates, licensors,
          and service providers, and its and their respective officers, directors, employees,
          contractors, agents, licensors, suppliers, successors, and assigns from and against any
          claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees
          (including reasonable attorneys' fees) arising out of or relating to your violation of
          these Terms of Use or your use of the Website, including, but not limited to, your User
          Contributions, any use of the Website's content, services, and products other than as
          expressly authorized in these Terms of Use, or your use of any information obtained from
          the Website.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Governing Law and Jurisdiction
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          All matters relating to the Website and these Terms of Use, and any dispute or claim
          arising therefrom or related thereto (in each case, including non-contractual disputes or
          claims), shall be governed by and construed in accordance with the internal laws of the
          Commonwealth of Pennsylvania without giving effect to any choice or conflict of law
          provision or rule (whether of the Commonwealth of Pennsylvania or any other jurisdiction).
          <br />
          Any legal suit, action, or proceeding arising out of, or related to, these Terms of Use or
          the Website shall be instituted exclusively in the federal courts of the United States or
          the courts of the Commonwealth of Pennsylvania, although we retain the right to bring any
          suit, action, or proceeding against you for breach of these Terms of Use in your country
          of residence or any other relevant country. You waive any and all objections to the
          exercise of jurisdiction over you by such courts and to venue in such courts.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Arbitration
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          At Company's sole discretion, it may require You to submit any disputes arising from these
          Terms of Use or use of the Website, including disputes arising from or concerning their
          interpretation, violation, invalidity, non-performance, or termination, to final and
          binding arbitration under the Rules of Arbitration of the American Arbitration Association
          applying Pennsylvania law.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Limitation on Time to File Claims
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR RELATING TO THESE TERMS OF USE
          OR THE WEBSITE MUST BE COMMENCED WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES;
          OTHERWISE, SUCH CAUSE OF ACTION OR CLAIM IS PERMANENTLY BARRED.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Waiver and Severability
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          No waiver by the Company of any term or condition set out in these Terms of Use shall be
          deemed a further or continuing waiver of such term or condition or a waiver of any other
          term or condition, and any failure of the Company to assert a right or provision under
          these Terms of Use shall not constitute a waiver of such right or provision.
          <br />
          If any provision of these Terms of Use is held by a court or other tribunal of competent
          jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision shall
          be eliminated or limited to the minimum extent such that the remaining provisions of the
          Terms of Use will continue in full force and effect.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Entire Agreement
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          The Terms of Use and our [PRIVACY POLICY] constitute the sole and entire agreement between
          you and Game Rogue, LLC regarding the Website and supersede all prior and contemporaneous
          understandings, agreements, representations, and warranties, both written and oral,
          regarding the Website.
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Your Comments and Concerns
        </Typography>
        <Typography variant="body1" sx={{ color: "white" }}>
          This website is owned and operated by Game Rogue, LLC.
          <br />
          All feedback, comments, requests for technical support, and other communications relating
          to the Website should be directed to: [EMAIL ADDRESS].
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfUseDialog;
