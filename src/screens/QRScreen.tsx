import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    StatusBar,
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    ArrowLeft,
    MoreVertical,
    Flashlight,
    Image as ImageIcon,
    Plus,
    Minus,
    Search,
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const QRScreen = () => {
    const camera = useRef<Camera>(null);
    const device = useCameraDevice('back');

    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (!device || !hasPermission) return null;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* CAMERA */}
            <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
            />

            {/* TOP HEADER */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <ArrowLeft color="#fff" size={24} />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Scan any QR code</Text>

                <TouchableOpacity>
                    <MoreVertical color="#fff" size={22} />
                </TouchableOpacity>
            </View>

            {/* CAMERA CARD OVERLAY */}
            <View style={styles.scanCard}>

                {/* Zoom Controls */}
                <View style={styles.zoomControls}>
                    <TouchableOpacity style={styles.zoomBtn}>
                        <Plus size={18} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.zoomBtn}>
                        <Minus size={18} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Bottom Controls */}
                <View style={styles.bottomRow}>
                    <TouchableOpacity style={styles.circleBtn}>
                        <Flashlight color="#000" size={20} />
                    </TouchableOpacity>

                    <View style={styles.secureBox}>
                        <Text style={styles.secureText}>
                            Secure your payments{'\n'}with fingerprint →
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.circleBtn}>
                        <ImageIcon color="#000" size={20} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* SEARCH BAR */}
            <View style={styles.searchBar}>
                <Search size={18} color="#666" />
                <Text style={styles.searchText}>Enter Mob. Number or UPI ID</Text>

                <View style={styles.recents}>
                    <Text style={styles.recentsText}>Recents</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default QRScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },

    header: {
        position: 'absolute',
        top: 10,
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },

    scanCard: {
        position: 'absolute',
        top: 80,
        alignSelf: 'center',
        width: width * 0.92,
        height: height * 0.65,
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },

    zoomControls: {
        position: 'absolute',
        right: 10,
        top: 100,
    },

    zoomBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    bottomRow: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    circleBtn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    secureBox: {
        backgroundColor: '#c8f1ff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
    },

    secureText: {
        fontSize: 12,
        color: '#000',
        textAlign: 'center',
    },

    searchBar: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        width: width * 0.92,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 14,
    },

    searchText: {
        marginLeft: 10,
        color: '#666',
        flex: 1,
    },

    recents: {
        backgroundColor: '#e6f0ff',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },

    recentsText: {
        fontSize: 12,
        color: '#000',
    },
});