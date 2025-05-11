import { Icon } from '@iconify/react'
import React from 'react'

const Loader = ({ title }: { title: string }) => {
    return (
        <div className='flex items-center justify-center gap-3'>
            {title} <Icon icon="svg-spinners:ring-resize" width="24" height="24" className='text-gray-500' />
        </div>
    )
}

export default Loader