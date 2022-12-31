import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, TextInputProps } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import { useQuery } from 'react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../components/Input';
import { useEffect, useState } from 'react';
import Box from '../../components/Box';
import Typography from '../../components/Typography';
import ChatBox from './components/ChatBox';
import Constants from 'expo-constants';
import api from '../../services/mainApi';
import { HeadLineResponse } from '../../types';



const ChatScreen = () => {

    const fetchHeadlines = async () => {
        const response = await api.loadHeadlines({
            country: 'us',
            apiKey: Constants.expoConfig.extra.apiKey
        })

        return response.data.articles;
    }

    const { isLoading, data, refetch, isFetching, isError } = useQuery('fetch-headlines', fetchHeadlines, {
        enabled: true
    })

    const [searchTerm, setSearchTerm] = useState('');
    const [headlines, setHeadlines] = useState<HeadLineResponse[]>([]);
    const changeSearchTerm: TextInputProps['onChangeText'] = (text) => {
        setSearchTerm(text);
    }
    useEffect(() => {
        if (data) {
            const ans = !!searchTerm ? data.
                filter(d => d.source.name.toLowerCase()
                    .includes(searchTerm.toLowerCase())) : data;
            setHeadlines(ans);
        }
    }, [data, searchTerm]);
    return (
        <Box flex={1} color="white">
            <StatusBar style="auto" />
            <SafeAreaView style={styles.safeArea}>

                <Box row center flex={false} margin={[0, 0, 10]}>
                    <Icon name="arrow-back-ios" size={24} color="black" />
                    <Typography>back</Typography>
                </Box>


                <Typography h1 bold style={styles.headerText}>Search </Typography>
                <Input autoCapitalize="none" onChangeText={changeSearchTerm} value={searchTerm} placeholder="Search by user" />


                {isLoading && (
                    <Box flex={false} middle center>
                        <ActivityIndicator size={"small"} />
                    </Box>
                )}
                {isError && (<Typography caption color="red" style={styles.chatText}>
                    An error occurred
                </Typography>)}
                <FlatList
                    style={{
                        flex: 1
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={headlines.length > 0 && (isLoading || isFetching)}
                            onRefresh={refetch}
                            title="Loading..."
                        />
                    }
                    data={headlines}
                    renderItem={({ item, index }) => {
                        return (
                            <Box flex={false} margin={[10, 0]}>
                                {(index === 0) && (<Typography h1 bold style={styles.chatText}>
                                    Chats
                                </Typography>)}

                                <ChatBox active={index === 0} data={item} />
                            </Box>
                        )
                    }}

                />

            </SafeAreaView>
        </Box>
    )
}

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    safeArea: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center'

    },
    headerText: {
        marginBottom: 10,
        marginLeft: 10
    },

    chatText: {

        marginVertical: 20,
        marginLeft: 10
    }

});

