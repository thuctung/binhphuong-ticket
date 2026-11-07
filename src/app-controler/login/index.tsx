"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ACC_STATUS, ROLES } from "@/commons/constant";
import { ProfileStoteType, useProfileStore } from "@/stores/useProfileStore";
import ForgotPassword from "@/components/site/ForgotPassword";
import { sv_Login } from "./api";
import Link from "next/link";
import Image from "next/image";
import { AlertCircleIcon, ArrowLeftIcon, Loader2Icon, LockIcon, MailIcon } from "lucide-react";
import EyeIcon from "@/components/ui/eye-icon";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openForgotPass, setOpenForgotpass] = useState(false);
  const { setErrorMessage }: any = useProfileStore.getState();

  const { profile, errorMessage, isLogin }: ProfileStoteType = useProfileStore(
    (state: any) => state
  );

  const handleAfterLogin = () => {
    if (profile.role === ROLES.ADMIN) {
      router.push("/admin");
    } else if (profile.status === ACC_STATUS.APPROVED) {
      router.push("/affiliate");
    }
  };

  useEffect(() => {
    if (profile.role) {
      handleAfterLogin();
    }
  }, [profile]);

  const signIn = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (isLogin) return;
    sv_Login({
      email,
      password,
    });
  };

  const closeDialog = (value: boolean) => {
    setOpenForgotpass(value);
  };
  useEffect(() => {
    setErrorMessage("");
  }, []);

  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0b1020] px-4 py-10 text-neutral-100 antialiased [background-image:radial-gradient(circle_at_50%_-5%,rgba(250,204,21,0.35)_0%,rgba(250,204,21,0.1)_30%,transparent_60%),radial-gradient(rgba(253,230,138,0.35)_1px,transparent_1px)] [background-size:100%_100%,28px_28px] before:pointer-events-none before:absolute before:left-1/2 before:top-8 before:-z-10 before:h-24 before:w-24 before:-translate-x-1/2 before:rounded-full before:bg-[radial-gradient(circle_at_35%_35%,#fffbeb,#fde68a_55%,#facc15)] before:shadow-[0_0_100px_40px_rgba(250,204,21,0.4)] before:content-['']">
      {/* Card */}
      <section className="w-full max-w-[400px] rounded-3xl border border-white/10 bg-white px-7 pb-7 pt-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/moonlogo.png"
            alt="Moon Price"
            width={56}
            height={56}
            className="object-contain mix-blend-multiply"
            sizes="56px"
            priority
          />
          <h1 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
            Chào mừng trở lại
          </h1>
          <p className="mt-1 text-[13px] text-slate-500">
            Đăng nhập để tiếp tục quản lý đại lý của bạn
          </p>
        </div>

        {/* Form */}
        <form onSubmit={signIn} className="mt-7 space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-slate-700">
              Email
            </label>
            <div className="relative">
              <MailIcon
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-[#61a05e] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#61a05e]/15"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="password" className="text-xs font-semibold text-slate-700">
                Mật khẩu
              </label>
              {/* <button
          type="button"
          onClick={() => setOpenForgotpass(true)}
          className="text-xs font-medium text-[#61a05e] hover:underline"
        >
          Quên mật khẩu?
        </button> */}
            </div>
            <div  className="relative">
              <LockIcon
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-11 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-[#61a05e] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#61a05e]/15"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-xl text-slate-400 transition-colors hover:text-slate-700"
              >
                <EyeIcon off={showPassword} className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Error */}
          {errorMessage ? (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-[13px] text-red-600"
            >
              <AlertCircleIcon size={16} className="mt-0.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          ) : null}

          {/* Submit */}
          <button
            disabled={isLogin}
            type="submit"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#6cae69] to-[#559652] text-sm font-semibold text-white shadow-[0_4px_12px_-2px_rgba(97,160,94,0.5)] transition-all hover:brightness-105 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#61a05e]/30 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLogin ? (
              <>
                <Loader2Icon size={16} className="animate-spin" />
                Đang đăng nhập...
              </>
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>
        {/* Back link */}
        <Link
          href="/"
          className="mt-5 flex items-center justify-center gap-1.5 text-[13px] font-medium text-slate-500 transition-colors hover:text-slate-900"
        >
          <ArrowLeftIcon size={14} />
          Về trang chủ
        </Link>
      </section>

      {/* Footer */}
      <p className="mt-5 text-xs  text-[#ffcb00]">
        Chưa có tài khoản?{" "}
        <Link
          href="/dai-ly"
          className="font-semibold  underline-offset-2 text-[#ffff] hover:underline "
        >
          Đăng kí đại lý
        </Link>
      </p>

      {openForgotPass && <ForgotPassword openForgotPass={openForgotPass} setOpen={closeDialog} />}
    </main>
  );
}
