"use client";
import { useState } from "react";

const field =
  "w-full rounded-xl border border-ink/20 bg-white px-4 py-3 outline-none focus:border-lagoon";

export default function AgentForm() {
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    // TODO: gửi tới API, ví dụ: await fetch("/api/agents", { method: "POST", body: JSON.stringify(data) })
    console.log(data);
    setDone(true);
  }

  return (
    <section id="dai-ly" className="scroll-mt-16 bg-ocean py-20 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            Trở thành đại lý của <span className="text-amber-300">Moon Price</span>
          </h2>
          <p className="mt-4 max-w-md text-white/80">
            Bán vé cho khách của bạn, nhận hoa hồng đến 12% mỗi đơn và đối soát hàng tuần. Không phí
            đăng ký.
          </p>
        </div>

        {done ? (
          <div className="rounded-2xl bg-white p-8 text-ink" role="status">
            <p className="font-display text-2xl font-bold text-ocean">Đã gửi đăng ký</p>
            <p className="mt-2">Chúng tôi sẽ gọi cho bạn trong vòng 24 giờ làm việc.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl bg-white p-6 text-ink">
            <label className="grid gap-1 text-sm font-medium">
              Họ và tên
              <input name="name" required className={field} autoComplete="name" />
            </label>
            <label className="grid gap-1 text-sm font-medium">
              Số điện thoại
              <input
                name="phone"
                type="tel"
                required
                pattern="0[0-9]{9}"
                title="10 chữ số, bắt đầu bằng 0"
                className={field}
                autoComplete="tel"
              />
            </label>
            <label className="grid gap-1 text-sm font-medium">
              Email
              <input name="email" type="email" required className={field} autoComplete="email" />
            </label>
            <label className="grid gap-1 text-sm font-medium">
              Tỉnh / thành phố
              <input name="city" required className={field} />
            </label>
            <button className="rounded-xl bg-sun py-3 font-bold hover:brightness-95">
              Gửi đăng ký
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
