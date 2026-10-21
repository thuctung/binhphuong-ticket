"use client";

import { useState } from "react";
import { z } from "zod";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { REGISTER_AFFILIATE } from "@/commons/apiURL";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import EyeIcon from "@/components/ui/eye-icon";
import LabelForm from "@/components/ui/customs/forms/label";
import InputForm from "@/components/ui/customs/forms/input/input";

const schema = z
  .object({
    fullName: z.string().trim().min(2, "Vui lòng nhập họ và tên"),
    phone: z
      .string()
      .trim()
      .min(8, "SĐT quá ngắn")
      .max(15, "SĐT quá dài")
      .regex(/^[0-9+ ]+$/, "SĐT chỉ nên gồm số"),
    email: z.string().trim().email("Email không hợp lệ"),
    username: z
      .string()
      .trim()
      .min(3, "Username tối thiểu 3 ký tự")
      .max(30, "Username tối đa 30 ký tự")
      .regex(/^[a-zA-Z0-9._-]+$/, "Username chỉ gồm chữ/số và . _ -")
      .optional()
      .or(z.literal("")),
    address: z.string().trim().min(5, "Vui lòng nhập địa chỉ"),
    password: z.string().min(8, "Mật khẩu tối thiểu 8 ký tự"),
    passwordConfirm: z.string().min(8, "Vui lòng nhập lại mật khẩu"),
  })
  .refine((v) => v.password === v.passwordConfirm, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["passwordConfirm"],
  });

type Values = z.infer<typeof schema>;

export default function DaiLyController() {
  const [values, setValues] = useState<Values>({
    fullName: "",
    phone: "",
    email: "",
    username: "",
    address: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const setField = <K extends keyof Values>(key: K, val: Values[K]) =>
    setValues((p) => ({ ...p, [key]: val }));

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const parsed = schema.safeParse(values);
      if (!parsed.success) {
        const map: Record<string, string> = {};
        for (const issue of parsed.error.issues) {
          const k = issue.path[0] ? String(issue.path[0]) : "form";
          if (!map[k]) map[k] = issue.message;
        }
        setErrors(map);
        return;
      }

      setErrors({});

      const res = await fetch(REGISTER_AFFILIATE, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fullName: parsed.data.fullName,
          phone: parsed.data.phone,
          email: parsed.data.email,
          username: parsed.data.username?.trim() ? parsed.data.username.trim() : null,
          address: parsed.data.address,
          password: parsed.data.password,
        }),
      });
      const json = (await res.json()) as {
        ok: boolean;
        error?: string;
        message?: string;
      };

      if (!res.ok || !json.ok) {
        setError(json.message ?? "Đăng ký thất bại");
        return;
      }

      // Let the user login after registration.
      alert("Đã đăng ký. Vui lòng đăng nhập và đợi admin duyệt.");
      setValues({
        fullName: "",
        phone: "",
        email: "",
        username: "",
        address: "",
        password: "",
        passwordConfirm: "",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#fafafa] px-4 py-10 text-neutral-900 antialiased [background-image:radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:20px_20px]">
      {/* Card */}
      <section className="w-full max-w-[680px] rounded-2xl border border-neutral-200 bg-white px-6 pb-6 pt-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col items-center text-center my-4">
          <Image
            src="/logo1.png"
            alt="Minh Tuan Travel"
            width={48}
            height={48}
            className="object-contain mix-blend-multiply"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
          <h1 className="mt-4 text-[17px] font-semibold tracking-tight">Đăng ký đại lý</h1>
        </div>
        {/* Form */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <LabelForm text="Họ và tên" htmlFor="fullName" />
            <InputForm
              id="fullName"
              name="fullName"
              value={values.fullName}
              onChange={(value: string) => setField("fullName", value)}
              placeholder="Nguyễn Văn A"
            />
            {errors.fullName && <p className="text-[11px] text-destructive">{errors.fullName}</p>}
          </div>
          <div className="space-y-2 ">
            <LabelForm text="Username" htmlFor="username" />
            <InputForm
              id="username"
              name="username"
              value={values.username ?? ""}
              onChange={(value: string) => setField("username", value)}
              placeholder="vd: van.nguyen"
            />
            {errors.username && <p className="text-[11px] text-destructive">{errors.username}</p>}
          </div>

          <div className="space-y-2">
            <LabelForm text="Số điện thoại" htmlFor="phone" />
            <InputForm
              id="phone"
              name="phone"
              value={values.phone}
              onChange={(value: string) => setField("phone", value)}
              placeholder="09xxxxxxxx"
            />
            {errors.phone && <p className="text-[11px] text-destructive">{errors.phone}</p>}
          </div>
          <div>
            <LabelForm
              htmlFor="email"
              className="mb-1.5 block text-[11px] font-semibold"
              text="Email"
            />
            <InputForm
              id="email"
              name="email"
              type="email"
              placeholder="you@gmail.com"
              value={values.email}
              onChange={(value: string) => setField("email", value)}
            />
            {errors.email && <p className="text-[11px] text-destructive">{errors.email}</p>}
          </div>
          <div className="space-y-2 md:col-span-2">
            <LabelForm text="Địa chỉ" htmlFor="address" />
            <InputForm
              id="address"
              name="address"
              value={values.address}
              onChange={(value: string) => setField("address", value)}
              placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
            />
            {errors.address && <p className="text-[11px] text-destructive">{errors.address}</p>}
          </div>

          <div className="space-y-2 ">
            <div className="mb-1.5 flex items-center justify-between">
              <LabelForm htmlFor="password" className="text-[11px] font-semibold" text="Mật khẩu" />
            </div>
            <div className="relative">
              <InputForm
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={values.password}
                onChange={(value: string) => setField("password", value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-neutral-500 hover:text-neutral-900"
              >
                <EyeIcon off={showPassword} className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="space-y-2 ">
            <div className="mb-1.5 flex items-center justify-between">
              <LabelForm
                htmlFor="passwordConfirm"
                className="text-[11px] font-semibold"
                text="Nhập lại mật khẩu"
              />
            </div>
            <div className="relative">
              <InputForm
                id="passwordConfirm"
                name="passwordConfirm"
                type={showPasswordConfirm ? "text" : "password"}
                placeholder="••••••••"
                value={values.passwordConfirm}
                onChange={(value: string) => setField("passwordConfirm", value)}
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirm((v) => !v)}
                aria-label={showPasswordConfirm ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-neutral-500 hover:text-neutral-900"
              >
                <EyeIcon off={showPasswordConfirm} className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className=" text-[11px] text-[red] text-destructive">{error}</p>
          <div className="space-y-2 md:col-span-2">
            <button
              disabled={submitting}
              onClick={submit}
              className="h-10 w-full rounded-lg bg-[#61a05e] text-xs font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
            >
              {submitting ? "Đang gửi..." : "Gửi đăng ký"}
            </button>
          </div>
        </div>{" "}
        <Link href="/">
          <div className="mt-4 flex items-center gap-1.5 text-xs font-medium underline underline-offset-2 hover:text-neutral-600">
            <ArrowLeftIcon size={14} /> Trang chủ
          </div>
        </Link>
      </section>
    </main>
  );
}
