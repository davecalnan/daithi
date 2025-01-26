import { Link, LinkProps } from "expo-router";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

export type TileProps = {
  icon: (props: { color: string; className: string }) => React.ReactNode;
  colors: {
    bg: string;
    text: string;
  };
  children: React.ReactNode;
};

function TileImplementation({
  icon: Icon,
  colors,
  children,
  ...props
}: TileProps & TouchableOpacityProps) {
  return (
    <TouchableOpacity
      className="p-4 w-36 h-36 rounded-lg gap-2"
      activeOpacity={0.7}
      {...props}
      style={{ backgroundColor: colors.bg }}
    >
      <View
        className="h-8 w-8 rounded justify-center items-center"
        style={{ backgroundColor: colors.text }}
      >
        <Icon className="text-xl" color={colors.bg} />
      </View>
      <Text className="text-2xl font-extrabold" style={{ color: colors.text }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

function TileLink({ href, ...props }: Pick<LinkProps, "href"> & TileProps) {
  return (
    <Link href={href} asChild>
      <TileImplementation {...props} />
    </Link>
  );
}

export const Tile = Object.assign(TileImplementation, {
  Link: TileLink,
});
