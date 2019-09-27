const SIDEBAR_TOGGLE = 'SIDEBAR_TOGGLE'
const SUBMENU_KEYS = 'SUBMENU_KEYS'
const SELECT_KEY = 'SELECT_KEYS'

const initState = {
  sidebar: true,
  submenukeys: [],
  selectedkey: []
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SIDEBAR_TOGGLE:
      return {
        ...state,
        sidebar: !state.sidebar,
      }
    case SELECT_KEY:
      return  {
        ...state,
        selectedkey: action.key
      }
    case SUBMENU_KEYS:
      return {
        ...state,
        submenukeys : action.key
      }
    default:
      return state
  }
}

const sidebarToggle = () => ({
  type: SIDEBAR_TOGGLE,
})

const changeSubMenuKeys = (key) => ({
  type: SUBMENU_KEYS, key
})

const changeSelectedKey = (key) => ({
    type: SELECT_KEY, key
})

export default reducer
export { sidebarToggle, changeSelectedKey, changeSubMenuKeys }