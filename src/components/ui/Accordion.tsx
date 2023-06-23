import * as React from "react";
import { styled } from "@mui/material/styles";
import { GitHub, LinkedIn } from "@mui/icons-material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { InfoOutlined } from "@mui/icons-material";
import { Tooltip, IconButton } from "@mui/material";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion
    disableGutters
    elevation={0}
    square
    {...props}
  />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "#fafafa" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#131212",
  color: "#ffffff",
  border: "rgba(113, 113, 113, 0.3)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "#0C0B0B",
  color: "#ffffff",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const accordionUtilities = [
    {
      expandIdentity: "panel1",
      headline: "How to Sign Up ? ",
      informationText:
        "This web application uses third-party APIs to carry out some information such as adding movie watchlists, fetching popular movies, authenticating users and so on. if you want to log in to this application, you can directly click the sign up anchor text in the login component, it will direct you directly to the TMDB movie Website. You can register an account there.  Sorry for the inefficiency of this application :')",
    },
    {
      expandIdentity: "panel2",
      headline: "Already have account on TMDB ?",
      informationText:
        "if you are reading this it means you have read the written guide which is in the title 'How to Sign Up' if not I hope you read it first then come back here, after your account is registered on the TMDB website you can immediately log in to this application and use the features in it enjoy it",
    },
    {
      expandIdentity: "panel3",
      headline: "Creator information",
      informationText:
        "from creator: Hello, I am the developer who maintains and makes this website, if there are complaints about this website, I will be very happy if I can find out from you, I am also active on several platforms such as linkedin and github.",
    },
  ];

  return (
    <div className='p-10 relative'>
      <div className='p-2'>
        <Tooltip title='Important to read before login'>
          <IconButton>
            <InfoOutlined htmlColor='#fafafa' />
          </IconButton>
        </Tooltip>
      </div>
      {accordionUtilities.map((util, index) => (
        <AccordionItem
          key={index}
          identity={util.expandIdentity}
          expanded={expanded}
          handleChange={handleChange}
          headline={util.headline}
          informationText={util.informationText}
        />
      ))}
    </div>
  );
}

interface AccordionItemProps {
  expanded: boolean | string;
  handleChange: (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => void;
  headline: string;
  informationText: string;
  identity: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  expanded,
  handleChange,
  headline,
  informationText,
  identity,
}) => {
  return (
    <Accordion
      sx={{ border: "1px solid #0C0B0B" }}
      elevation={1}
      expanded={expanded === identity}
      onChange={handleChange(identity)}>
      <AccordionSummary
        aria-controls='panel1d-content'
        id='panel1d-header'>
        <Typography>{headline}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {informationText}{" "}
          {identity === "panel3" ? (
            <ul className='list-disc px-4 py-2 flex flex-col gap-4'>
              <li>
                <a
                  href='https://www.linkedin.com/in/zakyirwansyahandhika/'
                  target='_blank'>
                  <LinkedIn />
                </a>
              </li>
              <li>
                <a
                  href='https://github.com/zackfedev'
                  target='_blank'>
                  <GitHub />
                </a>
              </li>
            </ul>
          ) : null}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
