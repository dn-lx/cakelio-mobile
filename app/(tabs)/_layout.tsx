import { Tabs } from "expo-router";
import { colors } from "../../src/theme";

export default function TabsLayout(){
  return <Tabs screenOptions={{headerShown:false,tabBarActiveTintColor:colors.terra,tabBarInactiveTintColor:colors.muted,tabBarStyle:{backgroundColor:colors.paper,borderTopColor:colors.line,height:68,paddingTop:7,paddingBottom:8},tabBarLabelStyle:{fontSize:11,fontWeight:"700"}}}>
    <Tabs.Screen name="index" options={{title:"Home"}} />
    <Tabs.Screen name="bakers" options={{title:"Bakers"}} />
    <Tabs.Screen name="inbox" options={{title:"Inbox"}} />
    <Tabs.Screen name="profile" options={{title:"Profile"}} />
  </Tabs>
}
