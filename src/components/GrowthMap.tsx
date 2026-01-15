import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, useColorScheme, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Data
interface Lesson {
    id: number;
    title: string;
    status: 'done' | 'active' | 'locked';
}

const DATA: Lesson[] = [
    { id: 1, title: "Welcome Journey", status: "done" },
    { id: 2, title: "Переключение на себя", status: "active" },
    { id: 3, title: "Источник вдохновения", status: "locked" },
    { id: 4, title: "Пространство идей", status: "locked" },
    { id: 5, title: "Финальный тест", status: "locked" }
];

const Colors = {
    light: {
        background: '#FAFAFA',
        text: '#212121',
        header: '#333333',
        cardBackground: '#FFFFFF',
        border: '#E0E0E0',
        done: '#4CAF50',
        activeIcon: '#2196F3',
        activeBg: '#E3F2FD',
        locked: '#BDBDBD'
    },
    dark: {
        background: '#121212',
        text: '#E0E0E0',
        header: '#FFFFFF',
        cardBackground: '#1E1E1E',
        border: '#333333',
        done: '#81C784',
        activeIcon: '#64B5F6',
        activeBg: '#1A237E', // Darker blue for active background in dark mode
        locked: '#757575'
    }
};

const GrowthMap: React.FC = () => {
    const scheme = useColorScheme();
    const isDark = scheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;
    const [modalVisible, setModalVisible] = React.useState(false);

    const handlePress = (item: Lesson) => {
        if (item.status === 'active') {
            console.log('Start lesson');
        } else if (item.status === 'locked') {
            setModalVisible(true);
        }
    };

    const renderItem = ({ item }: { item: Lesson }) => {
        let iconName: keyof typeof MaterialIcons.glyphMap = 'lock';
        let iconColor = theme.locked;
        let borderColor = theme.border;
        let textColor = theme.text;
        let backgroundColor = theme.cardBackground;

        if (item.status === 'done') {
            iconName = 'check-circle';
            iconColor = theme.done;
            borderColor = theme.done;
        } else if (item.status === 'active') {
            iconName = 'play-circle-filled';
            iconColor = theme.activeIcon;
            borderColor = theme.activeIcon;
            backgroundColor = theme.activeBg;
        }

        return (
            <TouchableOpacity
                style={[styles.item, { borderColor, backgroundColor }]}
                onPress={() => handlePress(item)}
                activeOpacity={0.7}
            >
                <View style={styles.iconContainer}>
                    <MaterialIcons name={iconName} size={24} color={iconColor} />
                </View>
                <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.header, { color: theme.header }]}>Growth Map</Text>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, { backgroundColor: theme.cardBackground }]}>
                        <MaterialIcons name="lock" size={48} color={theme.locked} style={{ marginBottom: 16 }} />
                        <Text style={[styles.modalTitle, { color: theme.header }]}>Урок закрыт</Text>
                        <Text style={[styles.modalText, { color: theme.text }]}>Этот урок пока недоступен.</Text>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: theme.activeIcon }]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.textStyle}>Закрыть</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    listContent: {
        paddingBottom: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    iconContainer: {
        marginRight: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
    },
    separator: {
        height: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 30,
        elevation: 2,
        marginTop: 20,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 15,
        textAlign: "center"
    }
});

export default GrowthMap;
