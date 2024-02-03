import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

    const [records, setRecords] = useState([]);
    const [guessText, setGuessText] = useState('Guess a number between 1-100');
    const [guessCounter, setGuessCounter] = useState(1);
    const [number, setNumber] = useState(0);
    const [guessedNumber, setGuessedNumber] = useState('');
    const [guessList, setGuessList] = useState([]);
    const [lowValue, setLowValue] = useState(1);
    const [highValue, setHighValue] = useState(100);
    const [recordLow, setRecordLow] = useState(100);

    const startGame = () => {
        setGuessText('Guess a number between 1-100');
        setNumber(Math.floor(Math.random() * 100) + 1);
        setGuessCounter(0);
        setGuessList([]);
        setLowValue(1);
        setHighValue(100);
        setGuessedNumber('');
    };

    const newGuess = () => {
        setGuessList([...guessList, guessedNumber]);
        setGuessedNumber('');
        setGuessCounter(count => count + 1);
    }

    const checkGuess = () => {
        let gNum = parseFloat(guessedNumber)
        if (isNaN(parseFloat(guessedNumber))) {
            Alert.alert('Warning', "Type a number first");
        } else if (gNum < 1 || gNum > 100) {
            Alert.alert('Note', "Guess a number between 1-100");
        } else if (gNum == number) {
            Alert.alert(`Your guessed the number in ${guessCounter + 1} guesses. Start new game!`)
            const record = { number: number, guesses: guessCounter + 1 };
            setRecords([...records, record]);
            if (guessCounter < recordLow) { setRecordLow(guessCounter + 1) };
            startGame();
        } else if (gNum > number) {
            setGuessText(`Your guess ${guessedNumber} was too high!`)
            if (gNum < highValue) { setHighValue(gNum) };
            newGuess();
        } else {
            setGuessText(`Your guess ${guessedNumber} was too low!`)
            if (gNum > lowValue) { setLowValue(gNum) };
            newGuess();
        }
    };

    useEffect(() => { startGame() }, []);


    return (
        <View style={styles.container}>
            <View style={{ flex: 2 }}>
                <FlatList
                    data={records}
                    renderItem={({ item }) =>
                        <View style={[styles.listItem, parseFloat(item.guesses) == recordLow ? styles.bestRecord : styles.listItem]}>
                            <Text>Number: {item.number}. Guesses: {item.guesses} </Text>
                        </View>
                    }
                />
            </View>
            <View style={{ flex: 5 }}>
                <Text style={styles.guessText}>{guessText}</Text>
                <View style={{ alignItems: 'center' }}>
                    <Text>Number is between {lowValue} and {highValue}</Text>
                    <TextInput
                        keyboardType='numeric'
                        onChangeText={text => setGuessedNumber(text)}
                        value={guessedNumber}
                        style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
                    />
                    <Button title="Guess a number" onPress={checkGuess} />
                </View>
                <View style={styles.listView}>
                    <FlatList
                        data={guessList}
                        renderItem={({ item }) =>
                            <View style={[styles.listItem, parseFloat(item) < number ? styles.listItemLow : styles.listItemHigh]}>
                                <Text>{item}</Text>
                            </View>
                        }
                    />
                </View>
            </View>
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
    listItemLow: {
        backgroundColor: 'lightblue',
    },
    listItemHigh: {
        backgroundColor: 'red',
    },
    listView: {
        marginTop: 5,
    },
    bestRecord: {
        backgroundColor: 'lightgreen',
    },
});


//Lähde ehdolliselle muotoilulle: https://stackoverflow.com/questions/45478621/react-native-styling-with-conditional