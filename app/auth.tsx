import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Logo } from "../src/components/Logo";
import { supabase } from "../src/lib/supabase";
import { colors, radii } from "../src/theme";

type Mode = "signin" | "signup";
type AccountType = "customer" | "provider";

export default function AuthScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [accountType, setAccountType] = useState<AccountType>("customer");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!email.trim() || password.length < 8 || (mode === "signup" && !displayName.trim())) {
      Alert.alert("Check your details", "Enter a valid email, name and a password with at least 8 characters.");
      return;
    }

    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        router.replace("/(tabs)/profile");
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            display_name: displayName.trim(),
            account_type: accountType,
            locale: "de-DE",
          },
        },
      });
      if (error) throw error;

      if (data.session) router.replace("/(tabs)/profile");
      else Alert.alert("Check your email", "Your Cakelio account was created. Confirm your email, then return to the app and sign in.");
    } catch (error) {
      Alert.alert("Cakelio", error instanceof Error ? error.message : "Authentication failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
        <View style={styles.nav}><Logo /><TouchableOpacity onPress={() => router.back()}><Text style={styles.back}>Close</Text></TouchableOpacity></View>
        <View style={styles.card}>
          <Text style={styles.kicker}>{mode === "signin" ? "WELCOME BACK" : "JOIN CAKELIO"}</Text>
          <Text style={styles.title}>{mode === "signin" ? "Sign in to Cakelio" : "Create your account"}</Text>
          <Text style={styles.lead}>{mode === "signin" ? "Continue with your cakes, requests and conversations." : "Start as a customer or cake maker. You can expand your profile later."}</Text>

          {mode === "signup" && <View style={styles.roleRow}>{(["customer", "provider"] as AccountType[]).map((type) => <TouchableOpacity key={type} onPress={() => setAccountType(type)} style={[styles.role, accountType === type && styles.roleActive]}><Text style={[styles.roleText, accountType === type && styles.roleTextActive]}>{type === "customer" ? "Customer" : "Cake maker"}</Text></TouchableOpacity>)}</View>}
          {mode === "signup" && <TextInput style={styles.input} placeholder="Name" placeholderTextColor={colors.muted} value={displayName} onChangeText={setDisplayName} />}
          <TextInput style={styles.input} autoCapitalize="none" keyboardType="email-address" placeholder="Email" placeholderTextColor={colors.muted} value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} secureTextEntry placeholder="Password (8+ characters)" placeholderTextColor={colors.muted} value={password} onChangeText={setPassword} />
          <TouchableOpacity disabled={busy} onPress={submit} style={styles.primary}><Text style={styles.primaryText}>{busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setMode(mode === "signin" ? "signup" : "signin")} style={styles.switch}><Text style={styles.switchText}>{mode === "signin" ? "New to Cakelio? Create an account" : "Already have an account? Sign in"}</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({safe:{flex:1,backgroundColor:colors.cream},page:{paddingHorizontal:18,paddingBottom:50},nav:{height:72,flexDirection:"row",alignItems:"center",justifyContent:"space-between"},back:{color:colors.terra,fontWeight:"800",fontSize:12},card:{marginTop:34,backgroundColor:colors.paper,borderWidth:1,borderColor:colors.line,borderRadius:radii.large,padding:24},kicker:{fontSize:9,fontWeight:"800",letterSpacing:1.5,color:colors.sage},title:{fontSize:35,lineHeight:39,fontWeight:"750",letterSpacing:-1.6,color:colors.cocoa,marginTop:9},lead:{fontSize:13,lineHeight:20,color:colors.muted,marginTop:9,marginBottom:22},roleRow:{flexDirection:"row",gap:8,marginBottom:12},role:{flex:1,padding:12,borderWidth:1,borderColor:colors.line,borderRadius:radii.small,alignItems:"center",backgroundColor:colors.cream},roleActive:{borderColor:colors.sage,backgroundColor:colors.sageSoft},roleText:{fontSize:11,fontWeight:"700",color:colors.cocoa2},roleTextActive:{color:colors.cocoa,fontWeight:"800"},input:{borderWidth:1,borderColor:colors.line,borderRadius:radii.small,backgroundColor:colors.cream,paddingHorizontal:14,paddingVertical:13,color:colors.cocoa,fontSize:13,marginBottom:10},primary:{marginTop:4,backgroundColor:colors.terra,borderRadius:radii.pill,padding:15,alignItems:"center"},primaryText:{color:colors.white,fontWeight:"800",fontSize:12},switch:{padding:15,alignItems:"center",marginTop:5},switchText:{color:colors.terra,fontWeight:"800",fontSize:11}});
