import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  Icon from '@expo/vector-icons/MaterialIcons';
import { QueryClient, QueryClientProvider } from 'react-query';
import ChatScreen from './modules/Chat';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,

    }
  }
});


const Tabs = createBottomTabNavigator();


const Screen = () => {
  return (
    <View style={styles.container}>
    <StatusBar style="auto" />
    <Text>Hello </Text>
  </View>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <NavigationContainer>
    <Tabs.Navigator
      initialRouteName="Chat"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          shadowOpacity: 0.1,
          shadowColor: 'black',
          borderTopWidth: 0,

          height: 76,
          paddingHorizontal: 4,
          paddingVertical: 4,
        },
        tabBarItemStyle: {
          height: 76,
          paddingBottom: Platform.OS === 'ios' ? 28 : 16,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#191A1A',
        tabBarInactiveTintColor: '#C3C5C5',
      }}>
              <Tabs.Screen
        name="Home"
        component={Screen}
        options={{
          tabBarLabel: 'Home',
      
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          
          tabBarIcon: ({ color, size }) => (
            <Icon name="chat-bubble" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="Explore"
        component={Screen}
        options={{
         
          
          tabBarIcon: ({ color, size }) => (
            <Icon name="place" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        component={Screen}
        options={{
       
          
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
      </Tabs.Navigator>
    </NavigationContainer>
    </QueryClientProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

