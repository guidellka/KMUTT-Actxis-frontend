const SET_USER_ID = 'SET_USER_ID'
const SET_IS_USER_DATA = 'SET_IS_USER_DATA'
const SET_IS_ORGAN = 'SET_IS_ORGAN'
const SET_IS_LECTURER = 'SET_IS_LECTURER'
const SET_ORGAN_NAME = 'SET_ORGAN_NAME'
const SET_FIRST_NAME = 'SET_FIRST_NAME'
const SET_LAST_NAME = 'SET_LAST_NAME'
const SET_MAIL = 'SET_MAIL'
const SET_STD_ID = 'SET_STD_ID'

const initState = {
  userId: null,
  isUserData: false,
  isOrgan: false,
  isLecturer: false,
  organName: null,
  firstName: null,
  lastName: null,
  mail: null,
  stdId: null,
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        userId: action.id,
      }
    case SET_IS_USER_DATA:
      return {
        ...state,
        isUserData: action.key,
      }
    case SET_IS_ORGAN:
      return {
        ...state,
        isOrgan: action.key,
      }
      case SET_IS_LECTURER:
      return {
        ...state,
        isLecturer: action.key,
      }
    case SET_ORGAN_NAME:
      return {
        ...state,
        OrganName: action.key,
      }
    case SET_FIRST_NAME:
      return {
        ...state,
        firstName: action.key,
      }
    case SET_LAST_NAME:
      return {
        ...state,
        lastName: action.key,
      }
    case SET_MAIL:
      return {
        ...state,
        mail: action.key,
      }
    case SET_STD_ID:
      return {
        ...state,
        stdId: action.key,
      }
    default:
      return state
  }
}

const setUserId = (id) => ({
  type: SET_USER_ID, id
})

const setIsUserData = (key) => ({
  type: SET_IS_USER_DATA, key
})
const setIsLecturer = (key) => ({
  type: SET_IS_LECTURER, key
})

const setIsOrgan = (key) => ({
  type: SET_IS_ORGAN, key
})

const setOrganName = (key) => ({
  type: SET_ORGAN_NAME, key
})

const setFirstName = (key) => ({
  type: SET_FIRST_NAME, key
})

const setLastName = (key) => ({
  type: SET_LAST_NAME, key
})

const setMail = (key) => ({
  type: SET_MAIL, key
})

const setStdId = (key) => ({
  type: SET_STD_ID, key
})

export default reducer
export { setUserId, setIsUserData, setIsLecturer, setIsOrgan, setOrganName, setFirstName, setLastName, setMail, setStdId }
