import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChartColumnBig,
  Command,
  FileText,
  Frame,
  GalleryVerticalEnd,
  Map,
  MessageCircle,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import GitHub from "@/assets/github.svg?react"

import { Nav } from "@/components/nav"
import { NavUser } from "@/components/nav-user"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "Usage",
      url: "/",
      icon: ChartColumnBig,
    },
    {
      name: "Conversations",
      url: "/conversations",
      icon: MessageCircle,
    },
    {
      name: "Responses",
      url: "/responses",
      icon: FileText,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader> */}
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <Nav projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <div className="rounded border border-border text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
          <div className="p-2 border-b border-border">
            This is a web frontend for the <a className="text-link tracking-tighter font-medium" href="https://github.com/simonw/llm"><code>llm</code></a> command line tool. You can contribute to make it better.
          </div>
          <a href="https://github.com/martinklepsch/llm-web-ui" target="_blank" className="p-2 flex items-center gap-2 hover:text-foreground cursor-pointer">
            <GitHub className="w-4 h-4 fill-foreground" />
            View on GitHub
          </a>
        </div>
        <Button variant="outline" size="icon" className="size-8 cursor-pointer group-data-[collapsible=icon]:block hidden">
          <a href="https://github.com/martinklepsch/llm-web-ui" target="_blank" className="flex items-center justify-center cursor-pointer">
            <GitHub className="w-4 h-4 fill-foreground" />
          </a>
        </Button>
        {/* add card to allow reporting of issues etc */}
        <ModeToggle />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
