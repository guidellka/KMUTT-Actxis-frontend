const USER_ID = 'USER_ID'

export const getUserId = () => localStorage.getItem(USER_ID)
export const setUserId = (id) => localStorage.setItem(USER_ID, id)
export const removeUserId = () => localStorage.removeItem(USER_ID)
