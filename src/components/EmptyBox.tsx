interface emptyboxtype{
    title: string;
    subtitle: string;
}

export function EmptyBox({title, subtitle}: emptyboxtype){
    return(
        <div className="flex flex-col mt-2 text-center min-h-50 justify-center bg-bg-card border border-border border-dashed rounded-sm">
            <h1 className="font-display">{title}</h1>
            <p className="italic text-xs font-light">{subtitle}</p>
        </div>
    )
}