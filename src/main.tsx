import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import RouterPage from './router/RouterPage'
import { store } from './stores'
import theme from './theme'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <Provider store={store}>
                    <RouterPage />
                </Provider>
            </ChakraProvider>
        </BrowserRouter>
    </StrictMode>
)
