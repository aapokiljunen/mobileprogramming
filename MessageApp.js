import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleAdd = () => {
        setMessages([...messages, message]);
        setMessage('');
    }

    const itemSeparator = () => {
        return (<View style={{ backgroundColor: 'black', height: 1 }}></View>);
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.headline}>Message Board</Text>
                <TextInput placeholder='Write a message'
                    onChangeText={text => setMessage(text)}
                    value={message}
                />
                <Button title="Add message" onPress={handleAdd} />
            </View>
            <View style={styles.listView}>
                <FlatList
                    data={messages}
                    ItemSeparatorComponent={itemSeparator}
                    renderItem={({ item }) =>
                        <View style={styles.listItem}>
                            <Text>Viesti: </Text>
                            <Text>{item}</Text>
                        </View>
                    }
                />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 50,

    },
    headline: {
        fontSize: 20,
        color: 'red',
    },
    listItem: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'lightgrey',
    },
    listView: {
        marginTop: 5
    },
});
