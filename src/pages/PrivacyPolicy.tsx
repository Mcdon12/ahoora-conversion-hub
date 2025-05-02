
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    // Track page view in GTM
    window.dataLayer?.push({
      event: 'page_view',
      page_title: 'Privacy Policy',
      page_path: '/privacy-policy'
    });
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-ahoora-purple">Ahoora Privacy Policy</h1>
          <p className="text-gray-600 mb-6">Effective: October 1, 2024</p>

          <div className="prose prose-lg max-w-none">
            <p>
              We at Ahoora (together with Metrics Flow Inc., "we", "our" or "us") respect your privacy and are strongly committed to securing any information we obtain from you. This Privacy Policy describes our practices with respect to Personal Information we collect when you use our website, applications, and services (collectively, "Services").
            </p>

            <p className="mt-4">
              The Website and Ahoora's artificial intelligence platform (the "Ahoora AI Platform") are intended exclusively for marketers in their business capacity. We do not offer products or services for use by individuals for their personal, family, or household purposes. Accordingly, we treat all personal information we collect in connection with the Website as pertaining to individuals in their capacities as representatives of the relevant business and not their individual personal capacities.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">1. Personal information we collect</h2>
            <p>We collect personal information relating to you ("Personal Information") as follows:</p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-700">Personal information you provide:</h3>
            <p>We collect Personal Information if you create an account to use our Services or communicate with us as follows:</p>

            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Account Information:</strong> When you create an account with us, we will collect information associated with your account, including your name, contact information, account credentials, payment card information, and transaction history, (collectively, "Account Information").</li>
              <li><strong>User Content:</strong> When you use our Services, we collect Personal Information that is included in the input, file uploads, or feedback that you provide to our Services ("Content").</li>
              <li><strong>Communication Information:</strong> If you communicate with us, we collect your name, contact information, and the contents of any messages you send ("Communication Information").</li>
              <li><strong>Social Media Information:</strong> We have pages on social media sites like Instagram, Facebook, Medium, Twitter, YouTube, and LinkedIn. When you interact with our social media pages, we will collect Personal Information that you elect to provide to us, such as your contact details (collectively, "Social Information"). In addition, the companies that host our social media pages may provide us with aggregate information and analytics about our social media activity.</li>
              <li><strong>Other Information You Provide:</strong> We collect other information that you may provide to us, such as when you participate in our events or surveys or provide us with information to establish your identity (collectively, "Other Information You Provide").</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-700">Personal information we receive automatically from your use of the Services:</h3>
            <p>When you visit, use, or interact with the Services, we receive the following information about your visit, use, or interactions ("Technical Information"):</p>
            
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Log Data:</strong> Information that your browser or device automatically sends when you use our Services. Log data includes your Internet Protocol address, browser type and settings, the date and time of your request, and how you interact with our Services.</li>
              <li><strong>Usage Data:</strong> We may automatically collect information about your use of the Services, such as the types of content that you view or engage with, the features you use and the actions you take, as well as your time zone, country, the dates and times of access, user agent and version, type of computer or mobile device, and your computer connection.</li>
              <li><strong>Device Information:</strong> Includes name of the device, operating system, device identifiers, and browser you are using. Information collected may depend on the type of device you use and its settings.</li>
              <li><strong>Cookies:</strong> We use cookies to operate and administer our Services, and improve your experience. A "cookie" is a piece of information sent to your browser by a website you visit. You can set your browser to accept all cookies, to reject all cookies, or to notify you whenever a cookie is offered so that you can decide each time whether to accept it. However, refusing a cookie may in some cases preclude you from using, or negatively affect the display or function of, a website or certain areas or features of a website.</li>
              <li><strong>Analytics:</strong> We may use a variety of online analytics products that use cookies to help us analyze how users use our Services and enhance your experience when you use the Services.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">2. How we use personal information</h2>
            <p>We may use Personal Information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>To provide, administer, maintain and/or analyze the Services;</li>
              <li>To improve our Services and conduct research;</li>
              <li>To communicate with you, including to send you information about our Services and events;</li>
              <li>To develop new programs and services;</li>
              <li>To prevent fraud, criminal activity, or misuses of our Services, and to protect the security of our IT systems, architecture, and networks;</li>
              <li>To carry out business transfers; and</li>
              <li>To comply with legal obligations and legal processes and to protect our rights, privacy, safety, or property, and/or that of our affiliates, you, or other third parties.</li>
            </ul>

            <p className="mt-4">
              <strong>Aggregated or de-identified information.</strong> We may aggregate or de-identify Personal Information so that it may no longer be used to identify you and use such information to analyze the effectiveness of our Services, to improve and add features to our Services, to conduct research and for other similar purposes. In addition, from time to time, we may analyze the general behavior and characteristics of users of our Services and share aggregated information like general user statistics with third parties, publish such aggregated information or make such aggregated information generally available. We may collect aggregated information through the Services, through cookies, and through other means described in this Privacy Policy. We will maintain and use de-identified information in anonymous or de-identified form and we will not attempt to reidentify the information, unless required by law.
            </p>

            <p className="mt-4">
              As noted above, we may use Content you provide us to improve our Services, for example to train the models that power Ahoora.
            </p>

            {/* Continue with sections 3-11... */}
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">3. Disclosure of personal information</h2>
            {/* Content continues... */}
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">11. How to contact us</h2>
            <p>
              Please info@metricsflow.com if you have any questions or concerns not already addressed in this Privacy Policy.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
