export const colors = {
  navy: "#0B1F3A",
  primary: "#2457D6",
  primaryDark: "#173D99",
  secondary: "#0F8B8D",
  success: "#2E7D5B",
  warning: "#B7791F",
  danger: "#B94A48",
  purple: "#7451A6",
  info: "#2F6EA5",
  background: "#F5F7FA",
  surface: "#FFFFFF",
  surfaceAlt: "#EEF3F8",
  border: "#D8E1EA",
  text: "#102033",
  textMuted: "#63758A",
  disabled: "#AAB7C4",
  white: "#FFFFFF"
};

export const statusColors = {
  Active: { fg: "#1F6F4A", bg: "#E6F4ED", accent: colors.success },
  Pending: { fg: "#8A5A12", bg: "#FFF3D8", accent: colors.warning },
  Disposed: { fg: "#94413F", bg: "#F8E7E6", accent: colors.danger },
  Closed: { fg: "#586574", bg: "#EBEEF2", accent: "#7B8794" },
  Stayed: { fg: "#255E91", bg: "#E5F0FA", accent: colors.info },
  Transferred: { fg: "#654397", bg: "#EEE8F7", accent: colors.purple }
};
