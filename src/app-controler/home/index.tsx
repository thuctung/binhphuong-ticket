import Banner from "./components/Banner";
import Tours from "./components/Tours";
import Locations from "./components/Locations";
import About from "./components/About";
import Consult from "./components/Consult";

const HomeA = async ({ lng }: { lng: string }) => {
  return (
    <main>
      <Banner lng={lng} />
      <Locations lng={lng} />
      <Tours lng={lng} />
      <Consult />
      <About />
    </main>
  );
};

export default HomeA;
