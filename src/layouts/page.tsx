import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Header } from "@/components/header"

import { useLocation } from "wouter";
import { ConversationsTable } from "@/pages/conversations-table";
import { Link, Route, Switch } from "wouter";
import ResponsesStream from "@/pages/responses-stream";
import Usage from "@/pages/usage";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Page() {
  const [location, setLocation] = useLocation();
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <Route path="/" component={Usage} />
          <Route path="/conversations" component={ConversationsTable} />
          <Route path="/responses" component={ResponsesStream} />
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
