import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import {
    Button,
    Flex,
    Heading,
    TextField,
    View,
    withAuthenticator,
} from '@aws-amplify/ui-react'

function Mydata() {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [myData, setMyData] = useState('')

    function handleChange(event) {
        setMyData(event.target.value);
      }
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setIsButtonDisabled(true)
        const data = e.target.data.value
        await writeMyData(data)
    }
    useEffect(() => {
        getMyData();
      }, []);

    const getMyData = async() => {
        try {
            const result = await API.get('ApiGatewayRestApi', '/readdb')
            setMyData(result.message.Item.name.S)
        } catch (err) {
            console.log(err)
        } finally {
            setIsButtonDisabled(false)
        }
    }

    const writeMyData = async(data) => {
        try {
            await API.post('ApiGatewayRestApi', '/writedb', {
                body: {
                    "name": data
                },
            })
        } catch (err) {
            console.log(err)
        } finally {
            setIsButtonDisabled(false)
        }
    }

    return (
        <View as="main">
            <Heading style={{ marginBottom: '1rem' }} level={3}>
                Manage my Personal Data
            </Heading>
            <Flex>
                <Flex
                    as="form"
                    direction={{ base: 'column', large: 'row' }}
                    onSubmit={handleFormSubmit}
                >
                    <TextField label="data" name="data" value={myData} onChange={handleChange} placeholder="enter your data" />
                    <View alignSelf={'flex-end'}>
                        <Button
                            disabled={isButtonDisabled}
                            type="submit"
                            variation="primary"
                        >
                            Send
                        </Button>
                    </View>
                </Flex>
            </Flex>
        </View>
    )
}

export default withAuthenticator(Mydata)