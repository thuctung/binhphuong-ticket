import { TicketResultQRType } from "@/types/ticket";

import { jsPDF } from "jspdf";
import QRCodePDF from "qrcode";
import dayjs from "dayjs";
import { BASIC_DATE_FORMAT, FULL_DATE_TIME_FORMAT } from "@/helpers/dateTime";
import {
  BNC_NOTES,
  FOC_GUIDES,
  FOC_NOTES,
  getGuideByProductCode,
  LogoBySite,
  NOTES,
} from "@/app-controler/affi/getTicket/components/constants";
import { getPerSonTypeName } from "@/components/GetTicketForm/constants";
import { get } from "lodash";
import { PHONE_FILE_PDF, SITE_CODES, SITE_SUB_GROUP } from "@/commons/constant";
import { getFontBase64, getFontBoldBase64, getImage } from "./loadFont";
import { formatVND } from "@/lib/money";

export const downloadTicketPDFServer = async (
  tickets: TicketResultQRType[],
  focTicket: TicketResultQRType[]
) => {
  const PAGE_W = 250;
  const PAGE_H = 630;
  const pdf = new jsPDF({
    unit: "px",
    format: [PAGE_W, PAGE_H],
  });

  const finalList = [...tickets, ...focTicket];

  const fontBase64 = getFontBase64();
  const bold = getFontBoldBase64();

  pdf.addFileToVFS("Roboto-Regular.ttf", fontBase64);
  pdf.addFont("Roboto-Regular.ttf", "Roboto", "normal");

  pdf.addFileToVFS("Roboto-Bold.ttf", bold);
  pdf.addFont("Roboto-Bold.ttf", "Roboto", "bold");

  // Load logos
  const moonPrice = getImage("/moonlogo.png");

  const logo = LogoBySite[finalList[0].siteCode as keyof typeof LogoBySite] ?? LogoBySite.HLS;

  const sunWorldLogo = getImage(logo);

  // Colors dùng xuyên suốt (theo đúng mẫu thiết kế)
  const GREEM_BRIGHT = [97, 160, 94] as const; // dải tiêu đề / nút "Mã vé" / footer
  const RED_DARK = [120, 14, 14] as const; // badge "MÃ ĐƠN"
  const GREEN_LABEL = [180, 20, 24] as const; // chữ label màu đỏ
  const TEXT_DARK = [40, 30, 30] as const;
  const TEXT_GUIDE = [70, 55, 55] as const;

  let indexTicket = 0;
  let indexFOCTicket = 0;

  for (let i = 0; i < finalList.length; i++) {
    if (i > 0) pdf.addPage();

    const t = finalList[i];

    const isFOCTicket = t.unitPrice === 0;

    isFOCTicket ? indexFOCTicket++ : indexTicket++;

    let y = 14;

    // Khung viền ngoài bo góc
    pdf.setDrawColor(225, 190, 190);
    pdf.setLineWidth(1);
    pdf.roundedRect(8, 8, PAGE_W - 16, PAGE_H - 16, 10, 10);

    // ===== HEADER: 2 logo =====
    pdf.addImage(sunWorldLogo, "PNG", 18, y, 70, 35);
    pdf.addImage(moonPrice, "PNG", PAGE_W - 50, y + 5, 30, 22);

    y += 34;

    // ===== TITLE BAR (đỏ) — hỗ trợ xuống dòng =====
    pdf.setFont("Roboto", "bold");
    pdf.setFontSize(13);
    const titleLines = pdf.splitTextToSize(t.productName, PAGE_W - 40);
    const lineHeight = 13;
    const titleBarPadding = 8;
    const titleBarH = titleLines.length * lineHeight + titleBarPadding * 2 - 4;

    pdf.setTextColor(0, 0, 0);
    titleLines.forEach((line: string, idx: number) => {
      pdf.text(line, PAGE_W / 2, y + titleBarPadding + 6 + idx * lineHeight, {
        align: "center",
      });
    });

    const leftX = 18;
    // ===== QR BOX =====
    y += 20;
    const qr = await QRCodePDF.toDataURL(isFOCTicket ? t.verifyCode : t.ticketNumber);
    pdf.addImage(qr, "PNG", leftX - 9, y, 120, 120);

    pdf.setFontSize(10);
    pdf.setFont("Roboto", "bold");
    const leftTextQR = 120;
    let yTextQR = y + 20;
    //  ===== SITE =====
    pdf.setTextColor(...GREEN_LABEL);
    pdf.text("Site:", leftTextQR, yTextQR);
    pdf.setTextColor(...TEXT_DARK);
    pdf.text(get(SITE_SUB_GROUP, t.siteCode), leftTextQR + 17, yTextQR);

    if (!isFOCTicket) {
      yTextQR += 16;
      // ===== PERSON TYPE =====
      pdf.setTextColor(...GREEN_LABEL);
      pdf.text("Đối tượng:", leftTextQR, yTextQR);
      pdf.setTextColor(...TEXT_DARK);
      pdf.text(getPerSonTypeName(t.personType), leftTextQR + 37, yTextQR);
    }

    // ===== RESTAURANT =====
    if (t.restaurantName) {
      yTextQR += 16;
      // ===== RESTAURANT =====
      pdf.setTextColor(...GREEN_LABEL);
      pdf.text("Khu vực:", leftTextQR, yTextQR);
      pdf.setTextColor(...TEXT_DARK);
      pdf.text(t.restaurantName, leftTextQR + 31, yTextQR);
    }
    // ===== PRICE =====
    yTextQR += 16;
    pdf.setTextColor(...GREEN_LABEL);
    pdf.text("Giá/Price:", leftTextQR, yTextQR);
    pdf.setTextColor(...TEXT_DARK);
    pdf.text(isFOCTicket ? "0 ₫" : formatVND(t.publicPrice), leftTextQR + 36, yTextQR);

    // ===== DATE USE =====
    yTextQR += 16;
    pdf.setTextColor(...GREEN_LABEL);
    pdf.text("Ngày sử dụng/ Use date:", leftTextQR, yTextQR);
    yTextQR += 10;
    pdf.setTextColor(...TEXT_DARK);
    pdf.text(
      `${dayjs(t.validDateFrom, FULL_DATE_TIME_FORMAT).format(BASIC_DATE_FORMAT)}/${dayjs(t.validDateTo, FULL_DATE_TIME_FORMAT).format(BASIC_DATE_FORMAT)}` ||
        "",
      leftTextQR,
      yTextQR
    );

    y += 120;
    pdf.setTextColor(...GREEN_LABEL);
    // ===== Media Code =====
    pdf.text("Media Code:", leftX, y);
    pdf.setTextColor(...TEXT_DARK);
    pdf.setFont("Roboto", "bold");
    pdf.text(isFOCTicket ? t.verifyCode : t.ticketNumber, leftX + 45, y);
    // ===== PNJ CODE =====
    y += 15;
    pdf.setTextColor(...GREEN_LABEL);
    pdf.text("Order:", leftX, y);
    pdf.setTextColor(...TEXT_DARK);
    pdf.text(String(t.pnr), leftX + 23, y);
    // ===== ORDER CODE =====
    y += 15;
    pdf.setTextColor(...GREEN_LABEL);
    pdf.text("Mã Đơn:", leftX, y);
    pdf.setTextColor(...TEXT_DARK);
    pdf.text(String(t.orderCode), leftX + 30, y);
    // ===== SERIAL =====
    y += 15;
    pdf.setTextColor(...GREEN_LABEL);
    pdf.text("STT:", leftX, y);
    pdf.setTextColor(...TEXT_DARK);

    if (isFOCTicket) {
      pdf.text(`${indexFOCTicket}/${focTicket.length}`, leftX + 18, y);
    } else {
      pdf.text(`${indexTicket}/${tickets.length}`, leftX + 18, y);
    }

    y += 10;
    pdf.setDrawColor(...GREEN_LABEL);
    pdf.setLineWidth(0.5);
    pdf.setLineDashPattern([2, 2], 0);
    pdf.line(10, y, PAGE_W - 10, y);
    pdf.setLineDashPattern([], 0);
    y += 15;

    // ===== HƯỚNG DẪN / INSTRUCTIONS =====
    pdf.setTextColor(...GREEN_LABEL);
    pdf.setFont("Roboto", "bold");
    pdf.setFontSize(9);
    pdf.text("HƯỚNG DẪN SỬ DỤNG/USER GUIDE:", 18, y);

    y += 10;

    const funcRenderTexts = (texts: string[] | any) => {
      if (texts?.length) {
        pdf.setFont("Roboto", "normal");
        pdf.setTextColor(...TEXT_GUIDE);
        pdf.setFontSize(8);
        pdf.setLineHeightFactor(1.5);
        texts?.forEach((g: string, index: number) => {
          const lines = pdf.splitTextToSize(`- ${g}`, PAGE_W - 36);
          pdf.text(lines, 18, y);
          const dimensions = pdf.getTextDimensions(lines);
          y += dimensions.h + 5;
        });
      }
    };

    if (isFOCTicket) {
      funcRenderTexts(FOC_GUIDES);
    } else {
      const guides = getGuideByProductCode(t.siteCode, t.productCode);
      if (guides) {
        funcRenderTexts(guides);
      }
    }

    y += 5;

    // ===== NOTE =====
    pdf.setTextColor(...GREEN_LABEL);
    pdf.setFont("Roboto", "bold");
    pdf.setFontSize(9);
    pdf.text("LƯU Ý/NOTE:", 18, y);

    y += 10;
    pdf.setFont("Roboto", "normal");

    if (isFOCTicket) {
      funcRenderTexts(FOC_NOTES);
    } else if (t.siteCode === SITE_CODES.BANAHILL) {
      funcRenderTexts(BNC_NOTES);
    } else {
      funcRenderTexts(NOTES);
    }

    // ===== FOOTER =====
    const r = 2;
    pdf.setFillColor(...GREEM_BRIGHT);
    // pdf.roundedRect(8, PAGE_H - 34, PAGE_W - 16, 26, r, r, "F");
    pdf.rect(8, PAGE_H - 44, PAGE_W - 16, r, "F");
    pdf.setTextColor(0, 0, 0);
    pdf.setFont("Roboto", "normal");
    pdf.setFontSize(12);
    pdf.text("Moon Price", PAGE_W / 2 - 28, PAGE_H - 22, { align: "center" });

    pdf.setFont("Roboto", "normal");
    pdf.setFontSize(9);
    pdf.text(`· Hotline: ${PHONE_FILE_PDF}`, PAGE_W / 2 + 36, PAGE_H - 22, {
      align: "center",
    });
  }

  return Buffer.from(pdf.output("arraybuffer"));
};
