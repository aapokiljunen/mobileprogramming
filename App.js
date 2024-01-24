import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

    const [result, setResult] = useState(0);
    const [firstNumber, setFirstNumber] = useState('0');
    const [secondNumber, setSecondNumber] = useState('0');

    const sum = () => {
        setResult(parseFloat(firstNumber) + parseFloat(secondNumber));
    };

    const dif = () => {
        setResult(parseFloat(firstNumber) - parseFloat(secondNumber));
    };

    return (
        <View style={styles.container}>
            <View>
                <Text>Result: {result}</Text>
                <TextInput
                    placeholder='0'
                    keyboardType='numeric'
                    onChangeText={text => setFirstNumber(text)}
                    style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
                />
                <TextInput
                    placeholder='0'
                    keyboardType='number-pad'
                    onChangeText={text => setSecondNumber(text)}
                    style={{ width: 200, borderColor: 'gray', borderWidth: 1 }} />
            </View>
            <View style={{flexDirection: 'row'}}>
                <Button title="+" onPress={sum} />
                <Button title="-" onPress={dif} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
