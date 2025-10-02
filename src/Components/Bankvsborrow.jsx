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
    <div  style={{ fontFamily: "PovetaracSansBold" }} className="flex flex-col items-center justify-center bg-white px-4 py-10 lg:py-6">
      <p
          style={{ fontFamily: "PovetaracSansBold" }}
          className="text-[#084DB3] text-[14px] bg-[#DEE8F6] text-left rounded-full w-fit px-4 py-1.5"
        >
          Comparison Table
        </p>

        <h1
          style={{ fontFamily: "PovetaracSansBlack" }}
          className="text-center mt-4 text-[28px] lg:text-[36px] xl:text-[40px] leading-[1.1] text-black"
        >
          Borrowly vs Banks
        </h1>

        <p
          style={{ fontFamily: "PovetaracSansBold" }}
          className="mt-2 px-4 w-full max-w-[800px] text-[14px] text-center lg:text-[14px] xl:text-lg text-[#696868]"
        >
          See how Borrowly stacks up against traditional banks when it comes to
          speed, documents, costs, and flexibility.
        </p>

      {/* Desktop Table */}
      <div  style={{ fontFamily: "PovetaracSansBold" }}  className="hidden mt-10 md:block w-full max-w-screen-xl overflow-hidden rounded-2xl border border-[#D0DAFF]">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-cyan-600 text-white p-5 text-left rounded-tl-2xl border-r border-white">
                Feature
              </th>
              <th className="bg-cyan-600 text-white p-5 text-left border-r border-white">
                Borrowly
              </th>
              <th className="bg-cyan-600 text-white p-5 text-left rounded-tr-2xl">
                Banks
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                <td className="p-5 font-bold text-blue-600 border-r border-gray-200">
                  {row.feature}
                </td>
                <td className="p-5 font-bold text-black border-r border-gray-200">
                  {row.borrowly}
                </td>
                <td className="p-5 font-bold text-black">{row.banks}</td>
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
