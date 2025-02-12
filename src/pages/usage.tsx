const Usage = () => {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] h-full flex items-center justify-center flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <div>
                    <div className="text-lg font-bold">
                        Not yet implemented.
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Please consider <a href="https://github.com/martinklepsch/llm-web-ui/issues" target="_blank" rel="noopener noreferrer" className="text-link underline">contributing</a>.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Usage