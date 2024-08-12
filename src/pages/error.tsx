import { Link, useRouteError } from 'react-router-dom'

export function Error() {
  const error = useRouteError() as Error

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      {import.meta.env.DEV ? (
        <pre>
          {error.stack || error.message || JSON.stringify(error, null, 2)}
        </pre>
      ) : (
        <>
          <h1 className="text-4xl font-bold">Whoops, algo aconteceu...</h1>
          <p className="text-accent-foreground">
            Um Erro inesperado aconteceu na aplicação
          </p>
          <p className="text-accent-foreground">
            Voltar para o{' '}
            <Link to="/" className="text-sky-500 dark:text-sky-400">
              Dashboard
            </Link>
          </p>
        </>
      )}
    </div>
  )
}
