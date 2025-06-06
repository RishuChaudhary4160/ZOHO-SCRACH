import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

// AccordionSection Component
const AccordionSection = ({ title, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Accordion
      expanded={isOpen}
      onChange={() => setIsOpen(!isOpen)}
      sx={{
        marginBottom: "8px",
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
        boxShadow: "none",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          backgroundColor: "#f5f5f5",
          "&:hover": { backgroundColor: "#e0e0e0" },
          padding: "0 16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Typography
            sx={{ display: "flex", alignItems: "center", fontWeight: 600 }}
          >
            <span style={{ marginRight: "8px" }}>{icon}</span>
            {title}
          </Typography>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "#e0e0e0",
                color: "#000",
                minWidth: "24px",
                height: "24px",
                borderRadius: "50%",
                marginRight: "8px",
              }}
            >
              0
            </Button>
            <IconButton
              size="small"
              sx={{
                backgroundColor: "#e0e0e0",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                marginRight: "8px",
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>{children}</AccordionDetails>
    </Accordion>
  );
};

// TableHeader Component
const TableHeader = ({ headers }) => (
  <Table>
    <TableHead>
      <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
        {headers.map((header, index) => (
          <TableCell
            key={index}
            sx={{ fontWeight: 600, fontSize: "12px", padding: "8px" }}
          >
            {header}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  </Table>
);

// TableRow Component
const TableRows = ({ data }) => (
  <div
    className="grid gap-2 p-2 text-sm border-t"
    style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}
  >
    {data.map((item, index) => (
      <span key={index}>{item}</span>
    ))}
  </div>
);

const NoRecords = () => (
  <Typography sx={{ padding: "16px", textAlign: "center", color: "#757575" }}>
    No records found
  </Typography>
);

// Dashboard Component (Main component)
const RelatedDataTab = () => {
  const assetHeaders = [
    "EMPLOYEE ID",
    "GIVEN DATE",
    "ASSET DETAILS",
    "TYPE OF ASSET",
    "RETURN DATE",
    "ADDED BY",
    "ADDED TIME",
    "MODIFIED BY",
    "MODIFIED TIME",
  ];

  const travelHeaders = [
    "EMPLOYEE ID",
    "TRAVEL ID",
    "EMPLOYEE DEPARTMENT",
    "PLACE OF VISIT",
    "EXPECTED DATE OF DEPARTURE",
    "EXPECTED DATE OF ARRIVAL",
    "PURPOSE OF VISIT",
    "EXPECTED DURATION IN DAYS",
  ];

  const dummyAssetData = [
    [
      "EMP001",
      "2025-01-10",
      "Laptop",
      "Hardware",
      "2025-06-10",
      "HR001",
      "2025-01-10 10:00",
      "HR002",
      "2025-01-11 09:00",
    ],
  ];

  const dummyTravelData = [
    [
      "EMP002",
      "TRV001",
      "IT",
      "New York",
      "2025-07-01",
      "2025-07-05",
      "Client Meeting",
      "5",
    ],
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <AccordionSection title="Asset" icon="🖥️">
        <TableHeader headers={assetHeaders} />
        {dummyAssetData.length > 0 ? (
          dummyAssetData.map((row, index) => (
            <TableRow key={index} data={row} />
          ))
        ) : (
          <NoRecords />
        )}
      </AccordionSection>

      <AccordionSection title="Benefit" icon="🎁">
        <NoRecords />
      </AccordionSection>

      <AccordionSection title="Exit Details" icon="📜">
        <NoRecords />
      </AccordionSection>

      <AccordionSection title="Travel Request" icon="✈️">
        <TableHeader headers={travelHeaders} />
        {dummyTravelData.length > 0 ? (
          dummyTravelData.map((row, index) => (
            <TableRow key={index} data={row} />
          ))
        ) : (
          <NoRecords />
        )}
      </AccordionSection>
    </div>
  );
};

export default RelatedDataTab;
export { AccordionSection, TableHeader, TableRows, NoRecords };
