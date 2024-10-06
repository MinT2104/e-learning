import CustomTable from "@/components/common/CustomTable";
import { ColumnDef } from "@tanstack/react-table";

const HomeView = () => {

    const mockDataTable = [
        {
            "flight-no": "SQ1001",
            "Status": "Draft",
            "Response": "-",
            "Aircraft Reg.": "9VAA",
            "Depature": "JFK",
            "Arrival": "LHR",
            "DPP (T)": "14:00UTC",
            "DPP (D)": "24-06-12",
            "ARR (T)": "22:00UTC",
            "ARR (D)": "24/06/12",
            "Duration": "5h15min"
        },
        {
            "flight-no": "SQ1001",
            "Status": "PFP",
            "Response": "ACK • ACCEPTABLE",
            "Aircraft Reg.": "9VAA",
            "Depature": "JFK",
            "Arrival": "LHR",
            "DPP (T)": "14:00UTC",
            "DPP (D)": "24-06-12",
            "ARR (T)": "22:00UTC",
            "ARR (D)": "24/06/12",
            "Duration": "5h15min"
        },
        {
            "flight-no": "SQ1001",
            "Status": "Draft",
            "Response": "-",
            "Aircraft Reg.": "9VAA",
            "Depature": "JFK",
            "Arrival": "LHR",
            "DPP (T)": "14:00UTC",
            "DPP (D)": "24-06-12",
            "ARR (T)": "22:00UTC",
            "ARR (D)": "24/06/12",
            "Duration": "5h15min"
        },
        {
            "flight-no": "SQ1001",
            "Status": "PFP",
            "Response": "ACK • ACCEPTABLE",
            "Aircraft Reg.": "9VAA",
            "Depature": "JFK",
            "Arrival": "LHR",
            "DPP (T)": "14:00UTC",
            "DPP (D)": "24-06-12",
            "ARR (T)": "22:00UTC",
            "ARR (D)": "24/06/12",
            "Duration": "5h15min"
        },
        {
            "flight-no": "SQ1001",
            "Status": "Draft",
            "Response": "-",
            "Aircraft Reg.": "9VAA",
            "Depature": "JFK",
            "Arrival": "LHR",
            "DPP (T)": "14:00UTC",
            "DPP (D)": "24-06-12",
            "ARR (T)": "22:00UTC",
            "ARR (D)": "24/06/12",
            "Duration": "5h15min"
        },
        {
            "flight-no": "SQ1001",
            "Status": "PFP",
            "Response": "ACK • ACCEPTABLE",
            "Aircraft Reg.": "9VAA",
            "Depature": "JFK",
            "Arrival": "LHR",
            "DPP (T)": "14:00UTC",
            "DPP (D)": "24-06-12",
            "ARR (T)": "22:00UTC",
            "ARR (D)": "24/06/12",
            "Duration": "5h15min"
        },
        {
            "flight-no": "SQ1001",
            "Status": "Draft",
            "Response": "-",
            "Aircraft Reg.": "9VAA",
            "Depature": "JFK",
            "Arrival": "LHR",
            "DPP (T)": "14:00UTC",
            "DPP (D)": "24-06-12",
            "ARR (T)": "22:00UTC",
            "ARR (D)": "24/06/12",
            "Duration": "5h15min"
        },
        {
            "flight-no": "SQ1001",
            "Status": "PFP",
            "Response": "ACK • ACCEPTABLE",
            "Aircraft Reg.": "9VAA",
            "Depature": "JFK",
            "Arrival": "LHR",
            "DPP (T)": "14:00UTC",
            "DPP (D)": "24-06-12",
            "ARR (T)": "22:00UTC",
            "ARR (D)": "24/06/12",
            "Duration": "5h15min"
        },
        {
            "flight-no": "SQ1001",
            "Status": "Draft",
            "Response": "-",
            "Aircraft Reg.": "9VAA",
            "Depature": "JFK",
            "Arrival": "LHR",
            "DPP (T)": "14:00UTC",
            "DPP (D)": "24-06-12",
            "ARR (T)": "22:00UTC",
            "ARR (D)": "24/06/12",
            "Duration": "5h15min"
        },
        {
            "flight-no": "SQ1001",
            "Status": "Draft",
            "Response": "-",
            "Aircraft Reg.": "9VAA",
            "Depature": "JFK",
            "Arrival": "LHR",
            "DPP (T)": "14:00UTC",
            "DPP (D)": "24-06-12",
            "ARR (T)": "22:00UTC",
            "ARR (D)": "24/06/12",
            "Duration": "5h15min"
        },
        {
            "flight-no": "SQ1001",
            "Status": "Draft",
            "Response": "-",
            "Aircraft Reg.": "9VAA",
            "Depature": "JFK",
            "Arrival": "LHR",
            "DPP (T)": "14:00UTC",
            "DPP (D)": "24-06-12",
            "ARR (T)": "22:00UTC",
            "ARR (D)": "24/06/12",
            "Duration": "5h15min"
        }
    ]

    const columns: ColumnDef<typeof mockDataTable[0]>[] = [
        {
            header: "Status",
            accessorKey: "Status",
        },
        {
            header: "Response",
            accessorKey: "Response",
            cell: ({ row }) => {
                const res: any = row.getValue("Response");
                return <div className="text-primary">{res}</div>;
            },
        },
        {
            header: "Aircraft Reg.",
            accessorKey: "Aircraft Reg.",
        },
        {
            header: "Depature",
            accessorKey: "Depature",
        },
        {
            header: "Arrival",
            accessorKey: "Arrival",
        },
        {
            header: "DPP (T)",
            accessorKey: "DPP (T)",
        },
        {
            header: "DPP (D)",
            accessorKey: "DPP (D)",
        },
        {
            header: "ARR (T)",
            accessorKey: "ARR (T)",
        },
        {
            header: "ARR (D)",
            accessorKey: "ARR (D)",
        },
        {
            header: "Duration",
            accessorKey: "Duration",
            cell: ({ row }) => {
                const duration: any = row.getValue("Duration");
                return <div className="font-medium">{duration}</div>;
            },
        },
    ];
  return <div className="w-full h-screen flex items-center justify-center">

      <CustomTable className="border-primary" defaultViewPath="/efpl" columns={columns} data={mockDataTable} loading={false} />

  </div>;
};

export default HomeView;
