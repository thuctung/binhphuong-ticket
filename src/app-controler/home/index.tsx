import Banner from "./components/Banner";
import Tours from "./components/Tours";
import Locations from "./components/Locations";
import About from "./components/About";
import Consult from "./components/Consult";

const HomeA = () => {
  return (
    <main>
      <Banner />
      <Locations />
      <Tours />
      <Consult />
      <About />
    </main>
  );
};

export default HomeA;
