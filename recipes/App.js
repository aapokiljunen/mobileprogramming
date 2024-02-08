import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Button, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
    const [keyword, setKeyword] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRecipes = () => {
        setLoading(true);
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
            .then(response => {
                console.log(response);
                if (!response.ok)
                    throw new Error('Error in fetch: ' + response.statusText);

                return response.json();
            })
            .then(data => {
                setRecipes(data.meals);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            })
    };


    return (
        <View style={styles.container}>
            {loading ? (<ActivityIndicator size='large' />) : (
                <View style={{ alignItems: 'center' }}>
                    <View style={{ flex: 1, marginTop: 50 }} >
                        <TextInput
                            value={keyword}
                            onChangeText={text => setKeyword(text)}
                            placeholder='Keyword'
                        />
                        <Button title="Searc recipes" onPress={fetchRecipes} />
                    </View>
                    <View style={{ flex: 10 }}>
                        <FlatList
                            data={recipes}
                            renderItem={({ item }) =>
                                <View style={{ margin: 10 }}>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: item.strMealThumb }}
                                    />
                                    <Text>{item.strMeal}</Text>
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
    image: {
        width: 50,
        height: 50,
    },
});
