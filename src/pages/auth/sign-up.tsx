import { ToastAction } from '@radix-ui/react-toast'
import { useMutation } from '@tanstack/react-query'
import { Pizza } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { registerRestaurant } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

const signUpFormSchema = z.object({
  restaurantName: z.string(),
  restaurantDescription: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  const { toast } = useToast()

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        restaurantDescription: data.restaurantDescription,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      })

      toast({
        title: 'Restaurante Cadastrado com sucesso',
        action: (
          <ToastAction
            altText="Login"
            onClick={() => navigate(`/sign-in?email=${data.email}`)}
          >
            <Button variant="secondary">Login</Button>
          </ToastAction>
        ),
      })
    } catch {
      toast({
        variant: 'destructive',
        title: 'Erro ao cadastrar Resturante',
      })
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button asChild className="absolute right-8 top-8" variant="outline">
          <Link to="/sign-in">Fazer Login</Link>
        </Button>

        <div className="absolute left-8 top-8 flex items-center gap-3 text-lg font-medium text-foreground min-[769px]:hidden">
          <Pizza className="size-4" />
          <span className="font-semibold">PizzaShop</span>
        </div>

        <div className="flex flex-col gap-20">
          <div className="flex w-[350px] flex-col justify-center gap-6 pt-24 max-[480px]:max-w-72">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Criar Conta Gratuita
              </h1>
              <p className="text-sm text-muted-foreground">
                Seja um parceiro e comece suas vendas
              </p>
            </div>

            <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="restaurantName">Nome do Estabelecimento</Label>
                <Input
                  id="restaurantName"
                  type="text"
                  {...register('restaurantName')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="restaurantName">
                  Descrição Estabelecimento
                </Label>
                <Input
                  id="restaurantDescription"
                  type="text"
                  {...register('restaurantDescription')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="managerName">Seu Nome</Label>
                <Input
                  id="managerName"
                  type="text"
                  {...register('managerName')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Seu Email</Label>
                <Input id="email" type="email" {...register('email')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Seu Celular</Label>
                <Input id="phone" type="tel" {...register('phone')} />
              </div>

              <Button disabled={isSubmitting} className="w-full" type="submit">
                Finalizar Cadastro
              </Button>

              <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                Ao continuar, você concorda com nossos{' '}
                <a href="" className="underline underline-offset-4">
                  termos de serviço
                </a>{' '}
                e{' '}
                <a href="" className="underline underline-offset-4">
                  políticas de privacidade
                </a>
              </p>
            </form>
          </div>

          <footer className="flex text-sm text-muted-foreground min-[769px]:hidden">
            Painel do parceiro &copy; PizzaShop - {new Date().getFullYear()}
          </footer>
        </div>
      </div>
    </>
  )
}
