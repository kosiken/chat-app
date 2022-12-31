import React from 'react';
import '@testing-library/jest-native/extend-expect';
import { setLogger, QueryClient, QueryClientProvider } from 'react-query';
import { render, screen, waitFor } from '@testing-library/react-native';
import mainApi from '../../services/mainApi';
import { HeadLineResponse } from '../../types';
import ChatScreen from '.';
import { delayed } from '../../helper';

const testData = `

{
    "status": "ok",
    "totalResults": 35,
    "articles": [
        {
            "source": {
                "id": "cnn",
                "name": "CNN"
            },
            "author": "CNN",
            "title": "Russia's war in Ukraine: Live updates - CNN",
            "description": "Multiple explosions have rocked the Ukrainian capital of Kyiv on the last day of 2022, killing at least one, according to the mayor. Follow here for news updates.",
            "url": "https://www.cnn.com/europe/live-news/russia-ukraine-war-news-12-31-22/index.html",
            "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/221229103925-02-ukraine-attack-122922-super-tease.jpg",
            "publishedAt": "2022-12-31T14:24:00Z",
            "content": "Kyiv Mayor Vitali Klitschko said that at least one person has been killed in explosions in the capital city"
        },
        {
            "source": {
                "id": "reuters",
                "name": "Test name"
            },
            "author": null,
            "title": "Xi says COVID control is entering new phase as cases surge after reopening - Reuters",
            "description": "Chinese President Xi Jinping called on Saturday for more effort and unity as the country enters a ",
            "url": "https://www.reuters.com/markets/asia/china-december-factory-activity-contracts-sharply-official-pmi-2022-12-31/",
            "urlToImage": "https://www.reuters.com/resizer/gj4iBM9vay8pOObUtBlOZbWHOho=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/NTCP2C47KBISNK54PZXINEB5NY.jpg",
            "publishedAt": "2022-12-31T13:15:00Z",
            "content": "WUHAN/BEIJING, Dec 31 (Reuters) - Chinese President Xi Jinping called on Saturday for more effort and unity as the country enters a in its approach to combating the pandemic, in his first… [+5230 chars]"
        }
     ]
}


`


describe('ChatScreen Test', () => { 
    let queryClient: QueryClient;
    let wrapper: ({ children }: any) => JSX.Element;
    beforeEach(() => {
        setLogger({
            log: console.log,
            warn: console.warn,
            // no more errors on the console
            error: () => { },
        });
    
        queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    // turns retries off
                    retry: false,
                },
            },
        });
        mainApi.loadHeadlines = jest.fn(() => {
            return Promise.resolve({
                data: JSON.parse(testData) as HeadLineResponse[],
                code: 0,
            })
        }) as any;
        wrapper = ({ children }: any) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        );
    }) 




    it('should render correctly', async () => {
 
        render(<ChatScreen />, {wrapper});
        const searchText = screen.getByText('Search');
        expect(searchText).toBeOnTheScreen();

        const loadingSpinner =  await screen.findByLabelText("spinner");
        expect(loadingSpinner).not.toBeUndefined();
        await waitFor(() => {
            return screen.findByText(/Chats/i);
        }, {
            timeout: 3000
        })
        const testData = screen.getByText(/Chats/i);
        expect(testData).toBeOnTheScreen();
        

    })
 })