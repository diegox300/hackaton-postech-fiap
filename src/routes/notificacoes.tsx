import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/notificacoes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/notificacoes"!</div>
}
