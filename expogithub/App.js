import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
	const [keyword, setKeyword] = useState('');
	const [repositories, setRepositories] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchRepositories = () => {
		setLoading(true);
		fetch(`https://api.github.com/search/repositories?q=${keyword}`)
			.then(response => {
				if (!response.ok)
					throw new Error('Error in fetch: ' + response.statusText);

				return response.json();
			})
			.then(data => {
				setRepositories(data.items);
				setLoading(false);
			})
			.catch(err => {
				console.error(err);
				setLoading(false);
			})
	};


	return (
		<View style={styles.container}>
			{loading ? (<ActivityIndicator size='large'/>) : (
				<View style={{ alignItems: 'center' }}>
					<View style={{ flex: 1, marginTop: 50 }} >
						<TextInput
							value={keyword}
							onChangeText={text => setKeyword(text)}
							placeholder='Keyword'
						/>
						<Button title="Fetch" onPress={fetchRepositories} />
					</View>
					<View style={{ flex: 10 }}>
						<FlatList
							data={repositories}
							renderItem={({ item }) =>
								<View style={{ margin: 10 }}>
									<Text style={{ fontSize: 18 }}>{item.full_name}</Text>
									<Text>{item.description}</Text>
								</View>
							}
						/>
					</View>
				</View>
			)}
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
