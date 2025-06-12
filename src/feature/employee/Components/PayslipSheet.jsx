import { ArrowBigLeftDash, Download } from "lucide-react";
import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";

const PayslipSheet = ({ setToggleUi, singlePayroll }) => {
  const { profile, error } = useSelector((state) => state.profile); // assuming reducer key is `profile`

  const [loading, setLoading] = useState(false);
  const pdfRef = useRef(null);

  const generatePDF = async () => {
    setLoading(true);
    const input = pdfRef.current;
    if (!input) return;

    const images = input.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map(
        (img) =>
          new Promise((resolve, reject) => {
            if (img.complete) return resolve(true);
            img.onload = resolve;
            img.onerror = reject;
          })
      )
    );

    const canvas = await html2canvas(input, {
      scale: 4,
      useCORS: true,
      logging: false,
      allowTaint: false,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: [612, 792], // A4 in points (approx)
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("payslip.pdf");
    setLoading(false);
  };

  return (
    <div className="flex flex-col rounded w-full shadow text-sm font-sans bg-white">
      <div className="flex justify-between items-center w-full px-10 pt-5">
        <div className="w-[30px] h-[30px] rounded-full bg-black hover:bg-gray-400 hover:text-black text-white flex justify-center items-center">
          <ArrowBigLeftDash
            className="cursor-pointer text-center"
            onClick={() => setToggleUi("table")}
          />
        </div>
        <button
          onClick={generatePDF}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center gap-2"
        >
          <Download size={16} />
          {loading ? "Generating..." : "Download PDF"}
        </button>
      </div>
      <div
        ref={pdfRef}
        className="relative w-[210mm] min-h-[297mm] mx-auto p-6 bg-white"
      >
        <div className="mb-10">
          <div className="absolute top-0 left-0">
            <img src="Ngs.png" alt="" />
          </div>
          <div className="text-center">
            <h2 className="font-bold text-lg mb-2">
              Nuhvin Global Services Private Limited
            </h2>
            <h2 className="font-bold text-lg">Financial Period 2025-2026</h2>
          </div>
        </div>
        <div className="flex justify-between mb-10">
          <p className="font-bold">
            {/* Pay Slip - {data?.month?.toUpperCase()} 2025 */}
          </p>
          <p className="font-bold">Private & Confidential</p>
        </div>
        <TopTable
          userProfile={profile}
          lossDays={20}
          calendarDays={20}
          paidDays={4}
        />

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex gap-1">
            <EarningsTable payslip={singlePayroll} />
            <DeductionsTable payslip={singlePayroll} />
          </div>
        </div>

        <TotalViewTable netPay={singlePayroll?.netPay} />
        <p className="text-xs italic text-gray-600 mt-4">
          This is a computer generated Pay slip it is not valued for authorized.
        </p>

        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center justify-center text-center">
          <p className="text-lg font-medium">
            Registered with the Nuhvin Global Services Private Limited
          </p>
          <p className="text-lg font-medium">
            Jayabheri Silicon Towers, Hi-tech city road, Hyderabad
          </p>
        </div>
      </div>
    </div>
  );
};

export default PayslipSheet;

const InfoMark = ({ text }) => (
  <span className="ml-1 text-blue-600 cursor-help" title={text}>
    ?
  </span>
);

function TopTable({ userProfile, paidDays, lossDays, calendarDays }) {
  // Common inline styles
  const baseStyle = {
    border: "1px solid black",
    padding: "4px 8px",
    fontSize: "14px",
  };

  const boldStyle = {
    ...baseStyle,
    fontWeight: "bold",
    // backgroundColor: "#D6D6D6",
  };

  const headerStyle = {
    ...boldStyle,
    textAlign: "center",
  };

  const nameRowStyle = {
    ...boldStyle,
    fontSize: "16px",
  };

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "1rem",
        border: "0.7px solid #D6D6D6",
      }}
    >
      <thead>
        <tr>
          <th colSpan={4} style={headerStyle} className="bg-[#D6D6D6]">
            Associate Information
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-left">
          <td
            colSpan={4}
            style={{
              ...nameRowStyle,
              padding: "6px 8px",
            }}
          >
            {userProfile?.name}
          </td>
        </tr>

        <tr>
          <td style={boldStyle}>Employee Id</td>
          <td style={baseStyle}>{userProfile?.empId}</td>
          <td style={boldStyle}>PF A/c</td>
          <td style={baseStyle}>
            {userProfile?.pfAccountNumber || "N/A"}
            {userProfile?.pfAccountNumber && (
              <InfoMark text="Provident Fund account number." />
            )}
          </td>
        </tr>

        <tr>
          <td style={boldStyle}>Designation</td>
          <td style={baseStyle}>{userProfile?.jobTitle}</td>
          <td style={boldStyle}>UAN</td>
          <td style={baseStyle}>
            {userProfile?.uan || "N/A"}
            {userProfile?.uan && (
              <InfoMark text="Universal Account Number for PF." />
            )}
          </td>
        </tr>

        <tr>
          <td style={boldStyle}>Gender</td>
          <td style={baseStyle}>{userProfile?.gender}</td>
          <td style={boldStyle}>Bank A/c</td>
          <td style={baseStyle}>
            {userProfile?.bankAcNumber || "N/A"}
            {userProfile?.bankAcNumber && (
              <InfoMark text="Bank account for salary credit." />
            )}
          </td>
        </tr>

        <tr>
          <td style={boldStyle}>Date Of Joining</td>
          <td style={baseStyle}>
            {userProfile?.jobTimeline?.[0]?.effectiveDate}
          </td>
          <td style={boldStyle}>ESI Number</td>
          <td style={baseStyle}>
            {userProfile?.esiNumber || "N/A"}
            {userProfile?.esiNumber && (
              <InfoMark text="Employee State Insurance number." />
            )}
          </td>
        </tr>

        <tr>
          <td style={boldStyle}>Location</td>
          <td style={baseStyle}>
            {`${userProfile?.address?.city}, ${userProfile?.address?.state}`}
          </td>
          <td style={boldStyle}>Available Calendar Days</td>
          <td style={baseStyle}>{calendarDays}</td>
        </tr>

        <tr>
          <td style={boldStyle}>PAN</td>
          <td style={baseStyle}>
            {userProfile?.panNumber || "N/A"}
            {userProfile?.panNumber && (
              <InfoMark text="Permanent Account Number for tax." />
            )}
          </td>
          <td style={boldStyle}>Paid Days</td>
          <td style={baseStyle}>{paidDays}</td>
        </tr>

        <tr>
          <td style={boldStyle}>Status</td>
          <td style={baseStyle}>
            {userProfile?.status ? "Active" : "Inactive"}
          </td>
          <td style={boldStyle}>Loss Of Pay Days</td>
          <td style={baseStyle}>{lossDays}</td>
        </tr>
      </tbody>
    </table>
  );
}

function EarningsTable({ payslip }) {
  // Base style for all table cells
  const baseStyle = {
    border: "1px solid black",
    padding: "4px 8px",
    fontSize: "14px",
  };

  // Bold style for labels
  const boldStyle = {
    ...baseStyle,
    fontWeight: "bold",
    // backgroundColor: "#D6D6D6",
  };

  // Normal cell style
  const normalStyle = { ...baseStyle };

  // Empty row style (only left and right borders)
  const emptyRowStyle = {
    borderTop: "none",
    borderBottom: "none",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    padding: "6px 0",
  };

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "1rem",
        border: "0.7px solid black",
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              ...boldStyle,
              textAlign: "left",
              backgroundColor: "#D6D6D6",
            }}
          >
            Earnings
          </th>
          <th
            style={{
              ...boldStyle,
              textAlign: "right",
              backgroundColor: "#D6D6D6",
            }}
          >
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={boldStyle}>Basic</td>
          <td style={normalStyle}>{payslip?.basicSalary}</td>
        </tr>

        <tr>
          <td style={boldStyle}>House Rent Allowance</td>
          <td style={normalStyle}>{payslip?.houseRentAllowance}</td>
        </tr>
        <tr>
          <td style={boldStyle}>Conveyance Allowance</td>
          <td style={normalStyle}>{payslip?.conveyanceAllowance}</td>
        </tr>
        <tr>
          <td style={boldStyle}>Special Allowance</td>
          <td style={normalStyle}>{payslip?.specialAllowance}</td>
        </tr>
        <tr>
          <td style={boldStyle}>Advance Statutory Bonus</td>
          <td style={normalStyle}>{payslip?.advanceStatutoryBonus}</td>
        </tr>

        {/* Empty Rows */}
        <tr>
          <td style={emptyRowStyle}></td>
        </tr>
        <tr>
          <td style={emptyRowStyle}></td>
        </tr>
        <tr>
          <td style={emptyRowStyle}></td>
        </tr>
        <tr>
          <td style={emptyRowStyle}></td>
        </tr>
        <tr>
          <td style={emptyRowStyle}></td>
        </tr>

        <tr>
          <td
            style={{
              ...boldStyle,
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            (A) Gross Salary
          </td>
          <td style={normalStyle}>{payslip?.totalEarnings}</td>
        </tr>
      </tbody>
    </table>
  );
}

function DeductionsTable({ payslip }) {
  // Base style for all table cells
  const baseStyle = {
    border: "1px solid black",
    padding: "4px 8px",
    fontSize: "14px",
  };

  // Bold style for labels
  const boldStyle = {
    ...baseStyle,
    fontWeight: "bold",
    // backgroundColor: "#D6D6D6",
  };

  // Normal cell style
  const normalStyle = { ...baseStyle };

  // Empty row style (only left and right borders)
  const emptyRowStyle = {
    borderTop: "none",
    borderBottom: "none",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    padding: "6px 0",
  };

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "1rem",
        border: "0.7px solid black",
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              ...boldStyle,
              textAlign: "left",
              backgroundColor: "#D6D6D6",
            }}
          >
            Deductions
          </th>
          <th
            style={{
              ...boldStyle,
              textAlign: "right",
              backgroundColor: "#D6D6D6",
            }}
          >
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={boldStyle}>Professional Tax</td>
          <td style={normalStyle}>{payslip?.professionTax}</td>
        </tr>

        <tr>
          <td style={boldStyle}>Provident Fund - Employee Contribution</td>
          <td style={normalStyle}>
            {payslip?.providentFundEmployeeContribution}
          </td>
        </tr>
        <tr>
          <td style={boldStyle}>TDS</td>
          <td style={normalStyle}>{payslip?.tds}</td>
        </tr>

        {/* Empty Rows */}
        <tr>
          <td style={emptyRowStyle}></td>
        </tr>
        <tr>
          <td style={emptyRowStyle}></td>
        </tr>
        <tr>
          <td style={emptyRowStyle}></td>
        </tr>
        <tr>
          <td style={emptyRowStyle}></td>
        </tr>
        <tr>
          <td style={emptyRowStyle}></td>
        </tr>
        <tr>
          <td style={emptyRowStyle}></td>
        </tr>
        <tr>
          <td style={emptyRowStyle}></td>
        </tr>
        <tr>
          <td style={emptyRowStyle}></td>
        </tr>
        <tr>
          <td style={emptyRowStyle}></td>
        </tr>

        <tr>
          <td
            style={{
              ...boldStyle,
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            (B) Total Deductions
          </td>
          <td style={normalStyle}>{payslip?.totalDeductions}</td>
        </tr>
      </tbody>
    </table>
  );
}

function TotalViewTable({ netPay }) {
  // Common styles
  const headerCellStyle = {
    border: "1px solid black",
    backgroundColor: "#D6D6D6",
    textAlign: "left",
    fontSize: "18px",
    padding: "8px 16px",
  };

  const amountCellStyle = {
    border: "1px solid black",
    textAlign: "right",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "8px 16px",
    color: "black",
  };

  const helpStyle = {
    color: "#007BFF",
    cursor: "help",
    marginLeft: "8px",
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th
            colSpan={3}
            style={{
              ...headerCellStyle,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span title="Net Salary = Total Earnings (A) - Total Deductions (B)">
              Net Salary = (A) - (B)
              <span style={helpStyle}>?</span>
            </span>
          </th>
          <th style={amountCellStyle}>₹ {netPay} /-</th>
        </tr>
      </thead>
    </table>
  );
}
