import { View, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import {
  createTheme,
  ThemeProvider,
  Button,
  Badge,
  Text,
  useTheme,
  useThemeMode,
} from "@rneui/themed";

import {
  NavigationContainer,
  useNavigation,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";

import Edit from "./app/components/Edit";
import List from "./app/components/List";

const Stack = createNativeStackNavigator();

const rneTheme = createTheme({
  mode: "dark",
});

export default function NavigatedApp() {
  const [navMode, setNavMode] = useState("dark");

  // const toggleTheme = () => setTheme("dark" ? "light" : "dark");

  return (
    <NavigationContainer theme={navMode === "dark" ? DarkTheme : DefaultTheme}>
      <ThemeProvider theme={rneTheme}>
        <App setNavMode={setNavMode} />
      </ThemeProvider>
    </NavigationContainer>
  );
}

function App({ setNavMode }) {
  const { theme } = useTheme();
  const { mode, setMode } = useThemeMode();

  const [items, setItems] = useState([
    { id: 1, subject: "Egg", done: false },
    { id: 2, subject: "Apple", done: true },
    { id: 3, subject: "Bread", done: false },
  ]);

  const toggleDone = (id) => {
    setItems(
      items.map((item) => {
        if (item.id === id) item.done = !item.done;
        return item;
      })
    );
  };

  const update = (id, subject) => {
    setItems(
      items.map((item) => {
        if (item.id === id) item.subject = subject;
        return item;
      })
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List"
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "Bold",
                  marginRight: 10,
                }}
              >
                Todo List
              </Text>
              <Badge
                value={items.filter((i) => !i.done).length}
                status="primary"
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ marginRight: 30 }}>
              <TouchableOpacity
                onPress={() => {
                  setMode(mode === "dark" ? "light" : "dark");
                  setNavMode(mode === "dark" ? "light" : "dark");
                }}
              >
                {mode === "dark" ? (
                  <Ionicons name="sunny" size={24} color={theme.colors.black} />
                ) : (
                  <Ionicons name="moon" size={24} color={theme.colors.black} />
                )}
              </TouchableOpacity>
            </View>
          ),
        }}
      >
        {() => (
          <View>
            <List items={items} setItems={setItems} toggleDone={toggleDone} />
            <View
              style={{
                margin: 30,
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              {items.filter((item) => !item.done).length && (
                <Button
                  color="secondary"
                  type="clear"
                  style={{ marginRight: 20 }}
                  titleStyle={{ color: theme.colors.success }}
                  onPress={() => {
                    setItems(
                      items.map((item) => {
                        item.done = true;
                        return item;
                      })
                    );
                  }}
                >
                  <Ionicons
                    name="md-checkmark-done-sharp"
                    color={theme.colors.success}
                    size={20}
                    style={{ marginRight: 10 }}
                  />
                  <Text style={{ fontSize: "14px" }}>Mark all done</Text>
                </Button>
              )}

              {items.filter((item) => item.done).length && (
                <Button
                  type="secondary"
                  titleStyle={{ color: theme.colors.error }}
                  onPress={() => {
                    setItems(items.filter((item) => !item.done));
                  }}
                >
                  <Ionicons
                    name="trash-bin"
                    color={theme.colors.error}
                    size={20}
                    style={{ marginRight: 10 }}
                  />

                  <Text style={{ fontSize: "14px" }}>Clear</Text>
                </Button>
              )}
            </View>
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="Edit">{() => <Edit update={update} />}</Stack.Screen>
    </Stack.Navigator>
  );
}
