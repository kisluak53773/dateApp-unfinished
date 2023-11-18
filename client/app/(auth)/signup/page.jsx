import SignupForm from "@/components/auth/SignupForm";

export function generateMetadata(){
  return{
    title:"Signup"
  }
}

export default function Signup() {
    return (
    <section className="signup">
      <h1 className="signup__title">Регистрация</h1>
      <SignupForm/>
    </section>
    )
  }