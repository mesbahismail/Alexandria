import { extendTheme } from "@mui/joy/styles";
import { accordionSummaryClasses } from "@mui/joy/AccordionSummary";
import { TbChevronDown } from "react-icons/tb";
import { Source_Code_Pro, Syne } from "next/font/google";
import type { InputOwnerState } from "@mui/joy/Input";

// Type declarations
declare module "@mui/joy/Button" {
  interface ButtonPropsColorOverrides {
    secondary: true;
  }
}

declare module "@mui/joy/Select" {
  interface SelectPropsSizeOverrides {
    md: true;
    lg: true;
  }
  interface SelectPropsVariantOverrides {
    plain: true;
    outlined: true;
    soft: true;
    solid: true;
  }
  interface SelectPropsSlots {
    indicator?: true;
  }
}

// Font initialization
const spaceGrotesk = Syne({
  subsets: ["latin"],
  adjustFontFallback: false,
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
});

const theme = extendTheme({
  fontFamily: {
    body: spaceGrotesk.style.fontFamily,
    display: spaceGrotesk.style.fontFamily,
    code: sourceCodePro.style.fontFamily,
  },
  components: {
    JoyButton: {
      defaultProps: {
        color: "primary",
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === "primary" &&
            ownerState.variant === "solid" && {
              backgroundColor: "#34B3F1",
              border: "1px solid #34B3F1",
              color: "#050B0F",
              borderRadius: "12px",
              minHeight: "40px",
              padding: "0px 12px",
              width: "fit-content",
              minWidth: "unset",
              transition:
                "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease",
              "&:hover": {
                backgroundColor: "#51C6FF",
                border: "1px solid #81D6FF",
                boxShadow: "0 0 24px rgba(81, 198, 255, 0.24)",
              },
              "&&": { fontWeight: 600 },
            }),

          ...(ownerState.color === "secondary" &&
            ownerState.variant === "outlined" && {
              border: "1px solid #355067",
              color: "#ffffff",
              backgroundColor: "transparent",
              borderRadius: "12px",
              minHeight: "40px",
              padding: "0px 12px",
              width: "fit-content",
              minWidth: "unset",
              transition: "border-color 0.2s ease, background-color 0.2s ease",
              "&:hover": {
                backgroundColor: "#091D29",
                borderColor: "#567691",
              },
              "&&": { fontWeight: 500 },
            }),
          ...(ownerState.color === "secondary" &&
            ownerState.variant === "outlined" &&
            ownerState.size === "sm" && {
              border: "1px solid #444444",
              color: "#ffffff",
              backgroundColor: "transparent",
              borderRadius: "10px",
              minHeight: "32px",
              padding: "0px 8px",
              width: "fit-content",
              minWidth: "unset",
              transition: "border-color 0.2s ease, background-color 0.2s ease",
              "&:hover": {
                backgroundColor: "#222",
                borderColor: "#666",
              },
              "&&": { fontWeight: 500 },
            }),
          ...(ownerState.color === "secondary" &&
            ownerState.variant === "plain" && {
              color: "#ffffff",
              backgroundColor: "transparent",
              padding: "0 8px",
              minHeight: "auto",
              transition: "border-color 0.2s ease, background-color 0.2s ease",
              "&:hover": {
                backgroundColor: "transparent",
                textUnderlineOffset: "4px",
              },
              "&:active": {
                transform: "none",
              },
              "&&": {
                fontWeight: 500,
              },
            }),
        }),
      },
    },

    JoySelect: {
      defaultProps: {
        variant: "outlined",
        color: "neutral",
        slotProps: {
          indicator: {
            component: TbChevronDown,
            sx: {
              color: "#999",
              transition: "transform 0.2s ease",
              "&[data-joy-open]": {
                transform: "rotate(-180deg)",
              },
              marginLeft: "4px",
            },
          },
        },
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: "12px",
          fontSize: "14px",
          minHeight: "40px",
          border: "1px solid #444",
          background: "transparent",
          padding: "8px 12px",
          fontFamily: spaceGrotesk.style.fontFamily,
          transition: "border-color 0.2s ease, background-color 0.2s ease",
          color: "#fff",
          "& [class*=selectedValue]": {
            paddingRight: "8px",
            color: "#fff",
          },
          "&:hover": {
            borderColor: "#666",
            backgroundColor: "transparent",
          },
          "&:focus-within": {
            borderColor: "#aaa",
            outline: "none",
            boxShadow: "none",
          },
          "&::before, &::after, fieldset": {
            border: "none",
            outline: "none",
            boxShadow: "none",
          },
        }),
      },
    },

    JoyList: {
      styleOverrides: {
        root: {
          "--List-padding": "8px",
          "--List-radius": "8px",
          backgroundColor: "#000",
        },
      },
    },

    JoyOption: {
      styleOverrides: {
        root: {
          color: "#ddd",
          fontSize: "14px",
          padding: "8px 12px",
          "&:hover": {
            backgroundColor: "#333",
          },
          '&[aria-selected="true"]': {
            backgroundColor: "#2a2a2a",
            fontWeight: 500,
          },
        },
      },
    },

    JoyRadio: {
      styleOverrides: {
        radio: {
          backgroundColor: "transparent",
          color: "transparent",
          borderWidth: 2,
          borderColor: "#444",
          "&.Mui-checked": {
            borderColor: "#EDB772",
            color: "#EDB772",
          },
          "&:hover": {
            backgroundColor: "#222",
          },
        },
      },
    },

    JoyTextarea: {
      defaultProps: {
        color: "primary",
        variant: "outlined",
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: "12px",
          fontSize: "14px",
          fontFamily: spaceGrotesk.style.fontFamily,
          transition: "border-color 0.2s ease, background-color 0.2s ease",
          "--Textarea-paddingBlock": "calc(0.5rem - 1px)",
          "--Textarea-minHeight": "40px",
          border: "1px solid #444",
          backgroundColor: "transparent",
          color: "#fff",
          "&:hover": {
            borderColor: "#666",
            backgroundColor: "transparent",
          },
          "&:focus-within": {
            borderColor: "#aaa",
            outline: "none",
            boxShadow: "none",
          },
          "&::before, &::after, fieldset": {
            border: "none",
            outline: "none",
            boxShadow: "none",
          },
        }),
        textarea: {
          "&::placeholder": {
            color: "#aaa",
            opacity: 1,
          },
        },
      },
    },
  },
});

export default theme;
