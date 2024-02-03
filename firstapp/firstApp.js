import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

	const [message, setMessage] = useState('');

	const showAlert = () => {
		Alert.alert('Hello', `Hello ${message}`);
	}

	return (
		<View style={styles.container}>
			<Text>Hello world</Text>
			<TextInput placeholder='Your name' onChangeText={text => setMessage(text)}/>
			<Button title="press" onPress={showAlert} />
			<StatusBar style="auto" />
		</View>
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
