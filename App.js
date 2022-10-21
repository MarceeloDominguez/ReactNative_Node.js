import { NavigationContainer } from "@react-navigation/native";
import { TaskContextProvider } from "./src/context/TaskContextProvider";
import Navigation from "./src/navigation/Navigation";

export default function App() {
  return (
    <NavigationContainer>
      <TaskContextProvider>
        <Navigation />
      </TaskContextProvider>
    </NavigationContainer>
  );
}
