import { UserForm } from '@/app/(dashboard)/(admin)/users/form'
import { InterceptModal } from '@/components/intercept-modal'

export default function Page() {
    return (
        <InterceptModal description='Fill the form below' title='Create New User'>
            <UserForm />
        </InterceptModal>
    )
}
