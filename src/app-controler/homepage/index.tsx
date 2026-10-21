// "use client";

import Banner1 from "./components/Banner1";

// import { Banner } from "./components/banner";
import { ExperiencesSection } from "./components/ExperiencesSection";
import AffiliateIntro from "./components/CollaboratorSection";
import Faq from "./components/FaqSection";

// export default function HomePage() {
//   return (
//     <div className="bg-white text-neutral-900 antialiased font-sans selection:bg-blue-500 selection:text-white">
//       <Banner />
//       <ExperiencesSection />
//       <AffiliateIntro />
//       <Faq />
//     </div>
//   );
// }

const features = [
  ["Vé điện tử tức thì", "Thanh toán xong, mã QR gửi ngay về email. Quét mã để vào cổng."],
  ["Hoàn vé linh hoạt", "Tùy theo chính sách của từng điểm tham quan."],
  ["Giá niêm yết, không phụ thu", "Giá hiển thị là giá bạn trả. Có ưu đãi khi mua số lượng lớn."],
];

function Features() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-3">
        {features.map(([t, d]) => (
          <div key={t} className="border-l-4 border-leaf pl-5">
            <h3 className="font-display text-xl font-bold">{t}</h3>
            <p className="mt-2 text-sm text-ink/70">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <main>
        <Banner1 />
        <ExperiencesSection />
        <Features />
        <AffiliateIntro />
        <Faq />
      </main>
    </>
  );
}
