// import { useState } from 'react'

// import { SectionsContainer, Section } from 'react-fullpage';
// import Hero from './Hero';
// import ServiceSteps from './ServiceSteps';
// import DigitalMarketingStrategy from './DigitalMarketingStrategy';
// import ServiceOfferings from './ServiceOfferings';
// import GoalsAchieved from './GoalsAchieved';
// import PricingPlans from './PricingPlans';
// import WhyUs from './WhyUs';
// import ContactForm from './ContactForm';
// import Footer from './Footer';


// function MainContect() {
//   const [count, setCount] = useState(0)

//   let options = {
//     sectionClassName: 'section',
//     anchors: ['Hero', 'ServiceSteps', 'DigitalMarketingStrategy', 'ServiceOfferings', 'GoalsAchieved', 'PricingPlans', 'WhyUs',  'ContactForm','Footer'],
//     scrollBar: false,
//     navigation: true,
//     verticalAlign: false,
//     // sectionPaddingTop:    '50px',
//     // sectionPaddingBottom: '50px',
//     arrowNavigation: true
//   };

//   return (
//     <div className="flex flex-col items-center pb-20 bg-white border border-black border-solid">
      

//       <SectionsContainer {...options}>
//         <Section>
//           <Hero />
//         </Section>
//         <Section>
//           <ServiceSteps />
//         </Section>
//         <Section>
//           <DigitalMarketingStrategy />
//         </Section>
//         <Section>
//           <ServiceOfferings />
//         </Section>
//         <Section>
//           <GoalsAchieved />
//         </Section>
//         <Section>
//           <PricingPlans />
//         </Section>
//         <Section>
//           <WhyUs />
//         </Section>
//         {/* <Section>
//           <ContactInfo />
//         </Section> */}
//         <Section>
//           <ContactForm />
//         </Section>
//         <Section>
//           <Footer />
//         </Section>
//       </SectionsContainer>

//     </div>
//   )
// }

// export default MainContect


import React, { lazy, Suspense } from "react";
import { SectionsContainer, Section } from "react-fullpage";

// Lazy load components
const Hero = lazy(() => import("./Hero"));
const ServiceSteps = lazy(() => import("./ServiceSteps"));
const DigitalMarketingStrategy = lazy(() =>
  import("./DigitalMarketingStrategy")
);
const ServiceOfferings = lazy(() => import("./ServiceOfferings"));
const GoalsAchieved = lazy(() => import("./GoalsAchieved"));
const PricingPlans = lazy(() => import("./PricingPlans"));
const WhyUs = lazy(() => import("./WhyUs"));
const ContactForm = lazy(() => import("./ContactForm"));
const Footer = lazy(() => import("./Footer"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">Loading...</div>
);

const MainContent = () => {
  const options = {
    sectionClassName: "section",
    anchors: [
      "Hero",
      "ServiceSteps",
      "DigitalMarketingStrategy",
      "ServiceOfferings",
      "GoalsAchieved",
      "PricingPlans",
      "WhyUs",
      "ContactForm",
      "Footer",
    ],
    scrollBar: false,
    navigation: true,
    verticalAlign: false,
    arrowNavigation: true,
    afterLoad: (origin, destination, direction) => {
      console.log("Section loaded:", destination.anchor);
      // You can add analytics tracking here
    },
  };

  const sections = [
    { component: Hero, name: "Hero" },
    { component: ServiceSteps, name: "ServiceSteps" },
    { component: DigitalMarketingStrategy, name: "DigitalMarketingStrategy" },
    { component: ServiceOfferings, name: "ServiceOfferings" },
    { component: GoalsAchieved, name: "GoalsAchieved" },
    { component: PricingPlans, name: "PricingPlans" },
    { component: WhyUs, name: "WhyUs" },
    { component: ContactForm, name: "ContactForm" },
    { component: Footer, name: "Footer" },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <Suspense fallback={<LoadingFallback />}>
        <SectionsContainer {...options}>
          {sections.map(({ component: Component, name }) => (
            <Section key={name}>
              <Component />
            </Section>
          ))}
        </SectionsContainer>
      </Suspense>
    </div>
  );
};

export default MainContent;