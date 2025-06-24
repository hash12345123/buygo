import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

interface PhoneLoginScreenProps {
  onLogin: (phone: string, code: string) => void;
  onBack: () => void;
}

export const PhoneLoginScreen: React.FC<PhoneLoginScreenProps> = ({ onLogin, onBack }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const handleSendCode = () => {
    if (phoneNumber.length >= 10) {
      setCodeSent(true);
      // Here you would typically call your API to send verification code
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode.length >= 4) {
      onLogin(phoneNumber, verificationCode);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in with Phone</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        maxLength={15}
      />

      {!codeSent ? (
        <TouchableOpacity 
          style={[styles.sendCodeButton, phoneNumber.length < 10 && styles.disabledButton]} 
          onPress={handleSendCode}
          disabled={phoneNumber.length < 10}
        >
          <Text style={styles.sendCodeButtonText}>Send Verification Code</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Verification Code"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
            maxLength={6}
          />
          <TouchableOpacity 
            style={[styles.verifyButton, verificationCode.length < 4 && styles.disabledButton]} 
            onPress={handleVerifyCode}
            disabled={verificationCode.length < 4}
          >
            <Text style={styles.verifyButtonText}>Verify Code</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 50,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 48,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  sendCodeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  sendCodeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  verifyButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  backButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
}); 