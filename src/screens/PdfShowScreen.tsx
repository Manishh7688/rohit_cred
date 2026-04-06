import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { X } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageViewer from 'react-native-image-zoom-viewer';

const PdfScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { source } = (route.params as any) || {};

    // Convert source to URI format required by ImageViewer
    const images = [
        typeof source === 'number'
            ? { url: '', props: { source } } // local image
            : { url: source?.uri || source } // remote image
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => navigation.goBack()}
                >
                    <X color="#fff" size={24} strokeWidth={1.2} />
                </TouchableOpacity>
            </View>

            {/* Zoomable Image */}
            <ImageViewer
                imageUrls={images}
                enableSwipeDown
                onSwipeDown={() => navigation.goBack()}
                backgroundColor="#000"
                saveToLocalByLongPress={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#1a1a1a',
    },
    iconButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default PdfScreen;