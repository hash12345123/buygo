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
} from 'react-native';

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
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [condition, setCondition] = useState<'New' | 'Used' | 'Open Box' | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handlePostAd = () => {
        const adDetails = {
            category,
            brand,
            model,
            condition,
            title,
            description,
            price,
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
            <ScrollView style={styles.scrollView}>
                <View style={styles.form}>
                    <Text style={styles.sectionTitle}>Upload Photos</Text>
                    <View style={styles.photoContainer}>
                        <TouchableOpacity style={styles.photoButton}>
                            <Text style={styles.photoIcon}>📷</Text>
                            <Text>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.photoButton}>
                            <Text style={styles.photoIcon}>🖼️</Text>
                            <Text>From Gallery</Text>
                        </TouchableOpacity>
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
            <View style={styles.footer}>
                <TouchableOpacity style={styles.postButton} onPress={handlePostAd}>
                    <Text style={styles.postButtonText}>Post Ad</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: 'white' },
    backButton: { padding: 5, marginTop: 15, },
    backButtonText: { fontSize: 30, color: '#333' },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', flex: 1, textAlign: 'center', marginHorizontal: 10, 
    marginTop: 15,},
    scrollView: { flex: 1 },
    form: { padding: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
    photoContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, },
    photoButton: { alignItems: 'center', justifyContent: 'center', width: 120, height: 100, backgroundColor: '#e9ecef', borderRadius: 8, },
    photoIcon: { fontSize: 30, marginBottom: 8, },
    label: { fontSize: 16, fontWeight: '500', color: '#333', marginBottom: 8, },
    input: { backgroundColor: 'white', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 15, borderWidth: 1, borderColor: '#ced4da', },
    multilineInput: { height: 120, textAlignVertical: 'top' },
    conditionContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, },
    conditionButton: { flex: 1, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ced4da', alignItems: 'center', marginHorizontal: 4, },
    selectedCondition: { backgroundColor: '#007AFF', borderColor: '#007AFF', },
    conditionText: { color: '#333', fontWeight: '500', },
    selectedConditionText: { color: 'white', },
    footer: { padding: 15, borderTopWidth: 1, borderTopColor: '#eee', backgroundColor: 'white',marginBottom: 50 },
    postButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center', },
    postButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
}); 