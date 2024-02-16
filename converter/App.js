import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
    const [amount, setAmount] = useState(0);
    const [currencies, setCurrencies] = useState({});
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [result, setResult] = useState(0);
    const [loading, setLoading] = useState(false);

    const getData = () => {
        const myHeaders = new Headers();
        myHeaders.append("apikey", "2RM3E70ipnsYI8ylSIjAyiFeAkZJbpdW");

        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };
        setLoading(true);
        fetch("https://api.apilayer.com/exchangerates_data/latest", requestOptions)
            .then(response => {
                if (!response.ok)
                    throw new Error('Error in fetch: ' + response.statusText);

                return response.json();
            })
            .then(data => {
                setCurrencies(data.rates);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            })
    }

    useEffect(() => {
        getData();
    }, []);


    const convertToEuro = () => {
        const rate = currencies[selectedCurrency];
        setResult((amount / rate).toFixed(3));
    }

    const handleChange = (value) => {
        setResult(0);
        setAmount(value);
    }



    return (
        <View style={styles.container}>
            {loading ? (<ActivityIndicator size='large' />) : (
                <View style={{ alignItems: 'center' }}>
                    <View style={{ flex: 1, marginTop: 50 }} >
                        <TextInput
                            style={{ backgroundColor: 'lightgrey' }}
                            onChangeText={value => handleChange(value)}
                            placeholder='Amount'
                            keyboardType='numeric'
                        />
                        <Picker style={{ height: 30, width: 200, marginTop: 50 }}
                            selectedValue={selectedCurrency}
                            onValueChange={value => setSelectedCurrency(value)}>
                            {Object.keys(currencies).map(item =>
                                <Picker.Item key={item} label={item} value={item} />)
                            }
                        </Picker>
                        <Button title="Convert" onPress={convertToEuro} />
                        {result != 0 ?
                            (<View style={{ flex: 1, marginTop: 30 }}><Text>Result: {result}</Text></View>):(<View></View>)
                        }
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
