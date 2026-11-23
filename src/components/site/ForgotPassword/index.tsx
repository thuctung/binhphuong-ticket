"use client";

import { useState } from "react";
import { sendEmailResetPassword } from "./api";
import Image from "next/image";

export default function ForgotPassword({
  openForgotPass,
  setOpen,
}: {
  openForgotPass: boolean;
  setOpen: any;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await sendEmailResetPassword(email);

    setLoading(false);
  };

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="forgot-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-900/20 ring-1 ring-slate-900/5 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300"
      >
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-white" />
        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-blue-200/30 blur-3xl" />

        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Đóng"
          className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="relative px-6 pb-7 pt-10 sm:px-8 sm:pb-8">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl  text-white shadow-lg shadow-blue-500/30 ring-4 ring-white">
              <Image alt="moonprince" src="/moonlogo.png" width={64} height={64} />
            </div>
            <h2 id="forgot-title" className="text-2xl font-extrabold tracking-tight text-slate-900">
              Quên mật khẩu?
            </h2>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-500">
              Đừng lo lắng, hãy nhập email của bạn và chúng tôi sẽ gửi link khôi phục.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="forgot-email"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Email
              </label>
              <div className="group relative">
                <svg
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path
                    d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  id="forgot-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  autoComplete="email"
                  placeholder="name@example.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 py-3.5 pl-12 pr-4 font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/15"
                />
              </div>
            </div>

            {message ? (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-xl bg-red-50 px-3.5 py-2.5 text-sm font-medium text-destructive"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="mt-0.5 size-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v5m0 3h.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{message}</span>
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 to-indigo-600 py-3.5 font-bold text-white shadow-lg shadow-green-500/30 transition-all hover:from-green-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-green-500/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:active:scale-100"
            >
              {loading ? (
                <>
                  <svg className="size-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="opacity-25"
                    />
                    <path
                      d="M21 12a9 9 0 00-9-9"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  Đang gửi...
                </>
              ) : (
                "Gửi link khôi phục"
              )}
            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="group flex w-full cursor-pointer items-center justify-center gap-1.5 py-2 text-sm font-semibold text-slate-500 transition-colors hover:text-blue-600"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-4 transition-transform group-hover:-translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Quay lại đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
