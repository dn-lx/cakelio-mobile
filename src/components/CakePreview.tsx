import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

const frostingColors: Record<string, string> = {
  Vanilla: "#FFFAF3",
  Blush: colors.blush,
  Sage: "#B9C7B8",
  Chocolate: "#6F4A3B",
  Lemon: "#F4DFA2",
};

export function CakePreview({ frosting="Blush", tiers=1, message="make a wish", decoration="Flowers" }: { frosting?: string; tiers?: number; message?: string; decoration?: string }) {
  const fill = frostingColors[frosting] ?? frostingColors.Vanilla;
  return (
    <View style={styles.scene}>
      <View style={styles.decor}>{decoration === "Flowers" && <Text style={styles.decorText}>✿  ✿  ✿</Text>}{decoration === "Berries" && <Text style={styles.decorText}>●  ●  ●</Text>}{decoration === "Gold" && <Text style={styles.decorText}>✦  ✧  ✦</Text>}</View>
      {tiers === 2 && <View style={[styles.topTier,{backgroundColor:fill}]} />}
      <View style={[styles.mainTier,{backgroundColor:fill}]}><Text numberOfLines={2} style={styles.message}>{message || "your message"}</Text></View>
      <View style={styles.plate} />
    </View>
  );
}

const styles=StyleSheet.create({
  scene:{height:260,borderRadius:24,backgroundColor:"#F7EDE4",alignItems:"center",justifyContent:"flex-end",paddingBottom:48,overflow:"hidden"},
  mainTier:{width:184,height:112,borderWidth:1,borderColor:"rgba(53,38,32,.15)",borderTopLeftRadius:45,borderTopRightRadius:45,borderBottomLeftRadius:13,borderBottomRightRadius:13,alignItems:"center",justifyContent:"center",zIndex:2},
  topTier:{width:126,height:70,borderWidth:1,borderColor:"rgba(53,38,32,.15)",borderTopLeftRadius:36,borderTopRightRadius:36,borderBottomLeftRadius:9,borderBottomRightRadius:9,marginBottom:-2,zIndex:3},
  message:{color:colors.cocoa2,fontSize:14,fontStyle:"italic",fontFamily:"serif",maxWidth:130,textAlign:"center"},
  plate:{position:"absolute",bottom:38,width:225,height:14,borderRadius:100,backgroundColor:"#D9CEC4",zIndex:1},
  decor:{position:"absolute",top:44,zIndex:5},decorText:{fontSize:18,color:colors.terra}
});
