export const GradientButton = ({className, onClick, children})=> {
    return(
        <div 
    style={{background: "linear-gradient(252.22deg, #E09EFF 0%, #385CDE 99.1%)"}} 
    className={className+` cursor-pointer hover:opacity-90 rounded-lg py-4 font-bold`}
    onClick={onClick}
    >
        {children}
    </div>
    )
}