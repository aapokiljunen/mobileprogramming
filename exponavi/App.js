import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Guesser from './components/Guesser';
import History from './components/History';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Guesser' component={Guesser} />
                <Stack.Screen name='History' component={History} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
