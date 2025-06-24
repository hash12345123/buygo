import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Platform,
    Image,
    Alert,
    Modal,
    KeyboardAvoidingView,
} from 'react-native';
import { launchCamera, launchImageLibrary, Asset } from 'react-native-image-picker';

interface CreateAdScreenProps {
    category: string;
    onNavigateBack: () => void;
    onSubmit: (adDetails: any) => void;
}

export const CreateAdScreen: React.FC<CreateAdScreenProps> = ({
    category,
    onNavigateBack,
    onSubmit,
}) => {
    const [images, setImages] = useState<Asset[]>([]);
    const [isImagePickerVisible, setIsImagePickerVisible] = useState(false);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [condition, setCondition] = useState<'New' | 'Used' | 'Open Box' | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleChoosePhoto = (type: 'camera' | 'gallery') => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            maxWidth: 1024,
            maxHeight: 1024,
        };

        const callback = (response: any) => {
            setIsImagePickerVisible(false);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                if (response.assets) {
                    setImages(prevImages => [...prevImages, ...response.assets]);
                }
            }
        };

        if (type === 'camera') {
            launchCamera(options as any, callback);
        } else {
            launchImageLibrary(options as any, callback);
        }
    };

    const removeImage = (indexToRemove: number) => {
        setImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
    };

    const handlePostAd = () => {
        if (images.length === 0) {
            Alert.alert('Validation Error', 'Please upload at least one photo.');
            return;
        }
        if (!title.trim()) {
            Alert.alert('Validation Error', 'Please enter a title for your ad.');
            return;
        }
        if (!condition) {
            Alert.alert('Validation Error', 'Please select the condition of the item.');
            return;
        }
        if (!price.trim()) {
            Alert.alert('Validation Error', 'Please enter a price.');
            return;
        }

        const adDetails = {
            category,
            brand,
            model,
            condition,
            title,
            description,
            price,
            images,
        };
        console.log('Ad Details:', adDetails);
        onSubmit(adDetails);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onNavigateBack} style={styles.backButton}>
                    <Text style={styles.backButtonText}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Post an Ad in {category}</Text>
                <View style={{ width: 40 }} />
            </View>
            
            <KeyboardAvoidingView 
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView 
                    style={styles.scrollView}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.form}>
                        <Text style={styles.sectionTitle}>Upload Photos</Text>
                        <View style={styles.imageUploadContainer}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {images.map((image, index) => (
                                    <View key={index} style={styles.previewImageContainer}>
                                        <Image source={{ uri: image.uri }} style={styles.previewImage} />
                                        <TouchableOpacity style={styles.removeImageButton} onPress={() => removeImage(index)}>
                                            <Text style={styles.removeImageButtonText}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                                <TouchableOpacity style={styles.uploadButton} onPress={() => setIsImagePickerVisible(true)}>
                                    <Text style={styles.uploadIcon}>🖼️</Text>
                                    <Text style={styles.uploadText}>Add Photos</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>

                        <Text style={styles.label}>Brand</Text>
                        <TextInput style={styles.input} value={brand} onChangeText={setBrand} placeholder="e.g., Apple, Honda" />

                        <Text style={styles.label}>Model</Text>
                        <TextInput style={styles.input} value={model} onChangeText={setModel} placeholder="e.g., iPhone 13, Civic" />

                        <Text style={styles.label}>Condition</Text>
                        <View style={styles.conditionContainer}>
                            {['New', 'Used', 'Open Box'].map((c) => (
                                <TouchableOpacity
                                    key={c}
                                    style={[styles.conditionButton, condition === c && styles.selectedCondition]}
                                    onPress={() => setCondition(c as any)}>
                                    <Text style={[styles.conditionText, condition === c && styles.selectedConditionText]}>{c}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.label}>Ad Title</Text>
                        <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="e.g., Selling my great condition bike" />

                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={[styles.input, styles.multilineInput]}
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Include all the details about your item."
                            multiline
                        />

                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={price}
                            onChangeText={setPrice}
                            placeholder="Enter price"
                            keyboardType="numeric"
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            
            <View style={styles.footer}>
                <TouchableOpacity style={styles.postButton} onPress={handlePostAd}>
                    <Text style={styles.postButtonText}>Post Ad</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isImagePickerVisible}
                onRequestClose={() => {
                    setIsImagePickerVisible(!isImagePickerVisible);
                }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Upload Photo</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => handleChoosePhoto('camera')}>
                            <Text style={styles.modalButtonText}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => handleChoosePhoto('gallery')}>
                            <Text style={styles.modalButtonText}>Choose from Library</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.cancelButton]}
                            onPress={() => setIsImagePickerVisible(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    keyboardAvoidingView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        paddingTop: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: 'white',
    },
    backButton: { padding: 5, marginTop: 20 },
    backButtonText: { fontSize: 30, color: '#333' },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', flex: 1, textAlign: 'center', marginHorizontal: 10, marginTop: 20 },
    scrollView: { flex: 1 },
    form: { padding: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
    imageUploadContainer: {
        marginBottom: 20,
    },
    previewImageContainer: {
        marginRight: 10,
        position: 'relative',
    },
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    removeImageButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeImageButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    uploadButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        backgroundColor: '#e9ecef',
        borderRadius: 8,
    },
    uploadIcon: {
        fontSize: 30,
        marginBottom: 8,
    },
    uploadText: {
        fontSize: 14,
        color: '#333',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 8,
    },

    input: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ced4da',
    },

    multilineInput: {
        height: 120,
        textAlignVertical: 'top'
    },
    conditionContainer:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    conditionButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ced4da',
        alignItems: 'center',
        marginHorizontal: 4,
    },

    selectedCondition: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },

    conditionText: {
        color: '#333',
        fontWeight: '500',
    },

    selectedConditionText: { color: 'white', },

    scrollContent: {
        paddingBottom: 100,
    },

    footer: {
        padding: 15,
        paddingBottom: 60,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: 'white',
    },

    postButton: { 
        backgroundColor: 'rgb(18, 65, 14)',
        padding: 15,
         borderRadius: 8,
        alignItems: 'center',
    },

    postButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 15,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    cancelButton: {
        backgroundColor: 'rgb(18, 65, 14)',
    
    },
    cancelButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
}); 