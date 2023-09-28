import React from 'react'
import {
    withAuthenticator,
} from '@aws-amplify/ui-react'

function Protected({ allUserAttributes }) {
    return (
        <div>
            <hr />
            <h2>Congrats! You are authenticated with ITSME and Amazon Cognito:</h2>
            <hr />
            <h3>name: {allUserAttributes.name}</h3>
            <hr />
            <h3>fiven_name: {allUserAttributes.given_name}</h3>
            <hr />
            <h3>family_name: {allUserAttributes.family_name}</h3>
            <hr />
            <h3>national_registration_number: {allUserAttributes["custom:eid"]}</h3>
            <hr />
            <h3>email: {allUserAttributes.email}</h3>
            <hr />
            <h3>gender: {allUserAttributes.gender}</h3>
            <hr />
            <h3>address: {allUserAttributes.address}</h3>
            <hr />
        </div>
    )
}

export default withAuthenticator(Protected);