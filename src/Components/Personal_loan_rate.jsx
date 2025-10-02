import React from 'react';
import hdfc from '../assets/Images/hdfc.png';
import icici from '../assets/Images/icici.png';
import axis from '../assets/Images/axis.png';
import kotak from '../assets/Images/kotak.png';
import federal from '../assets/Images/federal.png';
import idfc from '../assets/Images/idfc.png';

const banks = [
  { name: 'HDFC Bank Personal Loan', rate: '9.99% - 12.5%' },
  { name: 'ICICI Bank Personal Loan', rate: '11% - 13%' },
  { name: 'Axis Bank Personal Loan', rate: '9.99% - 17.15%' },
  { name: 'Kotak Mahindra Bank Personal Loan', rate: '9.98% onwards' },
  { name: 'IDFC FIRST Bank Personal Loan', rate: '10.5% - 20%' },
];

const lenders = [
  { name: 'HDFC BANK', logo: hdfc },
  { name: 'Axis BANK', logo: axis },
  { name: 'Kotak BANK', logo: kotak },
  { name: 'HDFC BANK', logo: hdfc },
  { name: 'Axis BANK', logo: axis },
  { name: 'Kotak BANK', logo: kotak },
  { name: 'HDFC BANK', logo: icici },
  { name: 'Axis BANK', logo: federal },
  { name: 'Kotak BANK', logo: idfc },
];

export default function PersonalLoanPage() {
  return (
    <div className="py-6 lg:py-4 px-6 bg-white font-sans">
      <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
        {/* LEFT PANEL */}
        <div className="lg:w-[70%] w-full">
          <h1 className="text-2xl md:text-3xl font-bold mb-3 text-black">
            Personal Loan Interest Rates 2025
          </h1>
          <p className="mb-4 text-gray-600 max-w-4xl leading-relaxed">
            The interest rate on a personal loan is determined by the applicant’s credit profile and the lender’s policies, 
            which may include factors such as credit risk-based pricing, cost of funds, and internal guidelines.
          </p>

          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
            <table className="min-w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-[#F7F9FB]">
                  <th className="py-2 px-4 text-black font-medium border-r border-gray-300 w-2/3">
                    Banks
                  </th>
                  <th className="py-2 px-4 text-black font-medium w-1/3">
                    Interest Rates (% p.a)
                  </th>
                </tr>
              </thead>
              <tbody>
                {banks.map((bank, idx) => (
                  <tr key={idx} className="border-t border-gray-300">
                    <td className="py-2 px-4 text-[#0066CC] font-medium border-r border-gray-300">
                      {bank.name}
                    </td>
                    <td className="py-2 px-4 text-gray-900 font-medium">{bank.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-sm text-black">
            Also Check: <span className="text-[#0066CC] hover:underline cursor-pointer">The latest personal loan interest rates of all Banks & NBFCs</span>
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:w-[30%] w-full">
          <div className="bg-[#F2F4FB] rounded-xl p-5">
            <h2 className="text-[16px] font-semibold mb-5 text-center text-black">
              Find Trusted Personal <br/>Loan Lenders
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 justify-items-center">
              {lenders.map((lender, idx) => (
                <div
                  key={idx}
                  className="w-18 h-18 bg-white flex items-center justify-center rounded-lg border border-gray-200 shadow-sm"
                >
                  <img
                    src={lender.logo}
                    alt={lender.name}
                    className="w-6 h-6 object-contain"
                  />
                </div>
              ))}
            </div>

            {/* <div className="mt-4 text-center">
              <button className="text-[#0066CC] text-sm font-medium hover:underline">
                View all →
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
