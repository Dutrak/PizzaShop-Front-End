import { ToastAction } from '@radix-ui/react-toast'
import { useMutation } from '@tanstack/react-query'
import { Pizza } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

const signInFormSchema = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInFormSchema>

export function SignIn() {
  const [searchParams] = useSearchParams()

  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate({ email: data.email })

      toast({
        title: 'Link de Autenticação enviado',
        description: `Enviamos um link de autenticação para o email ${data.email}`,
        action: (
          <ToastAction altText="Try again" onClick={() => handleSignIn(data)}>
            <Button variant="secondary">Reenviar</Button>
          </ToastAction>
        ),
      })
    } catch {
      toast({
        variant: 'destructive',
        title: 'Credenciais Invalidas',
      })
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button asChild className="absolute right-8 top-8" variant="outline">
          <Link to="/sign-up">Novo Estabelecimento</Link>
        </Button>

        <div className="absolute left-8 top-8 flex items-center gap-3 text-lg font-medium text-foreground min-[769px]:hidden">
          <Pizza className="size-4" />
          <span className="font-semibold">PizzaShop</span>
        </div>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Aceesar Painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiros
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu Email</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessar Painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
