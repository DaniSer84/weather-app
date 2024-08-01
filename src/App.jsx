import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import AppRouter from './router/AppRouter'
import GlobalStyles from './styles/GlobalStyles'
import { store } from './store/configureStore'
import { Provider } from 'react-redux'

function App() {

  return (
    <>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppRouter/>
      </ThemeProvider>
    </Provider>
    </>
  )
}

export default App
