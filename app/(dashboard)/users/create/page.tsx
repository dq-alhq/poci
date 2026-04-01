import Heading from '@/components/heading'
import { UserForm } from '../form'

export default async function Page() {
    return (
        <div className='space-y-4 px-4 lg:px-6'>
            <Heading description='Fill the form below' title='Create New User' />
            <UserForm />
        </div>
    )
}
