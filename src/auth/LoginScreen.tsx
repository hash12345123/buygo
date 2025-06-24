import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';

interface LoginScreenProps {
    onLogin: (email: string, password: string) => void;
    onEmailLoginPress: () => void;
    onPhoneLoginPress: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onEmailLoginPress, onPhoneLoginPress }) => {
    const handleEmailLogin = () => {
        // Navigate to email login screen
        onEmailLoginPress();
    };

    const handleGoogleLogin = () => {
        // Handle Google login
    };

    const handleFacebookLogin = () => {
        // Handle Facebook login
    };

    const handlePhoneLogin = () => {
        // Navigate to phone login screen
        onPhoneLoginPress();
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            {/* If you have a logo, add it here. Example: <Image source={require('../assets/logo.png')} style={styles.logo} /> */}
            <View style={styles.logoContainer} />

            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
                    <Image source={require('../assets/google.png')} style={styles.socialIcon} />
                    <Text style={styles.socialButtonText}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
                    <Image source={require('../assets/fb.png')} style={styles.socialIcon} />
                    <Text style={styles.socialButtonText}>Continue with Facebook</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.separator}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>or</Text>
                <View style={styles.separatorLine} />
            </View>

            <View style={styles.emailPhoneContainer}>
                <TouchableOpacity style={styles.emailPhoneButton} onPress={handleEmailLogin}>
                    <View style={styles.emailPhoneContent}>
                        <Image source={require('../assets/email.jpg')} style={styles.socialIcon} />
                        <Text style={styles.emailPhoneButtonText}>Continue with Email</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.verticalSeparator} />

                <TouchableOpacity style={styles.emailPhoneButton} onPress={handlePhoneLogin}>
                    <View style={styles.emailPhoneContent}>
                        {/* Replace with your phone icon if available */}
                        <Image source={require('../assets/phone.png')} style={styles.socialIcon} />
                        <Text style={styles.emailPhoneButtonText}>Continue with Phone</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.termsText}>
                    By continuing, you agree to our{' '}
                    <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                    <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        paddingTop: 50,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
    },
    logo: {
        marginTop: 30,
        alignSelf: 'center',
        width: 130,
        height: 130,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
    },
    socialButtonsContainer: {
        marginBottom: 30,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 14,
        marginBottom: 16,
    },
    socialIcon: {
        width: 24,
        height: 24,
        marginRight: 12,
    },
    socialButtonText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        marginRight: 30,
        marginLeft: 30,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    separatorText: {
        color: '#666',
        paddingHorizontal: 10,
        fontSize: 14,
    },
    emailPhoneContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },
    emailPhoneButton: {
        flex: 1,
        alignItems: 'center',
    },
    emailPhoneContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emailPhoneButtonText: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '500',
    },
    verticalSeparator: {
        width: 1,
        height: 20,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 20,
    },
    footer: {
        position: 'absolute',
        bottom: 60,
        left: 20,
        right: 20,
    },
    termsText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        lineHeight: 18,
    },
    termsLink: {
        color: '#007AFF',
    },
}); 