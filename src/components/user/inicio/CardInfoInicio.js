'use client'
import { useRouter } from "next/navigation";
import React from "react";
import { Tooltip } from "@mui/material";

export default function CardInfoInicio({title,numPrin,icon, numText,text,link}) {
  const router = useRouter();
  return (
    <Tooltip title={text} arrow>
      {/* <div className="col-12 md:col-6 lg:col-3" onClick={() => router.push(link)}> */}
      <div className="col-12 md:col-6 lg:col-3">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round min-h-full">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">{title}</span>
              <div className="text-900 font-medium text-xl">{numPrin}</div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-blue-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <i className={`pi ${icon} text-blue-500 text-xl`}></i>
            </div>
          </div>
          <span className="text-green-500 font-medium">{numText}</span>
        </div>
      </div>
    </Tooltip>
  );
}
