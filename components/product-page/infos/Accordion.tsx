import { styled } from "@mui/material/styles";
import { BiRightArrow } from "react-icons/bi";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import styles from "./styles.module.scss";
import { useState } from "react";


const Accordion = styled((props) => (
  // @ts-ignore
  <MuiAccordion disableGutters elevation={0} square {...props}/>
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  background: "transparent",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<BiRightArrow style={{fontSize: "0.9rem"}} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

type AccordianProps = {
  details: {
    name: string;
    value: string;
}[];
  description: string;
};

export default function AccordionComponent({ details, description }: AccordianProps) {
  const [expanded, setExpanded] = useState("");
  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : "");
    };
  return (
    <div className={styles.infos__accordion}>
      {/* @ts-ignore */}
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        className={styles.accordion}
      >
      {/* @ts-ignore */}
        <AccordionSummary
          className={styles.accordion__summary}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          Details
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.infos__accordion_grid}>
            <p>{description}</p>
          </div>
        </AccordionDetails>
        <AccordionDetails className="scrollbar">
          {details.slice(1, details.length).map((info, idx) => (
            <div key={idx} className={styles.infos__accordion_grid}>
              <span>{info.name}:</span>
              <span>{info.value}</span>
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
