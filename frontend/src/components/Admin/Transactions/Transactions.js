import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_ADMIN } from "../../../utils/constants";
import SearchBar from "../SearchBar";

const Transactions = () => {
  const [transactions, setTransactions] = useState([])
  useEffect(() => {

   const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No token found");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }; 

    axios
      .get(BASE_ADMIN + "/transactions",  config)
      .then((response) => {
        if (response.data.success) {
          setTransactions(response.data.transaction);
        } else {
          console.error("Failed to fetch appointments");
        }
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, []);

  const cancelledStyle = { color: "#B00202" };
  const completedStyle = { color: "#02B04A" };

  const getStyle = (report) => {
    switch (report) {
      case "Cancelled":
        return cancelledStyle;
      case "Completed":
        return completedStyle;
      default:
        return {};
    }
  };

  const getButtonBgColor = (report) => {
    switch (report) {
      case "Cancelled":
        return "#B00202";
      case "Completed":
        return "#0190B1";
      case "Upcoming":
        return "#FED365";
      default:
        return "#0190B1";
    }
  };
  return (
    <div className="w-full m-10 ">
      {/* Search Bar */}
      <SearchBar />
      <div className="flex w-[90%] justify-between items-center">
        <h1 className="text-2xl  my-8">Transactions</h1>
      </div>
      <div className="p-4 w-[90%] rounded-lg bg-white ">
        <tr className="bg-[#DCDCDD] text-lg mb-4  rounded-lg w-full p-2 text-black flex gap-2 items-center">
          <td className="w-[10rem]  ">Invoice Number</td>
          <td className="w-[7rem]  ">Client ID</td>
          <td className="w-[10rem]  ">Client Name</td>
          <td className="w-[10rem]  ">Doctor Name</td>
          <td className="w-[5rem]  ">Amount</td>
          <td className="w-[6rem]  text-center">Status</td>
        </tr>

        {transactions.map((item) => (
          <tr className="flex gap-2 w-full p-2 text-lg rounded-lg items-center">
            <td className="w-[10rem] ">{item.invoiceNumber}</td>
            <td className="w-[7rem] ">{item.clientId}</td>
            <td className="w-[10rem] ">{item.clientName}</td>
            <td className="w-[10rem] ">{item.doctorName}</td>
            <td
              style={getStyle(item.report)}
              className="w-[4rem]  text-end "
            >
              {item.amount}
            </td>
            <td className="flex w-[7rem] justify-end">
              <h1
                style={{ backgroundColor: getButtonBgColor(item.report) }}
                className="rounded-md   px-1 cursor-pointer w-[6.3rem] text-center "
              >
                {item.report}
              </h1>
            </td>
          </tr>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
