import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/minhas-atividades')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/minhas-atividades"!</div>
}
