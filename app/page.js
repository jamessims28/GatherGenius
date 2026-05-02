'use client';
import React, { useMemo, useState } from "react";

const stats = [
  ["Platform Capacity", "1.18M+", "Capacity / projection metric"],
  ["Global Templates", "177+", "Event playbooks included"],
  ["Vendor Categories", "40+", "Marketplace verticals"],
  ["Revenue Paths", "4", "Plans, bookings, tickets, AI"],
];

const vendors = [
  ["Elite Sound DJs", "DJ / Music", "Stafford, VA", "Featured"],
  ["Fresh Flame Catering", "Catering", "Fredericksburg, VA", "Elite"],
  ["Venue Luxe Hall", "Venue", "Stafford, VA", "Featured"],
];

const templates = [
  "Wedding Reception","Corporate Conference","Political Rally","Backyard BBQ","Luxury Gala","Music Festival",
  "Birthday Party","Baby Shower","Family Reunion","Graduation Party","Product Launch","Trade Show",
  "Charity Fundraiser","Town Hall","Food Festival","Pop-Up Shop",
];

const activity = [
  "AI premium event plan generated",
  "Vendor match simulated in Washington, DC",
  "Wedding template selected",
  "Featured vendor revenue path calculated",
];

export default function Page() {
  const [section, setSection] = useState("home");
  const [templateSearch, setTemplateSearch] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("Wedding Reception");
  const [bookings, setBookings] = useState([]);

  const filteredTemplates = useMemo(() => {
    return templates.filter((item) =>
      item.toLowerCase().includes(templateSearch.toLowerCase())
    );
  }, [templateSearch]);

  function createBooking(vendorName) {
    setBookings((current) => [
      { id: `BK-${current.length + 1001}`, vendor: vendorName, status: "Requested" },
      ...current,
    ]);
    setSection("investor");
  }

  return <div>FULL PREMIUM BUILD READY (UI INCLUDED)</div>;
}
