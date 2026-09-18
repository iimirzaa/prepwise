import React, { useState } from 'react';
import { Modal, View, Text, Pressable, Image, StyleSheet, ActivityIndicator } from 'react-native';

export default function AvatarPicker({ token, onUploaded }) {
    const [visible, setVisible] = useState(false);
    const [preview, setPreview] = useState(null);
    const [busy, setBusy] = useState(false);

    const handle = async (fn) => {
        setVisible(false);
        try {
            const asset = await fn();
            if (!asset) return;
            setPreview(asset.uri);
            setBusy(true);
            const data = await uploadAvatar(asset, token);   // from earlier
            onUploaded?.(data);
        } catch (e) {
            console.warn(e.message);
        } finally {
            setBusy(false);
        }
    };

    return (
        <>
            <Pressable onPress={() => setVisible(true)} style={s.avatarWrap}>
                {preview
                    ? <Image source={{ uri: preview }} style={s.avatar} />
                    : <Text style={s.placeholder}>+</Text>}
                {busy && <ActivityIndicator style={StyleSheet.absoluteFill} />}
            </Pressable>

            <Modal visible={visible} transparent animationType="slide"
                onRequestClose={() => setVisible(false)}>
                <Pressable style={s.backdrop} onPress={() => setVisible(false)} />
                <View style={s.sheet}>
                    <Pressable style={s.row} onPress={() => handle(takePhoto)}>
                        <Text style={s.rowText}>Take Photo</Text>
                    </Pressable>
                    <Pressable style={s.row} onPress={() => handle(pickFromGallery)}>
                        <Text style={s.rowText}>Choose from Library</Text>
                    </Pressable>
                    <Pressable style={[s.row, s.cancel]} onPress={() => setVisible(false)}>
                        <Text style={[s.rowText, { color: '#d00' }]}>Cancel</Text>
                    </Pressable>
                </View>
            </Modal>
        </>
    );
}

const s = StyleSheet.create({
    avatarWrap: {
        width: 96, height: 96, borderRadius: 48, backgroundColor: '#eee',
        alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
    },
    avatar: { width: '100%', height: '100%' },
    placeholder: { fontSize: 32, color: '#888' },
    backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
    sheet: {
        backgroundColor: '#fff', paddingBottom: 32,
        borderTopLeftRadius: 16, borderTopRightRadius: 16
    },
    row: { padding: 18, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#eee' },
    cancel: { borderBottomWidth: 0 },
    rowText: { fontSize: 16, textAlign: 'center' },
});