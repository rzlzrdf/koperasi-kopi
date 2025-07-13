import { IconSchemaOff } from '@tabler/icons-react'
import { useAuth } from '@/context/auth-context'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { NavGroup } from '@/components/layout/nav-group'
import { NavUser } from '@/components/layout/nav-user'
// import { TeamSwitcher } from '@/components/layout/team-switcher'
import { sidebarData } from './data/sidebar-data'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()
  return (
    <Sidebar collapsible='icon' variant='inset' {...props}>
      <SidebarHeader>
        {/* <h1 className='text-2xl font-bold mt-4 pl-3'>Koperasi Kopi</h1> */}
        <div className='bg-primary w-fit rounded-full p-2 text-white'>
          <IconSchemaOff />
        </div>
        {/* <TeamSwitcher teams={sidebarData.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.email || '',
            email: user?.name || '',
            avatar: '',
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
