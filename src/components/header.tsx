import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { useLocation, useSearchParams } from "wouter";

const labels = {
    "/": "Usage",
    "/conversations": "Conversations",
    "/responses": "Responses",
}

export function Header() {
    const [location] = useLocation();
    const [searchParams] = useSearchParams();
    const conversation = searchParams.get('conversation');
    return (
        <header className="sticky z-20 bg-background top-0 flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href={location}>
                                {labels[location]}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">
                                {conversation ? conversation : "All"}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {/* <BreadcrumbItem>
                            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                        </BreadcrumbItem> */}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}