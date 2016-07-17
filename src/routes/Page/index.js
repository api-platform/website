import { injectReducer } from '../../store/reducers'

export default (store) => ({
    /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point

         and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
             dependencies for bundling   */
            const Page = require('./containers/PageContainer').default
            const reducer = require('./modules/page').default

            /*  Add the reducer to the store on key 'counter'  */
            injectReducer(store, { key: 'page', reducer })

            /*  Return getComponent   */
            cb(null, Page)

            /* Webpack named bundle   */
        }, 'page')
    }
})
