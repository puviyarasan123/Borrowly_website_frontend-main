import React from "react";

const feesData = [
  {
    amount: "₹5,000–₹20,000",
    processing: "1.5% (min ₹300)",
    disbursement: "0.7%",
    interest: "24% p.a",
    late: "₹200 + 2% monthly",
  },
  {
    amount: "₹20,001–₹100,000",
    processing: "1.2% (min ₹500)",
    disbursement: "0.5%",
    interest: "18–22% p.a.",
    late: "₹300 + 2% monthly",
  },
  {
    amount: "> ₹100,000",
    processing: "1% (min ₹1,000)",
    disbursement: "0.5% / ₹1,000",
    interest: "14–18% p.a",
    late: "₹500 + 2% monthly",
  },
];

const TransparentFees = () => {
  return (
    <div className="flex flex-col items-center py-12 px-4 bg-white">
      {/* Header Section */}
       <p
          style={{ fontFamily: "PovetaracSansBold" }}
          className="text-[#084DB3] text-[14px] bg-[#DEE8F6] text-left rounded-full w-fit px-4 py-1.5"
        >
          Fees & Charges
        </p>

        <h1
          style={{ fontFamily: "PovetaracSansBlack" }}
          className="text-center mt-4 text-[28px] lg:text-[36px] xl:text-[40px] leading-[1.1] text-black"
        >
          Transparent Fees
        </h1>

        <p
          style={{ fontFamily: "PovetaracSansBold" }}
          className="mt-2 px-4 w-full max-w-[800px] text-[14px] text-center lg:text-[14px] xl:text-lg text-[#696868]"
        >
          See how Borrowly stacks up against traditional banks when it comes to
          speed, documents, costs, and flexibility.
        </p>

      

      {/* Table for Desktop */}
      <div className="hidden md:block w-full mt-8 max-w-screen-xl overflow-x-auto">
        <table className="w-full border-2 border-blue-700 rounded-2xl  overflow-hidden text-left">
          <thead className="bg-[#F2F4FB]">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-700 border border-[#D0DAFF]">
                Loan Amount
              </th>
              <th className="px-6 py-3 font-semibold text-gray-700 border border-[#D0DAFF]">
                Processing Fee
              </th>
              <th className="px-6 py-3 font-semibold text-gray-700 border border-[#D0DAFF]">
                Disbursement Fee
              </th>
              <th className="px-6 py-3 font-semibold text-gray-700 border border-[#D0DAFF]">
                Interest Rate
              </th>
              <th className="px-6 py-3 font-semibold text-gray-700">
                Late Penalty
              </th>
            </tr>
          </thead>
          <tbody>
            {feesData.map((fee, index) => (
              <tr key={index}>
                <td className="px-6 py-4 font-bold text-blue-700 border border-[#D0DAFF]">
                  {fee.amount}
                </td>
                <td className="px-6 py-4 font-bold text-black border border-[#D0DAFF]">
                  {fee.processing}
                </td>
                <td className="px-6 py-4 font-bold text-black border border-[#D0DAFF]">
                  {fee.disbursement}
                </td>
                <td className="px-6 py-4 font-bold text-black border border-[#D0DAFF]">
                  {fee.interest}
                </td>
                <td className="px-6 py-4 font-bold text-black border border-[#D0DAFF]">{fee.late}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for Mobile */}
      <div className="md:hidden grid gap-6 w-full">
        {feesData.map((fee, index) => (
          <div
            key={index}
            className="border-2 border-blue-700 rounded-2xl shadow-md p-6 bg-white flex flex-col space-y-3"
          >
            <h3 className="text-blue-700 font-bold text-lg">{fee.amount}</h3>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Processing Fee:</span>
              <span className="font-bold">{fee.processing}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Disbursement Fee:</span>
              <span className="font-bold">{fee.disbursement}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Interest Rate:</span>
              <span className="font-bold">{fee.interest}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Late Penalty:</span>
              <span className="font-bold">{fee.late}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransparentFees;
