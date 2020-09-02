 
export default context => {
    const {
        store
    } = context
    return new Promise((resolve, reject) => {

        store.dispatch('setCategories')
        store.dispatch('setSettings')
        resolve()
    })
}