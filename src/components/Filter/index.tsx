import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";
import { StatusIcon } from "../StatusIcon";

type FilterProps = TouchableOpacityProps & {
  status: FilterStatus;
  isActive: boolean;
};

export function Filter({ status, isActive, ...rest }: FilterProps) {
  return (
    <TouchableOpacity
      style={[styles.container, { opacity: isActive ? 1 : 0.5 }]}
      {...rest}
      activeOpacity={0.8}
    >
      <StatusIcon status={status} />s
      <Text style={styles.title}>
        {status === FilterStatus.PENDING
          ? "Pendentes"
          : status === FilterStatus.DONE
          ? "Comprados"
          : ""}
      </Text>
    </TouchableOpacity>
  );
}
