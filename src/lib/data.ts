export const tours = [
  {
    id: 1,
    name: "Vịnh Hạ Long 2N1Đ",
    from: "Hà Nội",
    days: "2 ngày 1 đêm",
    price: 1890000,
    old: 2300000,
    tone: "from-sky-700 to-teal-400",
    img: "/halong.jpg",
  },
  {
    id: 2,
    name: "Phú Quốc nghỉ dưỡng",
    from: "TP.HCM",
    days: "3 ngày 2 đêm",
    price: 3290000,
    old: 3900000,
    tone: "from-cyan-600 to-emerald-300",
    img: "/phuquoc.jpg",
  },
  {
    id: 3,
    name: "Đà Nẵng – Hội An – Bà Nà",
    from: "Đà Nẵng",
    days: "4 ngày 3 đêm",
    price: 4150000,
    old: 4800000,
    tone: "from-amber-500 to-orange-300",
    img: "/caurong.jpg",
  },
  {
    id: 4,
    name: "Sa Pa – Fansipan",
    from: "Hà Nội",
    days: "3 ngày 2 đêm",
    price: 2750000,
    old: 3200000,
    tone: "from-emerald-700 to-lime-300",
    img: "/sapa.jpg",
  },
];

export const places = [
  {
    id: 1,
    name: "Sun World Bà Nà Hills",
    city: "Đà Nẵng",
    price: 900000,
    tag: "Cáp treo + Cầu Vàng",
  },
  {
    id: 2,
    name: "VinWonders Nha Trang",
    city: "Khánh Hòa",
    price: 880000,
    tag: "Công viên giải trí",
  },
  {
    id: 3,
    name: "Hoàng thành Thăng Long",
    city: "Hà Nội",
    price: 30000,
    tag: "Di sản thế giới",
  },
  {
    id: 4,
    name: "Cố đô Huế – Đại Nội",
    city: "Thừa Thiên Huế",
    price: 200000,
    tag: "Di sản thế giới",
  },
  {
    id: 5,
    name: "Địa đạo Củ Chi",
    city: "TP.HCM",
    price: 125000,
    tag: "Di tích lịch sử",
  },
  {
    id: 6,
    name: "Cáp treo Fansipan",
    city: "Lào Cai",
    price: 750000,
    tag: "Cáp treo 3 dây",
  },
];

export const vnd = (n: number) => n.toLocaleString("vi-VN") + "đ";
