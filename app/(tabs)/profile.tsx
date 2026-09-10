import { useRouter } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Logo } from "../../src/components/Logo";
import { useAuth } from "../../src/context/AuthContext";
import { colors, radii } from "../../src/theme";

export default function ProfileScreen(){
  const router=useRouter();
  const {userId,profile,loading,signOut}=useAuth();
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.page}><View style={styles.nav}><Logo/></View>
    <Text style={styles.kicker}>YOUR CAKELIO</Text>
    <Text style={styles.title}>{userId ? `Welcome${profile?.display_name ? `, ${profile.display_name}` : ""}.` : "One account. Two sides of Cakelio."}</Text>
    <Text style={styles.lead}>{loading ? "Loading your account…" : userId ? "Your mobile account is connected to the shared Cakelio backend." : "Sign in to save cake designs, contact bakers and manage requests."}</Text>

    {userId ? <>
      <View style={styles.card}><View style={[styles.icon,{backgroundColor:colors.terraSoft}]}><Text style={styles.iconText}>{profile?.primary_role === "provider" ? "P" : "C"}</Text></View><Text style={styles.cardTitle}>{profile?.primary_role === "provider" ? "Cakelio Pro" : "Customer"}</Text><Text style={styles.cardText}>{profile?.primary_role === "provider" ? "Your provider onboarding, capabilities, quotes and order tools will live here." : "Saved designs, favourite bakers, requests, orders and conversations will live here."}</Text></View>
      <TouchableOpacity style={styles.primary} onPress={async()=>{await signOut();}}><Text style={styles.primaryText}>Sign out</Text></TouchableOpacity>
    </> : <>
      <View style={styles.card}><View style={[styles.icon,{backgroundColor:colors.terraSoft}]}><Text style={styles.iconText}>C</Text></View><Text style={styles.cardTitle}>Customer</Text><Text style={styles.cardText}>Save designs, favourite bakers, requests, orders and conversations.</Text><TouchableOpacity style={styles.primary} onPress={()=>router.push("/auth")}><Text style={styles.primaryText}>Sign in or create account</Text></TouchableOpacity></View>
      <View style={[styles.card,styles.proCard]}><View style={[styles.icon,{backgroundColor:"#4A3A33"}]}><Text style={[styles.iconText,{color:colors.cream}]}>P</Text></View><Text style={[styles.cardTitle,{color:colors.cream}]}>Cakelio Pro</Text><Text style={[styles.cardText,{color:"#D2C6BE"}]}>Cake makers can create a provider account and later add capabilities, portfolio, quotes and availability.</Text><TouchableOpacity style={styles.proButton} onPress={()=>router.push("/auth")}><Text style={styles.proButtonText}>Create provider account</Text></TouchableOpacity></View>
    </>}
  </ScrollView></SafeAreaView>
}
const styles=StyleSheet.create({safe:{flex:1,backgroundColor:colors.cream},page:{paddingHorizontal:18,paddingBottom:40},nav:{height:68,justifyContent:"center"},kicker:{marginTop:25,color:colors.sage,fontSize:10,fontWeight:"800",letterSpacing:1.5},title:{fontSize:39,lineHeight:42,fontWeight:"750",letterSpacing:-1.8,color:colors.cocoa,marginTop:7},lead:{fontSize:13,lineHeight:20,color:colors.muted,marginTop:8,marginBottom:20},card:{backgroundColor:colors.paper,borderWidth:1,borderColor:colors.line,borderRadius:radii.large,padding:22,marginTop:11},icon:{width:48,height:48,borderRadius:16,alignItems:"center",justifyContent:"center"},iconText:{fontFamily:"serif",fontSize:20,color:colors.cocoa},cardTitle:{fontSize:24,fontWeight:"800",letterSpacing:-1,color:colors.cocoa,marginTop:18},cardText:{fontSize:13,lineHeight:20,color:colors.muted,marginTop:7},primary:{marginTop:18,backgroundColor:colors.terra,borderRadius:radii.pill,padding:13,alignItems:"center"},primaryText:{color:colors.white,fontWeight:"800",fontSize:11},proCard:{backgroundColor:colors.cocoa,borderColor:colors.cocoa},proButton:{marginTop:18,backgroundColor:colors.cream,borderRadius:radii.pill,padding:13,alignItems:"center"},proButtonText:{color:colors.cocoa,fontWeight:"800",fontSize:11}})
