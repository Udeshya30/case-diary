import { StyleSheet } from "react-native";
import { radius } from "../theme/radius";

export const styles = StyleSheet.create({
  badge: {
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-start"
  },
  text: {
    fontSize: 12,
    fontWeight: "800"
  }
});
