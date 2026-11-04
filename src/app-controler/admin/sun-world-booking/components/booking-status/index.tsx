"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { getCharegeRefund, getStatusBooking, refundTicket } from "../../api";
import { toast } from "react-toastify";
import { SearchBookingStatus } from "./components/searchTicketForm";
import BookingDetailCard from "./components/bookingDetail";
import { TicketReponseType } from "@/types/ticket";
import { CheckChargeRefundType, RefuncTicketSubmitType } from "../../type";
import { generateThirdPartyCode, generateThirdPartyCodeRefund } from "@/helpers/ticket";

export default function AdminBookingStatus() {
  const [bookingDetail, setBookingDetail] = useState<TicketReponseType>();

  const handleSearch = async (value: string) => {
    if (!value) {
      toast.error("Chưa nhập thông tin");
      return;
    }
    const data = await getStatusBooking(value);
    setBookingDetail(data);
  };

  const checkChargeRefund = async () => {
    const params: CheckChargeRefundType = {
      returnDate: "2026-11-05",
      thirdPartyNumber: "QN50J40S41650O",
      items: [
        {
          siteCode: "SBD",
          ticketNumber: "LCG5NOOUHCLRTN",
        },
      ],
    };
    const data = await getCharegeRefund(params);
    console.log("data", data);
  };

  const handleRefundTicket = async () => {
    const params: RefuncTicketSubmitType = {
      thirdPartyNumber: generateThirdPartyCodeRefund("SBD"),
      returnReason: "Test huy ve",
      referenceOrders: [
        {
          email: "demo@gmail.com",
          fullname: "test amb",
          referenceThirdPartyNumber: "QN50J40S41650O",
          tickets: [
            {
              siteCode: "SBD",
              ticketNumber: "LCG5NOOUHCLRTN",
            },
          ],
        },
      ],
    };
    const data = await refundTicket(params);
    console.log("data", data);
  };

  useEffect(() => {
    checkChargeRefund();
  }, []);

  return (
    <div className="space-y-4">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Tra cứu thông order </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Separator />
          <SearchBookingStatus onSearch={handleSearch} />
          <button onClick={handleRefundTicket}>Huy ves</button>
          <Separator />
          {bookingDetail && <BookingDetailCard booking={bookingDetail} />}
        </CardContent>
      </Card>
    </div>
  );
}
