import Link from "next/link";
import { Link as MuiLink, LinkBaseProps } from "@mui/material/";

interface LinkProps extends LinkBaseProps {
  href: string;
  label: string;
  color?: "textPrimary" | "textSecondary";
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline"
    | "inherit"
    | undefined;
}

const CLink: React.FC<LinkProps> = ({ ...props }) => {
  return (
    <>
      <Link href={props.href} passHref>
        <MuiLink {...props} underline="hover" color={props.color} variant={props.variant}>
          {props.label}
        </MuiLink>
      </Link>
    </>
  );
};

export default CLink;
