import tickdone from "../../assets/Icons/tickdone.svg";

const DocItem = ({ label, children }) => (
  <p
    className="mt-2 text-[16px] text-[#474040]"
    style={{ fontFamily: "PovetaracSansBold" }}
  >
    <span
      style={{ fontFamily: "PovetaracSansBlack" }}
      className="text-[#000]"
    >
      {label}
    </span>{" "}
    {children}
  </p>
);


const Section_4 = ({
  ftype,
  featureImg,
  loanType,
  loanDetails,
  whoCanApply,
  whoCanApplyNote,
  requiredDocs,
  requiredDocsNote,
  docSections,
  docdesc,
  loandesc,
  whodesc
}) => {
  return (
    <div className="bg-[#F9F9F9] max-w-screen-xl mt-8 mx-auto rounded-4xl p-2 md:p-5">
      {/* Loan Features & Benefits */}
      <h1
        style={{ fontFamily: "PovetaracSansBlack" }}
        className="text-center text-black text-[24px] pb-5 py-10 lg:text-[32px] leading-[1.1]"
      >
        {ftype}
      </h1>

      <div className="lg:px-10 lg:py-10">
        <div className="bg-white rounded-4xl overflow-hidden flex flex-col md:flex-row gap-3">
          {/* Left Image */}
          <div className="flex-1 bg-gradient-to-b flex items-center from-[#00C2CC] to-[#0153C0] text-center">
            <img src={featureImg} alt="" className="w-[600px] mx-auto" />
          </div>

          {/* Right Details */}
          <div className="flex-1 flex flex-col justify-center p-5">
            {/* Who can apply */}
            <div>
              <h3
                style={{ fontFamily: "PovetaracSansBlack" }}
                className="text-left md:mt-5 text-black text-xl leading-[1.1]"
              >
                Who Can Apply?
              </h3>
              <p>{whodesc}</p>
              <div className="py-2 flex flex-wrap gap-2">
                {whoCanApply.map((item, i) => (
                  <div
                    key={i}
                    style={{ fontFamily: "PovetaracSansBlack" }}
                    className="bg-[#0151BB] px-3 py-2 text-[12px] md:text-[16px] flex items-center text-white gap-2 rounded-lg shadow-sm"
                  >
                    <img src={tickdone} alt="" className="w-5 h-5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              {whoCanApplyNote && (
                <p
                  className="text-sm text-[#474040] mt-2"
                  style={{ fontFamily: "PovetaracSansBold" }}
                >
                  {whoCanApplyNote}
                </p>
              )}
            </div>

            {/* Required Docs */}
            <div className="pb-5 mt-6">
              <h3
                style={{ fontFamily: "PovetaracSansBlack" }}
                className="text-left mt-5 text-black text-xl leading-[1.1]"
              >
                What Documents Are Required?
              </h3>
              <div className="py-2 flex flex-wrap gap-2">
                {requiredDocs.map((doc, i) => (
                  <div
                    key={i}
                    style={{ fontFamily: "PovetaracSansBlack" }}
                    className="bg-[#0151BB] text-[12px] md:text-[16px] px-3 py-2 flex items-center text-white gap-2 rounded-lg shadow-sm"
                  >
                    <img src={tickdone} alt="" className="w-5 h-5" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
              {requiredDocsNote && (
                <p
                  className="text-sm text-[#474040] mt-2"
                  style={{ fontFamily: "PovetaracSansBold" }}
                >
                  {requiredDocsNote}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Loan Details */}
      <h1
        style={{ fontFamily: "PovetaracSansBlack" }}
        className="text-center text-black text-[28px] pb-5 py-10 lg:text-[32px] leading-[1.1]"
      >
        {loanType} Details
      </h1>
      <p>{loandesc}</p>
      <div className="w-full max-w-[1200px] px-5 py-4 md:py-10 mx-auto flex flex-wrap gap-8">
        {loanDetails.map((detail, i) => (
          <div key={i} className="w-full sm:w-[45%] md:w-[22%]">
            <h1
              style={{ fontFamily: "PovetaracSansBlack" }}
              className="text-xl text-[#0151BB]"
            >
              {detail.label}
            </h1>
            <p
              style={{ fontFamily: "PovetaracSansBold", whiteSpace: "pre-line" }}
              className="mt-1 text-[16px] text-[#474040]"
            >
              {detail.value}
            </p>
          </div>
        ))}
      </div>

      {/* Documents You'll Need */}
      <h1
        style={{ fontFamily: "PovetaracSansBlack" }}
        className="text-center text-black text-[28px] pb-5 py-10 lg:text-[32px] leading-[1.1]"
      >
        📑 Documents You’ll Need
      </h1><br></br>
      <p>{docdesc}</p>
      <div className="w-full max-w-[1200px] px-5  md:py-10 mx-auto flex flex-wrap gap-12">
        <div className="flex flex-wrap gap-8">
          {docSections.map((section, i) => (
            <div key={i} className="w-full sm:w-[45%] md:w-[45%]">
              <h1
                style={{ fontFamily: "PovetaracSansBlack" }}
                className="text-xl text-[#0151BB]"
              >
                {section.title}
              </h1>

              {section.items ? (
                section.items.map((item, j) => (
                  <DocItem key={j} label={item.label}>
                    {/* ✅ Support for HTML like Aadhaar / Passport / Utility bill */}
                    <span
                      dangerouslySetInnerHTML={{ __html: item.value }}
                    />
                  </DocItem>
                ))
              ) : (
              section.tips?.map((tip, idx) => (
  <p key={idx} className={tip.bold ? "font-bold" : ""}>
    {tip.text}
  </p>
))
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section_4;
