import { Button, FlatList, StyleSheet, Text, View } from 'react-native';


export default function History({ route, navigation }) {
    const { records, recordLow } = route.params;
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Button
                    title="Return to game"
                    onPress={() => navigation.navigate('Guesser', { records: records, recordLow: recordLow })}
                />
            </View>
            <Text style={styles.guessText}>Number of games: {records.length}</Text>
            <View style={{ flex: 2 }}>
                <FlatList
                    data={records}
                    renderItem={({ item }) =>
                        <View style={[styles.listItem, parseFloat(item.guesses) == recordLow ? styles.bestRecord : styles.listItem]}>
                            <Text>Guessed number: {item.number}. Guesses: {item.guesses} </Text>
                        </View>
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    guessText: {
        fontSize: 20,
        color: 'red',
        marginBottom: 10,
    },
    listItem: {
        padding: 5,
        textAlign: 'center',
        backgroundColor: 'lightgrey',
    },
    listView: {
        marginTop: 5,
    },
    bestRecord: {
        backgroundColor: 'lightgreen',
    },
});