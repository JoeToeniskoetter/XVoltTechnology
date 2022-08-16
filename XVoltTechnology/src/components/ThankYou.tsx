import React from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';

interface ThankYouProps {
  onPress: () => void;
}

export const ThankYou: React.FC<ThankYouProps> = ({onPress}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 10,
      }}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        Thank you for signing up with
      </Text>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        X-Volt Technology LLC
      </Text>
      <Text style={{fontSize: 16, marginVertical: 20}}>
        More App updates and news comiing!
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'orange',
          width: '90%',
          alignItems: 'center',
          padding: 5,
          borderRadius: 10,
        }}
        onPress={onPress}>
        <Text style={{fontSize: 18, color: 'white'}}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};
