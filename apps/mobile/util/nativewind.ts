import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { cssInterop } from "nativewind";

const USED_ICON_COMPONENTS = [
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
];

USED_ICON_COMPONENTS.map((IconComponent) => {
  cssInterop(IconComponent, {
    className: {
      target: "style",
      nativeStyleToProp: { height: true, width: true, size: true },
    },
  });
});
