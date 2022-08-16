import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {ThankYou} from './src/components/ThankYou';
import countriesList from './src/data/countries';
import states from './src/data/states';

const App = () => {
  const BASE_URL = __DEV__
    ? 'http://localhost:3000'
    : 'https://xvolttechnology.herokuapp.com';
  const [countriesOpen, setCountriesOpen] = useState(false);
  const [country, setCountry] = useState(null);
  const [countries, setCounties] = useState(countriesList);

  const [statesOpen, setStateOpen] = useState(false);
  const [stateOrProvince, setStateOrProvince] = useState(null);
  const [stateProvidences, setStateProvinces] = useState(states);

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [error, setError] = useState<string>('');

  const [form, setForm] = useState<{
    [key: string]: string;
  }>({
    name: '',
    address: '',
    apt: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    email: '',
  });

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const updateForm = (id: string, value: string) => {
    setForm({...form, [id]: value});
  };

  const isSubmitDisabled = () => {
    let formInvalid = false;
    const keys = Object.keys(form);
    keys.map(key => {
      if (
        form[key].trim() === '' ||
        (key === 'email' && !validateEmail(form[key]))
      ) {
        formInvalid = true;
      }
    });
    return formInvalid;
  };

  const onSubmit = async () => {
    if (isSubmitDisabled()) {
      console.log('not submitting');
      return;
    }
    setSubmitting(true);
    try {
      const body = JSON.stringify(form);
      console.log(body);
      const resp = await fetch(`${BASE_URL}/lists/add`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body,
      });
      if (resp.ok) {
        setSubmitted(true);
      } else {
        console.log(await resp.json());
        setError((await resp.json()).message);
      }
    } catch (e) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        justifyContent: 'flex-end',
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      {submitted ? (
        <ThankYou
          onPress={() => {
            setSubmitted(false);
            setForm({
              name: '',
              address: '',
              apt: '',
              city: '',
              state: '',
              zip: '',
              country: '',
              email: '',
            });
            setError('');
            setCountry(null);
            setStateOrProvince(null);
          }}
        />
      ) : (
        <FlatList
          data={[]}
          renderItem={() => null}
          contentContainerStyle={{margin: 20, marginTop: 50, paddingBottom: 20}}
          ListFooterComponent={
            <>
              <View style={styles.headerContainer}>
                <Text style={styles.header}>X-Volt Technology</Text>
                {error && (
                  <Text style={{color: 'red', fontSize: 18}}>{error}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text>Name</Text>
                <TextInput
                  onChangeText={t => updateForm('name', t)}
                  placeholder="John Smith"
                  style={styles.input}
                  value={form.name}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text>Address</Text>
                <TextInput
                  onChangeText={t => updateForm('address', t)}
                  placeholder="123 Sesame Street"
                  style={styles.input}
                  value={form.address}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text>Apt</Text>
                <TextInput
                  onChangeText={t => updateForm('apt', t)}
                  placeholder="#12"
                  style={styles.input}
                  value={form.apt}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{...styles.inputContainer, ...{width: '48%'}}}>
                  <Text>City</Text>
                  <TextInput
                    onChangeText={t => updateForm('city', t)}
                    placeholder="New York"
                    style={styles.input}
                    value={form.city}
                  />
                </View>
                <View style={{...styles.inputContainer, ...{width: '48%'}}}>
                  <Text>Zip</Text>
                  <TextInput
                    onChangeText={t => updateForm('zip', t)}
                    placeholder="91030"
                    style={styles.input}
                    value={form.zip}
                  />
                </View>
              </View>
              <Text>State</Text>
              <DropDownPicker
                listMode="SCROLLVIEW"
                open={statesOpen}
                value={stateOrProvince}
                items={stateProvidences}
                setOpen={setStateOpen}
                setValue={setStateOrProvince}
                setItems={setStateProvinces}
                zIndex={3000}
                zIndexInverse={1000}
                onChangeValue={e => (e ? updateForm('state', e) : null)}
                containerStyle={{marginVertical: 5}}
                style={{backgroundColor: '#ebebeb', borderWidth: 0}}
              />

              <Text>Country</Text>
              <DropDownPicker
                open={countriesOpen}
                value={country}
                items={countriesList}
                setOpen={setCountriesOpen}
                setValue={setCountry}
                setItems={setCounties}
                zIndex={2000}
                zIndexInverse={2000}
                onChangeValue={e => (e ? updateForm('country', e) : null)}
                style={{backgroundColor: '#ebebeb', borderWidth: 0}}
                containerStyle={{marginVertical: 5}}
              />
              <View style={styles.inputContainer}>
                <Text>Email</Text>
                <TextInput
                  onChangeText={t => updateForm('email', t)}
                  placeholder="Test@gmail.com"
                  style={styles.input}
                  value={form.email}
                />
                {form.email.trim() !== '' && !validateEmail(form.email) && (
                  <Text style={{color: 'red'}}>Please enter a valid email</Text>
                )}
              </View>
              <TouchableOpacity
                onPress={onSubmit}
                style={{
                  backgroundColor: isSubmitDisabled() ? 'grey' : 'orange',
                  padding: 10,
                  borderRadius: 10,
                  alignItems: 'center',
                }}>
                {submitting ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={{color: 'white'}}>Sign Up</Text>
                )}
              </TouchableOpacity>
              <View style={{flex: 1}} />
            </>
          }
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    color: 'black',
    backgroundColor: '#ebebeb',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  inputContainer: {
    marginVertical: 5,
  },
  header: {
    fontSize: 24,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 10,
  },
});

export default App;
