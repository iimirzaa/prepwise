import React, { useState, useRef, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Header from '../../../components/profile_components/Header';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Tile from '../../../components/profile_components/Tile';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import Loader from '../../../components/Loading';
import { clearTokens, getRefreshToken } from '../../storage/authstorage';
import { authService } from '../../services/auth.service';
import { useAuth } from '../../Utils/authcontext';
import ShimmerBox from '../../../components/shimmer';
import { useFocusEffect } from '@react-navigation/native';
import { userService } from '../../services/user.service'

const Profile = ({ navigation }) => {
    const { logout } = useAuth();

    // replaces isLoading boolean
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [statusMessage, setStatusMessage] = useState('');

    const [ispLoading, setIsPLoading] = useState(true);
    const [logoutError, setLogoutError] = useState('');
    const [email, setEmail] = useState('');
    const [fullname, setFullName] = useState('');

    // measured screen position/size of the container, used to place the Modal overlay exactly on top of it
    const boxRef = useRef(null);
    const [boxLayout, setBoxLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

    const measureBox = () => {
        if (boxRef.current) {
            boxRef.current.measureInWindow((x, y, width, height) => {
                setBoxLayout({ x, y, width, height });
            });
        }
    };

    const profileItems = [
        {
            title: 'Personal Information',
            icon: 'account-outline',
            press: () => navigation.navigate('info')
        },
        {
            title: 'Interview Preferences',
            icon: 'tune-variant',
        },
        {
            title: 'Practice History',
            icon: 'history',
        },
        {
            title: 'Achievements',
            icon: 'trophy-outline',
        },
        {
            title: 'Help & Support',
            icon: 'help-circle-outline',
        },
    ];

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            const fetchProfile = async () => {
                setLogoutError('');
                setIsPLoading(true);
                try {
                    const response = await userService.getProfile();
                    if (isActive) {
                        setEmail(response.data.message.email);
                        setFullName(response.data.message.fullname);
                        // whatever else you need to set from response
                    }
                } catch (error) {
                    if (isActive) {
                        setLogoutError(error.response?.data?.message || error.message);
                        console.log('PROFILE FETCH ERROR:', error.message);
                    }
                } finally {
                    if (isActive) setIsPLoading(false);
                }
            };

            fetchProfile();

            return () => {
                isActive = false; // prevents setState after unmount/blur
            };
        }, []) // <-- empty deps array is the actual fix
    );

    const handleLogout = async () => {
        setLogoutError('');
        const token = await getRefreshToken();

        measureBox();
        setStatus('loading');

        try {
            await authService.logout(token);
            await clearTokens();

            setStatus('success');
            setStatusMessage('Logged out');

            setTimeout(() => {
                logout();
            }, 800);

        } catch (error) {
            console.log('LOGOUT ERROR:', error);
            console.log('MESSAGE:', error.message);
            console.log('CODE:', error.code);
            console.log('STATUS:', error.response?.status);
            console.log('DATA:', error.response?.data);

            const message = error.response?.data?.message || error.message || 'Logout failed. Please try again.';
            setStatus('error');
            setStatusMessage(message);

            setTimeout(() => {
                setStatus('idle');
                setLogoutError(message);
            }, 1800);
        }
    };

    const isBusy = status === 'loading' || status === 'success';

    return (
        <ScreenWrapper>
            <View
                ref={boxRef}
                onLayout={measureBox}
                style={styles.container}
            >
                <View
                    pointerEvents={isBusy ? "none" : "auto"}
                    style={isBusy ? styles.disabledContent : null}
                    // Android-only: forces this opacity view to render on an offscreen
                    // buffer, which fixes elevation shadows below rendering as
                    // duplicated/blocky when a parent has opacity < 1.
                    needsOffscreenAlphaCompositing={isBusy}
                >
                    <View style={styles.headerbox}>
                        <Text style={styles.heading}>Profile</Text></View>


                    <Header email={email} name={fullname} isLoading={ispLoading} />
                    <View style={styles.setting}>
                        {
                            profileItems.map((item) => {
                                return (
                                    <Tile key={item.title} icon={item.icon} text={item.title} onpress={item.press} />
                                );
                            })
                        }
                    </View>
                    {logoutError && (
                        <Text style={styles.errorText}>{logoutError}</Text>
                    )}
                    <Pressable style={styles.logoutButton} onPress={handleLogout}>
                        <MaterialDesignIcons
                            name="logout-variant"
                            size={moderateScale(20)}
                            color="#D9534F"
                        />
                        <Text style={styles.logout}>Logout</Text>
                    </Pressable>
                </View>

            </View>


            <Modal
                visible={status !== 'idle'}
                transparent
                animationType="fade"
                statusBarTranslucent
            >
                <View
                    style={[
                        styles.loadingOverlay,
                        {
                            top: boxLayout.y,
                            left: boxLayout.x,
                            width: boxLayout.width,
                            height: boxLayout.height,
                        },
                    ]}
                >
                    <Loader
                        status={status === 'loading' ? 'loading' : status}
                        title={
                            status === 'loading' ? 'Logging out...' :
                            status === 'success' ? 'Logged out' :
                            'Logout failed'
                        }
                        subtitle={status === 'error' ? statusMessage : null}
                    />
                </View>
            </Modal>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: scale(10)
    },
    headerbox: {
        justifyContent: "flex-start"
    },
    heading: {
        fontSize: moderateScale(18),
        fontWeight: '800'
    },
    setting: {
        backgroundColor: 'white',
        borderRadius: moderateScale(12),
        width: "100%",
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(10),
        elevation: 6
    },
    logoutButton: {
        width: "100%",
        height: verticalScale(40),
        flexDirection: 'row',
        elevation: 6,
        borderRadius: moderateScale(12),
        backgroundColor: '#FDECEC',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(25),
        marginTop: verticalScale(10),
    },
    errorText: {
        color: 'red',
        paddingHorizontal: scale(10),
    },
    disabledContent: {
        opacity: 0.5,
    },
    loadingOverlay: {
        position: "absolute",
        backgroundColor: "rgba(255,255,255,0.6)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: moderateScale(12),
    },
    logout: {
        fontWeight: "800",
        paddingLeft: scale(10)
    }
})
export default Profile;