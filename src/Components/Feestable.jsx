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
      <div className="text-center mb-8">
        <span className="px-4 py-1 text-sm rounded-full bg-blue-100 text-blue-600 font-medium">
          Fees & Charges
        </span>
        <h2 className="text-2xl font-bold mt-4 mb-2">Transparent Fees</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          See how Borrowly stacks up against traditional banks when it comes to
          speed, documents, costs, and flexibility.
        </p>
      </div>

      {/* Table for Desktop */}
      <div className="hidden md:block w-full max-w-5xl overflow-x-auto">
        <table className="w-full border-2 border-blue-700 rounded-2xl shadow-md overflow-hidden text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-700 border-r border-gray-200">
                Loan Amount
              </th>
              <th className="px-6 py-3 font-semibold text-gray-700 border-r border-gray-200">
                Processing Fee
              </th>
              <th className="px-6 py-3 font-semibold text-gray-700 border-r border-gray-200">
                Disbursement Fee
              </th>
              <th className="px-6 py-3 font-semibold text-gray-700 border-r border-gray-200">
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
                <td className="px-6 py-4 font-bold text-blue-700 border-r border-gray-200">
                  {fee.amount}
                </td>
                <td className="px-6 py-4 font-bold text-black border-r border-gray-200">
                  {fee.processing}
                </td>
                <td className="px-6 py-4 font-bold text-black border-r border-gray-200">
                  {fee.disbursement}
                </td>
                <td className="px-6 py-4 font-bold text-black border-r border-gray-200">
                  {fee.interest}
                </td>
                <td className="px-6 py-4 font-bold text-black">{fee.late}</td>
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
