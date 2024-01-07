import clsx from "clsx";
import LoginForm from "./components/LoginFormRHF";

export default function App() {
  return (
    <main
      className={clsx(
        "bg-black",
        "flex flex-col justify-center items-center",
        "min-h-screen"
      )}
    >
      <LoginForm />
    </main>
  );
}
