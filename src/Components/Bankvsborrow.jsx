import React from "react";

export default function ComparisonTable() {
  const data = [
    {
      feature: "Loan Approval",
      borrowly: "Instant (minutes)",
      banks: "3–7 working days",
    },
    {
      feature: "Documents",
      borrowly: "PAN, Aadhaar, Income Proof",
      banks: "Many docs, collateral",
    },
    {
      feature: "Fees",
      borrowly: "0.5%–2.5%",
      banks: "1%–3%",
    },
    {
      feature: "Transparency",
      borrowly: "100% upfront",
      banks: "Hidden fine print",
    },
    {
      feature: "Flexibility",
      borrowly: "Free/low–cost prepayment",
      banks: "Penalties, lock–ins",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-white px-4 py-10 lg:py-6">
      {/* Small heading */}
      <span className="px-4 py-1 text-sm rounded-full bg-blue-100 text-blue-600 font-medium">
        Comparison Table
      </span>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2 lg:mb-1">
        Borrowly vs Banks
      </h1>

      {/* Subtitle */}
      <p className="text-gray-500 text-center max-w-xl mb-8 lg:mb-5">
        See how Borrowly stacks up against traditional banks when it comes to
        speed, documents, costs, and flexibility.
      </p>

      {/* Desktop Table */}
      <div className="hidden md:block w-full max-w-5xl overflow-hidden rounded-2xl shadow-md border border-gray-200">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-cyan-600 text-white p-4 text-left rounded-tl-2xl border-r border-white">
                Feature
              </th>
              <th className="bg-cyan-600 text-white p-4 text-left border-r border-white">
                Borrowly
              </th>
              <th className="bg-cyan-600 text-white p-4 text-left rounded-tr-2xl">
                Banks
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                <td className="p-4 font-bold text-blue-600 border-r border-gray-200">
                  {row.feature}
                </td>
                <td className="p-4 font-bold text-black border-r border-gray-200">
                  {row.borrowly}
                </td>
                <td className="p-4 font-bold text-black">{row.banks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="block md:hidden w-full max-w-lg space-y-4">
        {data.map((row, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-xl shadow-sm p-4"
          >
            <h3 className="font-bold text-blue-600 mb-2">{row.feature}</h3>
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-gray-500 w-1/3">Borrowly</span>
              <span className="font-bold text-black w-2/3 text-right">{row.borrowly}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="font-semibold text-gray-500 w-1/3">Banks</span>
              <span className="font-bold text-black w-2/3 text-right">{row.banks}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
