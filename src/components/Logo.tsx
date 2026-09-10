import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <View style={styles.row}>
      <View style={styles.icon}>
        <View style={styles.cake} />
        <View style={styles.candle} />
        <View style={styles.flame} />
      </View>
      {!compact && <Text style={styles.word}>cakelio</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 9 },
  icon: { width: 34, height: 34, borderRadius: 12, backgroundColor: colors.cocoa, alignItems: "center", justifyContent: "center" },
  cake: { width: 18, height: 11, borderWidth: 2, borderTopWidth: 0, borderColor: colors.cream, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, marginTop: 6 },
  candle: { position: "absolute", width: 2, height: 8, top: 5, backgroundColor: colors.terraSoft, borderRadius: 2 },
  flame: { position: "absolute", width: 5, height: 5, top: 2, backgroundColor: colors.terra, borderRadius: 5 },
  word: { color: colors.cocoa, fontSize: 25, fontWeight: "800", letterSpacing: -1.3 },
});
