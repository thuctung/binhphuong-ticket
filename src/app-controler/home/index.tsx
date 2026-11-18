import Banner from "./components/Banner";
import Tours from "./components/Tours";
import Locations from "./components/Locations";
import About from "./components/About";
import Consult from "./components/Consult";
import { SiteType } from "@/types/ticket";

import CompanyInfo from "./components/CompanyInfo.";


const HomeA = async ({ lng, sites }: { lng: string; sites: SiteType[] }) => {
  return (
    <main>
      <Banner lng={lng} sites={sites} />
      <Locations lng={lng} sites={sites} />
      <Tours lng={lng} />
      <Consult />
      <About />
      <CompanyInfo lng={lng} />
    </main>
  );
};

export default HomeA;
