import React, { createContext, useContext, useState } from "react";

const initialData = [
  {
    status: "Active",
    mes: "Get all Events.",
    event_id: 1,
    tenant_id: 1,
    title: "Agriculture",
    descriptions: "Seminar on sustainable agriculture to discuss high yield farming methods",
    image: "company-img2.jpg",
    created_at: "2025-01-31 07:29:02",
  },
  {
    status: "Active",
    mes: "Get all Events.",
    event_id: 2,
    tenant_id: 1,
    title: "Entertainment",
    descriptions: "Release of coffee table book.",
    image: "company-img1.jpg",
    created_at: "2025-01-31 07:29:34",
  },
];

export default initialData;
