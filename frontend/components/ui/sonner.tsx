'use client'

import { Toaster as Sonner, toast } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          success: 'group-[.toast]:bg-green-500/10 group-[.toast]:text-green-600',
          error: 'group-[.toast]:bg-red-500/10 group-[.toast]:text-red-600',
          warning: 'group-[.toast]:bg-yellow-500/10 group-[.toast]:text-yellow-600',
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }