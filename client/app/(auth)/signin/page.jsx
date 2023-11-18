import SigninForm from "@/components/auth/SigninForm"

export function generateMetadata(){
    return{
      title:"Signin"
    }
  }
  
  export default function Signin() {
    return (
      <section className="signin">
       <h1 className="signin__title">Войти</h1>
       <SigninForm/>
      </section>
    )
  }