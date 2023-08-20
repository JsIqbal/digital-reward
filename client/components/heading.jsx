import { cn } from '@/lib/utils'
import React from 'react'

const Heading = ({ title, description, Icon, iconColor, bgColor}) => {
  return (
    <div className=' flex items-center gap-3 mb-8 rounded-lg'>
        <div className={cn("p-2 w-fit rounded-md", bgColor)}>
            <Icon className={cn("w-10 h-10", iconColor)}/>
        </div>
        <div className="flex flex-col items-start justify-center text-center gap-1">
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='text-muted-foreground'>{description}</p>
        </div>
    </div>
  )
}

export default Heading