import { configureStore} from '@reduxjs/toolkit'
import { mainApi } from '../../API/mainAPI'

const store = configureStore({ 
    reducer: {
        [mainApi.reducerPath]: mainApi.reducer, 
    }, 
middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(mainApi.middleware), 
});

export default store; 