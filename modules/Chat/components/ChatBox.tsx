import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import Box from '../../../components/Box'
import Typography from '../../../components/Typography'
import { formatDate, reduceString } from '../../../helper'
import { HeadLineResponse } from '../../../types'




interface ChatBoxProps {
    active?: boolean;
    data: HeadLineResponse;
}

const ChatBox: React.FC<ChatBoxProps> = ({data, active = false}) => {
  return (
    <Box flex={false}  row padding={[0, 10, 0]}>
        <Image style={styles.image} source={{uri: data.urlToImage}} />
        <Box  padding={[0, 10]} >
            <Box flex={false} row space="between" margin={[0,0, 10]}>
                <Typography bold>
                    {reduceString(data.source?.name || "None", 30)}
                </Typography>
                <Typography gray>
                    {formatDate(data.publishedAt || new Date(), 'HH:MM')}
                </Typography>
            </Box>
            <Box flex={false} row>
                <Typography caption gray={!active} style={styles.message}>
                    {reduceString(data.description || "None", 40)}
                </Typography>

                {active && (<View style={styles.active} />)}

            </Box>

        </Box>
    </Box>
  )
}

export default ChatBox;

const styles = StyleSheet.create({
    image: {
        height: 50,
        width: 50,
        borderRadius: 25
    },
    message: {
        flex: 1
    },
    active: {
        backgroundColor: 'blue',
        width: 10,
        height: 10,
        borderRadius: 5,
    }
})