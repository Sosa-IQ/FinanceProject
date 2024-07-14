import React, { useEffect, useRef, useState } from 'react'
import { WebView } from 'react-native-webview'
import {
  LinkEvent,
  LinkEventName,
  LinkExit,
  LinkSuccess,
  LinkErrorCode,
  LinkErrorType,
  LinkExitMetadataStatus,
} from '../types/plaid.types'
import queryString from 'query-string'
import { createLinkToken } from '@/lib/actions/user.actions'
interface PlaidLinkProps {
  // linkToken: string
  onEvent?(event: LinkEvent): any
  onExit?(exit: LinkExit): any
  onSuccess?(success: LinkSuccess): any
}

export default function PlaidLink({
  // linkToken,
  onEvent,
  onExit,
  onSuccess,
}: PlaidLinkProps) {
  let webviewRef: any = useRef()

  const handleNavigationStateChange = (event: any) => {
    if (event.url.startsWith('plaidlink://')) {
      console.log(event.url)
      const eventParams = queryString.parse(event.url.replace(/.*\?/, ''))

      const linkSessionId = eventParams.link_session_id as string
      const mfaType = eventParams.mfa_type as string
      const requestId = eventParams.request_id as string
      const viewName = eventParams.view_name as string
      const errorCode = eventParams.error_code as string
      const errorMessage = eventParams.error_message as string
      const errorType = eventParams.error_type as string
      const exitStatus = eventParams.exist_status as string
      const institutionId = eventParams.institution_id as string
      const institutionName = eventParams.institution_name as string
      const institutionSearchQuery = eventParams.institution_search_query as string
      const timestamp = eventParams.timestamp as string

      if (event.url.startsWith('plaidlink://event') && onEvent) {
        onEvent({
          eventName: eventParams.event_name as LinkEventName,
          metadata: {
            linkSessionId,
            mfaType,
            requestId,
            viewName,
            errorCode,
            errorMessage,
            errorType,
            exitStatus,
            institutionId,
            institutionName,
            institutionSearchQuery,
            timestamp,
          },
        })
      } else if (event.url.startsWith('plaidlink://exit') && onExit) {
        onExit({
          error: {
            errorCode: LinkErrorCode[errorCode as keyof typeof LinkErrorCode],
            errorMessage: eventParams.error_message as string,
            errorType: LinkErrorType[errorType as keyof typeof LinkErrorType],
          },
          metadata: {
            status:
              LinkExitMetadataStatus[
                exitStatus as keyof typeof LinkExitMetadataStatus
              ],
            institution: {
              id: institutionId,
              name: institutionName,
            },
            linkSessionId,
            requestId,
          },
        })
      } else if (event.url.startsWith('plaidlink://connected') && onSuccess) {
        const publicToken = eventParams.public_token as string
        const accounts = JSON.parse(eventParams.accounts as string)
        onSuccess({
          publicToken,
          metadata: {
            institution: {
              id: institutionId,
              name: institutionName,
            },
            accounts,
            linkSessionId,
          },
        })
      }
      return false
    }
    return true
  }

  const user: User = {
    $id: "01234",
    email: "johndoe@example.com",
    userId: "12345",
    dwollaCustomerUrl: "https://api-sandbox.dwolla.com/customers/12345",
    dwollaCustomerId: "12345",
    firstName: "John",
    lastName: "Doe",
    name: "John Doe",
    address1: "123 Main St",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    dateOfBirth: "1990-01-01",
    ssn: "123-45-6789",
  };

  // const handleCreateLinkToken = async () => {
  //   try {
  //     const linkToken = await createLinkToken(user);
  //     console.log(linkToken);
  //     return linkToken;
  //   } catch (error) {
  //     console.error("Failed to create link token:", error);
  //   }
  // };

  const [token, setToken] = useState('');

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);

      setToken(data?.linkToken);
    }
    if (!token) {
      getLinkToken();
    }
  }, [user]);

  console.log(token);

  return (
    <WebView
      source={{
        uri: `https://cdn.plaid.com/link/v2/stable/link.html?isWebview=true&token=${token}`,
      }}
      ref={(ref) => (webviewRef = ref)}
      onError={ () => webviewRef.reload() }
      originWhitelist={['https://*', 'plaidlink://*']}
      onShouldStartLoadWithRequest={handleNavigationStateChange}
    />
  )
}