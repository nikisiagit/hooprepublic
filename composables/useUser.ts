export const useUser = () => {
    const user = useState<any | null>('user', () => null)
    const isAdmin = computed(() => user.value?.role === 'admin')

    const fetchUser = async () => {
        try {
            const { user: userData } = await $fetch('/api/auth/me')
            user.value = userData
        } catch (error) {
            user.value = null
        }
    }

    const logout = async () => {
        try {
            await $fetch('/api/auth/logout', { method: 'POST' })
            user.value = null
            navigateTo('/')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return {
        user,
        isAdmin,
        fetchUser,
        logout
    }
}
