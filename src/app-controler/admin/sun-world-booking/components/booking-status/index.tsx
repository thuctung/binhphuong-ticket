"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { getStatusBooking, refundTicket } from "../../api";
import { toast } from "react-toastify";
import { SearchBookingStatus } from "./components/searchTicketForm";
import BookingDetailCard from "./components/bookingDetail";
import { TicketReponseType } from "@/types/ticket";
import { RefuncTicketSubmitType } from "../../type";
import { generateThirdPartyCodeRefund } from "@/helpers/ticket";

export default function AdminBookingStatus() {
  const [bookingDetail, setBookingDetail] = useState<TicketReponseType>();

  const [orderCode, setOrderCode] = useState("");

  const handleSearch = async () => {
    if (!orderCode) {
      toast.error("Chưa nhập thông tin");
      return;
    }
    const data = await getStatusBooking(orderCode);
    setBookingDetail(data);
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

  return (
    <div className="space-y-4">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Tra cứu thông order </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Separator />
          <SearchBookingStatus
            onSearch={handleSearch}
            setOrderCode={setOrderCode}
            orderCode={orderCode}
          />
          <Separator />
          {bookingDetail && (
            <BookingDetailCard booking={bookingDetail} onReloadData={handleSearch} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
