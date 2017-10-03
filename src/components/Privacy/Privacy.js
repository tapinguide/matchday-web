import React, { Component } from "react";
import logo from '../../images/tapin-logo.png';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import './css/privacy.css';

class Privacy extends Component {
  render() {
      var bigtext = "Privacy Policy";
      var smalltext = "";
    return (
         <div className="container-fluid">
            <div className="wrapper wrapper-matches">
              <div className="info desktop-header">
                <div className="header-logo">
                 <Link to="/">
                      <img alt="Tapin Guide Logo" src={logo} />
                    </Link>
                </div>
                <div className="bigtext">
                  <span>{bigtext}</span>
                </div>
              </div>
            <Header bigtext={bigtext} smalltext={smalltext} />
              <div className="matches-container">
                <div className="privacy">
                    <h2 className="c12" id="h.hbrhsigqhu3h"><span className="c5">Tap In Design L.L.C. Terms of Service and Privacy Policy</span></h2>
                    <h3 className="c0" id="h.8tn0da5mu7zd"><span className="c4">1. Terms</span></h3>
                    <p className="c3"><span>By accessing the website at </span><span className="c8"><a className="c9" href="https://www.tapinguide.com">https://www.tapinguide.com</a></span><span className="c2">, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.</span></p>
                    <h3 className="c0" id="h.vqphcxmcoidz"><span className="c4">2. Use License</span></h3>
                    <ol className="c1 lst-kix_xo2cn73nrs4c-0 start" start="1">
                        <li className="c3 c7"><span className="c2">Permission is granted to temporarily download one copy of the materials (information or software) on Tap In Design L.L.C.&#39;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</span></li>
                    </ol>
                    <ol className="c1 lst-kix_xo2cn73nrs4c-1 start" start="1">
                        <li className="c3 c6"><span className="c2">modify or copy the materials;</span></li>
                        <li className="c3 c6"><span className="c2">use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</span></li>
                        <li className="c3 c6"><span className="c2">attempt to decompile or reverse engineer any software contained on Tap In Design L.L.C.&#39;s website;</span></li>
                        <li className="c3 c6"><span className="c2">remove any copyright or other proprietary notations from the materials; or</span></li>
                        <li className="c3 c6"><span className="c2">transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</span></li>
                    </ol>
                    <ol className="c1 lst-kix_xo2cn73nrs4c-0" start="2">
                        <li className="c3 c7"><span className="c2">This license shall automatically terminate if you violate any of these restrictions and may be terminated by Tap In Design L.L.C. at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</span></li>
                    </ol>
                    <h3 className="c0" id="h.jokxd87w7zl"><span className="c4">3. Disclaimer</span></h3>
                    <ol className="c1 lst-kix_r2ia8rgpg6ks-0 start" start="1">
                        <li className="c3 c7"><span className="c2">The materials on Tap In Design L.L.C.&#39;s website are provided on an &#39;as is&#39; basis. Tap In Design L.L.C. makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</span></li>
                        <li className="c3 c7"><span className="c2">Further, Tap In Design L.L.C. does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</span></li>
                    </ol>
                    <h3 className="c0" id="h.lab9npbrkf9h"><span className="c4">4. Limitations</span></h3>
                    <p className="c3"><span className="c2">In no event shall Tap In Design L.L.C. or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Tap In Design L.L.C.&#39;s website, even if Tap In Design L.L.C. or a Tap In Design L.L.C. authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</span></p>
                    <h3 className="c0" id="h.cddb9e6k041f"><span className="c4">5. Accuracy of materials</span></h3>
                    <p className="c3"><span className="c2">The materials appearing on Tap In Design L.L.C.&#39;s website could include technical, typographical, or photographic errors. Tap In Design L.L.C. does not warrant that any of the materials on its website are accurate, complete or current. Tap In Design L.L.C. may make changes to the materials contained on its website at any time without notice. However Tap In Design L.L.C. does not make any commitment to update the materials.</span></p>
                    <h3 className="c0" id="h.6ze94vr9iynp"><span className="c4">6. Links</span></h3>
                    <p className="c3"><span className="c2">Tap In Design L.L.C. has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Tap In Design L.L.C. of the site. Use of any such linked website is at the user&#39;s own risk.</span></p>
                    <h3 className="c0" id="h.9el57ljvdgd5"><span className="c4">7. Modifications</span></h3>
                    <p className="c3"><span className="c2">Tap In Design L.L.C. may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</span></p>
                    <h3 className="c0" id="h.5jyolh9zkfk3"><span className="c4">8. Governing Law</span></h3>
                    <p className="c3"><span className="c2">These terms and conditions are governed by and construed in accordance with the laws of Minnesota and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</span></p>
                    <h2 className="c12" id="h.y1rmnsw2gavo"><span className="c5">Privacy Policy</span></h2>
                    <p className="c3"><span className="c2"><span className="c2">Your privacy is important to us.</span><br />It is Tap In Design L.L.C.&#39;s policy to respect your privacy regarding any information we may collect while operating our website. Accordingly, we have developed this privacy policy in order for you to understand how we collect, use, communicate, disclose and otherwise make use of personal information. We have outlined our privacy policy below.</span></p>
                    <ul className="c1 lst-kix_hp4shbjnefly-0 start">
                        <li className="c3 c7"><span className="c2">We will collect personal information by lawful and fair means and, where appropriate, with the knowledge or consent of the individual concerned.</span></li>
                        <li className="c3 c7"><span className="c2">Before or at the time of collecting personal information, we will identify the purposes for which information is being collected.</span></li>
                        <li className="c3 c7"><span className="c2">We will collect and use personal information solely for fulfilling those purposes specified by us and for other ancillary purposes, unless we obtain the consent of the individual concerned or as required by law.</span></li>
                        <li className="c3 c7"><span className="c2">Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up-to-date.</span></li>
                        <li className="c3 c7"><span className="c2">We will protect personal information by using reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use or modification.</span></li>
                        <li className="c3 c7"><span className="c2">We will make readily available to customers information about our policies and practices relating to the management of personal information.</span></li>
                        <li className="c3 c7"><span className="c2">We will only retain personal information for as long as necessary for the fulfilment of those purposes.</span></li>
                    </ul>
                    <p className="c3"><span className="c2">We are committed to conducting our business in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained. Tap In Design L.L.C. may change this privacy policy from time to time at Tap In Design L.L.C.&#39;s sole discretion.</span></p>
                    <p className="c3 c11"><span className="c2"></span></p>
                  <Footer />
                </div>
              </div>

            </div>
          </div>

    );
  }
}

export default Privacy;
