import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  getManagedRestaurant,
  GetManagedRestaurantResponse,
} from '@/api/get-managed-resturant'
import { getProfile } from '@/api/get-profile'
import { signOut } from '@/api/sign-out'
import { updateProfile } from '@/api/update-profile'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { StoreProfile, StoreProfileDialog } from './store-profile-dialog'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'
import { ToastAction } from './ui/toast'
import { toast } from './ui/use-toast'

export function AccountMenu() {
  const [open, SetOpen] = useState(false)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['get-profile'],
    queryFn: getProfile,
  })

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ['get-managed-resturant'],
      queryFn: getManagedRestaurant,
      staleTime: Infinity,
    })

  function updateManagedResaturantCache({ name, description }: StoreProfile) {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      'get-managed-resturant',
    ])

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ['get-managed-resturant'],
        {
          ...cached,
          name,
          description,
        },
      )
    }

    return { cached }
  }

  const { mutateAsync: UpdateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ name, description }) {
      const { cached } = updateManagedResaturantCache({ name, description })

      return { previousProfile: cached }
    },

    onError(_, __, context) {
      if (context?.previousProfile) {
        updateManagedResaturantCache(context.previousProfile)
      }
    },
  })

  async function handleUpdateProfile(data: StoreProfile) {
    try {
      await UpdateProfileFn({ name: data.name, description: data.description })
      SetOpen(false)

      toast({ title: 'Perfil Atualizado com sucesso', variant: 'success' })
    } catch {
      toast({
        title: 'Erro ao ao atualizar os dados',
        variant: 'destructive',
        action: (
          <ToastAction
            altText="Tentar Novamente"
            onClick={() => handleUpdateProfile(data)}
          >
            Tentar Novamente
          </ToastAction>
        ),
      })
    }
  }

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate('/sign-in', { replace: true })
    },
  })

  return (
    <Dialog open={open} onOpenChange={SetOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            {isLoadingManagedRestaurant ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              managedRestaurant?.name
            )}
            <ChevronDown className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="mr-2 size-4" />
              <span>Perfil da Loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem
            asChild
            className="text-rose-500 dark:text-rose-400"
            disabled={isSigningOut}
          >
            <button className="w-full" onClick={() => signOutFn()}>
              <LogOut className="mr-2 size-4" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog updateFunction={handleUpdateProfile} />
    </Dialog>
  )
}
