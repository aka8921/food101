import Logo from '../../assets/logo.png'
import style from './index.module.css'
export const Login = () => {
    return(
        <div className={style.login_container}>
            <div className="self-stretch flex items-center justify-center relative h-[320px]">
                <div className="text-center overflow-hidden absolute top-0">
                <span className='text-white font-black opacity-20 overflow-hidden text-[40vw] leading-[40vw] sm:text-[200px] sm:leading-[200px] text-center'>Food<br/>101</span>
                </div>
                <div className="flex items-center justify-center w-[150px] h-[150px] bg-white/70 rounded-lg backdrop-blur-3xl opac">
                <img src={Logo} alt="" />
                </div>
            </div>
        </div>
    )
}