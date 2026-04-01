import { InterceptModal } from '@/components/intercept-modal'
import { auth } from '@/lib/auth'
import { LoginForm } from '../../(auth)/login/login-form'

export default function LoginModal() {
    const { disableSignUp } = auth.options.emailAndPassword

    return (
        <InterceptModal
            description='Enter your username or email below to login to your account'
            title='Login to your account'
        >
            <LoginForm disableSignUp={disableSignUp} />
        </InterceptModal>
    )
}
